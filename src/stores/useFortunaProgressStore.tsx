import create, { State } from "zustand";
import { persist } from "zustand/middleware";
import { notify } from "../utils/notifications";
import { getLocalDateKey, getPreviousDateKey } from "../utils/fortunaDates";
import { XP_PER_CAST, XP_BONUS_WIN, XP_BONUS_GOLDEN } from "../utils/fortunaLeveling";
import { evaluateAchievements } from "../utils/fortunaAchievements";
import { WheelTierId, wheelPhraseKey } from "../utils/fortunaWheelTiers";

export interface FortunaHistoryEntry {
  result: "heads" | "tails" | "golden" | "wheel" | "oracle";
  timestamp: number;
}

export interface FortunaCloudStats {
  totalXp: number;
  streakCount: number;
  bestStreak: number;
  lastCastDateKey: string | null;
  totalCasts: number;
  totalWins: number;
  totalGoldens: number;
  offeringsSent: number;
  history: FortunaHistoryEntry[];
  unlockedAchievements: string[];
  unlockedWheelPhrases: string[];
}

interface FortunaProgressStore extends State, FortunaCloudStats {
  soundEnabled: boolean;
  hasSyncedWallet: boolean;
  recordCast: (result: {
    isWin: boolean;
    isGolden: boolean;
    mode?: "coin" | "wheel" | "oracle";
    wheelTierId?: WheelTierId;
    wheelPhrase?: string;
  }) => void;
  recordOffering: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  hydrateFromCloud: (stats: FortunaCloudStats) => void;
}

const useFortunaProgressStore = create<FortunaProgressStore>(
  persist(
    (set, get) => {
      const unlockAchievements = () => {
        const state = get();
        const newlyUnlocked = evaluateAchievements(state, state.unlockedAchievements);
        if (newlyUnlocked.length === 0) return;

        set({
          unlockedAchievements: [
            ...state.unlockedAchievements,
            ...newlyUnlocked.map((achievement) => achievement.id),
          ],
        });

        newlyUnlocked.forEach((achievement) => {
          notify({
            type: "achievement",
            message: "ACHIEVEMENT UNLOCKED",
            description: achievement.title,
          });
        });
      };

      return {
        totalXp: 0,
        streakCount: 0,
        bestStreak: 0,
        lastCastDateKey: null,
        totalCasts: 0,
        totalWins: 0,
        totalGoldens: 0,
        offeringsSent: 0,
        history: [],
        unlockedAchievements: [],
        unlockedWheelPhrases: [],
        soundEnabled: true,
        hasSyncedWallet: false,

        recordCast: ({ isWin, isGolden, mode = "coin", wheelTierId, wheelPhrase }) => {
          const state = get();
          const today = getLocalDateKey();
          const yesterday = getPreviousDateKey(today);

          let streakCount = state.streakCount;
          if (state.lastCastDateKey === today) {
            // Already played today — streak doesn't inflate from repeat casts.
          } else if (state.lastCastDateKey === yesterday) {
            streakCount += 1;
          } else {
            streakCount = 1;
          }

          let xpGain = XP_PER_CAST;
          if (isWin) xpGain += XP_BONUS_WIN;
          if (isGolden) xpGain += XP_BONUS_GOLDEN;

          const result: FortunaHistoryEntry["result"] =
            mode === "wheel" ? "wheel" : mode === "oracle" ? "oracle" : isGolden ? "golden" : isWin ? "heads" : "tails";

          const unlockedWheelPhrases =
            wheelTierId && wheelPhrase
              ? Array.from(
                  new Set([...state.unlockedWheelPhrases, wheelPhraseKey(wheelTierId, wheelPhrase)])
                )
              : state.unlockedWheelPhrases;

          set({
            streakCount,
            bestStreak: Math.max(state.bestStreak, streakCount),
            lastCastDateKey: today,
            totalXp: state.totalXp + xpGain,
            totalCasts: state.totalCasts + 1,
            totalWins: state.totalWins + (isWin ? 1 : 0),
            totalGoldens: state.totalGoldens + (isGolden ? 1 : 0),
            history: [{ result, timestamp: Date.now() }, ...state.history].slice(0, 5),
            unlockedWheelPhrases,
          });

          unlockAchievements();
        },

        recordOffering: () => {
          set((state) => ({ offeringsSent: state.offeringsSent + 1 }));
          unlockAchievements();
        },

        setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

        hydrateFromCloud: (stats) => {
          set({ ...stats, hasSyncedWallet: true });
          unlockAchievements();
        },
      };
    },
    { name: "fortuna-progress-v1", getStorage: () => localStorage }
  )
);

export default useFortunaProgressStore;

import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import useFortunaProgressStore, { FortunaCloudStats } from "../../../stores/useFortunaProgressStore";
import { fetchCloudStats, pushCloudStats } from "../../../utils/statsApi";

const SYNC_DEBOUNCE_MS = 1500;

function extractCloudStats(state: ReturnType<typeof useFortunaProgressStore.getState>): FortunaCloudStats {
  return {
    totalXp: state.totalXp,
    streakCount: state.streakCount,
    bestStreak: state.bestStreak,
    lastCastDateKey: state.lastCastDateKey,
    totalCasts: state.totalCasts,
    totalWins: state.totalWins,
    totalGoldens: state.totalGoldens,
    offeringsSent: state.offeringsSent,
    history: state.history,
    unlockedAchievements: state.unlockedAchievements,
  };
}

// Renders nothing — just watches wallet connection and mirrors progress
// to/from the cloud while connected. Anonymous play stays local-only.
export const StatsSync = () => {
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (!connected || !publicKey) return;

    const wallet = publicKey.toBase58();
    let cancelled = false;
    let skipNextPush = false;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    (async () => {
      try {
        const cloudStats = await fetchCloudStats(wallet);
        if (cancelled) return;

        skipNextPush = true;
        if (cloudStats) {
          useFortunaProgressStore.getState().hydrateFromCloud(cloudStats);
        } else {
          const localSnapshot = extractCloudStats(useFortunaProgressStore.getState());
          useFortunaProgressStore.getState().hydrateFromCloud(localSnapshot);
          await pushCloudStats(wallet, localSnapshot);
        }
      } catch (error) {
        console.error("Failed to load cloud stats", error);
      }
    })();

    const unsubscribe = useFortunaProgressStore.subscribe(() => {
      if (skipNextPush) {
        skipNextPush = false;
        return;
      }
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const snapshot = extractCloudStats(useFortunaProgressStore.getState());
        pushCloudStats(wallet, snapshot).catch((error) => {
          console.error("Failed to sync stats to cloud", error);
        });
      }, SYNC_DEBOUNCE_MS);
    });

    return () => {
      cancelled = true;
      unsubscribe();
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [connected, publicKey]);

  return null;
};

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const WALLET_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

const LIMITS = {
  totalXp: 100_000_000,
  offeringsSent: 100_000_000,
  totalCasts: 10_000_000,
  totalWins: 10_000_000,
  totalGoldens: 10_000_000,
  streakCount: 100_000,
  bestStreak: 100_000,
};

const DATE_KEY_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const HISTORY_RESULTS = new Set(["heads", "tails", "golden"]);

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  // The Vercel Marketplace Supabase integration names the full-access
  // server-side key SUPABASE_SECRET_KEY; a manually-created Supabase
  // project (following the older docs) calls the same thing
  // SUPABASE_SERVICE_ROLE_KEY. Accept either.
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars are not configured (SUPABASE_URL / SUPABASE_SECRET_KEY)");
  }
  return createClient(url, key);
}

function isNonNegativeIntUnder(value: unknown, max: number): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= max;
}

function isValidHistory(value: unknown): value is Array<{ result: string; timestamp: number }> {
  if (!Array.isArray(value) || value.length > 5) return false;
  return value.every(
    (entry) =>
      entry &&
      typeof entry === "object" &&
      HISTORY_RESULTS.has((entry as any).result) &&
      typeof (entry as any).timestamp === "number"
  );
}

function isValidAchievements(value: unknown): value is string[] {
  return Array.isArray(value) && value.length <= 50 && value.every((id) => typeof id === "string");
}

function rowToCamelCase(row: any) {
  return {
    totalXp: row.total_xp,
    streakCount: row.streak_count,
    bestStreak: row.best_streak,
    lastCastDateKey: row.last_cast_date_key,
    totalCasts: row.total_casts,
    totalWins: row.total_wins,
    totalGoldens: row.total_goldens,
    offeringsSent: row.offerings_sent,
    history: row.history,
    unlockedAchievements: row.unlocked_achievements,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let supabase;
  try {
    supabase = getSupabase();
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Server misconfigured" });
    return;
  }

  if (req.method === "GET") {
    const wallet = req.query.wallet;
    if (typeof wallet !== "string" || !WALLET_REGEX.test(wallet)) {
      res.status(400).json({ error: "Invalid or missing wallet" });
      return;
    }

    const { data, error } = await supabase
      .from("fortuna_stats")
      .select("*")
      .eq("wallet_address", wallet)
      .maybeSingle();

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json({ stats: data ? rowToCamelCase(data) : null });
    return;
  }

  if (req.method === "POST") {
    const body = req.body ?? {};
    const { wallet } = body;

    if (typeof wallet !== "string" || !WALLET_REGEX.test(wallet)) {
      res.status(400).json({ error: "Invalid or missing wallet" });
      return;
    }
    if (!isNonNegativeIntUnder(body.totalXp, LIMITS.totalXp)) {
      res.status(400).json({ error: "Invalid totalXp" });
      return;
    }
    if (!isNonNegativeIntUnder(body.streakCount, LIMITS.streakCount)) {
      res.status(400).json({ error: "Invalid streakCount" });
      return;
    }
    if (!isNonNegativeIntUnder(body.bestStreak, LIMITS.bestStreak)) {
      res.status(400).json({ error: "Invalid bestStreak" });
      return;
    }
    if (body.lastCastDateKey !== null && !DATE_KEY_REGEX.test(body.lastCastDateKey)) {
      res.status(400).json({ error: "Invalid lastCastDateKey" });
      return;
    }
    if (!isNonNegativeIntUnder(body.totalCasts, LIMITS.totalCasts)) {
      res.status(400).json({ error: "Invalid totalCasts" });
      return;
    }
    if (!isNonNegativeIntUnder(body.totalWins, LIMITS.totalWins)) {
      res.status(400).json({ error: "Invalid totalWins" });
      return;
    }
    if (!isNonNegativeIntUnder(body.totalGoldens, LIMITS.totalGoldens)) {
      res.status(400).json({ error: "Invalid totalGoldens" });
      return;
    }
    if (!isNonNegativeIntUnder(body.offeringsSent, LIMITS.offeringsSent)) {
      res.status(400).json({ error: "Invalid offeringsSent" });
      return;
    }
    if (!isValidHistory(body.history)) {
      res.status(400).json({ error: "Invalid history" });
      return;
    }
    if (!isValidAchievements(body.unlockedAchievements)) {
      res.status(400).json({ error: "Invalid unlockedAchievements" });
      return;
    }

    const { data: existing, error: fetchError } = await supabase
      .from("fortuna_stats")
      .select("*")
      .eq("wallet_address", wallet)
      .maybeSingle();

    if (fetchError) {
      res.status(500).json({ error: fetchError.message });
      return;
    }

    if (existing) {
      const regressed =
        body.totalXp < existing.total_xp ||
        body.streakCount < existing.streak_count ||
        body.bestStreak < existing.best_streak ||
        body.totalCasts < existing.total_casts ||
        body.totalWins < existing.total_wins ||
        body.totalGoldens < existing.total_goldens ||
        body.offeringsSent < existing.offerings_sent;

      if (regressed) {
        res.status(400).json({ error: "Stats cannot regress" });
        return;
      }
    }

    const { error: upsertError } = await supabase.from("fortuna_stats").upsert({
      wallet_address: wallet,
      total_xp: body.totalXp,
      streak_count: body.streakCount,
      best_streak: body.bestStreak,
      last_cast_date_key: body.lastCastDateKey,
      total_casts: body.totalCasts,
      total_wins: body.totalWins,
      total_goldens: body.totalGoldens,
      offerings_sent: body.offeringsSent,
      history: body.history,
      unlocked_achievements: body.unlockedAchievements,
      updated_at: new Date().toISOString(),
    });

    if (upsertError) {
      res.status(500).json({ error: upsertError.message });
      return;
    }

    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}

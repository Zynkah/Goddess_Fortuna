import { FortunaCloudStats } from "../stores/useFortunaProgressStore";

export async function fetchCloudStats(wallet: string): Promise<FortunaCloudStats | null> {
  const response = await fetch(`/api/stats?wallet=${encodeURIComponent(wallet)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch cloud stats (${response.status})`);
  }
  const data = await response.json();
  return data.stats ?? null;
}

export async function pushCloudStats(wallet: string, stats: FortunaCloudStats): Promise<void> {
  const response = await fetch("/api/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet, ...stats }),
  });
  if (!response.ok) {
    throw new Error(`Failed to sync stats (${response.status})`);
  }
}

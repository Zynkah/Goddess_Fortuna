// api.mainnet-beta.solana.com blocks most browser/dapp traffic with 403s —
// it's not meant for production use. Set VITE_CLUSTER_URL to a free RPC key
// (Helius, QuickNode, Alchemy, etc.) for reliability; this public endpoint is
// just a fallback that works for light/occasional use.
export const CLUSTER_URL =
  import.meta.env.VITE_CLUSTER_URL || "https://rpc.ankr.com/solana";
export const SOLANA_COMMITMENT = "confirmed";

// Standard SPL USDC mint on Solana mainnet.
export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const USDC_DECIMALS = 6;

// Wallet that receives optional USDC offerings from players. Set via
// VITE_TIP_DESTINATION_WALLET in a local .env.local (gitignored) or in your
// host's environment variable settings — never hardcode it here, since this
// file is committed to the public repo.
export const TIP_DESTINATION_WALLET: string =
  import.meta.env.VITE_TIP_DESTINATION_WALLET || "";

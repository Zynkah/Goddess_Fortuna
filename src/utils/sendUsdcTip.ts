import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SOLANA_COMMITMENT, TIP_DESTINATION_WALLET, USDC_DECIMALS, USDC_MINT } from "../constants";

interface TipWallet {
  publicKey: PublicKey | null;
  sendTransaction: (
    transaction: Transaction,
    connection: Connection
  ) => Promise<string>;
}

export async function sendUsdcTip(
  connection: Connection,
  wallet: TipWallet,
  amountUsdc: number
) {
  if (!wallet.publicKey) {
    throw new Error("Wallet not connected");
  }
  if (!(amountUsdc > 0)) {
    throw new Error("Enter an amount greater than 0");
  }
  if (!TIP_DESTINATION_WALLET) {
    throw new Error("Tipping is not configured (missing VITE_TIP_DESTINATION_WALLET)");
  }

  const mint = new PublicKey(USDC_MINT);
  const destination = new PublicKey(TIP_DESTINATION_WALLET);

  const sourceAta = await getAssociatedTokenAddress(mint, wallet.publicKey);
  const destinationAta = await getAssociatedTokenAddress(mint, destination);

  const amount = BigInt(Math.round(amountUsdc * 10 ** USDC_DECIMALS));

  const transaction = new Transaction().add(
    createAssociatedTokenAccountIdempotentInstruction(
      wallet.publicKey,
      destinationAta,
      destination,
      mint
    ),
    createTransferCheckedInstruction(
      sourceAta,
      mint,
      destinationAta,
      wallet.publicKey,
      amount,
      USDC_DECIMALS,
      [],
      TOKEN_PROGRAM_ID
    )
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash(
    SOLANA_COMMITMENT
  );
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = wallet.publicKey;

  const signature = await wallet.sendTransaction(transaction, connection);
  await connection.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    SOLANA_COMMITMENT
  );

  return signature;
}

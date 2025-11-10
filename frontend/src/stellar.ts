import { WalletKit } from "@stellar/wallet-kit";

let wallet: WalletKit | null = null;
const CONTRACT_ID = "YOUR_DEPLOYED_CONTRACT_ID"; // Replace after deploy

export async function connectWallet() {
  wallet = new WalletKit();
  await wallet.open();
}

export async function guessNumber(guess: number) {
  if (!wallet) return "Wallet not connected.";

  try {
    // Mock call (replace with generated client from Scaffold Stellar)
    console.log("Guess sent:", guess);
    return "Transaction submitted (mock)";
  } catch (err) {
    console.error(err);
    return "Error submitting guess.";
  }
}

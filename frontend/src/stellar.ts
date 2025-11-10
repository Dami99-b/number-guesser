import { WalletKit } from "@stellar/wallet-kit";

let wallet: WalletKit | null = null;

// Replace with deployed contract and token IDs
const CONTRACT_ID = "YOUR_DEPLOYED_CONTRACT_ID";
const TOKEN_ID = "YOUR_TOKEN_CONTRACT_ID"; // XLM or test token

export async function connectWallet() {
  wallet = new WalletKit();
  await wallet.open();
}

export async function guessNumber(guess: number) {
  if (!wallet) return "Wallet not connected.";

  try {
    const tx = {
      to: CONTRACT_ID,
      function: "guess",
      args: {
        player: wallet.address,
        guess_number: guess,
        token_id: TOKEN_ID,
      },
    };
    console.log("Submitting:", tx);
    // In real use: call Soroban RPC via Scaffold Stellar client
    return "Transaction submitted! (mock call)";
  } catch (err) {
    console.error(err);
    return "Error submitting guess.";
  }
}

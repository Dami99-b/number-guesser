import { useState } from "react";
import { connectWallet, guessNumber } from "./stellar";

export default function App() {
  const [connected, setConnected] = useState(false);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const connect = async () => {
    await connectWallet();
    setConnected(true);
  };

  const handleGuess = async () => {
    const result = await guessNumber(Number(guess));
    setMessage(result);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🔢 Stellar Number Guesser</h1>
      {!connected ? (
        <button onClick={connect} className="px-4 py-2 bg-blue-600 rounded-lg">
          Connect Wallet
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <input
            type="number"
            placeholder="Enter your guess"
            className="p-2 rounded text-black"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleGuess} className="px-4 py-2 bg-green-600 rounded-lg">
            Submit Guess
          </button>
          {message && <p className="mt-4 text-yellow-400">{message}</p>}
        </div>
      )}
    </div>
  );
}

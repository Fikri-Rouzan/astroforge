import React from "react";
import type { PlayerProfile } from "../types/type";
import { Coins } from "lucide-react";

interface OreSmelterProps {
  playerProfile: PlayerProfile;
  isProcessing: boolean;
  onMint: () => Promise<void>;
}

export const OreSmelter: React.FC<OreSmelterProps> = ({
  playerProfile,
  isProcessing,
  onMint,
}) => {
  return (
    <div className="p-6 rounded-2xl border border-cosmic-border bg-cosmic-station shadow-sm flex flex-col justify-between hover:border-cosmic-primary/40">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-heading font-bold text-sm text-cosmic-text">
            Quantum Ore Smelter
          </h4>
          <span className="text-[9px] bg-cosmic-primary/10 text-indigo-400 border border-cosmic-primary/20 px-2 py-0.5 rounded font-mono">
            Ratio 100:1
          </span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed mb-6">
          Bridge your raw off-chain resources into the permanent ledger. Convert
          accumulated Iron Ore payload directly into decentralized $ORE assets.
        </p>
      </div>

      <button
        onClick={() => {
          void onMint();
        }}
        disabled={isProcessing || playerProfile.ironOre < 100}
        className="w-full flex items-center justify-center gap-2 font-heading text-xs tracking-wider bg-linear-to-r from-cosmic-primary to-indigo-500 hover:opacity-90 text-white py-3.5 px-4 rounded-xl font-bold shadow-neon-primary disabled:from-cosmic-panel disabled:to-cosmic-panel disabled:text-gray-500 disabled:opacity-40 disabled:shadow-none cursor-pointer"
      >
        <Coins className="w-4 h-4" />
        {playerProfile.ironOre < 100
          ? "Minimum 100 KG Required"
          : "Smelt and Mint Ore Tokens"}
      </button>
    </div>
  );
};

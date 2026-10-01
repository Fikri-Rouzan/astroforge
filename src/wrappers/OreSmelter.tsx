import React from "react";
import { motion } from "motion/react";
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
    <div className="p-6 rounded-2xl border border-cosmic-border bg-cosmic-station shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-bold text-sm text-cosmic-text">
            Ore Smelter
          </h3>
          <span className="text-[10px] bg-cosmic-primary/10 text-cosmic-primary border border-cosmic-primary/20 px-2 py-0.5 rounded font-mono font-semibold">
            100 KG = 1 $ORE
          </span>
        </div>
        <p className="text-xs text-cosmic-muted leading-relaxed mb-6 font-medium">
          Convert off-chain Iron Ore payload into on-chain $ORE ERC-20 tokens
          via secure signed transactions.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          void onMint();
        }}
        disabled={isProcessing || playerProfile.ironOre < 100}
        className="w-full flex items-center justify-center gap-2 font-heading text-xs tracking-wider bg-cosmic-primary hover:bg-indigo-600 text-white py-3.5 px-4 rounded-xl font-bold disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-sm"
      >
        <Coins className="w-4 h-4 shrink-0" />
        {playerProfile.ironOre < 100
          ? "Minimum 100 KG Required"
          : "Smelt & Mint $ORE Tokens"}
      </motion.button>
    </div>
  );
};

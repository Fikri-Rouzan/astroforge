import React from "react";
import { motion } from "motion/react";
import type { PlayerProfile } from "../types/type";
import { Flame } from "lucide-react";

interface RefuelStationProps {
  playerProfile: PlayerProfile;
  isProcessing: boolean;
  onRefuel: () => Promise<void>;
}

export const RefuelStation: React.FC<RefuelStationProps> = ({
  playerProfile,
  isProcessing,
  onRefuel,
}) => {
  return (
    <div className="p-6 rounded-2xl border border-cosmic-border bg-cosmic-station shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-heading font-bold text-sm text-cosmic-text mb-2">
          Fuel Station
        </h3>
        <p className="text-xs text-cosmic-muted leading-relaxed mb-6 font-medium">
          Replenish plasma fuel cells to keep fleet reactors running at peak
          efficiency.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          void onRefuel();
        }}
        disabled={isProcessing || playerProfile.fuel >= 100}
        className="w-full flex items-center justify-center gap-2 font-heading text-xs tracking-wider bg-cosmic-panel hover:bg-cosmic-panel/80 text-cosmic-accent py-3.5 px-4 rounded-xl font-bold border border-cosmic-border disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
      >
        <Flame className="w-4 h-4 shrink-0" />
        {playerProfile.fuel >= 100
          ? "Fuel Reserves Full (100%)"
          : "Refuel Reactor Cells"}
      </motion.button>
    </div>
  );
};

import React from "react";
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
        <h4 className="font-heading font-bold text-sm text-cosmic-text mb-2">
          Fleet Refuel Station
        </h4>
        <p className="text-xs text-gray-400 leading-relaxed mb-6">
          Keep your automated mining operations running. Recharging reactors
          replenishes auxiliary energy logs.
        </p>
      </div>

      <button
        onClick={() => {
          void onRefuel();
        }}
        disabled={isProcessing || playerProfile.fuel >= 100}
        className="w-full flex items-center justify-center gap-2 font-heading text-xs tracking-wider bg-cosmic-panel hover:bg-cosmic-panel/80 text-cosmic-accent py-3.5 px-4 rounded-xl font-bold border border-cosmic-accent/20 disabled:opacity-40 cursor-pointer"
      >
        <Flame className="w-4 h-4" />
        {playerProfile.fuel >= 100
          ? "Reactor Core at Maximum"
          : "Recharge Plasma Cells"}
      </button>
    </div>
  );
};

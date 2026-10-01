import React from "react";
import { motion } from "motion/react";
import type { Ship } from "../types/type";
import { Pickaxe, Gauge, ArrowUpCircle } from "lucide-react";

interface ShipCardProps {
  ship: Ship;
  livePendingAmount: number;
  ironOreBalance: number;
  actionLoadingId: number | null;
  onLaunch: (id: number) => Promise<void>;
  onClaim: (id: number) => Promise<void>;
  onUpgrade: (id: number) => Promise<void>;
}

export const ShipCard: React.FC<ShipCardProps> = ({
  ship,
  livePendingAmount,
  ironOreBalance,
  actionLoadingId,
  onLaunch,
  onClaim,
  onUpgrade,
}) => {
  const upgradeCost = Math.floor(Number(ship.miningRatePerSecond) * 2000);
  const canAffordUpgrade = ironOreBalance >= upgradeCost;
  const isMining = ship.status === "MINING";

  return (
    <div className="p-6 rounded-2xl border border-cosmic-border bg-cosmic-station shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-heading font-bold text-sm tracking-wide text-cosmic-text">
              {ship.shipName}
            </h3>
            <span className="text-xs text-cosmic-muted font-mono">
              Ship ID: #{ship.id.toString().padStart(3, "0")}
            </span>
          </div>

          <span
            className={`text-xs font-heading font-bold px-2.5 py-1 rounded-md tracking-wider ${
              isMining
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                : "bg-amber-500/10 text-cosmic-accent border border-amber-500/20"
            }`}
          >
            {ship.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 bg-cosmic-panel p-4 rounded-xl border border-cosmic-border">
          <div className="flex items-center gap-2.5">
            <Pickaxe className="w-4 h-4 text-cosmic-primary shrink-0" />
            <div>
              <span className="text-[10px] text-cosmic-muted block font-heading uppercase">
                Mining Rate
              </span>
              <span className="text-xs font-bold text-cosmic-text font-heading">
                {ship.miningRatePerSecond}{" "}
                <span className="text-[10px] text-cosmic-muted font-normal">
                  /s
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Gauge className="w-4 h-4 text-cosmic-secondary shrink-0" />
            <div>
              <span className="text-[10px] text-cosmic-muted block font-heading uppercase">
                Cargo Hold
              </span>
              <span className="text-xs font-bold text-cosmic-text font-heading">
                {isMining ? livePendingAmount.toFixed(1) : "0"} /{" "}
                {ship.maxCargo}{" "}
                <span className="text-[10px] text-cosmic-muted font-normal">
                  KG
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          {!isMining ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                void onLaunch(ship.id);
              }}
              disabled={actionLoadingId !== null}
              className="w-full font-heading text-xs tracking-wider bg-cosmic-primary hover:bg-indigo-600 text-white py-3.5 px-4 rounded-xl font-bold disabled:opacity-40 cursor-pointer shadow-sm"
            >
              {actionLoadingId === ship.id ? "Launching..." : "Launch Ship"}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                void onClaim(ship.id);
              }}
              disabled={actionLoadingId !== null}
              className="w-full font-heading text-xs tracking-wider bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 py-3.5 px-4 rounded-xl font-bold disabled:opacity-40 cursor-pointer"
            >
              {actionLoadingId === ship.id ? "Claiming..." : "Collect Cargo"}
            </motion.button>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            void onUpgrade(ship.id);
          }}
          disabled={actionLoadingId !== null || isMining || !canAffordUpgrade}
          className="flex-1 flex items-center justify-center gap-2 font-heading text-xs tracking-wider bg-cosmic-panel hover:bg-cosmic-panel/80 border border-cosmic-border text-cosmic-accent py-3.5 px-4 rounded-xl font-bold disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <ArrowUpCircle className="w-4 h-4 shrink-0" />
          <span>
            {actionLoadingId === ship.id
              ? "Upgrading..."
              : `Upgrade (${upgradeCost})`}
          </span>
        </motion.button>
      </div>
    </div>
  );
};

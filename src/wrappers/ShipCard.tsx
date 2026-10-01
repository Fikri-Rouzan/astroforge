import React from "react";
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
    <div className="p-6 rounded-2xl border border-cosmic-border bg-cosmic-station shadow-sm flex flex-col justify-between hover:shadow-neon-glow">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wide text-cosmic-text">
              {ship.shipName}
            </h4>
            <span className="text-[10px] text-gray-400 font-mono">
              Regid: 00{ship.id}
            </span>
          </div>

          <span
            className={`text-[10px] font-heading font-bold px-2.5 py-1 rounded-md tracking-widest ${
              isMining
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse"
                : "bg-amber-500/10 text-cosmic-accent border border-amber-500/20"
            }`}
          >
            {ship.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 bg-cosmic-panel p-4 rounded-xl border border-cosmic-border">
          <div className="flex items-center gap-2">
            <Pickaxe className="w-4 h-4 text-indigo-400" />
            <div>
              <span className="text-[10px] text-gray-400 block font-heading">
                Speed
              </span>
              <span className="text-xs font-bold text-cosmic-text font-heading">
                {ship.miningRatePerSecond}{" "}
                <span className="text-[9px] text-gray-400">/s</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-[10px] text-gray-400 block font-heading">
                Cargo Hold
              </span>
              <span className="text-xs font-bold text-cosmic-text font-heading">
                {isMining ? livePendingAmount.toFixed(1) : "0"} /{" "}
                {ship.maxCargo}{" "}
                <span className="text-[9px] text-gray-400">KG</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          {!isMining ? (
            <button
              onClick={() => {
                void onLaunch(ship.id);
              }}
              disabled={actionLoadingId !== null}
              className="w-full font-heading text-xs tracking-wider bg-cosmic-primary hover:bg-indigo-500 text-white py-3.5 px-4 rounded-xl font-bold hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 cursor-pointer"
            >
              {actionLoadingId === ship.id ? "Launching..." : "Launch Ship"}
            </button>
          ) : (
            <button
              onClick={() => {
                void onClaim(ship.id);
              }}
              disabled={actionLoadingId !== null}
              className="w-full font-heading text-xs tracking-wider bg-transparent border border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-400 py-3.5 px-4 rounded-xl font-bold hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 cursor-pointer"
            >
              {actionLoadingId === ship.id ? "Refining..." : "Claim Cargo"}
            </button>
          )}
        </div>

        <button
          onClick={() => {
            void onUpgrade(ship.id);
          }}
          disabled={actionLoadingId !== null || isMining || !canAffordUpgrade}
          className="flex-1 flex items-center justify-center gap-2 font-heading text-xs tracking-wider bg-transparent border border-cosmic-border hover:bg-cosmic-panel text-cosmic-accent py-3.5 px-4 rounded-xl font-bold disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ArrowUpCircle className="w-4 h-4" />
          <span>
            {actionLoadingId === ship.id
              ? "Upgrading..."
              : `Upgrade (${upgradeCost})`}
          </span>
        </button>
      </div>
    </div>
  );
};

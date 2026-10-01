import React from "react";
import { motion, type Variants } from "motion/react";
import { Cpu, Compass, Coins } from "lucide-react";

interface FeatureShowcaseProps {
  variants?: Variants;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  variants,
}) => {
  return (
    <motion.section
      variants={variants}
      className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 md:mt-12 mb-6 border-t border-cosmic-border pt-10"
      aria-label="Core Features"
    >
      <div className="flex gap-4 p-3 items-start rounded-2xl bg-cosmic-station/50 border border-cosmic-border/60">
        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-cosmic-primary shrink-0">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-sm text-cosmic-text">
            Autonomous Fleet
          </h3>
          <p className="text-xs text-cosmic-muted mt-1 leading-relaxed font-medium">
            Deploy mining ships to gather resources automatically even when you
            are offline.
          </p>
        </div>
      </div>

      <div className="flex gap-4 p-3 items-start rounded-2xl bg-cosmic-station/50 border border-cosmic-border/60">
        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cosmic-secondary shrink-0">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-sm text-cosmic-text">
            Real-Time Telemetry
          </h3>
          <p className="text-xs text-cosmic-muted mt-1 leading-relaxed font-medium">
            Monitor active extraction lines and cargo capacity inside an
            interactive 2D orbital map.
          </p>
        </div>
      </div>

      <div className="flex gap-4 p-3 items-start rounded-2xl bg-cosmic-station/50 border border-cosmic-border/60">
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-cosmic-accent shrink-0">
          <Coins className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-sm text-cosmic-text">
            On-Chain Rewards
          </h3>
          <p className="text-xs text-cosmic-muted mt-1 leading-relaxed font-medium">
            Smelt accumulated raw ores and mint them into verified ERC-20 tokens
            instantly.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

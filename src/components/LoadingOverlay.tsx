import React from "react";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

export const LoadingOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 bg-cosmic-bg z-50 flex flex-col justify-center items-center p-4"
      role="alert"
      aria-busy="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center text-center max-w-xs"
      >
        <div className="w-12 h-12 bg-cosmic-panel border border-cosmic-border rounded-2xl flex items-center justify-center mb-4 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-cosmic-secondary animate-pulse" />
        </div>

        <h3 className="font-heading text-sm font-bold text-cosmic-text tracking-wide">
          Loading Control Center
        </h3>
        <p className="text-xs text-cosmic-muted mt-1.5 leading-relaxed font-medium">
          Establishing telemetry connection to your orbital node.
        </p>
      </motion.div>
    </div>
  );
};

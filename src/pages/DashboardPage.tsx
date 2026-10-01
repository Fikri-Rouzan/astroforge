import React from "react";
import { motion } from "motion/react";
import { useWeb3 } from "../hooks/useWeb3.js";
import { useLiveTelemetry } from "../hooks/useLiveTelemetry.js";
import { ResourceCard } from "../wrappers/ResourceCard.js";
import { AsteroidField } from "../components/AsteroidField.js";
import { HangarDashboard } from "../components/HangarDashboard.js";
import { SpaceportPanel } from "../components/SpaceportPanel.js";
import { Coins, Flame, Gem } from "lucide-react";

export const DashboardPage: React.FC = () => {
  const { playerProfile } = useWeb3();
  const { totalLiveIronOre } = useLiveTelemetry(playerProfile);

  if (!playerProfile) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl w-full mx-auto p-4 md:p-8 mt-2 flex-1 flex flex-col"
    >
      {/* Header */}
      <motion.section
        variants={itemVariants}
        className="mb-6"
        aria-labelledby="dashboard-title"
      >
        <h1
          id="dashboard-title"
          className="text-2xl md:text-3xl font-bold font-heading text-cosmic-text tracking-wide"
        >
          Control Center
        </h1>
        <p className="text-xs md:text-sm text-cosmic-muted mt-1 font-medium">
          Real-time telemetry and resource metrics for active orbital mining
          operations.
        </p>
      </motion.section>

      {/* Resource cards */}
      <motion.section
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        aria-label="Overview Metrics"
      >
        <ResourceCard
          label="Iron Ore Payload"
          displayValue={totalLiveIronOre.toFixed(2)}
          unit="KG"
          icon={Coins}
          iconColorClass="text-cosmic-primary"
        />
        <ResourceCard
          label="Fuel Supply"
          displayValue={`${playerProfile.fuel}%`}
          icon={Flame}
          iconColorClass="text-cosmic-secondary"
        />
        <ResourceCard
          label="Platinum Revenue"
          displayValue={playerProfile.platinum.toString()}
          icon={Gem}
          iconColorClass="text-cosmic-accent"
        />
      </motion.section>

      {/* Canvas */}
      <motion.section
        variants={itemVariants}
        aria-label="Orbital Canvas Telemetry"
      >
        <AsteroidField />
      </motion.section>

      {/* Ship hangar */}
      <motion.section variants={itemVariants} aria-label="Ship Hangar Deck">
        <HangarDashboard />
      </motion.section>

      {/* Refinery terminals */}
      <motion.section variants={itemVariants} aria-label="Refinery Terminals">
        <SpaceportPanel />
      </motion.section>
    </motion.main>
  );
};

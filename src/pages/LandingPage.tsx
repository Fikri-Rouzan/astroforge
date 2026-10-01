import React from "react";
import { motion } from "motion/react";
import { useWeb3 } from "../hooks/useWeb3.js";
import { FeatureShowcase } from "../wrappers/FeatureShowcase.js";
import { ShieldCheck, Orbit } from "lucide-react";

export const LandingPage: React.FC = () => {
  const { connectWallet, isLoading } = useWeb3();

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 w-full max-w-7xl mx-auto"
    >
      <section
        className="w-full text-center my-6 md:my-10 relative flex flex-col items-center"
        aria-labelledby="hero-heading"
      >
        <motion.header
          variants={itemVariants}
          className="max-w-2xl mx-auto mb-8"
        >
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-cosmic-text leading-tight px-2"
          >
            Automated Space Mining,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cosmic-secondary to-cosmic-primary">
              Real Token Yield
            </span>
          </h1>
          <p className="text-sm sm:text-base text-cosmic-muted mt-4 leading-relaxed px-4 font-medium">
            AstroForge lets you command autonomous mining drone fleets, extract
            orbital iron ore in real time, and smelt your yields directly into
            tradeable Web3 tokens.
          </p>
        </motion.header>

        <motion.article
          variants={itemVariants}
          className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl border border-cosmic-border bg-cosmic-station shadow-lg"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-cosmic-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cosmic-primary/20">
            <Orbit className="w-6 h-6 sm:w-7 sm:h-7 text-cosmic-secondary" />
          </div>

          <h2 className="text-lg sm:text-xl font-bold font-heading text-cosmic-text mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-xs sm:text-sm text-cosmic-muted leading-relaxed mb-6">
            Sign in with your Ethereum wallet to access your mining station,
            manage fleet drones, and claim rewards.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              void connectWallet();
            }}
            disabled={isLoading}
            className="w-full font-heading text-xs sm:text-sm tracking-wider bg-cosmic-primary hover:bg-indigo-600 text-white py-3.5 sm:py-4 px-6 rounded-xl font-bold shadow-md disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>CONNECTING...</span>
              </div>
            ) : (
              "CONNECT WALLET"
            )}
          </motion.button>

          <div className="mt-5 flex items-start gap-3 text-left text-xs text-cosmic-muted bg-cosmic-panel p-3.5 rounded-xl border border-cosmic-border">
            <ShieldCheck className="w-4 h-4 text-cosmic-secondary shrink-0 mt-0.5" />
            <p className="leading-snug">
              Secured with SIWE (Sign-In with Ethereum). Your private keys never
              leave your browser.
            </p>
          </div>
        </motion.article>
      </section>

      <FeatureShowcase variants={itemVariants} />
    </motion.main>
  );
};

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { useWeb3 } from "../hooks/useWeb3.js";
import { MobileDrawer } from "../wrappers/MobileDrawer.js";
import { Rocket, LogOut, Sun, Moon, Menu } from "lucide-react";

export const Navbar: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { walletAddress, disconnectWallet } = useWeb3();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const isDark = resolvedTheme === "dark";

  const formatAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="border-b border-cosmic-border bg-cosmic-station/80 backdrop-blur-md sticky top-0 z-40 p-4 w-full">
        <nav
          className="max-w-7xl mx-auto flex justify-between items-center"
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Rocket className="w-6 h-6 text-cosmic-secondary" />
            <span className="text-xl font-bold bg-linear-to-r from-cosmic-text to-cosmic-primary bg-clip-text text-transparent select-none font-heading">
              AstroForge
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-xl border border-cosmic-border hover:bg-cosmic-panel text-cosmic-text cursor-pointer"
              aria-label="Toggle display theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-cosmic-accent" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-900" />
              )}
            </motion.button>

            {walletAddress && (
              <div className="flex items-center gap-2 bg-cosmic-panel pl-4 pr-2 py-1.5 rounded-xl border border-cosmic-border">
                <span className="text-xs font-mono font-bold text-cosmic-text">
                  {formatAddress(walletAddress)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={disconnectWallet}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                  title="Disconnect Wallet"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile drawer trigger */}
          <div className="flex md:hidden items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl border border-cosmic-border text-cosmic-text cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </nav>
      </header>

      <MobileDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        walletAddress={walletAddress}
        onDisconnect={handleDisconnect}
        formatAddress={formatAddress}
      />
    </>
  );
};

import React from "react";
import { useTheme } from "next-themes";
import { X, Sun, Moon, Wallet, LogOut } from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string | null;
  onDisconnect: () => void;
  formatAddress: (address: string) => string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  walletAddress,
  onDisconnect,
  formatAddress,
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <>
      {/* Background backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-cosmic-station border-l border-cosmic-border z-55 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0 shadow-neon-glow" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center pb-6 border-b border-cosmic-border">
            <span className="font-heading text-xs font-bold tracking-widest text-gray-400">
              Command Drawer
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-cosmic-border text-cosmic-text cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <label className="text-[10px] font-heading text-gray-400 tracking-wider">
              System Config
            </label>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-cosmic-border hover:bg-cosmic-panel text-sm cursor-pointer"
            >
              <span className="text-cosmic-text">Display Theme</span>
              {isDark ? (
                <div className="flex items-center gap-1 text-cosmic-accent">
                  <Sun className="w-4 h-4" />{" "}
                  <span className="text-xs">Dark</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-indigo-950">
                  <Moon className="w-4 h-4" />{" "}
                  <span className="text-xs">Light</span>
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-cosmic-border">
          {walletAddress ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-cosmic-panel border border-cosmic-border rounded-xl">
                <Wallet className="w-5 h-5 text-cosmic-secondary shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-[10px] text-gray-400 font-heading block">
                    Node Address
                  </span>
                  <span className="text-xs font-mono font-bold block text-cosmic-text truncate">
                    {formatAddress(walletAddress)}
                  </span>
                </div>
              </div>
              <button
                onClick={onDisconnect}
                className="w-full flex items-center justify-center gap-2 font-heading text-xs tracking-wider bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white py-3 px-4 rounded-xl border border-rose-500/20 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Terminate Session
              </button>
            </div>
          ) : (
            <div className="text-center p-4 bg-cosmic-panel rounded-xl border border-dashed border-cosmic-border">
              <span className="text-xs text-gray-400 font-medium">
                Terminal Offline
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

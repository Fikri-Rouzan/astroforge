import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-cosmic-border bg-cosmic-station/50 py-6 px-4 mt-auto text-center">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cosmic-muted font-medium">
        <p>© {new Date().getFullYear()} AstroForge. All rights reserved.</p>
        <p>Decentralized Space Mining Protocol</p>
      </div>
    </footer>
  );
};

import React from "react";
import { type LucideIcon } from "lucide-react";

interface ResourceCardProps {
  label: string;
  displayValue: string;
  unit?: string;
  icon: LucideIcon;
  iconColorClass: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  label,
  displayValue,
  unit,
  icon: IconComponent,
  iconColorClass,
}) => {
  return (
    <div className="p-5 rounded-2xl border border-cosmic-border bg-cosmic-station shadow-sm flex items-center justify-between">
      <div>
        <span className="text-xs text-gray-400 font-heading tracking-wider block">
          {label}
        </span>
        <span className="text-2xl font-bold font-heading text-cosmic-text mt-1 block">
          {displayValue}{" "}
          {unit && (
            <span className="text-xs text-gray-400 font-mono">{unit}</span>
          )}
        </span>
      </div>
      <div
        className={`p-3 bg-cosmic-panel rounded-xl border border-cosmic-border ${iconColorClass}`}
      >
        <IconComponent className="w-6 h-6" />
      </div>
    </div>
  );
};

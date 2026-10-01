import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { API_CONFIG } from "../config/api.config.js";
import { useWeb3 } from "../hooks/useWeb3.js";
import { useLiveTelemetry } from "../hooks/useLiveTelemetry.js";
import { ShipCard } from "../wrappers/ShipCard.js";
import { Ship, Lock } from "lucide-react";

export const HangarDashboard: React.FC = () => {
  const { playerProfile, authToken, refreshProfile } = useWeb3();
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const { livePendingOre } = useLiveTelemetry(playerProfile);

  if (
    !playerProfile ||
    !playerProfile.ships ||
    playerProfile.ships.length === 0
  ) {
    return null;
  }

  const handleServerResponse = async (res: Response) => {
    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errJson = await res.json();
        throw new Error(
          errJson.error || "Unable to communicate with the station server.",
        );
      }
      const errorText = await res.text();
      throw new Error(errorText || "Server request failed.");
    }
    return await res.json();
  };

  const executeHangarAction = async (
    endpoint: string,
    shipId: number,
    loadingMessage: string,
    successMessage: string,
  ) => {
    if (!authToken) return;
    setActionLoadingId(shipId);
    const loadToast = toast.loading(loadingMessage);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ shipId }),
      });
      await handleServerResponse(response);
      await refreshProfile();
      toast.success(successMessage, { id: loadToast });
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Action failed to execute.";
      toast.error(msg, { id: loadToast });
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-bold font-heading text-cosmic-text flex items-center gap-2">
          <Ship className="w-5 h-5 text-cosmic-secondary" />
          Fleet Hangar
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playerProfile.ships.map((ship) => (
          <ShipCard
            key={ship.id}
            ship={ship}
            livePendingAmount={livePendingOre[ship.id] || 0}
            ironOreBalance={playerProfile.ironOre}
            actionLoadingId={actionLoadingId}
            onLaunch={(id) =>
              executeHangarAction(
                API_CONFIG.endpoints.mining.launch,
                id,
                "Deploying ship to mining sector...",
                "Ship successfully deployed!",
              )
            }
            onClaim={(id) =>
              executeHangarAction(
                API_CONFIG.endpoints.mining.claim,
                id,
                "Transferring cargo to station...",
                "Cargo successfully collected!",
              )
            }
            onUpgrade={(id) =>
              executeHangarAction(
                API_CONFIG.endpoints.spaceport.upgrade,
                id,
                "Upgrading ship modules...",
                "Ship upgraded successfully!",
              )
            }
          />
        ))}

        {playerProfile.ships.length === 1 && (
          <div className="p-6 rounded-2xl border border-dashed border-cosmic-border bg-cosmic-station/40 flex flex-col items-center justify-center text-center min-h-55">
            <div className="w-10 h-10 rounded-xl bg-cosmic-panel border border-cosmic-border flex items-center justify-center mb-3 text-cosmic-muted">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-xs text-cosmic-text uppercase tracking-wider">
              Secondary Docking Bay
            </h3>
            <p className="text-[11px] text-cosmic-muted mt-1 max-w-xs font-medium">
              Reserve slot ready for future fleet expansion.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

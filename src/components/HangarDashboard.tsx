import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { API_CONFIG } from "../config/api.config.js";
import { useWeb3 } from "../hooks/useWeb3.js";
import { useLiveTelemetry } from "../hooks/useLiveTelemetry.js";
import { ShipCard } from "../wrappers/ShipCard.js";
import { Ship } from "lucide-react";

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
          errJson.error || "Planetary terminal communication breakdown.",
        );
      }
      const errorText = await res.text();
      throw new Error(errorText || "Quantum request rejected by refinery.");
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
        error instanceof Error ? error.message : "Execution system breakdown.";
      toast.error(msg, { id: loadToast });
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold font-heading text-cosmic-text flex items-center gap-2">
          <Ship className="w-5 h-5 text-cosmic-secondary" />
          Fleet Hangar Bay
        </h3>
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
                "Initiating warp drive...",
                "Spaceship launched successfully!",
              )
            }
            onClaim={(id) =>
              executeHangarAction(
                API_CONFIG.endpoints.mining.claim,
                id,
                "Transferring cargo...",
                "Resource cargo safely secured!",
              )
            }
            onUpgrade={(id) =>
              executeHangarAction(
                API_CONFIG.endpoints.spaceport.upgrade,
                id,
                "Overhauling mechanics...",
                "Hardware modules upgraded!",
              )
            }
          />
        ))}
      </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { MapPin, Navigation, Wifi, WifiOff } from "lucide-react";

import TrackingMap from "../../components/tracking/TrackingMap";

import {
  connectSocket,
  disconnectSocket,
  joinTracking,
  onLocationUpdate,
  removeLocationUpdateListener,
} from "../../services/socketService.js";
import { useParams } from "react-router-dom";

const LiveTracking = () => {
  const { orderId } = useParams();
  const [riderLocation, setRiderLocation] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    const socket = connectSocket();

    const handleConnect = () => {
      setIsConnected(true);

      joinTracking(orderId);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleLocationUpdate = (location) => {
      console.log("Rider location received:", location);

      setRiderLocation(location);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    onLocationUpdate(handleLocationUpdate);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);

      removeLocationUpdateListener(handleLocationUpdate);

      disconnectSocket();
    };
  }, [orderId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Live Order Tracking
        </h1>

        <p className="mt-1 text-gray-500">
          Track your delivery rider in real time.
        </p>
      </div>

      {/* Connection Status */}
      <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-orange-100 p-3">
            <Navigation className="h-5 w-5 text-orange-600" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Delivery Status</h3>

            <div className="mt-1 flex items-center gap-2 text-sm">
              {isConnected ? (
                <>
                  <Wifi className="h-4 w-4 text-green-600" />

                  <span className="text-green-600">
                    Live tracking connected
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 text-red-500" />

                  <span className="text-red-500">Connecting...</span>
                </>
              )}
            </div>
          </div>
        </div>

        {riderLocation && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            Rider location updated
          </div>
        )}
      </div>

      {/* Map */}
      <TrackingMap riderLocation={riderLocation} />
    </div>
  );
};

export default LiveTracking;

import { useEffect, useState } from "react";
import { MapPin, Navigation, Wifi, WifiOff } from "lucide-react";

import {
  connectSocket,
  disconnectSocket,
  joinTracking,
  sendRiderLocation,
} from "../../services/socketService";

const RiderLocationTracker = ({ orderId }) => {
  const [location, setLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;

    // Connect Socket.IO
    connectSocket();

    // Join order tracking room
    joinTracking(orderId);

    // Check browser GPS support
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    // Start watching rider location
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const newLocation = {
          latitude,
          longitude,
        };

        setLocation(newLocation);
        setIsTracking(true);
        setError("");

        // Send location to Socket.IO server
        sendRiderLocation({
          orderId,
          latitude,
          longitude,
        });
      },
      (err) => {
        console.log("GPS Error:", err);

        setIsTracking(false);

        if (err.code === 1) {
          setError("Location permission denied. Please allow location access.");
        } else if (err.code === 2) {
          setError("Unable to detect your current location.");
        } else {
          setError("Unable to access your location.");
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      },
    );

    // Cleanup
    return () => {
      navigator.geolocation.clearWatch(watchId);
      disconnectSocket();
    };
  }, [orderId]);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-100 p-3">
            <Navigation className="text-orange-500" />
          </div>

          <div>
            <h3 className="font-bold text-lg">Live Location Tracking</h3>

            <p className="text-sm text-gray-500">
              Your location is being shared with the customer.
            </p>
          </div>
        </div>

        {/* Connection Status */}
        {isTracking ? (
          <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <Wifi size={16} />
            Live
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            <WifiOff size={16} />
            Offline
          </div>
        )}
      </div>

      {/* Location */}
      {location && (
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-gray-50 p-4">
          <MapPin className="text-orange-500" />

          <div>
            <p className="text-sm font-semibold">Current Location</p>

            <p className="text-sm text-gray-500">
              Latitude: {location.latitude.toFixed(6)}
            </p>

            <p className="text-sm text-gray-500">
              Longitude: {location.longitude.toFixed(6)}
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Waiting */}
      {!location && !error && (
        <div className="mt-5 rounded-xl bg-orange-50 p-4 text-sm text-orange-600">
          Waiting for your current location...
        </div>
      )}
    </div>
  );
};

export default RiderLocationTracker;

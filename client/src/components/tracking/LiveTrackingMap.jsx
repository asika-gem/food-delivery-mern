import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L from "leaflet";

import {
  connectSocket,
  joinTracking,
  onLocationUpdate,
  removeLocationUpdateListener,
} from "../../services/socketService";

import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon
const riderIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Automatically move map when rider moves
const MapUpdater = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([location.latitude, location.longitude], 16);
    }
  }, [location, map]);

  return null;
};

const LiveTrackingMap = ({ orderId }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const socket = connectSocket();

    // Join order tracking room
    joinTracking(orderId);

    // Receive rider location
    const handleLocationUpdate = (newLocation) => {
      console.log("Customer received location:", newLocation);

      setLocation(newLocation);
    };

    onLocationUpdate(handleLocationUpdate);

    return () => {
      removeLocationUpdateListener(handleLocationUpdate);
    };
  }, [orderId]);

  if (!location) {
    return (
      <div className="mt-6 flex h-[400px] items-center justify-center rounded-2xl bg-gray-100">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />

          <p className="mt-4 font-semibold text-gray-600">
            Waiting for rider location...
          </p>

          <p className="mt-1 text-sm text-gray-400">
            The rider must enable live location.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl shadow-lg">
      <div className="border-b bg-white p-4">
        <h3 className="text-xl font-bold text-gray-800">Live Rider Tracking</h3>

        <p className="mt-1 text-sm text-green-600">
          ● Rider location is updating live
        </p>
      </div>

      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={16}
        scrollWheelZoom={true}
        className="h-[450px] w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater location={location} />

        <Marker
          position={[location.latitude, location.longitude]}
          icon={riderIcon}
        >
          <Popup>
            <div className="text-center">
              <strong>Rider Location</strong>
              <br />
              Live location
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LiveTrackingMap;

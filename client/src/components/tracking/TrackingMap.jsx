import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import riderIconImage from "../../assets/rider-marker.png";

// Rider marker icon
const riderIcon = new L.Icon({
  iconUrl: riderIconImage,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Automatically move map when rider location changes
const MapUpdater = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [position, map]);

  return null;
};

const TrackingMap = ({ riderLocation }) => {
  if (!riderLocation) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-xl bg-gray-100">
        <p className="text-gray-500">Waiting for rider location...</p>
      </div>
    );
  }

  const position = [riderLocation.latitude, riderLocation.longitude];

  return (
    <div className="overflow-hidden rounded-xl shadow-lg">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        className="h-[500px] w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater position={position} />

        <Marker position={position} icon={riderIcon}>
          <Popup>
            <div className="text-center">
              <strong>Rider is here</strong>
              <br />
              Your order is on the way.
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default TrackingMap;

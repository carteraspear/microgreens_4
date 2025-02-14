import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to the marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

const Maps: React.FC = () => {
  // Default coordinates (e.g., New York City)
  const defaultPosition: L.LatLngExpression = [40.7128, -74.006];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Add a tile layer (map style) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Add a marker with a popup */}
        <Marker position={defaultPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;
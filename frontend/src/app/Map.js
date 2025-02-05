"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

export default function Map({ coordsA, coordsB }) {
  useEffect(() => {
    // Initialize marker icon after component mounts
    const markerIcon = L.icon({
      iconUrl: "/marker-icon.png",
      iconRetinaUrl: "/marker-icon-2x.png",
      shadowUrl: "/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = markerIcon;
  }, []);

  return (
    <MapContainer
      center={coordsA}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coordsA} />
      <Marker position={coordsB} />
      <Polyline positions={[coordsA, coordsB]} color="blue" />
    </MapContainer>
  );
}

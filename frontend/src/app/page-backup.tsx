"use client"; // Ensures this is a Client Component

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import L from "leaflet";

// Dynamically import react-leaflet components to prevent SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

// Fix marker icon issue
const markerIcon = L.icon({
  iconUrl: "/marker-icon.png", // Ensure this file exists in `public/`
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41], // Default Leaflet icon size
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function DistanceCalculator() {
  const [locationA, setLocationA] = useState("");
  const [locationB, setLocationB] = useState("");
  const [distance, setDistance] = useState<number | null>(null);
  const [coordsA, setCoordsA] = useState<[number, number] | null>(null);
  const [coordsB, setCoordsB] = useState<[number, number] | null>(null);

  const calculateDistance = async () => {
    const response = await fetch("http://localhost:8000/distance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locationA, locationB }),
    });

    const data = await response.json();
    setDistance(data.distance);
    setCoordsA(data.coordsA);
    setCoordsB(data.coordsB);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          <Input
            placeholder="Enter first location"
            value={locationA}
            onChange={(e) => setLocationA(e.target.value)}
          />
          <Input
            placeholder="Enter second location"
            value={locationB}
            onChange={(e) => setLocationB(e.target.value)}
          />
          <Button onClick={calculateDistance}>Calculate Distance</Button>
          {distance !== null && (
            <p className="text-lg font-bold">Distance: {distance} km</p>
          )}
        </CardContent>
      </Card>

      {/* Map Section */}
      {coordsA && coordsB && (
        <div className="mt-6">
          <MapContainer
            center={coordsA}
            zoom={5}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coordsA} icon={markerIcon} />
            <Marker position={coordsB} icon={markerIcon} />
            <Polyline positions={[coordsA, coordsB]} color="blue" />
          </MapContainer>
        </div>
      )}
    </div>
  );
}


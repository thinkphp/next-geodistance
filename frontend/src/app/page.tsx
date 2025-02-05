"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Create a client-side only Map component
const Map = dynamic(
  () => import("./Map"),
  { ssr: false }
);

export default function DistanceCalculator() {
  const [locationA, setLocationA] = useState("");
  const [locationB, setLocationB] = useState("");
  const [distance, setDistance] = useState(null);
  const [coordsA, setCoordsA] = useState(null);
  const [coordsB, setCoordsB] = useState(null);

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
<h1 className="text-4xl font-extrabold text-center text-blue-600 mt-8 mb-4">
Next Geodistance
</h1>
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
      {coordsA && coordsB && (
        <div className="mt-6">
          <Map coordsA={coordsA} coordsB={coordsB} />
        </div>
      )}
      
      
      <p className="text-2l font-extrabold text-center text-green-200 mt-8 mb-4">
&copy; 2025 Adrian Statescu
</p>

    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SpotDetails() {
  // ✅ Get spot ID from route (ex: /spots/123)
  const { id } = useParams();

  // ✅ State for single spot
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch single spot details
  useEffect(() => {
    setLoading(true);
    fetch(`https://adventure-server-ten.vercel.app/spots/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpot(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // ✅ Show loader
  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!spot) return <p className="text-center py-10">Spot not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* ✅ Spot Image */}
      <img
        src={spot.image}
        alt={spot.tourists_spot_name}
        className="w-full h-96 object-cover rounded-lg shadow-lg"
      />

      {/* ✅ Spot Details */}
      <h1 className="text-4xl font-bold mt-6">{spot.tourists_spot_name}</h1>
      <p className="text-lg text-gray-600 mt-2">
        {spot.country_Name} - {spot.location}
      </p>
      <p className="mt-4">{spot.short_description}</p>
      <p className="mt-2 font-medium">💰 Avg. Cost: {spot.average_cost}</p>
      <p className="text-gray-500">🌤 Season: {spot.seasonality}</p>
    </div>
  );
}

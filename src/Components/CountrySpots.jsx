import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Country() {
  const { countryName } = useParams(); // dynamic param
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  //Helper to limit to ~20 words
  const truncateDescription = (text, wordLimit = 20) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  useEffect(() => {
    fetch(`http://localhost:5000/spots/country/${countryName}`)
      .then((res) => res.json())
      .then((data) => {
        setSpots(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [countryName]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!spots.length) return <p className="text-center py-10">No spots found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-10 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Tourist Spots in {countryName}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spots.map((spot) => (
          <div key={spot._id} className="border rounded-lg overflow-hidden shadow-lg">
            <img
              src={spot.image}
              alt={spot.tourists_spot_name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{spot.tourists_spot_name}</h2>
              <p className="text-gray-500">
                {spot.country_Name} - {spot.location}
              </p>
              {/*  Truncated description */}
              <p className="mt-2">{truncateDescription(spot.short_description, 20)}</p>
              <p className="mt-2 font-medium">💰 Avg. Cost: {spot.average_cost}</p>
              <p className="text-gray-500">🌤 Season: {spot.seasonality}</p>
              <Link
                to={`/spots/${spot._id}`}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

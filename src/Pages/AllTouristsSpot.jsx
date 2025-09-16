import { useState, useEffect } from "react";
import SpotCard from "../Components/SpotCard";

const AllTouristsSpot = ({ allSpot = [] }) => {
  // ✅ Local state for sorting
  const [sortedSpots, setSortedSpots] = useState([...allSpot]);
  const [sortOrder, setSortOrder] = useState("default");

  // ✅ Re-sort whenever sortOrder or allSpot changes
  useEffect(() => {
    if (!Array.isArray(allSpot)) return;

    let sorted = [...allSpot];

    if (sortOrder === "asc") {
      // Sort from low → high
      sorted.sort((a, b) => a.average_cost - b.average_cost);
    } else if (sortOrder === "desc") {
      // Sort from high → low
      sorted.sort((a, b) => b.average_cost - a.average_cost);
    }

    setSortedSpots(sorted);
  }, [sortOrder, allSpot]);

  // ✅ Handle dropdown change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-blue-50 shadow-md rounded-xl mt-5">
      <h1 className="text-4xl font-bold text-center mb-6">All Tourist Spot</h1>

      {/* Sort Dropdown */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-2 md:gap-4">
        <label className="font-medium text-center md:text-left text-sm md:text-base">
          Sort by Cost:
        </label>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-gray-300 rounded px-2 py-1 text-xs md:text-base w-32 md:w-auto"
        >
          <option className="text-xs md:text-base" value="default">
            Default
          </option>
          <option className="text-xs md:text-base" value="asc">
            Low to High
          </option>
          <option className="text-xs md:text-base" value="desc">
            High to Low
          </option>
        </select>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.isArray(sortedSpots) && sortedSpots.length > 0 ? (
          sortedSpots.map((spot) => <SpotCard key={spot._id} spot={spot} />)
        ) : (
          <p className="text-center col-span-3 text-gray-600">
            No tourist spots available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllTouristsSpot;

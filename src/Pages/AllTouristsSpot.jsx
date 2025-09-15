import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import SpotCard from "../Components/SpotCard";

const AllTouristsSpot = () => {
  const allSpot = useLoaderData();

  // State for sorted spots
  const [sortedSpots, setSortedSpots] = useState([...allSpot]);
  const [sortOrder, setSortOrder] = useState("default");

  // Sort spots whenever sortOrder changes
  useEffect(() => {
    let sorted = [...allSpot];

    if (sortOrder === "asc") {
      sorted.sort((a, b) => a.average_cost - b.average_cost);
    } else if (sortOrder === "desc") {
      sorted.sort((a, b) => b.average_cost - a.average_cost);
    }

    setSortedSpots(sorted);
  }, [sortOrder, allSpot]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-blue-50 shadow-md rounded-xl mt-15">
      
    {/* Sort Dropdown */}
<div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-2">
  <label className="font-medium">Sort by Cost :</label>
  <select
    value={sortOrder}
    onChange={handleSortChange}
    className="border border-gray-300 rounded px-3 py-1"
  >
    <option value="default">Default</option>
    <option value="asc">Low to High</option>
    <option value="desc">High to Low</option>
  </select>
</div>


      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedSpots.map((spot) => (
          <SpotCard key={spot._id} spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default AllTouristsSpot;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SpotCard from "../Components/SpotCard";
import { JackInTheBox } from "react-awesome-reveal";

const AllTouristsSpot = ({ allSpot = [] }) => {
  const [sortedSpots, setSortedSpots] = useState([...allSpot]);
  const [sortOrder, setSortOrder] = useState("default");

  // ✅ Number of cards to show
  const [visibleCount, setVisibleCount] = useState(6);

  // ✅ Re-sort whenever sortOrder or allSpot changes
  useEffect(() => {
    if (!Array.isArray(allSpot)) return;

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
    setVisibleCount(6); // Reset visible count on sort
  };

  // ✅ Show more button handler
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-transparent shadow-md rounded-xl mt-5 my-40">
      <JackInTheBox triggerOnce duration={1200}>
        <h1 className="text-4xl font-bold text-center mb-6">
          All Tourist Spot
        </h1>
      </JackInTheBox>

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
          sortedSpots.slice(0, visibleCount).map((spot) => (
            <motion.div
              key={spot._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-full"
            >
              <SpotCard spot={spot} />
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">
            No tourist spots available.
          </p>
        )}
      </div>

      {/* Show More Button */}
      {visibleCount < sortedSpots.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTouristsSpot;

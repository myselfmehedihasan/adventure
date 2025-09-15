import React from "react";
import { Link } from "react-router-dom";
import { DollarSign, Users, Clock, Calendar, Eye } from "lucide-react";

const SpotCard = ({ spot }) => {
  // Return null if spot data is not provided
  if (!spot) return null;

  // Function to format average cost into USD currency
  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Function to format visitor count (e.g., 1.2M or 15K)
  const formatVisitors = (count) => {
    if (!count) return "N/A";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={spot.image} // Tourist spot image
          alt={spot.tourists_spot_name} // Alt text
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Average cost badge */}
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-semibold text-gray-800">
            {formatCurrency(spot.average_cost)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        
        {/* Spot Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
          {spot.tourists_spot_name}
        </h3>

        {/* Spot Details */}
        <div className="space-y-2 mb-4">
          {/* Average Cost */}
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 text-green-600" />
            <span>Avg Cost: {formatCurrency(spot.average_cost)}</span>
          </div>

          {/* Total Visitors per Year */}
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2 text-blue-600" />
            <span>{formatVisitors(spot.totaVisitorsPerYear)} visitors/year</span>
          </div>

          {/* Travel Time */}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-orange-600" />
            <span>{spot.travel_time || "N/A"}</span>
          </div>

          {/* Seasonality */}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-purple-600" />
            <span className="line-clamp-1">{spot.seasonality || "N/A"}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/spots/${spot._id}`} // Redirects to spot detail page
          className="w-full  bg-black/50 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-105"
        >
          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SpotCard;

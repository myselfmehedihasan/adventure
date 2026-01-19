import React, { useEffect, useState } from "react";
import { MapPin, Clock, Calendar, DollarSign, Users, Star } from "lucide-react";
import { useParams } from "react-router";

const SpotDetails = () => {
  // ✅ Get the ID from URL parameters
  const { id } = useParams();

  // ✅ State to store spot data and loading status
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------------------- Utility Functions --------------------
  // Format cost into USD currency
  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format visitor count (e.g., 1.2M, 15K)
  const formatVisitors = (count) => {
    if (!count) return "N/A";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  // -------------------- Fetch Spot Data --------------------
  useEffect(() => {
    fetch(`https://adventure-server-ten.vercel.app/spots/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpot(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // -------------------- Loading & Error States --------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Discovering amazing places...</p>
        </div>
      </div>
    );
  }

  if (!spot) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🏔️</div>
          <p className="text-2xl text-gray-600">
            Oops! This destination seems to be off the map
          </p>
          <p className="text-gray-500 mt-2">
            The spot you're looking for wasn't found
          </p>
        </div>
      </div>
    );
  }

  // -------------------- Info Cards Data --------------------
  const infoCards = [
    {
      icon: DollarSign,
      label: "Average Cost",
      value: formatCurrency(spot.average_cost), // ✅ formatted currency
      color: "from-green-400 to-emerald-600",
    },
    {
      icon: Users,
      label: "Annual Visitors",
      value: formatVisitors(spot.totaVisitorsPerYear), // ✅ formatted visitors
      color: "from-blue-400 to-cyan-600",
    },
    {
      icon: Clock,
      label: "Travel Time",
      value: `${spot.travel_time} days`,
      color: "from-purple-400 to-indigo-600",
    },
    {
      icon: Calendar,
      label: "Best Season",
      value: spot.seasonality,
      color: "from-orange-400 to-red-600",
    },
  ];

  // -------------------- JSX --------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img
          src={spot.image}
          alt={spot.tourists_spot_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent "></div>

        {/* Floating Title Card */}
        <div className="absolute  md:bottom-8 top-30 w-90 p-4 rounded-lg">


          <div className="backdrop-blur-sm rounded-lg p-2 shadow-sm">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 text-yellow-500 fill-current"
                />
              ))}
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-white mb-1">
              {spot.tourists_spot_name}
            </h1>
            <div className="flex items-center text-gray-200 text-sm md:text-base">
              <MapPin className="w-6 h-6 mr-1" />
              <span>
                {spot.location}, {spot.country_Name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-16 md:-mt-20 relative z-10">
        {/* Info Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-6 md:mb-8 ">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="group bg-white rounded-md md:rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col items-center text-center"
            >
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-md bg-gradient-to-r ${card.color} flex items-center justify-center mb-1 md:mb-2 group-hover:scale-105 transition-transform duration-300`}
              >
                <card.icon className="w-2.5 md:w-3 h-2.5 md:h-3 text-white" />
              </div>
              <p className="text-sm md:text-base text-gray-500 uppercase tracking-wide font-medium mb-0.5">
                {card.label}
              </p>
              <p className="text-sm md:text-base font-bold text-gray-900">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div
            className="p-6 md:p-8"
            style={{ background: "linear-gradient(to right, #141E30, #35577D)" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
              About This Destination
            </h2>
            <p className="text-gray-200 text-sm md:text-base">
              Discover what makes this place special
            </p>
          </div>

          <div className="p-4 md:p-8">
            <div className="prose prose-sm md:prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {spot.short_description ||
                  spot.description ||
                  "A beautiful destination waiting to be explored."}
              </p>
            </div>

            {/* Additional Features */}
            <div className="mt-4 md:mt-8 flex flex-wrap gap-2 md:gap-3">
              <span className="px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-xs md:text-sm font-medium">
                🌟 Top Rated
              </span>
              <span className="px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full text-xs md:text-sm font-medium">
                🌿 Nature Friendly
              </span>
              <span className="px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 rounded-full text-xs md:text-sm font-medium">
                📸 Instagram Worthy
              </span>
              <span className="px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 rounded-full text-xs md:text-sm font-medium">
                🏃‍♂️ Adventure Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;

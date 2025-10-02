"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StoryCard = ({ story }) => {
  return (
    <Link to={`/country/${story.country_Name}`}>
      <motion.div className="relative w-72 h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-xl group">
        <img
          src={story.image}
          alt={story.country_Name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
          <h3 className="font-bold text-2xl tracking-wide">{story.country_Name}</h3>
          <p className="text-sm text-gray-200 mt-2 line-clamp-3">
            {story.short_description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default StoryCard;

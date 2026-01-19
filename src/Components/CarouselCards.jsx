"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import StoryCard from "./StoryCard";

export default function CarouselCards() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [dragConstraint, setDragConstraint] = useState(0);
  const [countries, setCountries] = useState([]);

  // ✅ Fetch countries from backend
  useEffect(() => {
    fetch("https://adventure-server-ten.vercel.app/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // ✅ Calculate drag constraints
  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        setDragConstraint(containerWidth - trackWidth);
      }
    };
    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, [countries]);

  return (
    <div className="font-sans w-full py-12 md:py-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            Explore Countries
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Drag to journey through amazing places.
          </p>
        </header>

        <motion.div
          ref={containerRef}
          className="overflow-hidden cursor-grab"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            ref={trackRef}
            className="flex space-x-6 pb-6 px-4"
            drag="x"
            dragConstraints={{ right: 0, left: dragConstraint - 32 }}
            dragElastic={0.15}
          >
            {countries.map((country) => (
              <StoryCard key={country._id} story={country} />
            ))}
          </motion.div>
        </motion.div>

       
      </div>
    </div>
  );
}

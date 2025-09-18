import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const State = () => {
  return (
    <section className="relative">
      <div className="stats shadow-lg w-full mx-auto bg-[url('/src/assets/Slider/slider1.jpg')] bg-cover bg-center bg-no-repeat py-16 sm:py-20 p-4 sm:p-6 mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

      {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/20"></div>
        
        {/* Total Destinations */}
        <motion.div
          className="stat text-center sm:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="stat-figure text-white mb-2">
            <svg className="inline-block h-8 w-8 sm:h-10 sm:w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L2 7l10 5 10-5-10-5zm0 13l10-5v10l-10 5-10-5V10l10 5z" />
            </svg>
          </div>
          <div className="stat-title text-lg sm:text-xl font-semibold">Total Destinations</div>
          <div className="stat-value text-white text-2xl sm:text-3xl font-bold">
            <CountUp end={120} duration={2} />+
          </div>
          <div className="stat-desc text-sm sm:text-lg">Explore across 6 countries</div>
        </motion.div>

        {/* Happy Travelers */}
        <motion.div
          className="stat text-center sm:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="stat-figure text-green-500 mb-2">
            <svg className="inline-block h-8 w-8 sm:h-10 sm:w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="stat-title text-lg sm:text-xl font-semibold">Happy Travelers</div>
          <div className="stat-value text-green-400 text-2xl sm:text-3xl font-bold">
            <CountUp end={15000} duration={2} separator="," />+
          </div>
          <div className="stat-desc text-sm sm:text-lg">Loved our tours this year</div>
        </motion.div>

        {/* Positive Reviews */}
        <motion.div
          className="stat text-center sm:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="stat-figure text-white mb-2">
            <svg className="inline-block h-8 w-8 sm:h-10 sm:w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17l-5 3 2-6-5-4h6l2-6 2 6h6l-5 4 2 6-5-3z" />
            </svg>
          </div>
          <div className="stat-title text-green-500 text-lg sm:text-xl font-semibold">Positive Reviews</div>
          <div className="stat-value text-white text-2xl sm:text-3xl font-bold">
            <CountUp end={4.9} decimals={1} duration={2} />/5
          </div>
          <div className="stat-desc text-sm sm:text-lg">Based on 3.5K reviews</div>
        </motion.div>

        {/* Tours Completed */}
        <motion.div
          className="stat text-center sm:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="stat-figure text-green-300 mb-2">
            <svg className="inline-block h-8 w-8 sm:h-10 sm:w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6h6v6m2 0a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a4 4 0 00-8 0v1H7a2 2 0 00-2 2v5a2 2 0 002 2h10z" />
            </svg>
          </div>
          <div className="stat-title text-white text-lg sm:text-xl font-semibold">Tours Completed</div>
          <div className="stat-value text-green-300 text-2xl sm:text-3xl font-bold">
            <CountUp end={850} duration={2} />+
          </div>
          <div className="stat-desc text-sm sm:text-lg">Successful adventures worldwide</div>
        </motion.div>

      </div>
    </section>
  );
};

export default State;

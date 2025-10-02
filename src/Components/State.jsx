import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const State = () => {
  return (
    <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800 max-w-7xl mx-auto">
      <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
        
        {/* Total Destinations */}
        <motion.div
          className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-black/60">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-9 w-9 dark:text-gray-100" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 13l10-5v10l-10 5-10-5V10l10 5z" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-3xl font-semibold leading-none">
              <CountUp end={120} duration={2} />+
            </p>
            <p className="capitalize">Total Destinations</p>
          </div>
        </motion.div>

        {/* Happy Travelers */}
        <motion.div
          className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-black/60">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-9 w-9 dark:text-gray-100" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-3xl font-semibold leading-none text-green-500">
              <CountUp end={15000} duration={2} separator="," />+
            </p>
            <p className="capitalize">Happy Travelers</p>
          </div>
        </motion.div>

        {/* Positive Reviews */}
        <motion.div
          className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-black/60">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-9 w-9 dark:text-gray-100" viewBox="0 0 24 24">
              <path d="M12 17l-5 3 2-6-5-4h6l2-6 2 6h6l-5 4 2 6-5-3z" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-3xl font-semibold leading-none">
              <CountUp end={4.9} decimals={1} duration={2} />/5
            </p>
            <p className="capitalize">Positive Reviews</p>
          </div>
        </motion.div>

        {/* Tours Completed */}
        <motion.div
          className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-black/60">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-9 w-9 dark:text-gray-100" viewBox="0 0 24 24">
              <path d="M9 17v-6h6v6m2 0a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a4 4 0 00-8 0v1H7a2 2 0 00-2 2v5a2 2 0 002 2h10z" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-3xl font-semibold leading-none text-green-400">
              <CountUp end={850} duration={2} />+
            </p>
            <p className="capitalize">Tours Completed</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default State;

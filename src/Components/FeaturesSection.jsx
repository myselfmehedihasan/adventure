import React from "react";
import { Zap, ShieldCheck, Globe, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-blue-500" />,
    title: "Fast Booking",
    desc: "Book your adventure spots instantly with our seamless system.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
    title: "Secure Payments",
    desc: "All transactions are encrypted and fully secure for peace of mind.",
  },
  {
    icon: <Globe className="w-8 h-8 text-yellow-500" />,
    title: "Worldwide Destinations",
    desc: "Explore amazing tourist spots across multiple countries easily.",
  },
  {
    icon: <Heart className="w-8 h-8 text-pink-500" />,
    title: "Customer Satisfaction",
    desc: "We prioritize your experience and ensure every trip is memorable.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-10 bg-black/20 my-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Some Features that Made us Unique
        </h2>
        <p className="text-gray-600  mb-12">
          Discover what makes our travel platform stand out from the rest.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

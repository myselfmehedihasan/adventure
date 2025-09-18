import React from "react";
import { useLoaderData } from "react-router-dom";
import SimpleSlider from "../Components/SimpleSlider";
import AllTouristsSpot from "./AllTouristsSpot";
import { motion, useScroll } from "motion/react";
import State from "../Components/State";
import ContactForm from "../Components/ContactForm";
import Faq from "../Components/Faq";
import FeaturesSection from "../Components/FeaturesSection";

const Home = () => {
  const allSpot = useLoaderData();
  const { scrollYProgress } = useScroll(); // tracks scroll progress

  return (
    <>
      {/* Scroll indicator */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          originX: 0,
          backgroundColor: "#3B82F6",
          zIndex: 50,
        }}
      />

      <div>
        {/* Home Section */}
        <section id="home">
          <SimpleSlider />
        </section>

        {/* All Tourist Spot Section */}
        <section id="all-tourist-spot" className="pt-24 -mt-24">
          <AllTouristsSpot allSpot={allSpot} />
        </section>

        {/* Example Extra Section */}
        <FeaturesSection></FeaturesSection>

        {/* FAQ Section */}
       <Faq></Faq>

        {/* stat section */}

        <State></State>
        {/* Contact */}

        <ContactForm></ContactForm>
      </div>
    </>
  );
};

export default Home;

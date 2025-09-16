import React from "react";
import { useLoaderData } from "react-router-dom";
import SimpleSlider from "../Components/SimpleSlider";
import Banner from "../Components/Banner";
import AllTouristsSpot from "./AllTouristsSpot";

const Home = () => {
  // ✅ Loader provides tourist spots
  const allSpot = useLoaderData();

  return (
    <div>
      {/* Home Section */}
      <section id="home">
        <SimpleSlider />
        
      </section>

      {/* All Tourist Spot Section */}
      <section id="all-tourist-spot" className="pt-24 -mt-24">
        <AllTouristsSpot allSpot={allSpot} />
      </section>

      
    </div>
  );
};

export default Home;

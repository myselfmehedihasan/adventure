import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer";
import AnimatedCursor from "react-animated-cursor";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black/10">
      <AnimatedCursor
        innerSize={8}
        outerSize={25} // slightly smaller
        innerScale={1}
        outerScale={1.5} // reduce stretching
        outerAlpha={0.6} // optional: make outer visible
        trailingSpeed={0.5} // default is 0.2, increase to 0.3~0.5 for faster
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "var(--cursor-color)",
        }}
        outerStyle={{
          border: "2px solid var(--cursor-color)",
        }}
      />

      {/* Navbar always at top */}
      <Navbar />
      <ScrollToTop />

      {/* Main content grows to fill remaining space */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default App;

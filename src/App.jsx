import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Pattern from "./Components/Pattern";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  // Animate the browser tab title
  useEffect(() => {
    const titles = ["Adventure", "Explore", "Travel"];
    let i = 0;
    const interval = setInterval(() => {
      document.title = titles[i];
      i = (i + 1) % titles.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background pattern stays fixed */}
      <div className="absolute w-full inset-0 -z-10">
        <Pattern />
      </div>

      {/* ScrollToTop ensures page starts at top on route change */}
      <ScrollToTop />

      {/* Foreground layout */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;

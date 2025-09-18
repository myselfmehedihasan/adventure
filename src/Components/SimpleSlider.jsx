import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Typewriter } from "react-simple-typewriter"; // ✅ import here
import { JackInTheBox } from "react-awesome-reveal"; // ✅ import at the top

import slider1 from "../assets/Slider/slider1.jpg";
import slider2 from "../assets/Slider/slider2.jpg";
import slider3 from "../assets/Slider/slider3.jpg";
import { CursorifyProvider } from "@cursorify/react";

const SimpleSlider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDiscoverClick = (e) => {
    if (isHome) {
      e.preventDefault();
      scrollToSection("all-tourist-spot");
    } else {
      e.preventDefault();
      navigate("/");
      setTimeout(() => scrollToSection("all-tourist-spot"), 200);
    }
  };

  const slides = [
    {
      image: slider1,
      title: "Explore the Mountains",
      subtitle: "Adventure awaits you",
      description:
        "Embark on a breathtaking journey through towering peaks, fresh alpine air, and scenic trails that promise unforgettable memories in nature’s embrace.",
    },
    {
      image: slider2,
      title: "Discover the City",
      subtitle: "Urban vibes",
      description:
        "Enjoy the serene beauty of sandy beaches and crystal-clear waters.",
    },
    {
      image: slider3,
      title: "Relax at the Beach",
      subtitle: "Feel the sunshine",
      description:
        "Experience the bustling city life and vibrant cultural spots.",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="slider-container">
      
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative min-h-screen hero overflow-hidden touch-pan-y"
          >
            {/* Slide image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-screen object-cover"
            />

            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Dynamic text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              {/* React Awesome Reveal */}
              <JackInTheBox triggerOnce>
                <p className="text-lg mb-2">{slide.subtitle}</p>
              </JackInTheBox>

              {/* ✅ Typewriter Effect on Title */}
              <h1 className="text-5xl font-bold mb-4">
                <Typewriter
                  words={[
                    slide.title,
                    "Adventure Awaits",
                    "Unforgettable Journeys",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </h1>

              <p className="text-xl mb-6">{slide.description}</p>
              <button
                className="btn bg-white hover:bg-transparent hover:text-white rounded-2xl px-8"
                onClick={handleDiscoverClick}
              >
                DISCOVER NOW
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;

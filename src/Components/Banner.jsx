import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import slider1 from "../assets/Slider/slider1.jpg";
import slider2 from "../assets/Slider/slider2.jpg";
import slider3 from "../assets/Slider/slider3.jpg";

const Banner = () => {
  // Each slide now has image + title + subtitle + description
  const slides = [
    {
      image: slider1,
      title: "Explore the Mountains",
      subtitle: "Adventure awaits you",
      description:
        "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.",
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

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentSlide((prev) => (prev + 1) % slides.length),
    onSwipedRight: () =>
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="relative hero min-h-screen overflow-hidden touch-pan-y"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img src={slide.image} className="w-full h-full object-cover" />
          {/* Blackish overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Dynamic Hero content */}
      <div className="hero-content text-center text-white relative z-20">
        <div className="max-w-md">
          <p className="text-lg mb-2">{slides[currentSlide].subtitle}</p>
          <h1 className="mb-5 text-5xl font-bold">{slides[currentSlide].title}</h1>
          <p className="mb-5 text-xl">{slides[currentSlide].description}</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

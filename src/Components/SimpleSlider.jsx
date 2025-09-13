import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import slider1 from "../assets/Slider/slider1.jpg";
import slider2 from "../assets/Slider/slider2.jpg";
import slider3 from "../assets/Slider/slider3.jpg";

const SimpleSlider = () => {
  // Slides data
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

  // react-slick settings
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // optional: hides arrows
  };

  return (
    <div className="slider-container   ">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative min-h-screen hero  overflow-hidden touch-pan-y">
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
              <p className="text-lg mb-2">{slide.subtitle}</p>
              <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-xl mb-6">{slide.description}</p>
              <button className="btn bg-white hover:bg-transparent hover:text-white rounded-2xl px-8">DISCOVER NOW</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;

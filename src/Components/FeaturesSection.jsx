import React, { useEffect, useRef, useState } from "react";
import { Zap, ShieldCheck, Globe, Heart } from "lucide-react";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";

// Card component
const Card = ({ icon, title, desc }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="icon-wrapper">{icon}</div>
        <p className="card-title">{title}</p>
        <p className="small-desc">{desc}</p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    width: 300px;
    height: 320px;
    background: linear-gradient(to bottom, #c3e6ec, #a7d1d9);
    border-radius: 10px;
    padding: 2em 1.2em;
    margin: 12px auto;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
    overflow: hidden;
    z-index: 0;
  }

  .icon-wrapper {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-title {
    color: #262626;
    font-size: 1.5em;
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  .small-desc {
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5em;
    color: #452c2c;
    transition: all 0.5s ease-out;
  }

  .go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 2em;
    height: 2em;
    overflow: hidden;
    top: 0;
    right: 0;
    background: linear-gradient(135deg, #6293c8, #384c6c);
    border-radius: 0 4px 0 32px;
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    font-family: courier, sans;
  }

  .card:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: linear-gradient(135deg, #364a60, #384c6c);
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.35s ease-out;
  }

  .card:hover:before {
    transform: scale(28);
  }

  .card:hover .small-desc {
    color: rgba(255, 255, 255, 0.8);
  }

  .card:hover .card-title {
    color: #ffffff;
  }
`;

// Features data
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
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const mainControls = useAnimation();

  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // State to detect screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update state based on screen size
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize); // Listen for window resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animations for larger devices
  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["-100%", "0%"] // Disable animation on mobile
  );

  const paragraphTwoValue = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["100%", "0%"] // Disable animation on mobile
  );

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.section className="py-10 bg-white -mt-20 mb-20" ref={containerRef}>
      <motion.div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div style={{ translateX: paragraphOneValue }}>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            animate={mainControls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.3 }}
          >
            Some Features that Made us Unique
          </h2>
          <p className="text-gray-600 mb-12">
            Discover what makes our travel platform stand out from the rest.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 justify-items-center"
          style={{ translateX: paragraphTwoValue }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;
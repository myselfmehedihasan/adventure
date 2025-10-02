import React, { useState, useEffect, useRef } from "react";

const Spiral3DSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0); // Track continuous rotation
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);

  // Sample images - replace with your own
  const images = [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
    "https://picsum.photos/400/300?random=4",
    "https://picsum.photos/400/300?random=5",
    "https://picsum.photos/400/300?random=6",
    "https://picsum.photos/400/300?random=7",
    "https://picsum.photos/400/300?random=8",
  ];

  const totalImages = images.length;

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
      setRotationAngle((prev) => prev + 360 / totalImages);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalImages, isDragging]);

  // Drag handlers
  const handleMouseDown = (e) => {
    if (e.target.tagName === "IMG") return; // Don't start drag on image click
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset(0);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const sensitivity = 0.5; // Adjust sensitivity
    setDragOffset(deltaX * sensitivity);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const threshold = 50; // Minimum drag distance to trigger slide change
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Dragged right - go to next (rotate right)
        setCurrentIndex((prev) => (prev + 1) % totalImages);
        setRotationAngle((prev) => prev + 360 / totalImages);
      } else {
        // Dragged left - go to previous (rotate left)
        setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
        setRotationAngle((prev) => prev - 360 / totalImages);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.target.tagName === "IMG") return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const sensitivity = 0.5;
    setDragOffset(deltaX * sensitivity);
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    setRotationAngle((prev) => prev - 360 / totalImages);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
    setRotationAngle((prev) => prev + 360 / totalImages);
  };

  const handleDotClick = (index) => {
    const currentNormalized = currentIndex;
    const targetNormalized = index;

    // Calculate shortest path
    let diff = targetNormalized - currentNormalized;
    if (diff > totalImages / 2) {
      diff -= totalImages;
    } else if (diff < -totalImages / 2) {
      diff += totalImages;
    }

    setCurrentIndex(index);
    setRotationAngle((prev) => prev + diff * (360 / totalImages));
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="relative w-full max-w-4xl">
        {/* Main Slider Container */}
        <div
          ref={containerRef}
          className={`relative w-full h-96 mx-auto ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ perspective: "1200px" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 3D Spiral Container */}
          <div className="relative w-full h-full preserve-3d">
            {images.map((image, index) => {
              // Use continuous rotation angle instead of calculated positions
              const baseAngle = rotationAngle + (360 / totalImages) * index;
              const dragAngle = isDragging ? dragOffset / 5 : 0;
              const angle = baseAngle + dragAngle;
              const radians = (angle * Math.PI) / 180;
              const radius = 200;
              const x = Math.sin(radians) * radius;
              const z = Math.cos(radians) * radius;
              const y = Math.sin(radians * 2) * 50; // Spiral effect

              const isActive = index === currentIndex;
              // Calculate opacity and scale based on how close to center
              const normalizedAngle = ((angle % 360) + 360) % 360;
              const distanceFromCenter = Math.min(
                normalizedAngle,
                360 - normalizedAngle
              );
              const opacity = Math.max(0.3, 1 - distanceFromCenter / 180);
              const scale = isActive
                ? 1.2
                : Math.max(0.6, 1 - distanceFromCenter / 360);

              return (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all ease-out cursor-pointer ${
                    isDragging ? "duration-75" : "duration-1000"
                  }`}
                  style={{
                    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${-angle}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: isActive ? 10 : Math.floor(opacity * 10),
                  }}
                  onClick={() => !isDragging && handleDotClick(index)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-64 h-48 object-cover transition-transform duration-300 hover:scale-110 select-none"
                      style={{
                        filter: isActive
                          ? "brightness(1.1) contrast(1.1)"
                          : "brightness(0.7)",
                        border: isActive
                          ? "4px solid #ffffff"
                          : "2px solid rgba(255,255,255,0.3)",
                      }}
                      draggable={false}
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center mt-8 space-x-6">
          <button
            onClick={handlePrevious}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Auto-play Toggle */}
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleAutoPlay}
            className={`px-6 py-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isAutoPlaying
                ? "bg-green-500/30 text-green-200 hover:bg-green-500/40"
                : "bg-red-500/30 text-red-200 hover:bg-red-500/40"
            }`}
          >
            {isAutoPlaying ? (
              <span className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                <span>Auto Play ON</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Auto Play OFF</span>
              </span>
            )}
          </button>
        </div>

        {/* Current Slide Info */}
        <div className="text-center mt-4">
          <p className="text-white/80 text-sm">
            Image {currentIndex + 1} of {totalImages}
            {isDragging && (
              <span className="ml-2 text-yellow-300">(Dragging...)</span>
            )}
          </p>
          <p className="text-white/60 text-xs mt-1">
            💡 Tip: Swipe right to go forward, swipe left to go back
          </p>
        </div>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default Spiral3DSlider;

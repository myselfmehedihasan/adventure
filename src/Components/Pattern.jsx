import React from "react";

const Pattern = () => {
  return (
    <div className="fixed inset-0 w-full h-full  pointer-events-none">
      <div
        className="absolute inset-0 w-full h-full animate-rain-bg"
        style={{
          backgroundImage: `
            radial-gradient(4px 100px at 0px 235px, #09f, transparent),
            radial-gradient(4px 100px at 300px 235px, #09f, transparent),
            radial-gradient(1.5px 1.5px at 150px 117.5px, #09f 100%, transparent 150%),
            radial-gradient(4px 100px at 0px 252px, #09f, transparent),
            radial-gradient(4px 100px at 300px 252px, #09f, transparent)
          `,
          backgroundSize: `300px 235px, 300px 235px, 300px 235px, 300px 252px, 300px 252px`,
        }}
      />
    </div>
  );
};

export default Pattern;

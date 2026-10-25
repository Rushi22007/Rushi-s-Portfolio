import React from "react";
import { Html, useProgress } from "@react-three/drei";

// Premium Glowing Canvas Loader
const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center pointer-events-none select-none">
        {/* Glowing Pulsing Ring */}
        <div className="relative flex items-center justify-center w-16 h-16 mb-3">
          <div className="absolute inset-0 rounded-full border-2 border-[#915eff]/30 animate-ping opacity-60" />
          <div className="w-12 h-12 rounded-full border-2 border-t-[#915eff] border-r-transparent border-b-[#7038e8] border-l-transparent animate-spin" />
          <div className="absolute w-3 h-3 rounded-full bg-[#915eff] shadow-[0_0_12px_#915eff]" />
        </div>

        {/* Progress & Label */}
        <p className="text-white font-bold text-xs tracking-wider">
          LOADING 3D SCENE
        </p>
        <span className="text-[#915eff] font-mono text-xs font-semibold mt-1">
          {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
};

export default Loader;

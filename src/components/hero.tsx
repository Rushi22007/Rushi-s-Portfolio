import { motion } from "framer-motion";

import { ComputersCanvas } from "./canvas";
import { styles } from "../styles";
import { cn } from "../utils/lib";

// Hero
export const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto touch-pan-y">
      <div
        className={cn(
          styles.paddingX,
          "absolute inset-0 top-24 sm:top-32 max-w-7xl mx-auto flex flex-row items-start gap-4 sm:gap-5 z-10 pointer-events-auto md:pointer-events-none",
        )}
      >
        {/* Title Indicator */}
        <div className="flex flex-col justify-center items-center mt-3 sm:mt-5">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-32 violet-gradient" />
        </div>

        {/* About Me */}
        <div className="pointer-events-auto">
          <h1 className={cn(styles.heroHeadText, "text-white text-[32px] xs:text-[40px] sm:text-[60px] lg:text-[80px] leading-tight")}>
            Hi, I'm <span className="text-[#915eff]">Rushikesh</span>
          </h1>
          <p className={cn(styles.heroSubText, "mt-2 text-white-100 text-[14px] xs:text-[16px] sm:text-[22px] lg:text-[28px] max-w-xl")}>
            Python Developer &amp; Data Analyst crafting{" "}
            <br className="sm:block hidden" />
            data pipelines, interactive dashboards, and ML models
          </p>
        </div>
      </div>

      {/* Computer Model */}
      <ComputersCanvas />

      {/* Scroll to about section */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-8.75 h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

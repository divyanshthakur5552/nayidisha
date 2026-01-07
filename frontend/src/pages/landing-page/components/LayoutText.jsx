import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <>
      <div className="flex gap-3 items-center flex-wrap justify-center max-w-5xl mx-auto px-4">
        <motion.span
          layoutId="subtext"
          className="text-3xl font-bold tracking-tight drop-shadow-lg md:text-5xl lg:text-6xl text-white"
        >
          {text}
        </motion.span>
        <motion.span
          layout
          className="relative w-fit overflow-hidden rounded-xl border-2 border-primary bg-gradient-to-r from-primary to-purple-700 px-6 py-3 font-sans text-3xl font-bold tracking-tight text-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] shadow-primary/50 md:text-5xl lg:text-6xl"
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={currentIndex}
              initial={{ y: -40, filter: "blur(10px)" }}
              animate={{
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
              transition={{
                duration: 0.5,
              }}
              className="inline-block whitespace-nowrap"
            >
              {words[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </div>
    </>
  );
};

import PropTypes from "prop-types";

LayoutTextFlip.propTypes = {
  text: PropTypes.string,
  words: PropTypes.arrayOf(PropTypes.string),
  duration: PropTypes.number,
};

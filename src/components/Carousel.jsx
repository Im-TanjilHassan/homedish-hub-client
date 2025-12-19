import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";

const AUTO_PLAY_DELAY = 3000;

const getOffset = () => {
  if (window.innerWidth < 640) return 160; // sm
  if (window.innerWidth < 768) return 200; // md
  return 260; // lg
};

const cardVariants = {
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 5,
  },
  left: {
    x: -getOffset(),
    scale: 0.82,
    opacity: 0.4,
    filter: "blur(4px)",
    zIndex: 1,
  },
  right: {
    x: getOffset(),
    scale: 0.82,
    opacity: 0.4,
    filter: "blur(4px)",
    zIndex: 1,
  },
  hidden: {
    opacity: 0,
    scale: 0.6,
    filter: "blur(8px)",
    zIndex: 0,
  },
};

const Carousel = ({ reviews }) => {
  const [index, setIndex] = useState(0);

  // Infinite autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const getPosition = (i) => {
    const diff = i - index;

    if (diff === 0) return "center";
    if (diff === -1 || diff === reviews.length - 1) return "left";
    if (diff === 1 || diff === -(reviews.length - 1)) return "right";
    return "hidden";
  };

  return (
    <div
      className="relative w-full
    h-[360px]
    md:h-[400px]
    lg:h-[420px]
    flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence>
        {reviews.map((review, i) => {
          const position = getPosition(i);

          return (
            <motion.div
              key={review._id}
              className="absolute
            w-[260px] h-[330px]
            md:w-[300px] md:h-[360px]
            lg:w-[320px] lg:h-[380px]
            rounded-2xl md:p-6"
              variants={cardVariants}
              initial="hidden"
              animate={position}
              exit="hidden"
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              <ReviewCard key={review._id} review={review}></ReviewCard>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;

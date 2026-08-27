"use client";
import { motion } from "motion/react";
const MotionTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 200, x: 0 }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      transition={{
        duration: 0.5,
        // delay: 0.2,
        type: "spring",
        stiffness: 350,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionTransition;

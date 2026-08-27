"use client";
import { motion } from "motion/react";
const MotionDiv = ({
  duration = 0.5,
  children,
}: {
  duration?: number;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, x: 0 }}
      dragConstraints={{ top: -50, left: -50, right: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: [0.8, 1],
        rotate: [2, 0],
      }}
      viewport={{ once: false }}
      transition={{
        duration: duration,
        type: "spring",
        stiffness: 350,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;

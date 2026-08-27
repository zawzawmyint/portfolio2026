"use client";
import React from "react";
import { motion } from "motion/react";
const MotionText = ({ text, delay = 5 }: { text: string; delay?: number }) => {
  return (
    <>
      {text?.split(" ").map((el, i) => (
        <motion.span
          initial={{ opacity: 0.3 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.25,
            delay: i / delay,
          }}
          whileInView={{
            opacity: 1,
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
    </>
  );
};

export default MotionText;

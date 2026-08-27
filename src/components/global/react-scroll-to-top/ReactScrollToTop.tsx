"use client";
import { CircleArrowUp } from "lucide-react";
import ScrollToTop from "react-scroll-to-top";

const ReactScrollToTop = () => {
  return (
    <ScrollToTop
      smooth
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 26,
        height: 26,
      }}
      component={<CircleArrowUp size={20} color="black" />}
    />
  );
};

export default ReactScrollToTop;

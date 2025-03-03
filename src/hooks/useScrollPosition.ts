import { useState, useEffect } from "react";
import { debounce } from "../lib/utils";

interface ScrollPosition {
  x: number;
  y: number;
  direction: "up" | "down" | "none";
  atTop: boolean;
  scrollPercentage: number;
}

/**
 * Custom hook for tracking scroll position and direction
 */
export function useScrollPosition(delay = 10) {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: "none",
    atTop: true,
    scrollPercentage: 0
  });

  useEffect(() => {
    let prevY = window.scrollY;

    const calculateScrollPercentage = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableDistance = documentHeight - windowHeight;
      
      return scrollableDistance <= 0
        ? 0
        : (window.scrollY / scrollableDistance) * 100;
    };

    const handleScroll = debounce(() => {
      const currentY = window.scrollY;
      const direction = 
        currentY === prevY
          ? "none"
          : currentY > prevY
            ? "down"
            : "up";

      setScrollPosition({
        x: window.scrollX,
        y: currentY,
        direction,
        atTop: currentY < 10,
        scrollPercentage: calculateScrollPercentage()
      });

      prevY = currentY;
    }, delay);

    window.addEventListener("scroll", handleScroll);

    // Set initial values
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [delay]);

  return scrollPosition;
}
import { useEffect } from "react";

const useParallaxEffect = () => {
  useEffect(() => {
    const handleScroll = () => {
      const background = document.querySelector(".truck-background");
      const scrollY = window.scrollY;
      background.style.backgroundPositionY = `${scrollY * 0.5}px`; // Adjusts speed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

export default useParallaxEffect;

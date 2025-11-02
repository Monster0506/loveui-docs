"use client";

import { useEffect, useState } from "react";

export function useScrolledPastHero(offset: number = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setScrolled(true);
        return;
      }
      const threshold = hero.offsetHeight - offset;
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return scrolled;
}

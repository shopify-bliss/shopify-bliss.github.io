import { useLayoutEffect, useEffect } from "react";
import Lenis from "lenis";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SmoothScroll() {
  useIsomorphicLayoutEffect(() => {
    const lenis = new Lenis({
      easing: easeOutQuad,
      duration: 2,
    });

    function easeOutQuad(x) {
      return 1 - (1 - x) * (1 - x);
    }

    // function easeOutSine(x) {
    //   return Math.sin((x * Math.PI) / 2);
    // }

    // lenis.on("scroll", (e) => {});
    lenis.on("scroll", () => {});

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
}

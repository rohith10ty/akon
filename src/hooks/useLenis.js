import { useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenis = (enabled = true) => {
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    if (!enabled) return;

    // Instantiate Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      window.lenis = lenis;
    }

    // Update ScrollTrigger each time Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP's internal animation ticker
    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined' && window.lenis === lenis) {
        window.lenis = null;
      }
    };
  }, [enabled]);

  return lenisRef;
};

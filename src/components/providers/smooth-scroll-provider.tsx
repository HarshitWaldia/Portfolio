"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Drives the entire site with Lenis so wheel / trackpad / touch scrolling
 * gets the same weighted, inertial deceleration you feel on apple.com —
 * instead of the browser's instant 1:1 scroll.
 *
 * Respects `prefers-reduced-motion` by simply not instantiating Lenis,
 * which leaves native scrolling untouched.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isPreview =
      typeof window !== "undefined" &&
      window.location.search.includes("preview=true");
    if (prefersReduced || isPreview) return;

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => 1 - Math.pow(1 - t, 3.2), // silky-smooth natural deceleration
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.25,
      syncTouch: false,
      anchors: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // expose for anywhere that wants to trigger a programmatic scroll
    // (e.g. nav links, "scroll to top" buttons) with the same easing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

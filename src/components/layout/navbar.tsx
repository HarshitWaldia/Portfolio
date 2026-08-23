"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContactDrawer } from "@/stores/contact-drawer";
import StatusPill from "./status-pill";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { open: openContact } = useContactDrawer();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Floating Pill Navbar Wrapper */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Status Pill - Hidden on mobile screens to prevent layout crowding */}
          <div className="hidden md:block mr-3">
            <StatusPill />
          </div>

          {/* Main Floating Pill */}
          <nav
            className={`bg-neutral-950/90 border shadow-2xl shadow-black/60 backdrop-blur-2xl flex items-center gap-1 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 transition-all duration-300 ${
              scrolled ? "border-white/10" : "border-white/5 scale-105"
            }`}
          >
            {/* Nav Items with Shared Sliding Capsule Hover Indicator */}
            <div
              className="flex items-center gap-0.5 sm:gap-1 relative"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, index) => (
                <div
                  key={item.href}
                  className="relative px-2.5 sm:px-3 py-1 flex items-center justify-center"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-white/[0.06] rounded-full z-0 pointer-events-none transition-opacity" />
                  )}
                  <Link
                    to={item.href}
                    className="relative z-10 text-xs sm:text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Separator line inside pill */}
            <div className="w-px h-4 bg-white/10 mx-1 sm:mx-2" />

            {/* Book a Call / CTA */}
            <button
              onClick={openContact}
              className="px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/18 hover:border-white/25 transition-colors cursor-pointer shadow-inner"
            >
              Book a Call
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}

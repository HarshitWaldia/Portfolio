"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContactDrawer } from "@/stores/contact-drawer";
import StatusPill from "./status-pill";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications", shortLabel: "Certs" },
  { label: "Guestbook", href: "/guestbook" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { open: openContact } = useContactDrawer();
  const location = useLocation();
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Floating Pill Navbar Wrapper */}
      <div className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none w-full max-w-full">
        {/* ── DESKTOP NAVBAR (MD and UP) ── */}
        <div className="hidden md:flex items-center gap-2 pointer-events-auto">
          {/* Status Pill */}
          <div className="mr-3">
            <StatusPill />
          </div>

          {/* Main Floating Pill */}
          <nav
            className={`bg-neutral-950/90 border shadow-2xl shadow-black/60 backdrop-blur-2xl flex items-center gap-1 sm:gap-2 rounded-full pl-2.5 pr-3 sm:pr-4 py-1.5 transition-all duration-300 ${
              scrolled ? "border-white/10" : "border-white/5 scale-105"
            }`}
          >
            {/* Favicon Logo */}
            <Link
              to="/"
              className="flex items-center gap-1.5 pr-2 group cursor-pointer"
              aria-label="Harshit Waldia Home"
            >
              <img
                src="/favicon.svg"
                alt="HW"
                className="w-5 h-5 rounded-md object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Separator line inside pill */}
            <div className="w-px h-4 bg-white/10 mr-1" />

            {/* Nav Items with Shared Sliding Capsule Hover Indicator */}
            <div
              className="flex items-center gap-0.5 sm:gap-1 relative"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <div
                    key={item.href}
                    className="relative px-2.5 sm:px-3 py-1 flex items-center justify-center"
                    onMouseEnter={() => setHoveredIndex(index)}
                  >
                    {hoveredIndex === index && (
                      <div className="absolute inset-0 bg-white/[0.06] rounded-full z-0 pointer-events-none transition-opacity" />
                    )}
                    {isActive && (
                      <div className="absolute inset-0 bg-white/[0.08] rounded-full z-0 pointer-events-none" />
                    )}
                    <Link
                      to={item.href}
                      className={`relative z-10 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                        isActive ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
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

        {/* ── MOBILE NAVBAR (BELOW MD) ── */}
        <div className="flex md:hidden items-center w-full max-w-[calc(100vw-1rem)] pointer-events-auto">
          <nav
            className={`w-full bg-neutral-950/95 border shadow-2xl shadow-black/80 backdrop-blur-2xl flex items-center justify-between rounded-full pl-2 pr-2.5 py-1.5 transition-all duration-300 ${
              scrolled ? "border-white/15" : "border-white/10"
            }`}
          >
            {/* Favicon Logo image at the left */}
            <Link
              to="/"
              className="shrink-0 flex items-center justify-center p-1 rounded-lg group"
              aria-label="Home"
            >
              <img
                src="/favicon.svg"
                alt="Favicon Logo"
                className="w-5 h-5 rounded-md object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Subtle separator */}
            <div className="w-px h-3.5 bg-white/10 shrink-0 mx-1" />

            {/* Horizontally scrollable section options inside the bar */}
            <div
              ref={mobileNavRef}
              className="flex-1 flex items-center gap-0.5 overflow-x-auto no-scrollbar scroll-smooth min-w-0 px-0.5"
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                      isActive
                        ? "bg-white/12 text-white font-semibold shadow-sm"
                        : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>{item.shortLabel || item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Subtle separator */}
            <div className="w-px h-3.5 bg-white/10 shrink-0 mx-1" />

            {/* Book a Call button on the right */}
            <button
              onClick={openContact}
              className="shrink-0 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors shadow-inner"
            >
              Book Call
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContactDrawer } from "@/stores/contact-drawer";
import { Menu, X, ArrowUpRight } from "lucide-react";
import StatusPill from "./status-pill";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Certifications", href: "/certifications" },
  { label: "Guestbook", href: "/guestbook" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { open: openContact } = useContactDrawer();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Floating Pill Navbar Wrapper */}
      <div className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none w-full max-w-full">
        {/* ── DESKTOP NAVBAR (MD and UP) ── */}
        <div className="hidden md:flex items-center gap-2 pointer-events-auto">
          {/* Status Pill */}
          <div className="mr-3">
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

        {/* ── MOBILE NAVBAR (BELOW MD) ── */}
        <div className="flex md:hidden flex-col items-center w-full max-w-[calc(100vw-1.5rem)] pointer-events-auto">
          {/* Compact Pill */}
          <nav
            className={`w-full bg-neutral-950/95 border shadow-2xl shadow-black/70 backdrop-blur-2xl flex items-center justify-between rounded-full px-3.5 py-2 transition-all duration-300 ${
              scrolled || mobileMenuOpen ? "border-white/15 bg-neutral-950" : "border-white/10"
            }`}
          >
            {/* HW Brand Badge */}
            <Link
              to="/"
              className="flex items-center gap-2 group cursor-pointer"
              aria-label="Home"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.5)] border border-white/20">
                <span className="font-sans text-[11px] font-black italic tracking-tighter text-white">
                  HW
                </span>
              </div>
              <span className="text-xs font-semibold tracking-tight text-white/90">
                Harshit
              </span>
            </Link>

            {/* Right Buttons: Book a Call + Menu Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={openContact}
                className="px-3 py-1 text-[11px] font-semibold rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors shadow-inner"
              >
                Book Call
              </button>

              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            </div>
          </nav>

          {/* Collapsible Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="w-full mt-2 rounded-2xl bg-neutral-950/95 border border-white/15 shadow-2xl shadow-black/80 backdrop-blur-2xl p-4 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Status pill on mobile */}
              <div className="pb-3 mb-2 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] text-white/60 font-medium font-mono">
                    Available for work
                  </span>
                </div>
                <span className="text-[10px] text-white/40 font-mono">India (IST)</span>
              </div>

              {/* Links */}
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-white font-semibold"
                        : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={14} className="opacity-40" />
                  </Link>
                );
              })}

              {/* CTA button inside menu */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openContact();
                }}
                className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 active:scale-[0.98] transition-transform"
              >
                Let&apos;s Connect / Book a Call
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

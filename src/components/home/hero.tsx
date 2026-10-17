"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Mail, Copy, Check } from "lucide-react";
import { useContactDrawer } from "@/stores/contact-drawer";
import { Reveal } from "@/components/ui/reveal";
import HangingCard from "./hanging-card";
import portraitNoBg from "@/assets/me.png";

/** Deterministic random-ish helper based on index */
function pseudoRandom(seed: number) {
  const x = Math.sin(seed + 1) * 43758.5453;
  return x - Math.floor(x);
}

function StarField() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const count = isMobile ? 40 : 85;
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      x: pseudoRandom(i * 3) * 100,
      y: pseudoRandom(i * 3 + 1) * 70,
      r: pseudoRandom(i * 3 + 2) * 1.3 + 0.4,
      opacity: pseudoRandom(i * 5) * 0.55 + 0.1,
      delay: pseudoRandom(i * 7) * 4,
    }))
  ).current;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={`${s.x}%`}
          cy={`${s.y}%`}
          r={s.r}
          fill="white"
          opacity={s.opacity}
          style={{
            animation: `twinkle ${3 + pseudoRandom(i) * 3}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}

/**
 * Animated satellite that drifts across the hero in a slow arc,
 * mimicking a low-earth-orbit pass across the night sky.
 */
function Satellite() {
  return (
    <div
      className="absolute pointer-events-none z-[2]"
      style={{
        top: "12%",
        left: "-12%",
        animation: "satelliteOrbit 28s linear infinite",
      }}
    >
      {/* Glow trail behind satellite */}
      <div
        style={{
          position: "absolute",
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "90px",
          height: "2px",
          background:
            "linear-gradient(to left, rgba(147,197,253,0.55), rgba(167,139,250,0.2), transparent)",
          borderRadius: "99px",
          filter: "blur(1.5px)",
        }}
      />

      {/* Satellite SVG */}
      <svg
        width="44"
        height="24"
        viewBox="0 0 44 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 0 6px rgba(147,197,253,0.7))" }}
      >
        {/* Left solar panel */}
        <rect x="0" y="8" width="14" height="8" rx="1.5"
          fill="rgba(59,130,246,0.25)" stroke="rgba(147,197,253,0.6)" strokeWidth="0.8" />
        {/* Panel cells left */}
        <line x1="4.7" y1="8" x2="4.7" y2="16" stroke="rgba(147,197,253,0.35)" strokeWidth="0.6" />
        <line x1="9.3" y1="8" x2="9.3" y2="16" stroke="rgba(147,197,253,0.35)" strokeWidth="0.6" />
        <line x1="0" y1="12" x2="14" y2="12" stroke="rgba(147,197,253,0.35)" strokeWidth="0.6" />

        {/* Left arm connecting panel to body */}
        <rect x="13.5" y="11" width="4.5" height="2" rx="0.5"
          fill="rgba(200,210,240,0.4)" />

        {/* Main satellite body */}
        <rect x="17" y="6" width="10" height="12" rx="2"
          fill="rgba(30,35,60,0.9)" stroke="rgba(200,210,255,0.5)" strokeWidth="0.9" />
        {/* Body highlight stripe */}
        <rect x="18.5" y="7.5" width="7" height="3" rx="1"
          fill="rgba(147,197,253,0.15)" />
        {/* Antenna dish */}
        <circle cx="22" cy="5" r="2.5"
          fill="none" stroke="rgba(200,220,255,0.55)" strokeWidth="0.8" />
        <line x1="22" y1="6" x2="22" y2="7.5"
          stroke="rgba(200,220,255,0.5)" strokeWidth="0.7" />
        {/* Blinking light */}
        <circle cx="22" cy="17.5" r="1"
          fill="rgba(250,200,60,0.85)"
          style={{ animation: "twinkle 1.4s ease-in-out infinite" }}
        />

        {/* Right arm */}
        <rect x="26" y="11" width="4.5" height="2" rx="0.5"
          fill="rgba(200,210,240,0.4)" />

        {/* Right solar panel */}
        <rect x="30" y="8" width="14" height="8" rx="1.5"
          fill="rgba(59,130,246,0.25)" stroke="rgba(147,197,253,0.6)" strokeWidth="0.8" />
        {/* Panel cells right */}
        <line x1="34.7" y1="8" x2="34.7" y2="16" stroke="rgba(147,197,253,0.35)" strokeWidth="0.6" />
        <line x1="39.3" y1="8" x2="39.3" y2="16" stroke="rgba(147,197,253,0.35)" strokeWidth="0.6" />
        <line x1="30" y1="12" x2="44" y2="12" stroke="rgba(147,197,253,0.35)" strokeWidth="0.6" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const { open: openContact } = useContactDrawer();
  const [copied, setCopied] = useState(false);
  const email = "harshitwaldia112@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-[#07070a] pt-28 pb-16 lg:pb-0 z-20 overflow-hidden w-full max-w-full"
    >
      {/* Star field */}
      <StarField />

      {/* Animated satellite drifting across the sky */}
      <Satellite />

      {/* ── Atmospheric glow behind planet (deep space look) ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] h-[75%] pointer-events-none z-[1] overflow-hidden">
        {/* Deep purple nebula left */}
        <div
          className="absolute left-[5%] bottom-[15%] w-[55%] h-[80%] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(88,28,235,0.28) 0%, rgba(67,56,202,0.12) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Electric blue/teal right */}
        <div
          className="absolute right-[5%] bottom-[15%] w-[55%] h-[80%] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(6,182,212,0.22) 0%, rgba(59,130,246,0.10) 40%, transparent 70%)",
            filter: "blur(65px)",
          }}
        />
        {/* Center white bloom rising from the horizon */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[90%] h-[70%] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 90%, rgba(255,255,255,0.18) 0%, rgba(167,139,250,0.08) 40%, transparent 72%)",
            filter: "blur(55px)",
            animation: "atmosphericPulse 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── 3D Interactive Lanyard Background Scene ── */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-auto">
        <HangingCard name="Harshit Waldia" title="AI/ML Engineer" photoUrl={portraitNoBg} />
      </div>

      {/* ── Main hero content ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pointer-events-none">
        {/* Announcement tag */}
        <Reveal y={15} duration={0.6} className="pointer-events-none">
          <a
            href="#work"
            className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/8 bg-white/[0.04] text-xs hover:border-white/15 hover:bg-white/[0.07] transition-all duration-300 mb-6 sm:mb-8 backdrop-blur-sm max-w-[calc(100vw-2.5rem)] cursor-pointer"
          >
            <span className="px-2 py-0.5 rounded-full bg-blue-500 text-[10px] font-bold uppercase tracking-wider text-white shrink-0">
              Role
            </span>
            <span className="text-white/60 truncate">Associate Developer - AI Engineer @ Info Origin Inc.</span>
            <ArrowRight size={10} className="text-white/40 shrink-0" />
          </a>
        </Reveal>

        {/* Serif Headline */}
        <Reveal y={25} delay={0.1} duration={0.7} className="pointer-events-none select-none">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.15] max-w-4xl px-2 pointer-events-none select-none">
            Models that{" "}
            <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
              solve real problems.
            </span>
            <br />
            AI Engineering that{" "}
            <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
              actually scales.
            </span>
          </h1>
        </Reveal>

        {/* Sub-heading inline badge */}
        <Reveal y={20} delay={0.2} duration={0.7} className="pointer-events-none select-none">
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-white/50 text-sm sm:text-lg mt-6 sm:mt-8 font-medium pointer-events-none select-none">
            <span>Hello, 👋 I&apos;m Harshit Waldia</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative rounded-full overflow-hidden border-2 border-white/20 shadow-md">
              <img
                src="/images/profile/harshit.jpg"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                alt="Harshit Waldia Profile"
              />
            </div>
            <span>An AI/ML Engineer</span>
          </div>
        </Reveal>

        {/* Action Buttons */}
        <Reveal y={20} delay={0.3} duration={0.8} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-8 sm:mt-12 pointer-events-none w-full sm:w-auto">
          {/* Let's Connect */}
          <button
            onClick={openContact}
            className="pointer-events-auto w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-white/40 text-black font-medium hover:bg-white transition-all shadow-lg shadow-black/30 group cursor-pointer text-sm"
          >
            Let&apos;s Connect
            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight size={12} strokeWidth={3} />
            </div>
          </button>

          {/* Email Copy Button */}
          <button
            onClick={handleCopyEmail}
            className="pointer-events-auto w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl hover:bg-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all text-xs sm:text-sm font-medium cursor-pointer"
          >
            <Mail size={14} className="opacity-70 shrink-0" />
            <span className="font-mono text-xs truncate max-w-[200px] sm:max-w-none">{email}</span>
            <div className="ml-1 pl-1.5 border-l border-white/10 text-white/40 hover:text-white transition-colors shrink-0">
              {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            </div>
          </button>
        </Reveal>
      </div>

      {/* ── PLANET / EARTH HORIZON — MacBook reference style
          Large dark circle sitting below the viewport,
          only its glowing top arc is visible.
      ──────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none h-[360px] overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.6) 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 55%, rgba(0,0,0,0.6) 75%, transparent 100%)",
        }}
      >

        {/* The planet body — massive dark circle, only top edge peeks up */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: "max(2400px, 170vw)",
            height: "max(2400px, 170vw)",
            bottom: "-max(2100px, 150vw)",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at 50% 2%, #151520 0%, #0a0a10 30%, #06060a 60%, #030305 100%)",
          }}
        >
          {/* Inner subtle surface texture glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 30%)",
            }}
          />
        </div>

        {/* ── SVG Rim Glow — sits exactly on the planet's top arc ── */}
        <svg
          viewBox="0 0 1440 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-full h-full overflow-hidden"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Core white-to-blue-to-transparent gradient along the arc */}
            <linearGradient id="rim-core" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(99,102,241,0)" />
              <stop offset="20%" stopColor="rgba(99,102,241,0.15)" />
              <stop offset="38%" stopColor="rgba(125,211,252,0.7)" />
              <stop offset="50%" stopColor="rgba(255,255,255,1)" />
              <stop offset="62%" stopColor="rgba(125,211,252,0.7)" />
              <stop offset="80%" stopColor="rgba(99,102,241,0.15)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0)" />
            </linearGradient>

            {/* Wider diffuse glow — violet/indigo */}
            <linearGradient id="rim-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(88,28,235,0)" />
              <stop offset="30%" stopColor="rgba(99,102,241,0.4)" />
              <stop offset="50%" stopColor="rgba(167,139,250,0.7)" />
              <stop offset="70%" stopColor="rgba(99,102,241,0.4)" />
              <stop offset="100%" stopColor="rgba(88,28,235,0)" />
            </linearGradient>

            {/* Ultra-wide bloom — soft sky glow above the rim */}
            <linearGradient id="sky-bloom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(67,56,202,0)" />
              <stop offset="25%" stopColor="rgba(99,102,241,0.25)" />
              <stop offset="50%" stopColor="rgba(139,92,246,0.4)" />
              <stop offset="75%" stopColor="rgba(99,102,241,0.25)" />
              <stop offset="100%" stopColor="rgba(67,56,202,0)" />
            </linearGradient>

            {/* Filters */}
            <filter id="glow-xl" x="-30%" y="-300%" width="160%" height="700%">
              <feGaussianBlur stdDeviation="28" />
            </filter>
            <filter id="glow-lg" x="-20%" y="-200%" width="140%" height="500%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
            <filter id="glow-md" x="-10%" y="-100%" width="120%" height="300%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Arc path — matches the top of the planet sphere */}
          {/* Layer 1: ultra-wide sky bloom */}
          <path
            d="M -200 320 Q 720 190 1640 320"
            stroke="url(#sky-bloom)"
            strokeWidth="80"
            filter="url(#glow-xl)"
            opacity="0.9"
          />

          {/* Layer 2: medium diffuse rim glow */}
          <path
            d="M -200 320 Q 720 190 1640 320"
            stroke="url(#rim-glow)"
            strokeWidth="24"
            filter="url(#glow-lg)"
            opacity="1"
          />

          {/* Layer 3: intense focused glow */}
          <path
            d="M -200 320 Q 720 190 1640 320"
            stroke="url(#rim-core)"
            strokeWidth="6"
            filter="url(#glow-md)"
            opacity="1"
          />

          {/* Layer 4: sharp bright core line */}
          <path
            d="M -200 320 Q 720 190 1640 320"
            stroke="url(#rim-core)"
            strokeWidth="1.5"
            opacity="1"
          />
        </svg>
      </div>
    </section>
  );
}

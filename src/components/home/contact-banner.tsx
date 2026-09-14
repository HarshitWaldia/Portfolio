"use client";

import { useContactDrawer } from "@/stores/contact-drawer";
import { siteMetadata } from "@/lib/seo/site-metadata";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function ContactBanner() {
  const { open: openContact } = useContactDrawer();
  const navigate = useNavigate();

  return (
    <section id="contact" className="relative py-16 sm:py-20 overflow-hidden bg-transparent">
      {/* Ambient color splashes matching the styling */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-violet-600/10 blur-[110px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-10 sm:px-10 sm:py-12 shadow-2xl shadow-black/80 backdrop-blur-sm"
        style={{
          background: "radial-gradient(circle at 20% 50%, rgba(13, 148, 136, 0.22) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.18) 0%, transparent 60%), #04090b"
        }}
      >
        {/* Grain Noise Overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay z-0 rounded-[2rem]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
        <div className="relative flex flex-col items-center text-center z-10 w-full">

          {/* ── Wings + Initials Orb ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mb-5 flex items-center justify-center select-none"
          >
            {/* Left wing */}
            <svg viewBox="0 0 220 140" className="h-14 w-24 sm:h-16 sm:w-28 opacity-70" fill="none">
              <defs>
                <linearGradient id="wingGL" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1a1a1a" />
                  <stop offset="55%" stopColor="#4b4b4b" />
                  <stop offset="100%" stopColor="#9a9a9a" />
                </linearGradient>
              </defs>
              {["M2 118C40 108 78 84 108 44C118 30 126 16 132 2", "M14 122C50 110 86 86 114 48C122 36 128 22 132 10", "M28 126C60 112 92 88 118 52C124 42 128 30 130 20", "M42 130C70 116 98 92 120 58C124 50 126 40 126 32", "M56 133C80 120 102 96 120 66C123 58 124 50 124 44"].map((d, i) => (
                <path key={i} d={d} stroke="url(#wingGL)" strokeWidth={2.5} strokeLinecap="round" opacity={0.55 + i * 0.09} />
              ))}
              <path d="M2 118C40 108 78 84 108 44C118 30 126 16 132 2" stroke="url(#wingGL)" strokeWidth={3} strokeLinecap="round" />
            </svg>

            {/* Initials orb (HW) */}
            <div className="relative -mx-2 flex h-[72px] w-[72px] items-center justify-center rounded-full sm:h-20 sm:w-20">
              <div className="absolute inset-0 rounded-full bg-blue-600/50 blur-lg" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/70 bg-gradient-to-b from-[#0b1330] to-black shadow-[0_0_30px_6px_rgba(37,99,235,0.45)]" />
              <span className="relative font-sans text-lg font-black italic tracking-tighter text-white sm:text-2xl">HW</span>
            </div>

            {/* Right wing (mirrored) */}
            <svg viewBox="0 0 220 140" className="h-14 w-24 sm:h-16 sm:w-28 opacity-70 -scale-x-100" fill="none">
              <defs>
                <linearGradient id="wingGR" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1a1a1a" />
                  <stop offset="55%" stopColor="#4b4b4b" />
                  <stop offset="100%" stopColor="#9a9a9a" />
                </linearGradient>
              </defs>
              {["M2 118C40 108 78 84 108 44C118 30 126 16 132 2", "M14 122C50 110 86 86 114 48C122 36 128 22 132 10", "M28 126C60 112 92 88 118 52C124 42 128 30 130 20", "M42 130C70 116 98 92 120 58C124 50 126 40 126 32", "M56 133C80 120 102 96 120 66C123 58 124 50 124 44"].map((d, i) => (
                <path key={i} d={d} stroke="url(#wingGR)" strokeWidth={2.5} strokeLinecap="round" opacity={0.55 + i * 0.09} />
              ))}
              <path d="M2 118C40 108 78 84 108 44C118 30 126 16 132 2" stroke="url(#wingGR)" strokeWidth={3} strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* ── Headline ── */}
          <div className="relative max-w-3xl px-4">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="font-sans text-2xl uppercase leading-tight tracking-wide text-white sm:text-4xl font-outfit"
            >
              <span className="font-light">From concept to </span>
              <span className="font-black">creation</span>
              <br />
              <span className="font-light">Let&apos;s build intelligent </span>
              <span className="font-black">systems!</span>
            </motion.h2>
          </div>

          {/* ── Rotating "Open To Work" Wheel (Top-Right Corner) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="absolute top-5 right-5 sm:top-6 sm:right-8 z-20 pointer-events-auto"
          >
            <motion.div
              drag
              dragSnapToOrigin
              dragElastic={0.25}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              whileHover={{ scale: 1.06, cursor: "grab" }}
              className="relative h-[72px] w-[72px] sm:h-[84px] sm:w-[84px] shrink-0 cursor-grab select-none group"
              style={{ touchAction: "none" }}
              title="Open to Work — Drag me!"
            >
              {/* Subtle ambient cyan/blue glow */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md group-hover:bg-cyan-500/35 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:border-cyan-300/70 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all" />

              {/* Rotating Circular Text */}
              <motion.svg
                viewBox="0 0 130 130"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
              >
                <defs>
                  <path id="otw-circle-home" d="M 65,65 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
                </defs>
                <text fill="#ffffff" fontSize="8.5" letterSpacing="2.2" fontWeight={600} className="select-none">
                  <textPath href="#otw-circle-home" startOffset="0%">OPEN TO WORK • OPEN TO WORK • </textPath>
                </text>
              </motion.svg>

              {/* Center Core Badge with Star */}
              <div className="absolute inset-[8px] sm:inset-[10px] flex items-center justify-center rounded-full bg-neutral-950/90 backdrop-blur-sm border border-white/10 shadow-inner">
                <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-cyan-300" viewBox="0 0 24 24">
                  <path d="M12 2l1.5 5.5H19l-4.5 3.3 1.7 5.2L12 13l-4.2 3 1.7-5.2L5 7.5h5.5z" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* ── CTA Button ── */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openContact}
            className="group mt-6 flex items-center gap-3 rounded-full bg-neutral-900 py-1.5 pl-5 pr-2 text-xs font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-neutral-800 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            Get In Touch
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </motion.button>

          {/* ── Supporting copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-8 max-w-xl px-4"
          >
            <p className="text-base font-semibold text-white sm:text-lg leading-normal font-outfit">
              I&apos;m available for AI/ML engineering roles &amp; technical collaborations.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400 sm:text-sm font-light font-outfit">
              I thrive on building practical AI systems, RAG platforms, and production ML pipelines.
            </p>
          </motion.div>

          {/* ── Social pill links at the bottom of the card ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            className="flex justify-center gap-3 mt-6 select-none z-30"
          >
            <a
              href={siteMetadata.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-medium text-white/50 hover:text-white hover:border-white/15 hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              GitHub
            </a>
            <a
              href={siteMetadata.author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-medium text-white/50 hover:text-white hover:border-white/15 hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              LinkedIn
            </a>
            <a
              href={siteMetadata.author.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.02] text-xs font-medium text-white/50 hover:text-white hover:border-white/15 hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              Twitter
            </a>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

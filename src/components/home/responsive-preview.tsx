"use client";

import { useState } from "react";
import { Smartphone, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/ui/reveal";

type PreviewTab = "mobile" | "desktop";

export default function ResponsivePreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("mobile");

  return (
    <section id="preview-section" className="py-16 bg-[#070708] relative overflow-hidden">
      {/* Subtle ambient light splash in background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Header Block */}
        <Reveal y={20} className="text-center mb-10 flex flex-col items-center gap-3">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15] max-w-3xl"
            style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.15)" }}
          >
            Seamlessly Responsive, <br />
            <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-pink-500 font-light pr-1">
              Beautifully Presented.
            </span>
          </h2>
          <p className="max-w-md text-neutral-400 text-xs sm:text-sm font-light leading-relaxed font-outfit mt-2">
            I build experiences that adapt perfectly to any screen. Toggle between desktop and mobile previews to see it in action.
          </p>
        </Reveal>

        {/* Sliding Tab Switcher */}
        <Reveal y={15} delay={0.1} className="mb-14">
          <div className="relative flex items-center p-1.5 rounded-full bg-neutral-900/60 border border-white/5 backdrop-blur-md select-none">
            {/* Sliding Pill Indicator */}
            {activeTab === "mobile" && (
              <motion.div
                layoutId="preview-pill"
                className="absolute top-1.5 bottom-1.5 left-1.5 w-[100px] sm:w-[110px] rounded-full bg-neutral-800 border border-white/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {activeTab === "desktop" && (
              <motion.div
                layoutId="preview-pill"
                className="absolute top-1.5 bottom-1.5 right-1.5 w-[105px] sm:w-[115px] rounded-full bg-neutral-800 border border-white/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            {/* Mobile Tab */}
            <button
              onClick={() => setActiveTab("mobile")}
              className={`relative z-10 flex items-center justify-center gap-2 w-[100px] sm:w-[110px] py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${activeTab === "mobile" ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                }`}
            >
              <Smartphone size={14} />
              Mobile
            </button>

            {/* Desktop Tab */}
            <button
              onClick={() => setActiveTab("desktop")}
              className={`relative z-10 flex items-center justify-center gap-2 w-[105px] sm:w-[115px] py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${activeTab === "desktop" ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                }`}
            >
              <Monitor size={14} />
              Desktop
            </button>
          </div>
        </Reveal>

        {/* Mockup Frame Viewer */}
        <div className="w-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            {activeTab === "mobile" ? (
              /* ── MOBILE DEVICE MOCKUP (iPhone styled frame) ── */
              <motion.div
                key="mobile-preview"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[285px] sm:w-[315px] h-[550px] sm:h-[600px] rounded-[42px] border-[10px] border-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-neutral-950 flex flex-col overflow-hidden ring-1 ring-white/10"
              >
                {/* iPhone Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-neutral-900 rounded-full z-30 shadow-inner flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#050505] ml-auto mr-1 border border-neutral-800" />
                </div>

                {/* iPhone speaker / screen reflections */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-neutral-900 rounded-full z-30" />

                {/* Website IFrame Live Preview */}
                <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-neutral-950 select-none pointer-events-none">
                  <iframe
                    src="/?preview=true"
                    title="Live Mobile Preview"
                    className="w-full h-full border-none bg-neutral-950 rounded-[32px]"
                    loading="lazy"
                  />
                  {/* Invisible Overlay Shield to prevent direct interactions and hover locks */}
                  <div className="absolute inset-0 z-40 bg-transparent" />
                </div>
              </motion.div>
            ) : (
              /* ── DESKTOP DEVICE MOCKUP (macOS Safari styled window) ── */
              <motion.div
                key="desktop-preview"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[90vw] sm:max-w-4xl rounded-2xl border border-white/10 bg-neutral-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
              >
                {/* Safari Browser Header Toolbar */}
                <div className="h-10 bg-neutral-900/80 border-b border-white/5 flex items-center px-4 justify-between select-none">
                  {/* Left: macOS control dots */}
                  <div className="flex items-center gap-1.5 w-16">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70 border border-red-600/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 border border-yellow-600/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70 border border-green-600/30" />
                  </div>

                  {/* Center: Address Bar */}
                  <div className="flex items-center justify-center bg-neutral-950/60 border border-white/5 rounded-md px-10 py-1 text-[10px] sm:text-[11px] text-white/30 text-center w-[180px] sm:w-[320px] truncate select-none gap-1 font-mono">
                    <span className="text-emerald-400/60">https://</span>
                    <span className="text-white/40">harshitwaldia.github.io</span>
                  </div>

                  {/* Right: Dummy spacing to match */}
                  <div className="w-16 flex justify-end opacity-20">
                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" /></svg>
                  </div>
                </div>

                {/* Website IFrame Live Preview */}
                <div className="relative w-full h-[250px] sm:h-[450px] bg-neutral-950 select-none overflow-hidden pointer-events-none">
                  <iframe
                    src="/?preview=true"
                    title="Live Desktop Preview"
                    className="w-full h-full border-none bg-neutral-950"
                    loading="lazy"
                  />
                  {/* Invisible Overlay Shield */}
                  <div className="absolute inset-0 z-40 bg-transparent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

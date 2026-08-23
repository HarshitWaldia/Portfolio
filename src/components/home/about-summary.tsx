"use client";

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/brand-icons";
import { siteMetadata } from "@/lib/seo/site-metadata";
import { Reveal } from "@/components/ui/reveal";

export default function AboutSummary() {
  return (
    <section id="about-summary" className="py-16 bg-[#070708] relative overflow-hidden">
      {/* Ambient pink/violet color splashes */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-pink-500/5 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-violet-600/5 blur-[110px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-10 sm:px-12 sm:py-14 shadow-2xl shadow-black/80 backdrop-blur-sm"
          style={{
            background: "radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.18) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(167, 139, 250, 0.15) 0%, transparent 60%), #090407"
          }}
        >
          {/* Grain Noise Overlay */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay z-0 rounded-[2rem]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <Reveal y={20} index={0} className="mb-4">
                <p
                  className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-widest animate-[shimmer_3s_linear_infinite]"
                  style={{ animationDuration: "3s" }}
                >
                  KNOW ABOUT ME
                </p>
              </Reveal>

              <Reveal y={20} index={1} className="mb-6">
                <h2
                  className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15]"
                  style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.15)" }}
                >
                  AI/ML Engineer building <br />
                  systems that{" "}
                  <span
                    className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-pink-500 font-light pr-1"
                    style={{ textShadow: "0 0 30px rgba(167, 139, 250, 0.25)" }}
                  >
                    actually perform
                  </span>
                </h2>
              </Reveal>

              <Reveal y={20} index={2} className="text-neutral-400 text-sm sm:text-base leading-relaxed space-y-6 font-light max-w-xl">
                <p>
                  I&apos;m Harshit Waldia, an AI/ML Engineer focused on taking cutting-edge machine learning, computer vision, and LLM architectures and turning them into practical, enterprise-grade production systems.
                </p>
                <p>
                  Currently at SLOG Solutions, I develop document intelligence platforms, RAG architectures, and computer-vision detection models. My work bridges deep learning with robust FastAPI backend microservices.
                </p>
                <p className="text-white/80 font-normal">
                  I believe in shipping AI solutions that solve tangible operational problems with precision and reliability.
                </p>
              </Reveal>

              {/* Social Icons & CTA button */}
              <Reveal y={20} index={3} className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 mt-10">
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={siteMetadata.author.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all bg-white/[0.02] hover:scale-105"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={siteMetadata.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all bg-white/[0.02] hover:scale-105"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>

                {/* Work Experience CTA */}
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 text-sm font-semibold text-white/70 hover:text-white transition-all group w-fit"
                >
                  <span>Read Full Journey</span>
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/15 group-hover:border-white/20 group-hover:translate-x-1 group-hover:rotate-[360deg] transition-all duration-500">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            </div>

            {/* Right Column: Premium Profile Photo Container */}
            <div className="lg:col-span-5 flex justify-center items-center relative py-8">
              <Reveal y={30} scale={0.95} index={1} className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[4/5] flex items-center justify-center">

                {/* Background Stack Layer 1 (Tilted Left) */}
                <motion.div
                  className="absolute inset-0 rounded-[32px] border border-white/5 bg-neutral-950/40 backdrop-blur-sm -rotate-6 scale-[0.96] origin-center shadow-xl shadow-black/80"
                  whileHover={{ rotate: -2, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />

                {/* Background Stack Layer 2 (Tilted Right) */}
                <motion.div
                  className="absolute inset-0 rounded-[32px] border border-white/10 bg-neutral-900/10 rotate-3 scale-[0.98] origin-center shadow-lg"
                  whileHover={{ rotate: 1, scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />

                {/* Foreground Image Card */}
                <motion.div
                  className="relative w-full h-full rounded-[32px] overflow-hidden border border-white/15 shadow-2xl -rotate-3 hover:rotate-0 hover:scale-[1.02] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 group/photo cursor-pointer"
                >
                  <img
                    src="/images/profile/harshit.jpg"
                    alt="Harshit Waldia"
                    className="w-full h-full object-cover grayscale-[15%] group-hover/photo:grayscale-0 group-hover/photo:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Overlay vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/10 to-transparent opacity-65 group-hover/photo:opacity-45 transition-opacity duration-500" />

                  {/* Border highlight on hover */}
                  <div className="absolute inset-0 rounded-[32px] border border-white/0 group-hover/photo:border-white/10 transition-colors duration-500" />
                </motion.div>

                {/* Glowing aura under the entire card stack */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-violet-500/10 to-pink-500/10 blur-3xl rounded-full opacity-60 pointer-events-none" />
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useId, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Reveal, EASE_APPLE } from "@/components/ui/reveal";
import bgImage from "@/assets/33028823_7955007.jpg";

/* ─── Tag → icon map ──────────────────────────────────────────────
   Tags without a matching icon fall back to a small colored dot. */
const TAG_ICONS: Record<string, string> = {
  "NEXT.JS": "/icons/nextjs.svg",
  REACT: "https://cdn.simpleicons.org/react",
  TYPESCRIPT: "/icons/typescript.svg",
  "TAILWIND CSS": "/icons/tailwindcss.svg",
  "DRIZZLE ORM": "/icons/drizzle.svg",
  "MOTION.DEV": "/icons/motion.svg",
  "SHADCN UI": "/icons/shadcn-ui.svg",
  ZOD: "/icons/zod.svg",
  "TANSTACK QUERY": "/icons/react-query.svg",
  ZUSTAND: "/icons/zustand.svg",
  "EXPRESS.JS": "/icons/expressjs.svg",
  EXPRESS: "https://cdn.simpleicons.org/express/ffffff",
  BUN: "/icons/bun.svg",
  MONGODB: "https://cdn.simpleicons.org/mongodb",
  RAZORPAY: "/icons/razorpay.svg",
  TURBOREPO: "/icons/turborepo.svg",
  DOCKER: "/icons/docker.svg",
  JWT: "https://cdn.simpleicons.org/jsonwebtokens",
  QRCODE: "https://cdn.simpleicons.org/qrcode/ffffff",
  NODEMAILER: "https://cdn.simpleicons.org/nodemailer",
  TWILIO: "https://cdn.simpleicons.org/twilio",
  WINSTON: "https://cdn.simpleicons.org/winston/ffffff",
  "REDUX TOOLKIT": "https://cdn.simpleicons.org/redux",
  "SOCKET.IO": "https://cdn.simpleicons.org/socketdotio/ffffff",
  "PASSPORT.JS": "https://cdn.simpleicons.org/passport/ffffff",
  CLOUDINARY: "https://cdn.simpleicons.org/cloudinary",
  "NODE.JS": "https://cdn.simpleicons.org/nodedotjs",
  HELMET: "https://cdn.simpleicons.org/helmet/ffffff",
  SHARP: "https://cdn.simpleicons.org/sharp/ffffff",
};

interface Project {
  id: string;
  name: string;
  role?: string;
  period?: string;
  description: string;
  githubUrl?: string;
  cardText: string;
  image?: string;
  bullets: string[];
  tags: string[];
  accent: "violet" | "blue" | "red";
  mockupKey?: string;
}

const PROJECTS: Project[] = [
  {
    id: "nda-pop",
    name: "National Defense Academy",
    role: "Lead Developer",
    period: "Jun 2026 - Jul 2026",
    description: "Developed an end-to-end visitor entry system for NDA's Passing Out Parade, managing invitation-code-based guest onboarding, pavilion/zone seat allotment, and gate-level entry-exit control for large-scale ceremonial events.",
    cardText: "NDA Passing Out Parade — Visitor Entry, Seating Allotment & Gate Access Control",
    image: "/nda-pop.png",
    bullets: [
      "Designed a stadium seating system with VIP/general zone segregation, row-column seat mapping per pavilion, and role-based booking rules (officer/cadet/guest), incorporating quota, cooldown, and approval workflows to prevent duplicate or conflicting allotments.",
      "Engineered a tamper-proof QR ticketing system using HMAC-signed and AES-256-encrypted payloads, featuring scan-count-based automatic entry/exit detection and real-time gate check-in logging across multiple pavilions.",
      "Implemented OTP-based identity verification (email + SMS via Nodemailer/Twilio) at booking and check-in stages, with attempt-limiting and expiry handling to secure the guest onboarding flow."
    ],
    tags: ["EXPRESS", "MONGODB", "JWT", "QRCODE", "NODEMAILER", "TWILIO", "REACT", "WINSTON"],
    accent: "blue",
    mockupKey: "nda-pop",
  },
  {
    id: "farmflow",
    name: "FarmFlow",
    role: "Lead Developer",
    period: "Jun 2026 - Jul 2026",
    description: "Architected a full-stack B2B marketplace to connect farm suppliers and buyers, featuring role-based dashboards, product catalog management, and order lifecycle tracking using a normalized MongoDB schema.",
    githubUrl: "https://github.com/Harshit/farmflow",
    cardText: "FarmFlow — B2B Agricultural Marketplace & Inventory Platform",
    bullets: [
      "Implemented JWT access/refresh token authentication and Google OAuth (Passport.js), utilizing RBAC middleware to enforce supplier, buyer, and admin permission boundaries across all API routes.",
      "Developed a heuristic demand-forecasting and smart-restocking engine that analyzes 30-day sales history per supplier to identify low-stock/out-of-stock risks and recommend reorder quantities, alongside a category-based recommendation engine for buyers based on order history.",
      "Designed a supplier/buyer analytics service using MongoDB aggregation pipelines to provide real-time revenue, order, and customer segmentation dashboards (VIP/Regular/New buyer tiers) with 6-month sales trend charts.",
      "Integrated Razorpay for order payments, Socket.IO (JWT-authenticated, room-scoped) for real-time order and notification updates, and Cloudinary + Sharp for image processing; enhanced API security with Helmet, rate limiting, Mongo sanitization, and HPP protection."
    ],
    tags: ["EXPRESS", "MONGODB", "REACT", "REDUX TOOLKIT", "SOCKET.IO", "RAZORPAY", "PASSPORT.JS", "CLOUDINARY", "NODE.JS", "JWT", "HELMET", "SHARP", "TYPESCRIPT", "TAILWIND CSS"],
    accent: "red",
    mockupKey: "farmflow",
  },
  {
    id: "keyflow",
    name: "KeyFlow",
    description: "A typing test where every key has its own sound. Per-key mechanical audio via Web Audio API, four test modes, statistical anti-cheat, and a fully offline PWA — built to make typing feel physical.",
    githubUrl: "https://github.com/Harshit/keyflow",
    cardText: "KeyFlow meets typing test — every key has its own sound, every stat tracked",
    bullets: [
      "Per-key mechanical audio from a single OGG sprite — decoded once, sliced per-keystroke via Web Audio API.",
      "Four modes (timed, word count, quotes, zen) with live WPM, accuracy, and consistency tracking.",
      "Statistical anti-cheat: 13 checks for bot patterns, AFK gaps, and impossible burst spikes.",
      "Offline-first PWA — all state in localStorage, Serwist precaching, works without a connection."
    ],
    tags: ["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND CSS", "DRIZZLE ORM", "MOTION.DEV", "SHADCN UI", "WEB-AUDIO-API", "SERWIST", "ZOD", "RECHARTS"],
    accent: "violet",
    mockupKey: "keyflow",
  }

];

const ACCENT_STYLES = {
  violet: {
    gradient: "from-pink-500/35 via-pink-600/10 to-orange-500/25 border border-white/10 hover:border-pink-500/60 hover:from-pink-500/80 hover:via-pink-500/30 hover:to-orange-500/65",
    shadow: "shadow-pink-500/5 hover:shadow-[0_0_60px_rgba(236,72,153,0.5)]",
    mockBorder: "group-hover/card:border-pink-500/30",
    bullet: "text-violet-400",
  },
  blue: {
    gradient: "from-blue-500/35 via-blue-600/10 to-indigo-500/25 border border-white/10 hover:border-blue-500/60 hover:from-blue-500/80 hover:via-blue-500/30 hover:to-indigo-500/65",
    shadow: "shadow-blue-500/5 hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]",
    mockBorder: "group-hover/card:border-blue-500/30",
    bullet: "text-blue-400",
  },
  red: {
    gradient: "from-red-500/35 via-red-600/10 to-rose-500/25 border border-white/10 hover:border-red-500/60 hover:from-red-500/80 hover:via-red-500/30 hover:to-rose-500/65",
    shadow: "shadow-red-500/5 hover:shadow-[0_0_60px_rgba(239,68,68,0.5)]",
    mockBorder: "group-hover/card:border-red-500/30",
    bullet: "text-red-400",
  },
};

const projectMockups: Record<string, () => ReactNode> = {
  "nda-pop": () => (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#091407]">
      <img src="/nda-pop.png" alt="NDA POP System Overview" className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover/card:scale-105" />
    </div>
  ),
  keyflow: () => (
    <>
      {/* Browser top-bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold font-mono text-orange-300 tracking-wider">keyflow ⌨️</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded bg-white/5 text-[8px] text-white/40 font-mono">Audio: On</div>
          <div className="px-2 py-0.5 rounded bg-white/5 text-[8px] text-white/40 font-mono">Settings</div>
        </div>
      </div>

      {/* Typing test words preview */}
      <div className="text-left text-xs font-mono text-white/30 leading-relaxed mb-4 line-clamp-3 select-none">
        now show then up who make any present you should become develop order program another down over number too need see she year however to well and each move stand late much just again both state life turn a out many only
      </div>

      {/* Mock Keyboard Layout */}
      <div className="w-full bg-neutral-900/50 border border-white/5 rounded-xl p-2.5 flex flex-col gap-1.5">
        {/* Keyboard Row 1 */}
        <div className="flex gap-1 justify-center">
          <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-[7px] text-white font-bold shadow">esc</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">1</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">2</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">3</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">4</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">5</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">6</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">7</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">8</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">9</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">0</div>
        </div>
        {/* Keyboard Row 2 */}
        <div className="flex gap-1 justify-center pl-2">
          <div className="w-7 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/40 font-bold shadow">tab</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/80 font-bold shadow">Q</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/80 font-bold shadow">W</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/80 font-bold shadow">E</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/80 font-bold shadow">R</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/80 font-bold shadow">T</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/80 font-bold shadow">Y</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/80 font-bold shadow">U</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/80 font-bold shadow">I</div>
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-[7px] text-white/80 font-bold shadow">O</div>
        </div>
        {/* Keyboard Row 3 */}
        <div className="flex gap-1 justify-center">
          <div className="w-24 h-6 rounded bg-neutral-700/80 border border-white/5 flex items-center justify-center text-[6px] text-white/50 font-bold shadow">space</div>
        </div>
      </div>
    </>
  ),
  farmflow: () => (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#120303]">
      <img src="/farmflow.png" alt="FarmFlow Marketplace Overview" className="w-full h-full object-contain object-top transition-transform duration-700 ease-out group-hover/card:scale-105" />
    </div>
  ),
};

/* ─── Tech stack row — types itself out as it scrolls into view ─── */
function TechStack({ tags, accent = "violet" }: { tags: string[]; accent?: "violet" | "blue" | "red" }) {
  const dot = accent === "violet" ? "bg-violet-400" : accent === "blue" ? "bg-blue-400" : "bg-red-400";
  const cursor = accent === "violet" ? "bg-violet-400" : accent === "blue" ? "bg-blue-400" : "bg-red-400";

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, x: -8, filter: "blur(3px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.35, ease: EASE_APPLE },
    },
  };

  return (
    <motion.div
      className="flex flex-wrap items-center gap-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      {tags.map((t) => (
        <motion.span
          key={t}
          variants={item}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold rounded bg-neutral-900 border border-white/5 text-white/40 tracking-wider"
        >
          {TAG_ICONS[t] ? (
            <img src={TAG_ICONS[t]} alt="" className="w-3.5 h-3.5 shrink-0 object-contain" />
          ) : (
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
          )}
          {t}
        </motion.span>
      ))}
      {/* blinking "typing" cursor that lands after the last tag */}
      <motion.span
        variants={item}
        aria-hidden
        className={`inline-block w-[2px] h-3 rounded-full ${cursor} animate-[blink_0.8s_step-end_infinite]`}
      />
    </motion.div>
  );
}

/* ─── Masked line reveal for headings — slides up from behind itself ─── */
function RevealText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: EASE_APPLE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function CuratedWork() {
  return (
    <section id="work" className="py-16 bg-[#070708] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-20"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <Reveal y={20} className="text-center mb-14 flex flex-col items-center gap-3">
          <div>
            <p
              className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-widest animate-[shimmer_3s_linear_infinite]"
              style={{ animationDuration: '3s' }}
            >
              CASE STUDIES
            </p>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15]"
            style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
          >
            Curated{" "}
            <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
              Work
            </span>
          </h2>
        </Reveal>

        {/* Projects List */}
        <div className="space-y-32">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            const style = ACCENT_STYLES[project.accent];
            const renderMockup = projectMockups[project.mockupKey || ""] || (() => null);

            const CardWrapper = project.githubUrl ? "a" : "div";
            const wrapperProps = project.githubUrl
              ? { href: project.githubUrl, target: "_blank", rel: "noreferrer" }
              : {};

            return (
              <div key={project.id} id={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left/Right Card: Graphic screenshot */}
                <Reveal y={30} index={0} className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
                  <CardWrapper
                    {...wrapperProps}
                    className={`group/card block relative w-full aspect-[4/3] rounded-3xl p-6 bg-gradient-to-br ${style.gradient} transition-all duration-500 shadow-2xl ${style.shadow} overflow-hidden ${project.githubUrl ? "cursor-pointer" : "cursor-default"} hover:-translate-y-3 hover:brightness-125 will-change-transform`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                  >
                    {/* Text banner in card */}
                    <div className="flex justify-between items-start mb-6">
                      <p
                        className="text-lg sm:text-xl font-medium text-white max-w-[85%] leading-snug transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-0.5"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {project.cardText}
                      </p>
                      {project.githubUrl && (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white opacity-60 group-hover/card:opacity-100 group-hover/card:bg-white/20 group-hover/card:rotate-45 transition-all duration-500">
                          <ArrowUpRight size={16} />
                        </div>
                      )}
                    </div>

                    {/* Mock Browser/App Interface */}
                    <div className={`w-full h-full glass rounded-2xl shadow-2xl p-2.5 flex flex-col justify-between overflow-hidden relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-3 group-hover/card:scale-[1.02] ${style.mockBorder}`}>
                      {renderMockup()}
                    </div>
                  </CardWrapper>
                </Reveal>

                {/* Right/Left Details */}
                <Reveal y={30} index={1} className={`lg:col-span-6 text-left flex flex-col justify-center ${isEven ? "" : "lg:order-1"}`}>
                  {/* Role & Period Header Badge */}
                  {project.role && (
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-sm">
                        {project.role}
                      </span>
                      {project.period && (
                        <span className="text-xs font-mono text-white/50">
                          {project.period}
                        </span>
                      )}
                    </div>
                  )}

                  <h3
                    className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-4 leading-snug font-instrument-serif bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-transparent select-none animate-[shimmer_3s_linear_infinite]"
                    style={{
                      textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)",
                      animationDuration: '3s'
                    }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6 font-light">
                    {project.description}
                  </p>

                  {/* Cascading bullet list */}
                  <div className="space-y-3.5 mb-8">
                    {project.bullets.map((bullet, i) => (
                      <Reveal key={bullet} y={16} index={i} stagger={0.1} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                        <span className={`${style.bullet} mt-0.5 shrink-0`}>✦</span>
                        <span>{bullet}</span>
                      </Reveal>
                    ))}
                  </div>

                  {/* Dynamic Tech tags */}
                  <TechStack
                    accent={project.accent}
                    tags={project.tags}
                  />
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* See All Projects Button */}
        <div className="flex justify-center mt-20">
          <Reveal y={15} duration={0.6}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-white/[0.02] group"
            >
              See All Projects
              <ArrowUpRight size={16} className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
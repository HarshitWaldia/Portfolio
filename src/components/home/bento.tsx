import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import portraitImg from "@/assets/me.png";

const GlobeArcs = lazy(() => import("./globe-arcs"));

const CARD =
  "flex flex-col justify-between rounded-[28px] glass glass-hover relative overflow-hidden";

/* ═══════════════════════════════════════════════════════════
   1. LET'S BUILD TOGETHER — overlapping rings + center avatar
   ═══════════════════════════════════════════════════════════ */

function RingAvatar({ size = 30 }: { size?: number }) {
  return (
    <div
      className="rounded-full overflow-hidden shrink-0"
      style={{
        width: size,
        height: size,
        border: "1.5px solid rgba(255,255,255,0.14)",
        background:
          "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.14), rgba(20,20,26,0.98))",
        boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}
    >
      <svg viewBox="0 0 40 42" width="100%" height="100%" fill="none">
        <circle cx="20" cy="15" r="9" fill="rgba(255,255,255,0.16)" />
        <ellipse cx="20" cy="36" rx="14" ry="9" fill="rgba(255,255,255,0.1)" />
      </svg>
    </div>
  );
}

function BlankAvatar({ className }: { className?: string }) {
  return (
    <div className={`rounded-full border border-white/10 bg-[#121215] flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 text-white/20" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );
}

const secondaryAvatars = [
  { left: "13.4%", top: "27.9%" }, // Ring 1 Top-Left
  { left: "35.4%", top: "22.9%" }, // Ring 2 Top-Left
  { left: "35.4%", top: "77.1%" }, // Ring 2 Bottom-Left
  { left: "64.6%", top: "77.1%" }, // Ring 3 Bottom-Right
  { left: "84.6%", top: "22.9%" }, // Ring 4 Top-Right
];

function LetsBuildTogetherCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${CARD} h-full p-6 flex flex-col justify-center items-center group cursor-default relative overflow-hidden`}
      style={{
        background: "radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.12) 0%, rgba(220, 38, 38, 0.03) 50%, rgba(13, 13, 15, 0.96) 100%)",
        borderColor: "rgba(239, 68, 68, 0.15)",
      }}
    >
      {/* Futuristic Red Ambient Glow */}
      <div className="absolute -top-16 -right-8 w-56 h-56 rounded-full bg-gradient-to-br from-red-500/20 via-red-600/10 to-transparent blur-[55px] pointer-events-none" />

      {/* Typography Header Content at the Top (Absolute Positioned) */}
      <div className="absolute top-6 left-6 right-6 flex flex-col items-center text-center z-30">
        <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-red-400/70 uppercase">
          Let's build together
        </span>
        <h2
          className="mt-1.5 max-w-sm text-lg sm:text-xl font-medium leading-snug text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Clear communication, fast iterations, no surprises
        </h2>
      </div>

      {/* Interlocking Rings Background Container - Restored to Centered Position & Slightly Lowered */}
      <div className="relative flex items-center justify-center mt-5 select-none -mx-6 w-[calc(100%+48px)] z-10 translate-y-3">
        <svg
          viewBox="0 0 800 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[920px] min-w-[920px] max-w-none transition-all duration-500 overflow-visible"
          style={{
            opacity: isHovered ? 0.9 : 0.4,
            filter: isHovered
              ? "drop-shadow(0 0 14px rgba(239,68,68,0.35)) drop-shadow(0 0 6px rgba(220,38,38,0.2))"
              : "none"
          }}
        >
          {/* Outer Thick Glowing Ring Paths */}
          <g stroke="url(#ringGradient)" strokeWidth="4" strokeLinecap="round" opacity={isHovered ? 0.55 : 0.15} className="transition-all duration-500">
            <circle cx="160" cy="120" r="75" />
            <circle cx="320" cy="120" r="75" />
            <circle cx="480" cy="120" r="75" />
            <circle cx="640" cy="120" r="75" />
          </g>

          {/* Main Concentric Matte Wireframes */}
          <g stroke={isHovered ? "rgba(99, 102, 241, 0.38)" : "#27272a"} strokeWidth="2" fill="none" className="transition-all duration-500">
            {/* Loop 1 */}
            <circle cx="160" cy="120" r="70" />
            <circle cx="160" cy="120" r="80" />
            {/* Loop 2 */}
            <circle cx="320" cy="120" r="70" />
            <circle cx="320" cy="120" r="80" />
            {/* Loop 3 */}
            <circle cx="480" cy="120" r="70" />
            <circle cx="480" cy="120" r="80" />
            {/* Loop 4 */}
            <circle cx="640" cy="120" r="70" />
            <circle cx="640" cy="120" r="80" />
          </g>

          {/* Wave Intersections Connectors Overlay */}
          <path d="M 233 80 Q 240 120 247 160" stroke={isHovered ? "rgba(59, 130, 246, 0.3)" : "#27272a"} strokeWidth="2" className="transition-all duration-500" />
          <path d="M 393 80 Q 400 120 407 160" stroke={isHovered ? "rgba(59, 130, 246, 0.3)" : "#27272a"} strokeWidth="2" className="transition-all duration-500" />
          <path d="M 553 80 Q 560 120 567 160" stroke={isHovered ? "rgba(59, 130, 246, 0.3)" : "#27272a"} strokeWidth="2" className="transition-all duration-500" />

          {/* Centered Profile Avatar - Larger Size */}
          <foreignObject x="352" y="72" width="96" height="96" className="overflow-visible">
            <motion.div
              className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-zinc-800 bg-[#0d0d0e] p-1.5 shadow-[0_0_35px_rgba(0,0,0,0.85)]"
              animate={{
                scale: isHovered ? 1.06 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Inner Ring Accent Container */}
              <div className="h-full w-full overflow-hidden rounded-full border border-zinc-700/50 bg-zinc-900">
                <img
                  src="/images/profile/harshit.jpg"
                  alt="Harshit Waldia"
                  className="h-full w-full object-cover grayscale-[15%] contrast-[110%]"
                />
              </div>

              {/* Ping Indicator */}
              <span className="absolute right-1.5 top-1.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </motion.div>
          </foreignObject>

          {/* Staggered Secondary Real Member Avatars - Only visible on hover with staggered pop up */}
          {/* 1. Ring 1 Top-Left (x:83, y:43) */}
          <foreignObject x="83" y="43" width="48" height="48" className="overflow-visible">
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.08 : 0.6 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.02 }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-white/30 shadow-2xl overflow-hidden bg-neutral-900 ring-2 ring-red-500/20">
                <img src="/images/friends/jatin-pant.jpg" alt="Jatin Pant" className="w-full h-full object-cover object-center" />
              </div>
            </motion.div>
          </foreignObject>

          {/* 2. Ring 2 Top-Left (x:258.5, y:31) */}
          <foreignObject x="258.5" y="31" width="48" height="48" className="overflow-visible">
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.08 : 0.6 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.06 }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-white/30 shadow-2xl overflow-hidden bg-neutral-900 ring-2 ring-red-500/20">
                <img src="/images/friends/priyanshu-shahi.jpg" alt="Priyanshu Shahi" className="w-full h-full object-cover object-center" />
              </div>
            </motion.div>
          </foreignObject>

          {/* 3. Ring 2 Bottom-Left (x:258.5, y:161) */}
          <foreignObject x="258.5" y="161" width="48" height="48" className="overflow-visible">
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.08 : 0.6 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.10 }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-white/30 shadow-2xl overflow-hidden bg-neutral-900 ring-2 ring-red-500/20">
                <img src="/images/friends/ritesh-singh.jpg" alt="Ritesh Singh" className="w-full h-full object-cover object-center" />
              </div>
            </motion.div>
          </foreignObject>

          {/* 4. Ring 3 Bottom-Right (x:493.5, y:161) */}
          <foreignObject x="493.5" y="161" width="48" height="48" className="overflow-visible">
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.08 : 0.6 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.14 }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-white/30 shadow-2xl overflow-hidden bg-neutral-900 ring-2 ring-red-500/20">
                <img src="/images/friends/shivam-sah.jpg" alt="Shivam Sah" className="w-full h-full object-cover object-center" />
              </div>
            </motion.div>
          </foreignObject>

          {/* 5. Ring 4 Top-Right (x:653.5, y:31) */}
          <foreignObject x="653.5" y="31" width="48" height="48" className="overflow-visible">
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.08 : 0.6 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.18 }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-white/30 shadow-2xl overflow-hidden bg-neutral-900 ring-2 ring-red-500/20">
                <img src="/images/friends/udit-joshi.jpg" alt="Udit Joshi" className="w-full h-full object-cover object-center" />
              </div>
            </motion.div>
          </foreignObject>

          {/* Gradients */}
          <defs>
            <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={isHovered ? "#ef4444" : "#3f3f46"} />
              <stop offset="50%" stopColor={isHovered ? "#f87171" : "#ffffff"} />
              <stop offset="100%" stopColor={isHovered ? "#ef4444" : "#3f3f46"} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. TECH STACK — infinite marquee rows + magnifier lens
   ═══════════════════════════════════════════════════════════ */

type Tech = { name: string; icon: string };

const TECH_ROWS: Tech[][] = [
  [
    { name: "Python", icon: "/icons/python.svg" },
    { name: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
    { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
    { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain/1C3C3C" },
    { name: "Groq", icon: "/icons/groq.svg" },
    { name: "Hugging Face", icon: "https://cdn.simpleicons.org/huggingface/FFD21E" },
    { name: "OpenCV", icon: "https://cdn.simpleicons.org/opencv/5C3EE8" },
    { name: "YOLO", icon: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
  ],
  [
    { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688" },
    { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
    { name: "FAISS", icon: "https://cdn.simpleicons.org/meta/0467DF" },
    { name: "Docker", icon: "/icons/docker.svg" },
    { name: "Streamlit", icon: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
    { name: "Scikit-Learn", icon: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
    { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00599C" },
    { name: "Redis", icon: "/icons/redis.svg" },
  ],
  [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
    { name: "AWS", icon: "/icons/aws.svg" },
    { name: "Cloudflare", icon: "/icons/cloudflare.svg" },
  ],
  [
    { name: "Git", icon: "/icons/git.svg" },
    { name: "GitHub", icon: "/icons/github.svg" },
    { name: "Linux", icon: "/icons/linux.svg" },
    { name: "Jupyter", icon: "https://cdn.simpleicons.org/jupyter/F37626" },
    { name: "REST APIs", icon: "https://cdn.simpleicons.org/fastapi/009688" },
    { name: "RAG Systems", icon: "https://cdn.simpleicons.org/langchain/1C3C3C" },
    { name: "Vector DBs", icon: "https://cdn.simpleicons.org/meta/0467DF" },
    { name: "Bash", icon: "/icons/bash.svg" },
  ],
];
const ROW_DIRS: (1 | -1)[] = [1, -1, 1, -1];
const SPEED = 22; // px/sec
const ZOOM = 1.75;
const LENS = 84;

function Pill({ tech, bright }: { tech: Tech; bright?: boolean }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0"
      style={{
        border: bright ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.06)",
        background: bright ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
      }}
    >
      <img src={tech.icon} alt="" className="w-3.5 h-3.5 object-contain shrink-0" draggable={false} />
      <span className={`text-[11px] font-semibold ${bright ? "text-white" : "text-white/55"}`}>
        {tech.name}
      </span>
    </div>
  );
}

function TechMagnifier() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensContainerRef = useRef<HTMLDivElement>(null);
  const lensContentRef = useRef<HTMLDivElement>(null);
  const baseTrackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lensTrackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const widthRefs = useRef<number[]>([]);
  const distances = useRef<number[]>(TECH_ROWS.map(() => 0));
  const [isHovered, setIsHovered] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  // Raw mouse coordinates relative to the container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out coordinate tracking for natural trailing physics
  const springConfig = { damping: 25, stiffness: 220, mass: 0.4 };
  const glassX = useSpring(mouseX, springConfig);
  const glassY = useSpring(mouseY, springConfig);

  useEffect(() => {
    function measure() {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setDims({ w: rect.width, h: rect.height });
      widthRefs.current = baseTrackRefs.current.map((el) => (el ? el.scrollWidth / 2 : 0));
    }
    measure();
    window.addEventListener("resize", measure);

    let raf: number;
    let last = performance.now();
    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Update base and lens scrolling positions
      TECH_ROWS.forEach((_, i) => {
        const single = widthRefs.current[i] || 1;
        distances.current[i] = (distances.current[i] + ROW_DIRS[i] * SPEED * dt + single) % single;
        const x = ROW_DIRS[i] === 1 ? -distances.current[i] : distances.current[i] - single;
        const t = `translateX(${x}px)`;
        if (baseTrackRefs.current[i]) baseTrackRefs.current[i]!.style.transform = t;
        if (lensTrackRefs.current[i]) lensTrackRefs.current[i]!.style.transform = t;
      });

      // Synchronize clipping circular mask and scaled transform offset at 60fps
      const cx = glassX.get() + 52; // lens center is at cx=52 in 128x128 viewBox
      const cy = glassY.get() + 52;

      if (lensContainerRef.current) {
        lensContainerRef.current.style.clipPath = `circle(37px at ${cx}px ${cy}px)`;
      }
      if (lensContentRef.current) {
        const tx = -cx * (ZOOM - 1);
        const ty = -cy * (ZOOM - 1);
        lensContentRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${ZOOM})`;
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [glassX, glassY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Shift coordinates by 52px so lens center (52, 52) aligns exactly with cursor tip
    mouseX.set(e.clientX - rect.left - 52);
    mouseY.set(e.clientY - rect.top - 52);
  };

  const rowH = dims.h / TECH_ROWS.length || 0;

  const renderRows = (refArr: React.MutableRefObject<(HTMLDivElement | null)[]>, bright: boolean) =>
    TECH_ROWS.map((row, ri) => (
      <div
        key={ri}
        className="absolute left-0 w-full overflow-hidden"
        style={{ top: ri * rowH, height: rowH }}
      >
        <div
          ref={(el) => {
            refArr.current[ri] = el;
          }}
          className="flex items-center gap-2 h-full"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {[...row, ...row].map((tech, i) => (
            <Pill key={i} tech={tech} bright={bright} />
          ))}
        </div>
      </div>
    ));

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-full overflow-hidden cursor-none select-none"
    >
      {/* Background normal rows */}
      {renderRows(baseTrackRefs, false)}

      {/* Magnified zoom layer rows */}
      <div
        ref={lensContainerRef}
        className="pointer-events-none absolute inset-0 w-full h-full transition-opacity duration-150"
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <div
          ref={lensContentRef}
          className="absolute inset-0 w-full h-full origin-top-left"
        >
          {renderRows(lensTrackRefs, true)}
        </div>
      </div>

      {/* Premium Specular Magnifying Glass SVG Chassis Overlay */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-32 w-32 drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)]"
        style={{
          x: glassX,
          y: glassY,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.15 } }}
      >
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          {/* Handle Shadow Layer */}
          <path d="M78 78 L114 114" stroke="rgba(0,0,0,0.4)" strokeWidth="14" strokeLinecap="round" />
          {/* Diagonal Grip Handle */}
          <path d="M76 76 L112 112" stroke="#3A3A3C" strokeWidth="12" strokeLinecap="round" />
          <path d="M84 84 L106 106" stroke="#545456" strokeWidth="8" strokeLinecap="round" />
          {/* Bottom Metallic Handle Tip */}
          <path d="M109 109 L113 113" stroke="#E5E5EA" strokeWidth="12" strokeLinecap="round" />

          {/* Outer Rim Outer Border */}
          <circle cx="52" cy="52" r="46" fill="none" stroke="#8E8E93" strokeWidth="1.5" />
          {/* Main Specular Silver Ring Metal Chassis */}
          <circle cx="52" cy="52" r="42" fill="none" stroke="url(#metallicGradient)" strokeWidth="7" />
          {/* Inner Dark Rim Accent */}
          <circle cx="52" cy="52" r="38" fill="none" stroke="#1C1C1E" strokeWidth="1" />

          {/* Convex Lens Glass Reflection Overlay */}
          <circle cx="52" cy="52" r="37" fill="rgba(255,255,255,0.03)" />
          <path d="M24 30 A 32 32 0 0 1 74 24" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Gradient definitions for chrome border effect */}
          <defs>
            <linearGradient id="metallicGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#AEAEB2" />
              <stop offset="30%" stopColor="#E5E5EA" />
              <stop offset="50%" stopColor="#7C7C80" />
              <stop offset="75%" stopColor="#F2F2F7" />
              <stop offset="100%" stopColor="#636366" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-10 pointer-events-none z-30"
        style={{ background: "linear-gradient(to right, #0d0d0f, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-10 pointer-events-none z-30"
        style={{ background: "linear-gradient(to left, #0d0d0f, transparent)" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. WHAT YOU GET — animated drop-in pills over a box
   ═══════════════════════════════════════════════════════════ */

const DROP_ITEMS = [
  { label: "Zero Hand-Holding", sub: "I own the problem end to end" },
  { label: "Scales With You", sub: "Built to handle your next 10x" },
  { label: "Code You Keep", sub: "Readable, documented, yours" },
  { label: "SEO & AEO", sub: "SSR, SSG, semantic, crawlable" },
  { label: "Pixel-Perfect UI", sub: "Designer-accurate, every pixel" },
  { label: "Clear Updates", sub: "Progress you can actually track" },
];

function DropBox() {
  const [idx, setIdx] = useState(0);
  const [stage, setStage] = useState<"drop" | "rest" | "exit">("drop");

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    function cycle() {
      setStage("drop");
      t1 = setTimeout(() => setStage("rest"), 600);
      t2 = setTimeout(() => {
        setStage("exit");
        setTimeout(() => {
          setIdx((n) => (n + 1) % DROP_ITEMS.length);
          cycle();
        }, 300);
      }, 2500);
    }
    cycle();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const item = DROP_ITEMS[idx];

  return (
    <div className="relative w-full flex flex-col items-center justify-end" style={{ height: 185 }}>
      {/* Ambient glow under the box */}
      <div className="absolute bottom-1 w-64 h-16 rounded-full bg-violet-500/[0.12] blur-[30px] pointer-events-none" />

      {/* Floating container */}
      <motion.div
        className="relative w-[320px]"
        style={{ height: 160 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* BACK WALLS SVG */}
        <svg
          viewBox="0 0 400 200"
          fill="none"
          className="absolute inset-0 h-full w-full pointer-events-none z-0"
        >
          {/* Inner Back/Bottom Walls */}
          <path d="M100 85 L130 70 L270 70 L300 85 Z" fill="white" fillOpacity="0.015" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
          {/* Left Flap */}
          <path d="M100 70 L30 50 L60 90 L100 85 Z" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.10" strokeWidth="1" />
          {/* Right Flap */}
          <path d="M300 70 L370 50 L340 90 L300 85 Z" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.10" strokeWidth="1" />
        </svg>

        {/* FALLING CARD */}
        <motion.div
          key={`${idx}-${stage}`}
          initial={
            stage === "drop"
              ? { y: -180, opacity: 0, scale: 0.85 }
              : stage === "rest"
                ? { y: 55, opacity: 1, scale: 1 }
                : { y: 55, opacity: 1, scale: 1 }
          }
          animate={
            stage === "drop"
              ? { y: 55, opacity: 1, scale: 1 }
              : stage === "rest"
                ? { y: 55, opacity: 1, scale: 1 }
                : { y: 140, opacity: 0, scale: 0.95 }
          }
          transition={{
            duration: stage === "drop" ? 0.6 : 0.25,
            ease: stage === "drop" ? [0.16, 1, 0.3, 1] : "easeOut",
          }}
          className="absolute w-[140px] px-2.5 py-2.5 rounded-xl flex items-start gap-1.5 z-10 border border-white/10 bg-[#0f0f12] shadow-2xl"
          style={{
            left: "calc(50% - 70px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
          }}
        >
          <div className="mt-0.5 w-2.5 h-2.5 rounded border border-white/20 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-sm bg-amber-400" />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-[9.5px] font-bold text-white/90 leading-tight truncate">{item.label}</p>
            <p className="text-[8px] text-white/40 mt-0.5 leading-tight truncate">{item.sub}</p>
          </div>
        </motion.div>

        {/* FRONT WALLS SVG (drawn on top of the card) */}
        <svg
          viewBox="0 0 400 200"
          fill="none"
          className="absolute inset-0 h-full w-full pointer-events-none z-20 drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
        >
          {/* Front Left Flap Dropdown */}
          <path d="M100 85 L40 140 L65 140 L100 85" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
          {/* Front Right Flap Dropdown */}
          <path d="M300 85 L360 140 L335 140 L300 85" fill="white" fillOpacity="0.02" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
          {/* Front Main Facing Wall */}
          <rect x="100" y="85" width="200" height="115" rx="2" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
          {/* Left Main Side Wall Accent */}
          <path d="M100 85 L100 200 L101 200 L101 85 Z" fill="white" fillOpacity="0.15" />
          {/* Right Main Side Wall Accent */}
          <path d="M300 85 L300 200 L299 200 L299 85 Z" fill="white" fillOpacity="0.15" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. USES — favourite tools grid
   ═══════════════════════════════════════════════════════════ */

const TOOLS = [
  { name: "Figma", icon: "/icons/figma.svg", c1: "#f24e1e" },
  { name: "Claude", icon: "/icons/claude.svg", c1: "#da7756" },
  { name: "Ghostty", icon: "/icons/ghostty.svg", c1: "#3551f3" },
  { name: "Arc", icon: "/icons/arc.svg", c1: "#cc5de8" },
  { name: "Zed", icon: "/icons/zed.svg", c1: "#3b9dd8" },
  { name: "Raycast", icon: "/icons/raycast.svg", c1: "#ff6b35" },
];

function ToolTile({ tool }: { tool: (typeof TOOLS)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="relative flex flex-col items-center justify-center gap-1.5 rounded-2xl overflow-hidden cursor-default"
      style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", height: 64 }}
    >
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 50% 30%, ${tool.c1}33, transparent 70%)` }}
      />
      <img src={tool.icon} alt={tool.name} className="w-5 h-5 object-contain relative z-10" draggable={false} />
      <span className="text-[9px] font-semibold text-white/55 relative z-10">{tool.name}</span>
    </motion.div>
  );
}

const COLORS = {
  bgDeep: "#040611",
  bgNavy: "#0b1330",
  bgNavy2: "#111d45",
  gridLine: "rgba(255,255,255,0.10)",
  textWhite: "#f5f6f8",
  textDim: "#aab0c4",
};

function AboutMeCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const xLine1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const xLine2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <Link to="/about" className="block h-full group">
      <div
        ref={cardRef}
        className={`${CARD} h-full p-6 flex flex-col justify-end hover:border-white/12 transition-colors duration-300 relative`}
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, ${COLORS.bgNavy2} 0%, ${COLORS.bgNavy} 45%, ${COLORS.bgDeep} 100%)`,
        }}
      >
        {/* wavy grid background */}
        <div
          className="absolute inset-0 opacity-45 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${COLORS.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.gridLine} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at 50% 50%, #000 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, #000 60%, transparent 100%)",
          }}
        />

        {/* sunset gradient glow overlay */}
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gradient-to-br from-pink-500/15 via-orange-500/10 to-yellow-500/5 blur-[60px] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(236,72,153,0.02) 0%, transparent 80%) pointer-events-none" />

        {/* top-left avatar pill */}
        <div
          className="absolute top-5 left-5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center backdrop-blur-sm z-30"
          style={{ width: 36, height: 36 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#e7e9f0" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        {/* oversized background headline - styled with brilliant white glow behind the neck */}
        <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none select-none z-10">
          <motion.div
            style={{ x: xLine1, fontFamily: "'Playfair Display', serif" }}
            className="font-black text-[38px] tracking-tight leading-none text-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.45)] whitespace-nowrap"
          >
            Problem Solver • Creative Developer
          </motion.div>
          <motion.div
            style={{ x: xLine2, fontFamily: "'Playfair Display', serif" }}
            className="font-black text-[38px] tracking-tight leading-none text-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.45)] whitespace-nowrap mt-2"
          >
            Modern Web Experiences
          </motion.div>
        </div>

        {/* portrait of the boy (overlapping on top of text, anchored at the bottom) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center z-20 pointer-events-none">
          <motion.img
            src={portraitImg}
            alt="Portrait"
            className="w-full max-w-[340px] object-contain block select-none pointer-events-auto"
            style={{
              filter: "grayscale(1) contrast(1.18) brightness(0.9)",
              maskImage: "linear-gradient(180deg, #000 84%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, #000 84%, transparent 100%)",
            }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* footer copy */}
        <div className="relative z-30 text-left mt-auto">
          <span className="text-[8px] font-bold font-mono tracking-[0.2em] text-neutral-400 uppercase block mb-1">
            A journey, told in moments.
          </span>
          <p className="text-[15px] font-semibold text-white/85 group-hover:text-white transition-colors leading-snug">
            About Me
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. REAL-TIME PROJECTS — animated browser mockup card
   ═══════════════════════════════════════════════════════════ */

function RealTimeProjectsCard() {
  const [copied, setCopied] = useState(false);
  const email = "harshitwaldia112@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`${CARD} h-full p-6 flex flex-col sm:flex-row items-center justify-between overflow-hidden relative`}
      style={{
        background: "radial-gradient(circle at 90% 50%, rgba(219, 39, 119, 0.14) 0%, rgba(167, 139, 250, 0.03) 50%, rgba(13, 13, 15, 0.98) 100%)",
        borderColor: "rgba(219, 39, 119, 0.12)",
      }}
    >
      {/* Glow on the right side */}
      <div className="absolute right-[-40px] top-[-40px] w-64 h-64 rounded-full bg-pink-500/10 blur-[60px] pointer-events-none" />

      {/* Left Column: Content */}
      <div className="flex flex-col justify-center h-full z-10 max-w-full sm:max-w-[48%] text-left gap-4">
        <h2
          className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-tight max-w-sm"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Let's build your next product, the right way
        </h2>

        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-white/20 text-white/85 hover:text-white transition-all text-xs font-medium cursor-pointer max-w-fit pointer-events-auto shadow-sm"
        >
          {copied ? (
            <Check size={13} className="text-green-400" />
          ) : (
            <Copy size={13} className="opacity-70" />
          )}
          <span className="font-mono text-[10px] sm:text-xs">{email}</span>
        </button>
      </div>

      {/* Right Column: Animated Mockup Browser */}
      <div className="relative z-10 w-[310px] h-[220px] rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl overflow-hidden flex flex-col shrink-0 translate-x-4 translate-y-3">
        {/* Browser Top Bar */}
        <div className="h-6 border-b border-white/5 bg-[#121215] flex items-center justify-between px-3 shrink-0">
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
          </div>
          <div className="w-24 h-2.5 rounded bg-white/[0.04]" />
        </div>

        {/* Browser Page Body (Pink/Red Gradient) */}
        <div className="flex-1 bg-gradient-to-br from-pink-500 via-rose-500 to-violet-600 p-3.5 flex gap-3 relative">
          {/* Glass Card 1 */}
          <motion.div
            className="flex-1 rounded-xl bg-white/[0.08] border border-white/[0.12] p-2.5 backdrop-blur-md flex flex-col justify-between"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex gap-1.5 items-center">
              <div className="w-7 h-7 rounded-full bg-white/[0.15] border border-white/[0.08]" />
              <div className="flex flex-col gap-0.5">
                <div className="w-10 h-1 rounded bg-white/40" />
                <div className="flex gap-0.5 mt-0.5">
                  <span className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                  <span className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                  <span className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                  <span className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                  <span className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                </div>
              </div>
            </div>
            <div className="w-full h-1 rounded bg-white/20 mt-1" />
            <div className="w-full h-1 rounded bg-white/20" />
            <div className="w-3/4 h-1 rounded bg-white/20" />
          </motion.div>

          {/* Glass Card 2 */}
          <motion.div
            className="flex-1 rounded-xl bg-white/[0.08] border border-white/[0.12] p-2.5 backdrop-blur-md flex flex-col justify-between"
            animate={{ y: [-4, 2, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="flex gap-1.5 items-center">
              <div className="w-7 h-7 rounded-full bg-white/[0.15] border border-white/[0.08]" />
              <div className="flex flex-col gap-0.5">
                <div className="w-10 h-1 rounded bg-white/40" />
                <div className="flex gap-0.5 mt-0.5">
                  <span className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                  <span className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                  <span className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                  <span className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                  <span className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                </div>
              </div>
            </div>
            <div className="w-full h-1 rounded bg-white/20 mt-1" />
            <div className="w-full h-1 rounded bg-white/20" />
            <div className="w-3/4 h-1 rounded bg-white/20" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN BENTO GRID
   ═══════════════════════════════════════════════════════════ */

export default function BentoGrid() {
  return (
    <section id="about" className="pt-40 pb-24 bg-[#0d0d0f] relative overflow-hidden">
      {/* Centered Futuristic Light Green Gradient & Glow Effect */}
      <div
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[750px] h-[600px] rounded-full pointer-events-none blur-[110px] opacity-[0.26] z-0"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(52, 211, 153, 0.45) 0%, rgba(16, 185, 129, 0.12) 50%, transparent 80%)"
        }}
      />
      <div
        className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full pointer-events-none blur-[110px] opacity-[0.16] z-0"
        style={{
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 75%)"
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal y={20} className="text-center mb-14 flex flex-col items-center gap-3">
          <div>
            <p
              className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-widest animate-[shimmer_3s_linear_infinite]"
              style={{ animationDuration: '3s' }}
            >
              ABOUT
            </p>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15] mt-2"
            style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
          >
            A Brief{" "}
            <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
              Introduction
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Row 1 - Original widths preserved */}
          <Reveal y={30} index={0} className="lg:col-span-7 h-[300px]">
            <LetsBuildTogetherCard />
          </Reveal>

          <Reveal y={30} index={1} className="lg:col-span-5 h-[300px]">
            <div
              className={`${CARD} h-full p-7`}
              style={{
                background: "radial-gradient(circle at 80% 20%, rgba(52, 211, 153, 0.12) 0%, rgba(16, 185, 129, 0.03) 50%, rgba(13, 13, 15, 0.96) 100%)",
                borderColor: "rgba(52, 211, 153, 0.15)",
              }}
            >
              {/* Futuristic Light Green Ambient Glow */}
              <div className="absolute -top-16 -right-8 w-56 h-56 rounded-full bg-gradient-to-br from-emerald-400/22 via-emerald-500/10 to-transparent blur-[55px] pointer-events-none" />

              <div className="text-left relative z-10">
                <span className="text-[10px] font-bold font-mono tracking-[0.2em] text-emerald-400/70 uppercase">
                  Tech Stack
                </span>
                <p
                  className="text-xl sm:text-2xl font-medium text-white mt-1 leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The stack behind everything I ship
                </p>
              </div>

              <div className="relative flex-1 mt-4 min-h-0 rounded-xl">
                <TechMagnifier />
              </div>
            </div>
          </Reveal>

          <Reveal y={30} index={2} className="lg:col-span-4 h-[260px]">
            <div
              className={`${CARD} h-full p-6`}
              style={{
                background: "radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.03) 50%, rgba(13, 13, 15, 0.96) 100%)",
                borderColor: "rgba(245, 158, 11, 0.15)",
              }}
            >
              {/* Futuristic Yellow/Amber Ambient Glow */}
              <div className="absolute -top-16 -right-8 w-52 h-52 rounded-full bg-gradient-to-br from-amber-400/22 via-amber-500/10 to-transparent blur-[55px] pointer-events-none" />

              <div className="text-left relative z-10">
                <span className="text-[9px] font-bold font-mono tracking-[0.2em] text-amber-400/70 uppercase">
                  What You Get
                </span>
                <p
                  className="text-xl sm:text-2xl font-medium text-white mt-1 leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Clean code, pixel-perfect UI, deployed &amp; scaling
                </p>
              </div>
              <DropBox />
            </div>
          </Reveal>

          <Reveal y={30} index={3} className="lg:col-span-4 h-[260px]">
            <div className="flex flex-col justify-between rounded-[28px] border border-white/[0.06] bg-[#0a0a0c] relative overflow-hidden h-full p-6">
              <div className="text-left relative z-10">
                <span className="text-[9px] font-bold font-mono tracking-[0.2em] text-blue-400/60 uppercase">
                  Flexible with Timezones
                </span>
                <p
                  className="text-xl sm:text-2xl font-medium text-white mt-1 leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Based in Dehradun, India 🇮🇳 • Available Globally
                </p>
              </div>
              <div
                className="absolute inset-x-0 bottom-[-210px] h-[400px] pointer-events-none flex justify-center"
              >
                <motion.img
                  src="/globe.png"
                  alt="Timezones Globe"
                  className="w-[400px] h-[400px] object-contain opacity-60 select-none"
                  style={{ mixBlendMode: "screen" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </Reveal>

          {/* Vertical About Me photo component placed in the third spot */}
          <Reveal y={30} index={4} className="lg:col-span-4 h-[580px] lg:row-span-2">
            <AboutMeCard />
          </Reveal>

          {/* Real-Time Projects card placed next to it in the remaining empty col-span-8 of Row 3 */}
          <Reveal y={30} index={5} className="lg:col-span-8 h-[300px]">
            <RealTimeProjectsCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

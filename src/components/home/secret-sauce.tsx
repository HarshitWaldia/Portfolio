"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "motion/react";
import type { IconType } from "react-icons";
import {
  SiAstro,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiEslint,
  SiTailwindcss,
  SiFigma,
  SiGit,
  SiMongodb,
  SiVuedotjs,
  SiMarkdown,
  SiRedis,
  SiDocker,
  SiPrisma,
  SiGraphql,
  SiThreads,
  SiCloudflare,
  SiVercel,
  SiFramer,
  SiNextdotjs,
  SiPostman,
  SiKubernetes,
  SiNuxt,
  SiNotion,
  SiSupabase,
  SiFirebase,
  SiPostgresql,
  SiPython,
  SiGithub,
} from "react-icons/si";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Skill = { icon: IconType; color: string; name: string };

const SKILLS: Skill[] = [
  { icon: SiNextdotjs, color: "#F1F1F1", name: "Next.js" },
  { icon: SiReact, color: "#61DAFB", name: "React" },
  { icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
  { icon: SiNodedotjs, color: "#5FA04E", name: "Node.js" },
  { icon: SiExpress, color: "#E8E8E8", name: "Express" },
  { icon: SiTailwindcss, color: "#38BDF8", name: "Tailwind CSS" },
  { icon: SiFigma, color: "#F24E1E", name: "Figma" },
  { icon: SiGit, color: "#F05032", name: "Git" },
  { icon: SiMongodb, color: "#47A248", name: "MongoDB" },
  { icon: SiPostgresql, color: "#4169E1", name: "PostgreSQL" },
  { icon: SiRedis, color: "#FF4438", name: "Redis" },
  { icon: SiDocker, color: "#2496ED", name: "Docker" },
  { icon: SiPrisma, color: "#F1F1F1", name: "Prisma" },
  { icon: SiGraphql, color: "#E10098", name: "GraphQL" },
  { icon: SiCloudflare, color: "#F6821F", name: "Cloudflare" },
  { icon: SiVercel, color: "#F1F1F1", name: "Vercel" },
  { icon: SiSupabase, color: "#3ECF8E", name: "Supabase" },
  { icon: SiFirebase, color: "#FFCA28", name: "Firebase" },
  { icon: SiAstro, color: "#FF5D01", name: "Astro" },
  { icon: SiPython, color: "#3776AB", name: "Python" },
  { icon: SiGithub, color: "#F1F1F1", name: "GitHub" },
  { icon: SiFramer, color: "#0055FF", name: "Framer" },
  { icon: SiPostman, color: "#FF6C37", name: "Postman" },
  { icon: SiKubernetes, color: "#326CE5", name: "Kubernetes" },
  { icon: SiNuxt, color: "#00DC82", name: "Nuxt" },
  { icon: SiVuedotjs, color: "#42B883", name: "Vue.js" },
  { icon: SiEslint, color: "#F1F1F1", name: "ESLint" },
  { icon: SiMarkdown, color: "#F1F1F1", name: "Markdown" },
  { icon: SiThreads, color: "#8A5CF6", name: "Threads" },
  { icon: SiNotion, color: "#F1F1F1", name: "Notion" },
];

/* ------------------------------------------------------------------ */
/*  Small deterministic "randomness" so SSR/CSR never mismatch         */
/* ------------------------------------------------------------------ */

function pseudo(i: number, seed: number) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x); // 0..1
}

/* ------------------------------------------------------------------ */
/*  A single collectible tile                                          */
/* ------------------------------------------------------------------ */

function SkillTile({
  skill,
  index,
  progress,
  scatter,
  collected,
  reduceMotion,
}: {
  skill: Skill;
  index: number;
  progress: MotionValue<number>;
  scatter: { x: number; y: number; rot: number };
  collected: { x: number; y: number };
  reduceMotion: boolean;
}) {
  const x = useTransform(progress, [0, 1], [scatter.x, collected.x]);
  const y = useTransform(progress, [0, 1], [scatter.y, collected.y]);
  const rotate = useTransform(progress, [0, 1], [scatter.rot, 0]);

  const Icon = skill.icon;

  return (
    <motion.div
      className="ss-tile"
      style={
        reduceMotion
          ? { left: "50%", top: "50%", x: collected.x, y: collected.y }
          : { left: "50%", top: "50%", x, y, rotate }
      }
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.015, duration: 0.4 }}
      title={skill.name}
    >
      <motion.div
        className="ss-tile-inner"
        whileHover={{
          scale: 1.15,
          backgroundColor: "#161619",
          borderColor: `${skill.color}66`,
          boxShadow: `0 10px 25px ${skill.color}2b, inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <Icon size={28} color={skill.color} />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function SecretSauce() {
  const reduceMotion = !!useReducedMotion();

  /* ---------- Scroll tracking section ---------- */
  const sectionRef = useRef<HTMLDivElement>(null);

  // 1. Independent scroll tracking for flower rotation (active from when section enters to when it leaves)
  const { scrollYProgress: flowerScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 2. Scroll tracking for skills tile assembly (active while the section is sticking)
  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Rotate flower clockwise independently as long as it is visible on screen
  const flowerRotate = useTransform(flowerScrollProgress, [0, 1], [0, 270]);

  // Assemble tiles inward from 0% to 70% of the sticky timeline
  const assembleProgress = useTransform(skillsScrollProgress, [0, 0.7], [0, 1]);

  // Fade collected background box outline in from 55% to 75% of the sticky timeline
  const boxAppear = useTransform(skillsScrollProgress, [0.55, 0.75], [0, 1]);

  /* ---------- Coordinate calculations for scatter and collect ---------- */
  const tileW = 78;
  const tileH = 78;
  const gap = 16;
  const cols = 10;
  const rows = 3;

  const collectedWidth = cols * (tileW + gap) - gap;
  const collectedHeight = rows * (tileH + gap) - gap;

  const layout = useMemo(() => {
    return SKILLS.map((skill, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Scattered positions: spread out across a wider grid horizontally and vertically
      const jx = (pseudo(i, 1) - 0.5) * 30;
      const jy = (pseudo(i, 2) - 0.5) * 30;
      const jr = (pseudo(i, 3) - 0.5) * 45;

      const scatter = {
        x: (col - 4.5) * 115 + jx,
        y: (row - 1) * 140 + jy + 90, // offset down to clear header
        rot: jr,
      };

      // Collected positions: perfectly grouped 10-column by 3-row grid
      const collected = {
        x: col * (tileW + gap) - collectedWidth / 2 + tileW / 2,
        y: row * (tileH + gap) - collectedHeight / 2 + tileH / 2,
      };

      return { skill, scatter, collected };
    });
  }, [tileW, tileH, gap, cols, rows, collectedWidth, collectedHeight]);

  const boxPad = 24;
  const collectBoxW = collectedWidth + boxPad * 2;
  const collectBoxH = collectedHeight + boxPad * 2;

  return (
    <div ref={sectionRef} className="ss-root">
      <style>{CSS}</style>

      <div className="ss-sticky-wrap">
        {/* ---------------- Flower Background/Header ---------------- */}
        <div className="ss-flower-wrap">
          <motion.img
            src="/flower.png"
            alt=""
            aria-hidden
            className="ss-flower"
            style={{ rotate: flowerRotate }}
          />
          <div className="ss-flower-fade" />
        </div>

        {/* ---------------- Header text block ---------------- */}
        <div className="ss-header flex flex-col items-center gap-3">
          <div>
            <p
              className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-widest animate-[shimmer_3s_linear_infinite]"
              style={{ animationDuration: '3s' }}
            >
              MY SKILLS
            </p>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15]"
            style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
          >
            The Secret{" "}
            <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
              Sauce
            </span>
          </h2>
        </div>

        {/* ---------------- Skills grid block ---------------- */}
        <div className="ss-grid-wrapper">
          <motion.div
            className="ss-collect-box"
            style={{
              opacity: boxAppear,
              width: collectBoxW,
              height: collectBoxH,
            }}
          />
          <div className="ss-canvas">
            {layout.map(({ skill, scatter, collected }, i) => (
              <SkillTile
                key={skill.name}
                skill={skill}
                index={i}
                progress={assembleProgress}
                scatter={scatter}
                collected={collected}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                              */
/* ------------------------------------------------------------------ */

const CSS = `
.ss-root {
  background: radial-gradient(circle at 50% 50%, rgba(13, 13, 15, 0.98) 0%, rgba(9, 9, 11, 1) 100%);
  color: #f2f2f2;
  position: relative;
  width: 100%;
  height: 180vh;
}

.ss-sticky-wrap {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.ss-flower-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: -2rem;
  z-index: 1;
  position: relative;
}

.ss-flower {
  width: min(34vw, 370px);
  max-width: 80vw;
  filter: drop-shadow(0 25px 50px rgba(0,0,0,0.85));
  pointer-events: none;
  user-select: none;
}

.ss-flower-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75%;
  background: linear-gradient(to top, #0d0d0f 25%, rgba(13, 13, 15, 0.9) 65%, transparent 100%);
  pointer-events: none;
  z-index: 5;
}

.ss-header {
  text-align: center;
  position: relative;
  z-index: 10;
  margin-top: -4.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 640px) {
  .ss-header {
    margin-top: -7.5rem;
  }
}

.ss-grid-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 320px;
  z-index: 10;
}

.ss-canvas {
  position: relative;
  width: 1px;
  height: 1px;
  transform: scale(0.35);
  z-index: 15;
}

@media (min-width: 480px) {
  .ss-canvas { transform: scale(0.48); }
}
@media (min-width: 640px) {
  .ss-canvas { transform: scale(0.68); }
}
@media (min-width: 900px) {
  .ss-canvas { transform: scale(0.85); }
}
@media (min-width: 1280px) {
  .ss-canvas { transform: scale(1); }
}

.ss-tile {
  position: absolute;
  width: 78px;
  height: 78px;
  margin-left: -39px;
  margin-top: -39px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, opacity;
}

.ss-tile-inner {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: rgba(20, 20, 22, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.02);
  cursor: pointer;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  will-change: transform, background-color, border-color, box-shadow;
}

.ss-collect-box {
  position: absolute;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: radial-gradient(120% 120% at 50% 0%, rgba(120, 130, 255, 0.04), rgba(0, 0, 0, 0) 70%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 0 60px rgba(120, 130, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  z-index: 5;
}
`;

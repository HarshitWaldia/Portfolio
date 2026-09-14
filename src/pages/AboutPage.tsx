import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useScroll, useTransform, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { parseISO, format, differenceInMonths } from "date-fns";
import { getExperience } from "@/lib/content/mdx";
import { useMetadata } from "@/hooks/use-metadata";
import { getGuestbookEntries } from "@/actions/guestbook-actions";
import { useContactDrawer } from "@/stores/contact-drawer";
import { Github, Linkedin, Twitter, OracleIcon, AzureIcon } from "@/components/ui/brand-icons";
import { Briefcase, MapPin, Terminal, Database, Server, Layers, Users, GitFork, Star, Award, GraduationCap, BookOpen, Crosshair, TrendingUp, Sparkles, FileText } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";
import { CoverFlow } from "@/components/ui/coverflow";

// Tag name -> simpleicons.org slug. Add new stacks here; unmapped tags fall back to a generic icon.
const TECH_SLUG_MAP: Record<string, string> = {
  "react": "react", "react native": "react", "next.js": "nextdotjs", "nextjs": "nextdotjs",
  "node.js": "nodedotjs", "nodejs": "nodedotjs", "express.js": "express", "expo": "expo",
  "typescript": "typescript", "javascript": "javascript", "html5": "html5", "css3": "css3",
  "tailwind css": "tailwindcss", "redux toolkit": "redux", "framer motion": "framer",
  "mongodb": "mongodb", "mongoose odm": "mongoose", "firebase": "firebase", "jwt": "jsonwebtokens",
  "redis": "redis", "docker": "docker", "aws": "amazonaws", "rest api": "fastapi", "fastapi": "fastapi",
  "ci/cd": "githubactions", "jest": "jest", "postman": "postman", "socket.io": "socketdotio",
  "figma": "figma", "zod": "zod", "git": "git", "github": "github", "notion": "notion",
  "slack": "slack", "vite": "vite", "shadcn ui": "shadcnui", "vercel": "vercel", "python": "python",
  "pytorch": "pytorch", "opencv": "opencv",
};

// Icon badge — pulls a colored brand mark from simpleicons.org CDN; falls back to a generic glyph.
function TechIcon({ name }: { name: string }) {
  const n = name.toLowerCase().trim();
  const slug = TECH_SLUG_MAP[n];
  if (slug) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt=""
        aria-hidden="true"
        className="size-3.5 object-contain shrink-0"
        loading="lazy"
      />
    );
  }
  if (n.includes("stripe")) return <Layers className="size-3.5" />;
  if (n.includes("mongo") || n.includes("db") || n.includes("sql")) return <Database className="size-3.5" />;
  if (n.includes("server") || n.includes("backend")) return <Server className="size-3.5" />;
  return <Terminal className="size-3.5" />;
}

// Experience date formatter/duration helper using date-fns
function formatExperienceDuration(startStr: string, endStr?: string, current?: boolean) {
  try {
    const start = parseISO(startStr);
    const end = current || !endStr ? new Date() : parseISO(endStr);

    const startFormatted = format(start, "MMM yyyy");
    const endFormatted = current || !endStr ? "Present" : format(end, "MMM yyyy");

    const totalMonths = differenceInMonths(end, start) + 1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let durationStr = "";
    if (years > 0) {
      durationStr += `${years} yr${years > 1 ? "s" : ""}`;
    }
    if (months > 0) {
      if (durationStr) durationStr += ", ";
      durationStr += `${months} mo${months > 1 ? "s" : ""}`;
    }

    return {
      range: `${startFormatted} – ${endFormatted}`,
      duration: durationStr || "1 mo"
    };
  } catch (e) {
    return {
      range: `${startStr} – ${endStr || "Present"}`,
      duration: ""
    };
  }
}

interface ExperienceFeature {
  title: string;
  badge?: string;
  description: string;
}

function parseExperienceBullets(content: string): ExperienceFeature[] {
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-") || l.startsWith("*"));

  return lines.map((line) => {
    const clean = line.replace(/^[-*]\s+/, "").trim();

    // Check for **Title (Badge)**: Description or **Title**: Description
    const boldColonMatch = clean.match(/^\*\*([^*]+)\*\*:\s*(.+)$/s);
    if (boldColonMatch) {
      const fullTitle = boldColonMatch[1].trim();
      const description = boldColonMatch[2].trim();

      const badgeMatch = fullTitle.match(/^(.*?)(?:\s*\(([^)]+)\))$/);
      if (badgeMatch) {
        return {
          title: badgeMatch[1].trim(),
          badge: badgeMatch[2].trim(),
          description,
        };
      }
      return {
        title: fullTitle,
        description,
      };
    }

    // Check for **Title** Description
    const boldMatch = clean.match(/^\*\*([^*]+)\*\*\s*(.+)$/s);
    if (boldMatch) {
      return {
        title: boldMatch[1].trim(),
        description: boldMatch[2].trim(),
      };
    }

    return {
      title: "",
      description: clean,
    };
  });
}

function getFeatureTheme(title: string, badge?: string) {
  const text = `${title} ${badge || ""}`.toLowerCase();

  if (text.includes("archive") || text.includes("llm") || text.includes("digitiz") || text.includes("rag")) {
    return {
      icon: <FileText size={15} className="text-sky-400" />,
      badgeColor: "bg-sky-500/10 text-sky-300 border-sky-500/30",
      borderGlow: "hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.14)]",
      accentGlow: "from-sky-500/15 via-sky-500/5 to-transparent",
      iconBg: "bg-sky-500/10 border-sky-500/25 text-sky-400",
      titleColor: "group-hover/box:text-sky-200",
    };
  }
  if (text.includes("trainer") || text.includes("training") || text.includes("mentor") || text.includes("personnel")) {
    return {
      icon: <Users size={15} className="text-orange-400" />,
      badgeColor: "bg-orange-500/10 text-orange-300 border-orange-500/30",
      borderGlow: "hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.14)]",
      accentGlow: "from-orange-500/15 via-orange-500/5 to-transparent",
      iconBg: "bg-orange-500/10 border-orange-500/25 text-orange-400",
      titleColor: "group-hover/box:text-orange-200",
    };
  }
  if (text.includes("terrain") || text.includes("geospatial") || text.includes("satellite") || text.includes("mapping")) {
    return {
      icon: <Layers size={15} className="text-teal-400" />,
      badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/30",
      borderGlow: "hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.14)]",
      accentGlow: "from-teal-500/15 via-teal-500/5 to-transparent",
      iconBg: "bg-teal-500/10 border-teal-500/25 text-teal-400",
      titleColor: "group-hover/box:text-teal-200",
    };
  }
  if (text.includes("soldier") || text.includes("intrusion") || text.includes("restricted") || text.includes("perimeter")) {
    return {
      icon: <Crosshair size={15} className="text-rose-400" />,
      badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      borderGlow: "hover:border-rose-500/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.14)]",
      accentGlow: "from-rose-500/15 via-rose-500/5 to-transparent",
      iconBg: "bg-rose-500/10 border-rose-500/25 text-rose-400",
      titleColor: "group-hover/box:text-rose-200",
    };
  }
  if (text.includes("drone") || text.includes("vehicle") || text.includes("detection") || text.includes("vision") || text.includes("yolo") || text.includes("surveillance")) {
    return {
      icon: <Crosshair size={15} className="text-amber-400" />,
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      borderGlow: "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(251,191,36,0.14)]",
      accentGlow: "from-amber-500/15 via-amber-500/5 to-transparent",
      iconBg: "bg-amber-500/10 border-amber-500/25 text-amber-400",
      titleColor: "group-hover/box:text-amber-200",
    };
  }
  if (text.includes("forecast") || text.includes("predict") || text.includes("logistics") || text.includes("analytic")) {
    return {
      icon: <TrendingUp size={15} className="text-emerald-400" />,
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      borderGlow: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(52,211,153,0.14)]",
      accentGlow: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      iconBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
      titleColor: "group-hover/box:text-emerald-200",
    };
  }
  if (text.includes("question") || text.includes("paper") || text.includes("generation") || text.includes("irdt") || text.includes("evaluat")) {
    return {
      icon: <Sparkles size={15} className="text-violet-400" />,
      badgeColor: "bg-violet-500/10 text-violet-300 border-violet-500/30",
      borderGlow: "hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(167,139,250,0.14)]",
      accentGlow: "from-violet-500/15 via-violet-500/5 to-transparent",
      iconBg: "bg-violet-500/10 border-violet-500/25 text-violet-400",
      titleColor: "group-hover/box:text-violet-200",
    };
  }
  if (text.includes("api") || text.includes("fastapi") || text.includes("jwt") || text.includes("rest") || text.includes("backend")) {
    return {
      icon: <Server size={15} className="text-indigo-400" />,
      badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
      borderGlow: "hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(129,140,248,0.14)]",
      accentGlow: "from-indigo-500/15 via-indigo-500/5 to-transparent",
      iconBg: "bg-indigo-500/10 border-indigo-500/25 text-indigo-400",
      titleColor: "group-hover/box:text-indigo-200",
    };
  }
  if (text.includes("e-commerce") || text.includes("recommend") || text.includes("pipeline")) {
    return {
      icon: <Layers size={15} className="text-pink-400" />,
      badgeColor: "bg-pink-500/10 text-pink-300 border-pink-500/30",
      borderGlow: "hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(244,114,182,0.14)]",
      accentGlow: "from-pink-500/15 via-pink-500/5 to-transparent",
      iconBg: "bg-pink-500/10 border-pink-500/25 text-pink-400",
      titleColor: "group-hover/box:text-pink-200",
    };
  }

  return {
    icon: <Sparkles size={15} className="text-neutral-400" />,
    badgeColor: "bg-white/5 text-neutral-300 border-white/10",
    borderGlow: "hover:border-white/25 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
    accentGlow: "from-white/10 via-transparent to-transparent",
    iconBg: "bg-white/5 border-white/10 text-neutral-400",
    titleColor: "group-hover/box:text-white",
  };
}

/**
 * HOW TO ADD A NEW EXPERIENCE (job) TO THIS TIMELINE
 * ----------------------------------------------------
 * 1. Create a new file: /content/experience/<slug>.mdx  (project root, NOT src/)
 * 2. Frontmatter fields (see src/lib/content/schema.ts):
 *
 *      ---
 *      company: "Company Name"
 *      role: "Your Role"
 *      startDate: "2024-01-01"
 *      endDate: "2024-06-01"     # omit if current: true
 *      current: false            # true = shows "Present"
 *      location: "City, Country"
 *      type: "full-time"         # full-time | part-time | internship | freelance | open-source
 *      tags: [React, Node.js, MongoDB, JWT]   # must match keys in TECH_SLUG_MAP above for icons
 *      ---
 *      Bullet points of what you did go here as normal markdown, e.g.
 *      - **Feature Title (Client/Badge)**: Detailed description.
 *
 * 3. Newest role should have the latest startDate — getExperience() sorts by date automatically.
 * 4. New tag not in TECH_SLUG_MAP? Add "tagname": "simple-icons-slug" to the map above
 *    (find slugs at https://simpleicons.org) — unmapped tags fall back to a generic icon.
 */
const COVERFLOW_ITEMS = [
  {
    id: "item-1",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    title: "Generative AI & LLMs",
    subtitle: "RAG & Vector Storage"
  },
  {
    id: "item-2",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    title: "Computer Vision",
    subtitle: "YOLO & Object Tracking"
  },
  {
    id: "item-3",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    title: "FastAPI Backend",
    subtitle: "JWT, RBAC & PostgreSQL"
  },
  {
    id: "item-4",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    title: "Predictive Analytics",
    subtitle: "Time-series & Forecasting"
  }
];

export default function AboutPage() {
  useMetadata({ title: "About" });
  const { open: openContact } = useContactDrawer();
  const experiences = getExperience();

  const containerRef = useRef<HTMLDivElement>(null);

  // GitHub stats fetch
  const [githubStats, setGithubStats] = useState({
    followers: 24,
    forks: 66,
    stars: 79,
    totalContributions: 0
  });

  // Contribution heatmap data: array of { date, count, level } for last 52 weeks
  const [contributionDays, setContributionDays] = useState<{ date: string; count: number; level: number }[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch user + repos stats
        const userRes = await fetch("https://api.github.com/users/harshitwaldia");
        if (userRes.ok) {
          const userData = await userRes.json();
          const reposRes = await fetch("https://api.github.com/users/harshitwaldia/repos?per_page=100");
          if (reposRes.ok) {
            const reposData = await reposRes.json();
            let totalStars = 0;
            let totalForks = 0;
            if (Array.isArray(reposData)) {
              reposData.forEach((repo) => {
                totalStars += repo.stargazers_count || 0;
                totalForks += repo.forks_count || 0;
              });
            }

            // Fetch real contribution data from public proxy (no token needed)
            let totalContributions = 0;
            let days: { date: string; count: number; level: number }[] = [];
            try {
              const contribRes = await fetch("https://github-contributions-api.jogruber.de/v4/harshitwaldia?y=last");
              if (contribRes.ok) {
                const contribData = await contribRes.json();
                if (Array.isArray(contribData.contributions)) {
                  days = contribData.contributions;
                  totalContributions = days.reduce((sum: number, d: { count: number }) => sum + d.count, 0);
                }
              }
            } catch {
              // silently fall back to empty
            }

            setContributionDays(days);
            setGithubStats({
              followers: userData.followers ?? 24,
              forks: totalForks || 66,
              stars: totalStars || 79,
              totalContributions
            });
          }
        }
      } catch (err) {
        console.error("Error fetching github stats:", err);
      }
    }
    fetchStats();
  }, []);

  const [avatars, setAvatars] = useState<string[]>([]);
  useEffect(() => {
    getGuestbookEntries().then((entries) => {
      const imgs = entries
        .map((e) => e.userImage)
        .filter((img): img is string => !!img);
      setAvatars(imgs.slice(0, 4));
    });
  }, []);

  // Track scroll inside the experience block for timeline tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Dark crumpled paper texture backdrop overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] mix-blend-screen pointer-events-none z-0"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1920&auto=format&fit=crop')` }}
      />

      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-amber-500/10 blur-[130px] rounded-full z-0" />

      {/* Spectacular Hero Banner */}
      <AboutHero />

      <div className="w-full max-w-none px-2 sm:px-4 lg:px-6 relative flex flex-col pt-8 pb-12 z-10">
        <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px] relative">
          {/* Left vertical bar */}
          <div
            aria-hidden="true"
            className="w-full border-x border-white/5 bg-stripes-vertical [mask-image:linear-gradient(to_bottom,transparent,black_10rem)] [WebkitMaskImage:linear-gradient(to_bottom,transparent,black_10rem)]"
          />

          {/* Main Content */}
          <div className="min-w-0 flex-1 px-4 md:px-8">

            {/* ── SECTION 1: Biography Details ── */}
            <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 pb-12 border-b border-white/5">
              <div className="flex flex-col items-start text-left lg:col-span-7 max-w-2xl">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-[0.35em] animate-[shimmer_3s_linear_infinite] mb-6 block"
                  style={{ animationDuration: '3s' }}
                >
                  MORE ABOUT ME
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15] mb-8"
                  style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
                >
                  I&apos;m Harshit Waldia, an <br />
                  <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400">
                    AI/ML Engineer
                  </span>
                </motion.h1>

                <div className="text-neutral-400 text-sm sm:text-base leading-relaxed space-y-6 font-light">
                  <p>
                    I&apos;m an AI/ML Engineer with a Computer Science and AI/ML background from Graphic Era Hill University (B.Tech CSE Specialization in ML &amp; AI, CGPA: 8.17 / 10). I specialize in building practical, production-ready AI systems that combine deep learning models with scalable backend engineering.
                  </p>
                  <p>
                    My experience spans RAG architectures, Large Language Model applications, Computer Vision &amp; YOLO, OCR document intelligence, predictive analytics, and FastAPI-based microservices. Currently at Info Origin Inc., I engineer enterprise AI systems, LLM architectures, and scalable intelligent solutions.
                  </p>
                  <div className="pt-1">
                    <p className="text-white/80 font-normal leading-relaxed flex flex-wrap items-center gap-2">
                      <span className="text-neutral-400">Certified in</span>
                      <Link
                        to="/certifications"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-red-500/40 text-xs text-neutral-200 hover:text-white transition-all group cursor-pointer"
                      >
                        <OracleIcon size={14} className="shrink-0 group-hover:scale-110 transition-transform" />
                        <span>Oracle OCI Generative AI <span className="text-white/40 font-mono text-[10px]">(1Z0-1127-24)</span></span>
                      </Link>
                      <span className="text-neutral-500">,</span>
                      <Link
                        to="/certifications"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-500/40 text-xs text-neutral-200 hover:text-white transition-all group cursor-pointer"
                      >
                        <AzureIcon size={14} className="shrink-0 group-hover:scale-110 transition-transform" />
                        <span>Microsoft Azure Data Fundamentals <span className="text-white/40 font-mono text-[10px]">(DP-900)</span></span>
                      </Link>
                      <span className="text-neutral-500">, and</span>
                      <Link
                        to="/certifications"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-xs text-neutral-200 hover:text-white transition-all group cursor-pointer"
                      >
                        <Github size={14} className="shrink-0 group-hover:scale-110 transition-transform" />
                        <span>GitHub Foundations</span>
                      </Link>
                      <span className="text-neutral-500">.</span>
                    </p>
                  </div>
                </div>

                {/* Social Icons left aligned */}
                <div className="flex items-center gap-4 mt-10">
                  <a
                    href="https://github.com/harshitwaldia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all bg-white/[0.02]"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/harshit-waldia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all bg-white/[0.02]"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>

              {/* CoverFlow component on the right */}
              <div className="lg:col-span-5 w-full h-[360px] sm:h-[400px] flex items-center justify-center relative z-10 select-none">
                <CoverFlow
                  items={COVERFLOW_ITEMS}
                  itemWidth={250}
                  itemHeight={250}
                  centerGap={120}
                  stackSpacing={60}
                  rotation={40}
                  enableReflection={false}
                  enableClickToSnap={true}
                  enableAudio={false}
                />
              </div>
            </section>

            {/* ── SECTION 2: Experience Timeline Section ── */}
            <section className="relative pt-12 pb-8">
              {/* Glowing Red Ambient Background Circle */}
              <div
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[130px] opacity-[0.45] z-10"
                style={{
                  background: "radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.6) 0%, rgba(220, 38, 38, 0.2) 50%, transparent 80%)"
                }}
              />
              {/* Section Header */}
              <div className="text-center flex flex-col items-center gap-3 mb-24 relative z-20">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p
                    className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-widest animate-[shimmer_3s_linear_infinite]"
                    style={{ animationDuration: '3s' }}
                  >
                    THE EXPERIENCE
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <h2
                    className="text-4xl sm:text-5xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15]"
                    style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
                  >
                    Experience That Brings{" "}
                    <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
                      Ideas to Life
                    </span>
                  </h2>
                </motion.div>
              </div>

              {/* Scroll-Linked Timeline Tracker Wrapper */}
              <div ref={containerRef} className="relative w-full max-w-5xl mx-auto flex flex-col gap-0 overflow-visible z-20">

                {/* Vertical line and animated scroll slider */}
                <div aria-hidden="true" className="absolute top-0 bottom-0 left-[18px] lg:left-[32%] -translate-x-1/2 w-px bg-neutral-800/60 z-0">
                  <motion.div
                    className="absolute top-0 w-[3.5px] -translate-x-[1.25px] bg-gradient-to-b from-blue-400 via-pink-500 to-amber-400 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.6),_0_0_4px_rgba(96,165,250,0.4)]"
                    style={{ height }}
                  />
                  <motion.div
                    className="absolute -left-[18px] w-9 h-9 rounded-full border-2 border-pink-500 bg-neutral-950 overflow-hidden flex items-center justify-center shadow-lg shadow-pink-500/20 z-10 hidden lg:flex"
                    style={{ top: y, translateY: "-50%" }}
                  >
                    <img
                      src="/images/profile/harshit.jpg"
                      alt="Scrolling Profile Dot"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* Map list of experiences */}
                {experiences.map((exp, idx) => {
                  const { range, duration } = formatExperienceDuration(
                    exp.frontmatter.startDate,
                    exp.frontmatter.endDate,
                    exp.frontmatter.current
                  );

                  return (
                    <React.Fragment key={exp.slug}>
                      {idx > 0 && (
                        <div className="w-full border-t border-white/[0.03] my-6 lg:my-8 z-10" />
                      )}
                      <div className="relative grid grid-cols-[1fr] lg:grid-cols-[30%_4%_66%] items-stretch gap-4 lg:gap-0 min-h-[140px]">
                        {/* Left Column (Desktop: Company details left-aligned on extreme left, 30% width) */}
                        <div className="w-full flex flex-col items-start justify-start pl-12 lg:pl-0 lg:pr-6 text-left pt-1.5 z-10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shadow-md shrink-0">
                              <Briefcase size={18} className="text-violet-400" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold text-white text-lg tracking-tight font-outfit leading-none">
                                {exp.frontmatter.company}
                              </h4>
                              <span className="text-xs text-white/40 block mt-1.5 font-mono">
                                {range}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-white/30 font-mono mt-1">
                            {duration}
                          </p>
                          {(exp.frontmatter.location || exp.frontmatter.type) && (
                            <div className="flex items-center gap-1.5 text-neutral-500 mt-2 text-xs font-mono uppercase tracking-wide">
                              {exp.frontmatter.location && (
                                <>
                                  <MapPin size={11} />
                                  <span>{exp.frontmatter.location}</span>
                                </>
                              )}
                              {exp.frontmatter.location && exp.frontmatter.type && (
                                <span className="text-white/10">•</span>
                              )}
                              {exp.frontmatter.type && (
                                <span>{exp.frontmatter.type}</span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Middle Column Spacer dot indicator with horizontal connecting bar */}
                        <div className="hidden lg:flex items-start justify-center pt-[22px] relative z-10">
                          <div className="absolute left-0 right-0 h-px bg-white/10 top-[28px] -translate-y-1/2" />
                          <div className="w-3 h-3 rounded-full bg-neutral-950 border-2 border-neutral-300 dark:border-neutral-700 relative z-20" />
                        </div>

                        {/* Right Column (Role content list) */}
                        <div className="w-full pl-12 sm:pl-16 lg:pl-16 text-left z-10 pb-4 lg:pb-6">
                          {/* Mobile timeline dot */}
                          <div className="absolute left-[13px] top-[22px] w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-400 lg:hidden" />

                          <h4 className="text-2xl sm:text-3xl font-medium font-instrument-serif text-white tracking-tight leading-none mb-4">
                            {exp.frontmatter.role}
                          </h4>

                          {/* Box Type Features List */}
                          <div className="flex flex-col gap-3 mt-3">
                            {parseExperienceBullets(exp.content).map((item, fIdx) => {
                              const theme = getFeatureTheme(item.title, item.badge);
                              return (
                                <motion.div
                                  key={fIdx}
                                  initial={{ opacity: 0, y: 8 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.35, delay: fIdx * 0.05 }}
                                  className={`group/box relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c0e]/80 hover:bg-[#121216] ${theme.borderGlow} p-3.5 sm:p-4 transition-all duration-300 backdrop-blur-xs`}
                                >
                                  {/* Subtle ambient light gradient bloom */}
                                  <div
                                    className={`absolute top-0 right-0 w-48 h-24 bg-gradient-to-bl ${theme.accentGlow} opacity-0 group-hover/box:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-xl`}
                                  />

                                  <div className="relative z-10 flex flex-col gap-2">
                                    {/* Header: Icon + Title + Badge */}
                                    <div className="flex items-start justify-between gap-2.5">
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <div
                                          className={`w-7 h-7 rounded-lg ${theme.iconBg} border flex items-center justify-center shrink-0 shadow-sm group-hover/box:scale-105 transition-transform duration-300`}
                                        >
                                          {theme.icon}
                                        </div>
                                        {item.title ? (
                                          <h5
                                            className={`text-xs sm:text-sm font-semibold text-white/95 font-outfit tracking-tight leading-snug ${theme.titleColor} transition-colors`}
                                          >
                                            {item.title}
                                          </h5>
                                        ) : (
                                          <h5 className="text-xs sm:text-sm font-semibold text-white/90 font-outfit">
                                            Key Contribution
                                          </h5>
                                        )}
                                      </div>

                                      {item.badge && (
                                        <span
                                          className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${theme.badgeColor} tracking-wide shadow-xs`}
                                        >
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-xs sm:text-[13px] text-neutral-300/90 font-light leading-relaxed pl-9 sm:pl-9.5">
                                      {item.description}
                                    </p>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Tech Badges Grid */}
                          <div className="flex flex-wrap gap-2 mt-5">
                            {exp.frontmatter.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex w-fit border border-t border-neutral-400/10 items-center justify-center whitespace-nowrap text-neutral-400 dark:text-neutral-400 bg-white/[0.02] dark:bg-neutral-900/50 hover:bg-white/[0.05] hover:border-white/15 transition-all gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] md:text-xs font-mono uppercase border-white/[0.06]"
                              >
                                <TechIcon name={tag} />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}

              </div>
            </section>

            {/* ── SECTION 3: Certifications & Education Section ── */}
            <section className="relative pt-12 pb-12 border-t border-white/5">
              {/* Glowing Ambient Backdrop */}
              <div
                className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[130px] opacity-[0.22] z-0"
                style={{
                  background: "radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.45) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 80%)"
                }}
              />

              {/* Section Header */}
              <div className="text-center flex flex-col items-center gap-3 mb-12 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p
                    className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-widest animate-[shimmer_3s_linear_infinite]"
                    style={{ animationDuration: '3s' }}
                  >
                    CERTIFICATIONS &amp; EDUCATION
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <h2
                    className="text-4xl sm:text-5xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15]"
                    style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
                  >
                    Validated Knowledge &amp;{" "}
                    <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
                      Credentials
                    </span>
                  </h2>
                </motion.div>
              </div>

              {/* Two-Column Grid: Certifications Left, Education Right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto relative z-10">
                {/* Column 1: Certifications */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <Award size={16} className="text-violet-400" />
                    <span className="text-xs font-mono uppercase tracking-wider text-white/60 font-semibold">Certifications</span>
                  </div>

                  {/* Card 1: Oracle OCI Generative AI */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="rounded-xl border border-white/8 bg-white/[0.02] p-4 flex justify-between items-center hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#141414] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-red-500/30 transition-colors">
                        <OracleIcon size={18} className="shrink-0" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate font-outfit">OCI 2024 Generative AI Certified Professional</h4>
                        <p className="text-[11px] text-white/40 truncate">Oracle · 1Z0-1127-24</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono shrink-0 ml-3 px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]">Aug 2024</span>
                  </motion.div>

                  {/* Card 2: Azure Data Fundamentals */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="rounded-xl border border-white/8 bg-white/[0.02] p-4 flex justify-between items-center hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#141414] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-sky-500/30 transition-colors">
                        <AzureIcon size={18} className="shrink-0" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate font-outfit">Azure Data Fundamentals</h4>
                        <p className="text-[11px] text-white/40 truncate">Microsoft · DP-900</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono shrink-0 ml-3 px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]">Jul 2024</span>
                  </motion.div>

                  {/* Card 3: GitHub Foundations */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="rounded-xl border border-white/8 bg-white/[0.02] p-4 flex justify-between items-center hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#141414] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-white/20 transition-colors">
                        <Github size={18} className="shrink-0" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate font-outfit">GitHub Foundations Certification</h4>
                        <p className="text-[11px] text-white/40 truncate">GitHub</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono shrink-0 ml-3 px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]">Jun 2025</span>
                  </motion.div>
                </div>

                {/* Column 2: Education */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <GraduationCap size={16} className="text-pink-400" />
                    <span className="text-xs font-mono uppercase tracking-wider text-white/60 font-semibold">Education</span>
                  </div>

                  {/* Card 1: B.Tech CSE */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="rounded-xl border border-white/8 bg-white/[0.02] p-4 flex justify-between items-center hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#141414] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-pink-500/30 transition-colors">
                        <GraduationCap size={16} className="text-pink-400" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate font-outfit">B.Tech in Computer Science &amp; Engineering (Hons)</h4>
                        <p className="text-[11px] text-white/40 truncate">Graphic Era Hill University · CGPA: 8.17 / 10</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono shrink-0 ml-3 px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]">2022 – 2026</span>
                  </motion.div>

                  {/* Card 2: Specialization in AI & ML */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="rounded-xl border border-white/8 bg-white/[0.02] p-4 flex justify-between items-center hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#141414] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-violet-500/30 transition-colors">
                        <Terminal size={16} className="text-violet-400" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate font-outfit">Specialization in AI &amp; Machine Learning</h4>
                        <p className="text-[11px] text-white/40 truncate">Deep Learning, Computer Vision &amp; LLM Systems</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono shrink-0 ml-3 px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]">Specialization</span>
                  </motion.div>

                  {/* Card 3: Senior Secondary Schooling */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    className="rounded-xl border border-white/8 bg-white/[0.02] p-4 flex justify-between items-center hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#141414] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-amber-500/30 transition-colors">
                        <BookOpen size={16} className="text-amber-400" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs sm:text-sm font-semibold text-white truncate font-outfit">Senior Secondary (Class XII)</h4>
                        <p className="text-[11px] text-white/40 truncate">CBSE · Physics, Chemistry, Math &amp; CS</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono shrink-0 ml-3 px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]">2021 – 2022</span>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ── SECTION 4: Open Source Contribution Section ── */}
            <section className="relative pt-10 pb-10 border-t border-white/5">
              {/* Section Header */}
              <div className="text-center flex flex-col items-center gap-3 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p
                    className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-widest animate-[shimmer_3s_linear_infinite]"
                    style={{ animationDuration: '3s' }}
                  >
                    OPEN SOURCE
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <h2
                    className="text-4xl sm:text-5xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15]"
                    style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
                  >
                    Code &{" "}
                    <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
                      Contributions
                    </span>
                  </h2>
                </motion.div>
              </div>

              {/* Layout Grid Dashboard Container */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-5xl mx-auto items-stretch">

                {/* Left Section: Profile and Contribution Graph (Spans 2 columns) */}
                <div className="lg:col-span-2 bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  {/* Header Info */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#1a1a1a] rounded-xl border border-[#262626]">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-white font-semibold text-base tracking-wide font-outfit">@harshitwaldia</h2>
                        <p className="text-xs text-gray-500 font-medium">Contribution Graph</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-xl tracking-tight font-mono leading-none">
                        {githubStats.totalContributions.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">2026 Total</div>
                    </div>
                  </div>

                  {/* Scrollable Contribution Grid Container */}
                  <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2">
                    {(() => {
                      // ── Build the 52-week grid exactly like GitHub ──────────────
                      const CELL = 11; // cell + gap width in px
                      const colors = ["bg-[#1a1a1a]", "bg-emerald-950", "bg-emerald-800", "bg-emerald-600", "bg-emerald-400"];
                      const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                      // Use real data or generate 52 empty weeks as placeholder
                      const days = contributionDays.length > 0
                        ? contributionDays
                        : Array.from({ length: 364 }, (_, i) => {
                          const d = new Date(); d.setDate(d.getDate() - (363 - i));
                          return { date: d.toISOString().slice(0, 10), count: 0, level: 0 };
                        });

                      // Group days into weeks (chunks of 7, column-major order)
                      const weeks: typeof days[number][][] = [];
                      for (let i = 0; i < days.length; i += 7) {
                        weeks.push(days.slice(i, i + 7));
                      }

                      // Compute which week each month label should appear above
                      const monthLabels: { label: string; weekIdx: number }[] = [];
                      weeks.forEach((week, wIdx) => {
                        if (week.length === 0) return;
                        const firstDay = new Date(week[0].date + "T00:00:00");
                        // Show label on first week of each month (or the very first week)
                        if (wIdx === 0 || new Date(weeks[wIdx - 1][0].date + "T00:00:00").getMonth() !== firstDay.getMonth()) {
                          monthLabels.push({ label: MONTH_ABBR[firstDay.getMonth()], weekIdx: wIdx });
                        }
                      });

                      return (
                        <div style={{ minWidth: `${weeks.length * CELL + 4}px` }}>
                          {/* Month Labels Row — positioned absolutely over the correct columns */}
                          <div className="relative h-5 mb-1" style={{ minWidth: `${weeks.length * CELL}px` }}>
                            {monthLabels.map(({ label, weekIdx }) => (
                              <span
                                key={weekIdx}
                                className="absolute text-[11px] text-gray-500 font-medium font-mono select-none"
                                style={{ left: `${weekIdx * CELL}px` }}
                              >
                                {label}
                              </span>
                            ))}
                          </div>

                          {/* Week Columns — 7 rows per column */}
                          <div className="flex gap-[3.5px]">
                            {weeks.map((week, wIdx) => (
                              <div key={wIdx} className="flex flex-col gap-[3.5px]">
                                {week.map((day, dIdx) => (
                                  <div
                                    key={dIdx}
                                    className={`w-[10px] h-[10px] rounded-[2px] ${colors[Math.min(day.level, 4)]} transition-transform duration-150 hover:scale-125 cursor-pointer`}
                                    title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Grid Footer Legend */}
                  <div className="flex justify-between items-center mt-5 pt-3 border-t border-[#1a1a1a] text-xs font-medium text-gray-500 font-mono">
                    <div>{githubStats.totalContributions.toLocaleString()} contributions in the last year</div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px]">Less</span>
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1a1a1a]"></div>
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-950"></div>
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-800"></div>
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600"></div>
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400"></div>
                      <span className="text-[11px]">More</span>
                    </div>
                  </div>
                </div>

                {/* Right Section: Stacked Metrics Cards */}
                <div className="flex flex-col gap-4">

                  {/* Card 1: Followers */}
                  <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 flex justify-between items-center relative overflow-hidden shadow-2xl group hover:border-[#2a2a2a] transition-colors">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 tracking-wide mb-1">Followers</p>
                      <h3 className="text-3xl font-bold text-pink-500 tracking-tight font-outfit">{githubStats.followers}</h3>
                    </div>
                    {/* Abstract background accent nodes */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-4 opacity-40">
                      <div className="w-2 h-2 rounded-full bg-pink-500/30 blur-[1px]"></div>
                      <div className="w-3 h-3 rounded-full bg-pink-500/20 blur-[2px]"></div>
                    </div>
                  </div>

                  {/* Card 2: Forks */}
                  <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 flex justify-between items-center relative overflow-hidden shadow-2xl group hover:border-[#2a2a2a] transition-colors">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 tracking-wide mb-1">Forks</p>
                      <h3 className="text-3xl font-bold text-cyan-400 tracking-tight font-outfit">{githubStats.forks}</h3>
                    </div>
                    {/* Git fork decorative node vectors */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-cyan-400/20 scale-125 transition-transform duration-300 group-hover:scale-135">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15H12a1.5 1.5 0 001.5-1.5V6.25M12 15v3m0 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm3-11.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Card 3: GitHub Stars */}
                  <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 flex justify-between items-center relative overflow-hidden shadow-2xl group hover:border-[#2a2a2a] transition-colors">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 tracking-wide mb-1">GitHub Stars</p>
                      <h3 className="text-3xl font-bold text-amber-400 tracking-tight font-outfit">{githubStats.stars}</h3>
                    </div>
                    {/* Tiny background star elements */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-amber-400/20 flex gap-2 transition-transform duration-300 group-hover:translate-x-[-4px]">
                      <span className="text-xs">★</span>
                      <span className="text-lg rotate-12">★</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* ── SECTION 4: Premium Site Grid Dashboard Section ── */}
            <section className="relative pt-10 pb-10 border-t border-white/5 overflow-hidden">
              {/* Ambient Background Glow Elements */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
              <div className="absolute top-[40%] left-[10%] w-[350px] h-[350px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
              <div className="absolute bottom-10 right-[10%] w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />

              {/* Header Section */}
              <div className="text-center flex flex-col items-center gap-3 mb-10 select-none">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p
                    className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-widest animate-[shimmer_3s_linear_infinite]"
                    style={{ animationDuration: '3s' }}
                  >
                    MY SITE
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <h2
                    className="text-5xl md:text-6xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15]"
                    style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
                  >
                    Explore, experiment <br />
                    <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
                      && say hello
                    </span>
                  </h2>
                </motion.div>
              </div>

              {/* 3-Column Grid Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mx-auto">

                {/* Card 1: Uses (Tech Stack Stacked Carousel Effect) */}
                <div className="group relative bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between h-[21rem] overflow-hidden transition-all duration-500 hover:border-sky-500/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.06)]">
                  {/* Ambient light bloom behind icons */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-20 bg-sky-500/10 blur-3xl rounded-full pointer-events-none transition-all duration-700 group-hover:bg-sky-500/20 group-hover:w-56 group-hover:h-28" />

                  {/* Top label */}
                  <div className="text-center z-10 w-full">
                    <span className="text-[9px] tracking-[0.25em] text-gray-600 font-bold uppercase block font-mono">USES</span>
                  </div>

                  {/* Central heading — shimmer animation */}
                  <div className="text-center z-10 my-auto flex flex-col justify-center items-center px-3 w-full">
                    <h2
                      className="font-instrument-serif text-[2.6rem] sm:text-5xl font-medium tracking-tight leading-[1.0] text-white transition-all duration-500"
                      style={{ textShadow: "0 0 24px rgba(255,255,255,0.10)" }}
                    >
                      Check out my
                    </h2>
                    <span
                      className="font-instrument-serif italic text-[2.6rem] sm:text-5xl font-light leading-[1.0] pr-1 block mt-0.5
                      bg-[linear-gradient(110deg,#7dd3fc,35%,#e0f2fe,50%,#38bdf8,65%,#0ea5e9)] bg-[size:200%_100%]
                      bg-clip-text text-transparent
                      animate-[shimmer_3s_linear_infinite]
                      group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]
                      transition-all duration-500"
                    >
                      favorite tools
                    </span>
                  </div>

                  {/* Tool icons — staggered float-bob with color glows */}
                  <div className="flex items-end justify-center gap-5 w-full z-10 pb-1">
                    {/* Brave Browser */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-11 h-11 bg-[#141414] border border-white/[0.05] rounded-xl flex items-center justify-center
                        opacity-50 group-hover:opacity-100
                        group-hover:border-orange-500/30
                        group-hover:shadow-[0_6px_18px_rgba(251,146,60,0.2)]
                        animate-float-bob
                        transition-all duration-500"
                        style={{ animationDelay: "0.15s" }}
                      >
                        <img src="https://cdn.simpleicons.org/brave" className="w-5 h-5 object-contain saturate-75 group-hover:saturate-100 transition-all duration-500" alt="Brave" />
                      </div>
                      <span className="text-[8px] tracking-widest text-gray-700 group-hover:text-gray-500 uppercase font-mono transition-colors duration-500">Brave</span>
                    </div>

                    {/* VS Code — center hero */}
                    <div className="flex flex-col items-center gap-1.5 -mt-2">
                      <div
                        className="w-14 h-14 bg-[#181818] border border-white/[0.07] rounded-xl flex items-center justify-center p-2.5
                        opacity-60 group-hover:opacity-100
                        group-hover:border-sky-500/40
                        animate-float-bob animate-glow-pulse-blue
                        transition-all duration-500"
                        style={{ animationDelay: "0s" }}
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" className="w-full h-full object-contain" alt="VS Code" />
                      </div>
                      <span className="text-[8px] tracking-widest text-gray-700 group-hover:text-sky-500/70 uppercase font-mono transition-colors duration-500">VS Code</span>
                    </div>

                    {/* GitHub */}
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-11 h-11 bg-[#141414] border border-white/[0.05] rounded-xl flex items-center justify-center
                        opacity-50 group-hover:opacity-100
                        group-hover:border-white/20
                        group-hover:shadow-[0_6px_18px_rgba(255,255,255,0.08)]
                        animate-float-bob
                        transition-all duration-500"
                        style={{ animationDelay: "0.3s" }}
                      >
                        <img src="https://cdn.simpleicons.org/github/ffffff" className="w-5 h-5 object-contain saturate-75 group-hover:saturate-100 transition-all duration-500" alt="GitHub" />
                      </div>
                      <span className="text-[8px] tracking-widest text-gray-700 group-hover:text-gray-500 uppercase font-mono transition-colors duration-500">GitHub</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Visitors Guestbook */}
                <div className="group relative bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6 flex flex-col items-center justify-between h-[21rem] overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                  {/* Abstract Matrix Grid Glow Backdrop */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="absolute top-12 w-32 h-16 bg-purple-500/10 blur-2xl rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

                  <div className="text-center z-10 mt-2">
                    <span className="text-[9px] tracking-widest text-gray-600 font-bold uppercase block mb-2 font-mono">VISITORS</span>
                  </div>

                  <div className="text-center z-10 my-auto flex flex-col justify-center items-center">
                    <h2
                      className="font-instrument-serif text-4xl sm:text-5xl font-medium tracking-tight leading-[1.05] text-white"
                      style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.12)" }}
                    >
                      Leave your <br />
                      <span
                        className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400 font-light pr-1"
                        style={{ textShadow: "0 0 35px rgba(167, 139, 250, 0.3)" }}
                      >
                        signature
                      </span>
                    </h2>
                  </div>

                  {/* Dynamic CTAs */}
                  <div className="flex flex-col items-center gap-3 z-10 w-full mt-auto">
                    {/* Avatars Stack */}
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                      <div className="flex -space-x-2">
                        {avatars.length > 0 ? (
                          avatars.map((img, idx) => (
                            <img
                              key={idx}
                              className="w-5 h-5 rounded-full border border-[#0d0d0d] object-cover shadow-md"
                              src={img}
                              alt="User"
                            />
                          ))
                        ) : (
                          <>
                            <div className="w-5 h-5 rounded-full border border-[#0d0d0d] bg-violet-600 flex items-center justify-center text-[8px] font-bold text-white shadow-md">V</div>
                            <div className="w-5 h-5 rounded-full border border-[#0d0d0d] bg-pink-500 flex items-center justify-center text-[8px] font-bold text-white shadow-md">R</div>
                            <div className="w-5 h-5 rounded-full border border-[#0d0d0d] bg-cyan-500 flex items-center justify-center text-[8px] font-bold text-white shadow-md">A</div>
                          </>
                        )}
                      </div>
                      <span className="text-gray-500 text-[10px] ml-1 group-hover:text-gray-300 transition-colors">Join others</span>
                    </div>

                    {/* Glassmorphic Rainbow Glowing Button */}
                    <Link
                      to="/guestbook"
                      className="relative flex items-center justify-center gap-1.5 rounded-full px-6 py-2 text-xs font-semibold text-gray-200 transition-all duration-300 hover:text-white hover:scale-[1.03] active:scale-[0.98] cursor-pointer group/btn"
                    >
                      {/* Rainbow outer border wrapper */}
                      <span className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-red-500/20 via-yellow-500/20 via-green-500/20 via-blue-500/20 to-purple-500/20 group-hover/btn:from-red-500/60 group-hover/btn:via-yellow-500/60 group-hover/btn:via-green-500/60 group-hover/btn:via-blue-500/60 group-hover/btn:to-purple-500/60 transition-all duration-300" />

                      {/* Inner solid button background */}
                      <span className="absolute inset-[1px] rounded-full bg-[#0d0d0d]" />

                      <span className="relative z-10 flex items-center gap-1.5 font-outfit text-white">
                        Sign Guestbook
                        <svg className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>

                      {/* Rainbow glow reflection directly under the button */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-28 h-5 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 opacity-20 blur-md rounded-full pointer-events-none group-hover/btn:opacity-50 group-hover/btn:scale-110 transition-all duration-500" />
                    </Link>
                  </div>
                </div>

                {/* Card 3: GitHub Stats */}
                <a
                  href="https://github.com/harshitwaldia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between h-[21rem] overflow-hidden transition-all duration-500 hover:border-white/15 hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]"
                >
                  {/* Subtle grid dot backdrop */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:14px_14px] opacity-60 pointer-events-none" />
                  {/* Ambient bloom */}
                  <div className="absolute top-6 right-6 w-32 h-32 bg-white/[0.03] blur-2xl rounded-full pointer-events-none transition-all duration-700 group-hover:bg-white/[0.06]" />

                  {/* Top label */}
                  <div className="flex items-center justify-between z-10 w-full">
                    <span className="text-[9px] tracking-[0.25em] text-gray-600 font-bold uppercase font-mono">GITHUB</span>
                    <img src="https://cdn.simpleicons.org/github/ffffff" className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity duration-500" alt="GitHub" />
                  </div>

                  {/* Central heading */}
                  <div className="text-center z-10 my-auto flex flex-col justify-center items-center px-2 w-full">
                    <h2
                      className="font-instrument-serif text-[2.4rem] sm:text-5xl font-medium tracking-tight leading-[1.0] text-white"
                      style={{ textShadow: "0 0 24px rgba(255,255,255,0.10)" }}
                    >
                      Open source
                    </h2>
                    <span
                      className="font-instrument-serif italic text-[2.4rem] sm:text-5xl font-light leading-[1.0] pr-1 block mt-0.5
                      bg-[linear-gradient(110deg,#d4d4d4,35%,#ffffff,50%,#a3a3a3,65%,#d4d4d4)] bg-[size:200%_100%]
                      bg-clip-text text-transparent
                      animate-[shimmer_4s_linear_infinite]
                      group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]
                      transition-all duration-500"
                    >
                      & building
                    </span>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-2 w-full z-10">
                    <div className="flex flex-col items-center bg-white/[0.03] border border-white/[0.05] rounded-xl py-2.5 group-hover:border-white/10 transition-all duration-500">
                      <span className="text-white font-semibold text-base leading-none font-outfit tabular-nums">{githubStats.stars}</span>
                      <span className="text-[8px] tracking-widest text-gray-600 uppercase font-mono mt-1">Stars</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/[0.03] border border-white/[0.05] rounded-xl py-2.5 group-hover:border-white/10 transition-all duration-500">
                      <span className="text-white font-semibold text-base leading-none font-outfit tabular-nums">{githubStats.followers}</span>
                      <span className="text-[8px] tracking-widest text-gray-600 uppercase font-mono mt-1">Followers</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/[0.03] border border-white/[0.05] rounded-xl py-2.5 group-hover:border-white/10 transition-all duration-500">
                      <span className="text-white font-semibold text-base leading-none font-outfit tabular-nums">{githubStats.forks}</span>
                      <span className="text-[8px] tracking-widest text-gray-600 uppercase font-mono mt-1">Forks</span>
                    </div>
                  </div>
                </a>

              </div>
            </section>

            {/* ── SECTION 5: "From Concept to Creation" Hire-Me Hero ── */}
            <section className="relative border-t border-white/5 py-12 sm:py-16 overflow-hidden">
              {/* ambient colour splashes */}
              <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-teal-500/15 blur-[110px]" />
              <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-amber-600/15 blur-[110px]" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-10 sm:px-10 sm:py-12 shadow-2xl shadow-black/80 backdrop-blur-sm"
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
                <div className="relative flex flex-col items-center text-center z-10">

                  {/* ── Wings + Initials Orb ── */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="mb-5 flex items-center justify-center"
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

                    {/* Initials orb */}
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

                  {/* ── Headline + Spinning Badge ── */}
                  <div className="relative max-w-3xl">
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
                      <span className="font-light">Let&apos;s make it </span>
                      <span className="font-black">happen!</span>
                    </motion.h2>

                    {/* Spinning "Open To Work" badge — desktop */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                      className="absolute -right-4 -top-3 hidden sm:block md:-right-6"
                    >
                      <motion.div
                        drag
                        dragSnapToOrigin
                        dragElastic={0.25}
                        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                        whileHover={{ scale: 1.05, cursor: "grab" }}
                        className="relative h-[88px] w-[88px] shrink-0 sm:h-[96px] sm:w-[96px] cursor-grab select-none"
                        style={{ touchAction: "none" }}
                      >
                        <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-xl" />
                        <div className="absolute inset-0 rounded-full border-[3px] border-blue-500 shadow-[0_0_25px_4px_rgba(59,130,246,0.55)]" />
                        <motion.svg viewBox="0 0 130 130" className="absolute inset-0 h-full w-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 12 }}>
                          <defs><path id="otw-circle-d" d="M 65,65 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" /></defs>
                          <text fill="#ffffff" fontSize="8.5" letterSpacing="2" fontWeight={600}>
                            <textPath href="#otw-circle-d" startOffset="0%">OPEN TO WORK • OPEN TO WORK • </textPath>
                          </text>
                        </motion.svg>
                        <div className="absolute inset-[10px] sm:inset-[12px] flex items-center justify-center rounded-full bg-black">
                          <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24"><path d="M12 2l1.5 5.5H19l-4.5 3.3 1.7 5.2L12 13l-4.2 3 1.7-5.2L5 7.5h5.5z" /></svg>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Spinning badge — mobile */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                      className="mt-4 flex justify-center sm:hidden"
                    >
                      <motion.div
                        drag
                        dragSnapToOrigin
                        dragElastic={0.25}
                        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                        whileHover={{ scale: 1.05, cursor: "grab" }}
                        className="relative h-[88px] w-[88px] shrink-0 cursor-grab select-none"
                        style={{ touchAction: "none" }}
                      >
                        <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-xl" />
                        <div className="absolute inset-0 rounded-full border-[3px] border-blue-500 shadow-[0_0_25px_4px_rgba(59,130,246,0.55)]" />
                        <motion.svg viewBox="0 0 130 130" className="absolute inset-0 h-full w-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 12 }}>
                          <defs><path id="otw-circle-m" d="M 65,65 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" /></defs>
                          <text fill="#ffffff" fontSize="8.5" letterSpacing="2" fontWeight={600}>
                            <textPath href="#otw-circle-m" startOffset="0%">OPEN TO WORK • OPEN TO WORK • </textPath>
                          </text>
                        </motion.svg>
                        <div className="absolute inset-[10px] flex items-center justify-center rounded-full bg-black">
                          <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24"><path d="M12 2l1.5 5.5H19l-4.5 3.3 1.7 5.2L12 13l-4.2 3 1.7-5.2L5 7.5h5.5z" /></svg>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

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
                    className="mt-8 max-w-xl"
                  >
                    <p className="text-base font-semibold text-white sm:text-lg">
                      I&apos;m available for AI/ML engineering roles &amp; technical collaborations.
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-400 sm:text-sm">
                      I thrive on building practical AI systems, RAG platforms, and production ML pipelines.
                    </p>
                  </motion.div>

                </div>
              </motion.div>
            </section>

          </div>

          {/* Right vertical bar */}
          <div
            aria-hidden="true"
            className="w-full border-x border-white/5 bg-stripes-vertical [mask-image:linear-gradient(to_bottom,transparent,black_10rem)] [WebkitMaskImage:linear-gradient(to_bottom,transparent,black_10rem)]"
          />
        </div>
      </div>
    </div>
  );
}

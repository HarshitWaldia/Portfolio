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
  PYTHON: "/icons/python.svg",
  PYTORCH: "https://cdn.simpleicons.org/pytorch/EE4C2C",
  FASTAPI: "https://cdn.simpleicons.org/fastapi/009688",
  LANGCHAIN: "https://cdn.simpleicons.org/langchain/ffffff",
  GROQ: "/icons/groq.svg",
  STREAMLIT: "https://cdn.simpleicons.org/streamlit/FF4B4B",
  POSTGRESQL: "/icons/postgresql.svg",
  FAISS: "https://cdn.simpleicons.org/meta/ffffff",
  OPENCV: "https://cdn.simpleicons.org/opencv/5C3EE8",
  DIFFUSERS: "https://cdn.simpleicons.org/huggingface/ffffff",
  YOLO: "https://cdn.simpleicons.org/scikitlearn/ffffff",
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
    id: "army-archive-llm",
    name: "Army Archive LLM & Digitization",
    role: "AI/ML Engineer (SLOG Solutions)",
    period: "Mar 2026 - Present",
    description: "Developing an enterprise-grade Army Archive LLM and Record Digitization Platform for 2 IDSR Goa, turning physical and semi-structured defense records into high-precision, searchable semantic knowledge bases.",
    githubUrl: "https://github.com/HarshitWaldia/VIKRAM-AI",
    cardText: "Army Archive LLM — Record Digitization, RAG & Semantic Retrieval Platform",
    bullets: [
      "Built multi-modal ingestion pipeline pairing Tesseract OCR and layout-aware chunking with vector database embeddings for contextual indexing of historical records.",
      "Engineered a production RAG (Retrieval-Augmented Generation) pipeline with re-ranking and FAISS vector storage to eliminate LLM hallucinations on sensitive inquiries.",
      "Implemented role-based document access controls and citation-grounded conversational search for rapid query answering."
    ],
    tags: ["PYTHON", "LANGCHAIN", "FAISS", "POSTGRESQL", "DOCKER", "FASTAPI"],
    accent: "blue",
    mockupKey: "army-archive",
  },
  {
    id: "doctalk",
    name: "DocTalk — PDF Chatbot",
    role: "Creator & Developer",
    period: "Personal Project",
    description: "A RAG-powered chatbot allowing users to upload complex, multi-page PDFs and interact with them in real-time using conversational natural language with citation attribution.",
    githubUrl: "https://github.com/HarshitWaldia/DocTalk-llm-Powered-PDF-Chatbot",
    cardText: "DocTalk — High-Speed Conversational PDF Assistant with Groq & LangChain",
    bullets: [
      "Architected document chunking and embedding pipelines with FAISS indexing for instant similarity retrieval across dense documents.",
      "Integrated Groq API for ultra-low latency LLM inference coupled with LangChain contextual memory buffers.",
      "Built an intuitive Streamlit interface featuring chat histories, source chunk inspections, and confidence scoring."
    ],
    tags: ["PYTHON", "LANGCHAIN", "FAISS", "STREAMLIT", "GROQ"],
    accent: "violet",
    mockupKey: "doctalk",
  },
  {
    id: "fastapi-rbac",
    name: "FastAPI RBAC Microservice",
    role: "Backend & ML Developer",
    period: "Microservice Project",
    description: "Production-ready backend microservice implementing strict Role-Based Access Control, JWT authentication tokens, and granular permission enforcement.",
    githubUrl: "https://github.com/HarshitWaldia/FastAPI-RBAC-Microservice",
    cardText: "FastAPI RBAC — Secure, High-Throughput Endpoint Authorization Microservice",
    bullets: [
      "Engineered role-permission mapping with hierarchical permission checks, token revocation, and route-level dependency injection.",
      "Connected PostgreSQL with optimized SQLAlchemy models and automated database migrations.",
      "Dockerized microservice architecture ready for scalable cloud deployments with comprehensive test coverage."
    ],
    tags: ["FASTAPI", "PYTHON", "JWT", "POSTGRESQL", "DOCKER"],
    accent: "red",
    mockupKey: "fastapi-rbac",
  },
  {
    id: "synthiverse",
    name: "Synthiverse",
    role: "AI Developer",
    period: "Generative AI Project",
    description: "A Stable Diffusion-based creative synthesis platform offering stylized image generation, prompt optimization, and computer vision filters.",
    githubUrl: "https://github.com/HarshitWaldia/SynthiVerse",
    cardText: "Synthiverse — Text-to-Image Generation & Stylistic Synthesis Engine",
    bullets: [
      "Implemented PyTorch and Hugging Face Diffusers pipelines for accelerated diffusion sampling and latent space conditioning.",
      "Built prompt enhancement heuristics and negative prompt encoders to maximize visual fidelity and stylistic consistency.",
      "Integrated OpenCV post-processing pipelines for resolution upscaling, edge sharpening, and artifact cleanup."
    ],
    tags: ["PYTORCH", "PYTHON", "DIFFUSERS", "OPENCV"],
    accent: "violet",
    mockupKey: "synthiverse",
  },
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
  "army-archive": () => (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#070e17] p-3.5 border border-blue-500/20 text-left font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[10px] font-bold text-blue-300">2 IDSR Goa Archive Intelligence</span>
        </div>
        <span className="text-[9px] text-white/40">FAISS + RAG Engine</span>
      </div>
      <div className="space-y-2 text-[10px] text-white/70">
        <div className="p-2 rounded bg-white/5 border border-white/5">
          <span className="text-cyan-400 font-semibold">&gt; Query:</span> Retrieve historical log citations (1984 - 1992)
        </div>
        <div className="p-2 rounded bg-blue-950/40 border border-blue-500/20 text-[9px] text-blue-200">
          <span className="text-emerald-400 font-semibold">[OCR Verified]</span> Found 48 matching vectorized chunks with cosine similarity &gt; 0.92
        </div>
      </div>
      <div className="flex gap-2 pt-2 border-t border-white/5 text-[9px] text-white/40">
        <span>Chunking: Layout-aware</span>
        <span>•</span>
        <span>Re-ranking: Cross-Encoder</span>
      </div>
    </div>
  ),
  doctalk: () => (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#100b1a] p-3.5 border border-violet-500/20 text-left font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          <span className="text-[10px] font-bold text-violet-300">DocTalk PDF Assistant</span>
        </div>
        <span className="text-[9px] text-amber-300 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">Groq 450 t/s</span>
      </div>
      <div className="space-y-2 text-[10px] text-white/70">
        <div className="p-2 rounded bg-white/5 border border-white/5">
          <span className="text-pink-400 font-semibold">User:</span> Summarize key risk factors in Section 4.2
        </div>
        <div className="p-2 rounded bg-violet-950/40 border border-violet-500/20 text-[9px] text-violet-200">
          <span className="text-emerald-400 font-semibold">DocTalk:</span> Identified 3 primary factors: latency limits, cache miss ratios, and node failover tolerance (p. 28).
        </div>
      </div>
      <div className="flex gap-2 pt-2 border-t border-white/5 text-[9px] text-white/40">
        <span>Embeddings: HuggingFace</span>
        <span>•</span>
        <span>Vector Store: FAISS</span>
      </div>
    </div>
  ),
  "fastapi-rbac": () => (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#14080c] p-3.5 border border-rose-500/20 text-left font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span className="text-[10px] font-bold text-rose-300">FastAPI RBAC Security Gateway</span>
        </div>
        <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">JWT Active</span>
      </div>
      <div className="space-y-1.5 text-[9px]">
        <div className="flex items-center justify-between p-1.5 rounded bg-white/5 border border-white/5 text-white/80">
          <span>POST /api/v1/auth/token</span>
          <span className="text-emerald-400">200 OK</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-white/5 border border-white/5 text-white/80">
          <span>GET /api/v1/admin/audit-logs</span>
          <span className="text-cyan-400">SCOPE: admin.read</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-white/5 border border-white/5 text-white/80">
          <span>DELETE /api/v1/users/:id</span>
          <span className="text-rose-400">ROLE: SUPERADMIN</span>
        </div>
      </div>
      <div className="flex gap-2 pt-2 border-t border-white/5 text-[9px] text-white/40">
        <span>ORM: SQLAlchemy</span>
        <span>•</span>
        <span>PostgreSQL Cluster</span>
      </div>
    </div>
  ),
  synthiverse: () => (
    <div className="w-full h-full relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#090817] p-3.5 border border-indigo-500/20 text-left font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-[10px] font-bold text-indigo-300">Synthiverse Diffusion Studio</span>
        </div>
        <span className="text-[9px] text-indigo-300 font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded">PyTorch CUDA</span>
      </div>
      <div className="space-y-2 text-[10px] text-white/70">
        <div className="p-2 rounded bg-white/5 border border-white/5 text-[9px]">
          <span className="text-amber-400 font-semibold">Prompt:</span> Cyberpunk laboratory with holographic neural lattices, photorealistic 8k
        </div>
        <div className="p-2 rounded bg-indigo-950/40 border border-indigo-500/20 text-[9px] text-indigo-200 flex justify-between items-center">
          <span>Sampling: 30 steps (DPM++ 2M Karras)</span>
          <span className="text-emerald-400 font-bold">100% Ready</span>
        </div>
      </div>
      <div className="flex gap-2 pt-2 border-t border-white/5 text-[9px] text-white/40">
        <span>Diffusers Pipeline</span>
        <span>•</span>
        <span>OpenCV Post-Process</span>
      </div>
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
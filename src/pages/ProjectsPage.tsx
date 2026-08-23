"use client";

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useMetadata } from "@/hooks/use-metadata";
import {
  Search,
  ExternalLink,
  Star,
  GitFork,
  Terminal,
  Database,
  Server,
  Layers,
  Sparkles,
  ArrowUpRight,
  Code2,
  Bot,
  Eye,
  BarChart3,
  Globe
} from "lucide-react";
import { Github } from "@/components/ui/brand-icons";

// Tag name -> simpleicons.org slug for tech badges
const TECH_SLUG_MAP: Record<string, string> = {
  "react": "react", "next.js": "nextdotjs", "nextjs": "nextdotjs",
  "node.js": "nodedotjs", "nodejs": "nodedotjs", "express.js": "express",
  "typescript": "typescript", "javascript": "javascript",
  "tailwind css": "tailwindcss", "mongodb": "mongodb", "jwt": "jsonwebtokens",
  "redis": "redis", "docker": "docker", "aws": "amazonaws", "rest api": "fastapi",
  "fastapi": "fastapi", "git": "git", "github": "github", "vite": "vite",
  "python": "python", "pytorch": "pytorch", "opencv": "opencv", "langchain": "langchain",
  "groq": "groq", "streamlit": "streamlit", "postgresql": "postgresql", "faiss": "meta",
  "diffusers": "huggingface", "jupyter": "jupyter", "dart": "dart", "flutter": "flutter",
  "flask": "flask", "scikit-learn": "scikitlearn", "mysql": "mysql", "tensorflow": "tensorflow",
  "vercel": "vercel", "langgraph": "langchain", "sqlalchemy": "sqlalchemy"
};

function TechBadge({ name }: { name: string }) {
  const n = name.toLowerCase().trim();
  const slug = TECH_SLUG_MAP[n];

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/15 text-[10px] sm:text-[11px] font-mono text-neutral-300 hover:text-white transition-colors">
      {slug ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt=""
          aria-hidden="true"
          className="size-3 object-contain shrink-0 opacity-75"
          loading="lazy"
        />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400/80" />
      )}
      <span>{name}</span>
    </span>
  );
}

interface ProjectItem {
  id: string;
  name: string;
  title: string;
  description: string;
  category: "all" | "agentic-ai" | "computer-vision" | "backend" | "ml-analytics" | "fullstack";
  categoryLabel: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  stars: number;
  forks: number;
  accent: "cyan" | "violet" | "pink" | "rose" | "amber" | "emerald" | "blue";
  featured?: boolean;
}

const ALL_PROJECTS: ProjectItem[] = [
  {
    id: "vikram-ai",
    name: "VIKRAM-AI",
    title: "VIKRAM-AI — Defense Archive LLM & Digitization Platform",
    description: "Virtual Intelligent Knowledge & Regimental Archive Module developed for 2 IDSR Goa. Pairs Tesseract OCR, FAISS vector embeddings, and LangChain RAG pipelines for contextual defense record querying without hallucinations.",
    category: "agentic-ai",
    categoryLabel: "Agentic AI & LLMs",
    tags: ["Python", "LangChain", "FAISS", "FastAPI", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/HarshitWaldia/VIKRAM-AI",
    stars: 1,
    forks: 0,
    accent: "blue",
    featured: true,
  },
  {
    id: "doctalk",
    name: "DocTalk-llm-Powered-PDF-Chatbot",
    title: "DocTalk — High-Speed Conversational PDF Assistant",
    description: "RAG-powered chat application leveraging LangChain, Groq API (450+ tokens/sec), and FAISS vector indexing for ultra-low latency multi-document exploration and citation attribution.",
    category: "agentic-ai",
    categoryLabel: "Agentic AI & LLMs",
    tags: ["Python", "LangChain", "Groq", "FAISS", "Streamlit"],
    githubUrl: "https://github.com/HarshitWaldia/DocTalk-llm-Powered-PDF-Chatbot",
    stars: 3,
    forks: 1,
    accent: "violet",
    featured: true,
  },
  {
    id: "stock-price-prediction",
    name: "Stock-Price-Prediction",
    title: "StockSense — Deep Learning LSTM Price Predictor",
    description: "An AI-driven financial market analytics dashboard that forecasts next-day equities using LSTM neural networks, Yahoo Finance real-time data ingestion, and interactive React charting.",
    category: "ml-analytics",
    categoryLabel: "ML & Analytics",
    tags: ["Python", "TensorFlow", "React", "Flask", "Jupyter", "Vercel"],
    githubUrl: "https://github.com/HarshitWaldia/Stock-Price-Prediction",
    demoUrl: "https://stock-price-prediction-lilac.vercel.app",
    stars: 2,
    forks: 0,
    accent: "emerald",
    featured: true,
  },
  {
    id: "synthiverse",
    name: "SynthiVerse",
    title: "SynthiVerse — Multimodal Generative AI Studio",
    description: "A multimodal generative synthesis platform converting textual prompts into high-resolution imagery, expressive audio, and video using PyTorch & custom-trained Hugging Face Diffusers pipelines.",
    category: "computer-vision",
    categoryLabel: "Vision & GenAI",
    tags: ["PyTorch", "Python", "Diffusers", "OpenCV", "Jupyter"],
    githubUrl: "https://github.com/HarshitWaldia/SynthiVerse",
    stars: 3,
    forks: 0,
    accent: "pink",
    featured: true,
  },
  {
    id: "fastapi-rbac",
    name: "FastAPI-RBAC-Microservice",
    title: "FastAPI RBAC — Enterprise Endpoint Authorization Gateway",
    description: "Production-ready backend microservice featuring hierarchical Role-Based Access Control, JWT authentication tokens, route-level dependency injection, PostgreSQL, and Docker containerization.",
    category: "backend",
    categoryLabel: "Backend & Systems",
    tags: ["FastAPI", "Python", "JWT", "PostgreSQL", "Docker", "REST API"],
    githubUrl: "https://github.com/HarshitWaldia/FastAPI-RBAC-Microservice",
    stars: 3,
    forks: 0,
    accent: "rose",
    featured: true,
  },
  {
    id: "traffictally",
    name: "TrafficTally",
    title: "TrafficTally — Real-Time Computer Vision Vehicle Counter",
    description: "High-precision computer vision pipeline using OpenCV and object tracking algorithms to detect, track, and tally vehicle flow counts in real-time traffic surveillance video streams.",
    category: "computer-vision",
    categoryLabel: "Vision & GenAI",
    tags: ["Python", "OpenCV", "PyTorch", "Computer Vision", "Jupyter"],
    githubUrl: "https://github.com/HarshitWaldia/TrafficTally",
    stars: 6,
    forks: 0,
    accent: "amber",
    featured: true,
  },
  {
    id: "autonomous-market-research-agent",
    name: "Autonomous-Market-Research-Agent",
    title: "MarketMind — Autonomous Market Research Agent",
    description: "Autonomous AI research agent with multi-step reasoning and dynamic web planning. Performs competitor analysis, synthesizes industry intelligence, and outputs executive reports via Groq LLM.",
    category: "agentic-ai",
    categoryLabel: "Agentic AI & LLMs",
    tags: ["Python", "Groq", "LangChain", "Gradio", "Agentic AI"],
    githubUrl: "https://github.com/HarshitWaldia/Autonomous-Market-Research-Agent",
    stars: 1,
    forks: 0,
    accent: "cyan",
  },
  {
    id: "prompt-diagnosis-agent",
    name: "AI-Prompt-Failure-Diagnosis-Agent",
    title: "PromptDoctor — AI Prompt Failure Diagnostic Agent",
    description: "An intelligent Agentic AI system that inspects, diagnoses, and fixes ineffective LLM prompts by identifying ambiguity, token overflow, reasoning flaws, and structural constraints.",
    category: "agentic-ai",
    categoryLabel: "Agentic AI & LLMs",
    tags: ["Python", "Groq", "LangChain", "Prompt Engineering"],
    githubUrl: "https://github.com/HarshitWaldia/AI-Prompt-Failure-Diagnosis-Agent",
    stars: 1,
    forks: 0,
    accent: "violet",
  },
  {
    id: "multi-agent-ticket-resolver",
    name: "Multi-Agent-Customer-Support-Ticket-Resolver",
    title: "SupportSwarm — Multi-Agent Ticket Resolution System",
    description: "Collaborative multi-agent architecture modeling real-world customer support workflows. Combines deterministic routing rules with probabilistic LLM reasoning to triage and resolve queries.",
    category: "agentic-ai",
    categoryLabel: "Agentic AI & LLMs",
    tags: ["Python", "LangGraph", "LangChain", "Agentic AI"],
    githubUrl: "https://github.com/HarshitWaldia/Multi-Agent-Customer-Support-Ticket-Resolver",
    stars: 0,
    forks: 0,
    accent: "blue",
  },
  {
    id: "webtraffic-analysis-agent",
    name: "WebTraffic-Analysis-Agent",
    title: "TrafficAgent — GA4 Analytics Intelligence Agent",
    description: "Agentic AI workflow analyzing Google Analytics (GA4) traffic datasets from Excel, computing YoY/MoM trajectory shifts, and producing non-hallucinated executive summaries with Groq LLMs.",
    category: "agentic-ai",
    categoryLabel: "Agentic AI & LLMs",
    tags: ["Python", "Groq", "Analytics", "Agentic AI"],
    githubUrl: "https://github.com/HarshitWaldia/WebTraffic-Analysis-Agent",
    stars: 0,
    forks: 0,
    accent: "emerald",
  },
  {
    id: "ai-qgen-rag",
    name: "Ai_Qgen_RAG",
    title: "Ai Qgen RAG — Automated Exam & Question Paper Generator",
    description: "Generates structured question papers, Bloom's-taxonomy-mapped questions, and marking rubrics directly from uploaded curriculum documents using Retrieval-Augmented Generation.",
    category: "agentic-ai",
    categoryLabel: "Agentic AI & LLMs",
    tags: ["Python", "LangChain", "FAISS", "RAG", "FastAPI"],
    githubUrl: "https://github.com/HarshitWaldia/Ai_Qgen_RAG",
    stars: 0,
    forks: 0,
    accent: "violet",
  },
  {
    id: "agentic-seo-ranking",
    name: "Agentic-SEO-Ranking-System",
    title: "RankAgent — Automated Google Places & SEO Tracker",
    description: "Agentic AI SEO system tracking Google Places (Local) and organic search engine rankings for competitive keyword matrices using LangGraph and SerpAPI integrations.",
    category: "agentic-ai",
    categoryLabel: "Agentic AI & LLMs",
    tags: ["Python", "LangGraph", "SerpAPI", "Agentic AI"],
    githubUrl: "https://github.com/HarshitWaldia/Agentic-SEO-Ranking-System",
    stars: 0,
    forks: 0,
    accent: "amber",
  },
  {
    id: "riskradar-loan-predictor",
    name: "RiskRadar-Loan-Defaulter-Predictor",
    title: "RiskRadar — Loan Default Risk Predictor",
    description: "Machine learning classification pipeline identifying high-risk borrowers to reduce Non-Performing Assets (NPAs), optimized for maximum AUC-ROC performance on banking datasets.",
    category: "ml-analytics",
    categoryLabel: "ML & Analytics",
    tags: ["Python", "Scikit-Learn", "Jupyter", "Machine Learning"],
    githubUrl: "https://github.com/HarshitWaldia/RiskRadar-Loan-Defaulter-Predictor",
    stars: 2,
    forks: 0,
    accent: "rose",
  },
  {
    id: "ecommerce-backend-mark-2",
    name: "Ecommerce-Backend-Mark-2",
    title: "Ecommerce Backend Mark-2 — Scalable FastAPI Store API",
    description: "Comprehensive e-commerce backend built with Python & FastAPI featuring inventory synchronization, order management, secure payment handling, and token authentication.",
    category: "backend",
    categoryLabel: "Backend & Systems",
    tags: ["FastAPI", "Python", "PostgreSQL", "Docker", "REST API"],
    githubUrl: "https://github.com/HarshitWaldia/Ecommerce-Backend-Mark-2",
    stars: 2,
    forks: 1,
    accent: "blue",
  },
  {
    id: "predictive-analytics-solutions",
    name: "Predictive-Analytics-Solutions",
    title: "Predictive Analytics — Manufacturing & E-Commerce ML",
    description: "Dual data science solutions predicting manufacturing workforce efficiency using operational telemetry and e-commerce web session conversion rates with feature engineering.",
    category: "ml-analytics",
    categoryLabel: "ML & Analytics",
    tags: ["Python", "Scikit-Learn", "Jupyter", "Pandas"],
    githubUrl: "https://github.com/HarshitWaldia/Predictive-Analytics-Solutions",
    stars: 4,
    forks: 0,
    accent: "emerald",
  },
  {
    id: "face-emotion-recognition",
    name: "Face_Emotion_Recognition",
    title: "Face Emotion Recognition — Deep Vision Classifier",
    description: "Deep Convolutional Neural Network (CNN) pipeline classifying human facial expressions in real-time video streams across 7 key emotional states with OpenCV.",
    category: "computer-vision",
    categoryLabel: "Vision & GenAI",
    tags: ["Python", "OpenCV", "TensorFlow", "PyTorch", "Jupyter"],
    githubUrl: "https://github.com/HarshitWaldia/Face_Emotion_Recognition",
    stars: 4,
    forks: 0,
    accent: "pink",
  },
  {
    id: "image-super-resolution",
    name: "Image-Super-Resolution",
    title: "ESRGAN — Image Super Resolution GAN",
    description: "Enhanced Super-Resolution Generative Adversarial Network implementation restoring high-frequency textures and photorealistic details from low-res image inputs.",
    category: "computer-vision",
    categoryLabel: "Vision & GenAI",
    tags: ["Python", "PyTorch", "GANs", "Computer Vision"],
    githubUrl: "https://github.com/HarshitWaldia/Image-Super-Resolution",
    stars: 3,
    forks: 0,
    accent: "cyan",
  },
  {
    id: "churn-modelling",
    name: "Churn_Modelling",
    title: "ChurnModeller — Bank Customer Retention ANN",
    description: "Artificial Neural Network (ANN) classification model predicting bank customer churn probability, utilizing customer demographic, credit score, and financial activity patterns.",
    category: "ml-analytics",
    categoryLabel: "ML & Analytics",
    tags: ["Python", "TensorFlow", "ANN", "Jupyter"],
    githubUrl: "https://github.com/HarshitWaldia/Churn_Modelling",
    stars: 4,
    forks: 0,
    accent: "amber",
  },
  {
    id: "pravaha",
    name: "Pravaha",
    title: "Pravaha — Speech Therapy & Fluency Companion",
    description: "Evidence-based offline speech therapy mobile application with visual pacing, oral-motor drills, and targeted consonant progression ladders.",
    category: "fullstack",
    categoryLabel: "Full Stack & Apps",
    tags: ["Dart", "Flutter", "Mobile", "Speech AI"],
    githubUrl: "https://github.com/HarshitWaldia/Pravaha",
    stars: 0,
    forks: 0,
    accent: "cyan",
  },
  {
    id: "fastapi-postgres-crud",
    name: "FastAPI-Postgres-CRUD",
    title: "FastAPI Postgres CRUD — Clean Architecture Engine",
    description: "Starter repository showcasing asynchronous CRUD operations with FastAPI, PostgreSQL, SQLAlchemy 2.0 ORM, and automated Alembic schema migrations.",
    category: "backend",
    categoryLabel: "Backend & Systems",
    tags: ["FastAPI", "Python", "PostgreSQL", "SQLAlchemy"],
    githubUrl: "https://github.com/HarshitWaldia/FastAPI-Postgres-CRUD",
    stars: 2,
    forks: 0,
    accent: "rose",
  },
  {
    id: "weather-recommendation-agent",
    name: "Weather-Based-Recommendation-Agent-using-Agentic-AI",
    title: "WeatherAgent — Context-Aware Decision Assistant",
    description: "Decision support weather agent using agentic reasoning principles. Delivers personalized clothing, travel, and activity recommendations based on live meteorological forecasts.",
    category: "agentic-ai",
    categoryLabel: "Agentic AI & LLMs",
    tags: ["Python", "Groq", "Agentic AI", "FastAPI"],
    githubUrl: "https://github.com/HarshitWaldia/Weather-Based-Recommendation-Agent-using-Agentic-AI",
    stars: 0,
    forks: 0,
    accent: "blue",
  },
  {
    id: "disease-detection",
    name: "Disease_Detection",
    title: "DiseaseSense — Symptom-Based Diagnostic System",
    description: "Medical diagnosis classifier utilizing Random Forest algorithms and an intuitive GUI in Python to identify potential conditions and recommend immediate medical steps.",
    category: "ml-analytics",
    categoryLabel: "ML & Analytics",
    tags: ["Python", "Scikit-Learn", "Machine Learning"],
    githubUrl: "https://github.com/HarshitWaldia/Disease_Detection",
    stars: 3,
    forks: 1,
    accent: "emerald",
  }
];

const CATEGORIES = [
  { id: "all", label: "All Projects", icon: <Layers size={14} /> },
  { id: "agentic-ai", label: "Agentic AI & LLMs", icon: <Bot size={14} /> },
  { id: "computer-vision", label: "Vision & GenAI", icon: <Eye size={14} /> },
  { id: "backend", label: "Backend & Systems", icon: <Server size={14} /> },
  { id: "ml-analytics", label: "ML & Analytics", icon: <BarChart3 size={14} /> },
  { id: "fullstack", label: "Apps & Full Stack", icon: <Globe size={14} /> },
];

function getCategoryIcon(category: string) {
  switch (category) {
    case "agentic-ai":
      return <Bot size={13} className="text-violet-400" />;
    case "computer-vision":
      return <Eye size={13} className="text-pink-400" />;
    case "backend":
      return <Server size={13} className="text-rose-400" />;
    case "ml-analytics":
      return <BarChart3 size={13} className="text-emerald-400" />;
    case "fullstack":
      return <Globe size={13} className="text-cyan-400" />;
    default:
      return <Code2 size={13} className="text-amber-400" />;
  }
}

const ACCENT_STYLES = {
  cyan: {
    glow: "hover:border-cyan-500/35 hover:shadow-[0_0_35px_rgba(6,182,212,0.12)]",
    cardGlow: "from-cyan-500/15 via-cyan-500/5 to-transparent",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  violet: {
    glow: "hover:border-violet-500/35 hover:shadow-[0_0_35px_rgba(139,92,246,0.12)]",
    cardGlow: "from-violet-500/15 via-violet-500/5 to-transparent",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
  pink: {
    glow: "hover:border-pink-500/35 hover:shadow-[0_0_35px_rgba(236,72,153,0.12)]",
    cardGlow: "from-pink-500/15 via-pink-500/5 to-transparent",
    iconBg: "bg-pink-500/10 border-pink-500/20",
  },
  rose: {
    glow: "hover:border-rose-500/35 hover:shadow-[0_0_35px_rgba(244,63,94,0.12)]",
    cardGlow: "from-rose-500/15 via-rose-500/5 to-transparent",
    iconBg: "bg-rose-500/10 border-rose-500/20",
  },
  amber: {
    glow: "hover:border-amber-500/35 hover:shadow-[0_0_35px_rgba(245,158,11,0.12)]",
    cardGlow: "from-amber-500/15 via-amber-500/5 to-transparent",
    iconBg: "bg-amber-500/10 border-amber-500/20",
  },
  emerald: {
    glow: "hover:border-emerald-500/35 hover:shadow-[0_0_35px_rgba(16,185,129,0.12)]",
    cardGlow: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  blue: {
    glow: "hover:border-blue-500/35 hover:shadow-[0_0_35px_rgba(59,130,246,0.12)]",
    cardGlow: "from-blue-500/15 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-500/10 border-blue-500/20",
  },
};

export default function ProjectsPage() {
  useMetadata({ title: "Projects" });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalStars = useMemo(() => ALL_PROJECTS.reduce((sum, p) => sum + p.stars, 0), []);
  const totalRepos = ALL_PROJECTS.length;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden selection:bg-violet-500/30">
      {/* Background texture & ambient glow overlays */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] mix-blend-screen pointer-events-none z-0"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1920&auto=format&fit=crop')` }}
      />

      {/* Top Ambient Light Blooms */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-pink-600/15 blur-[150px] rounded-full z-0" />
      <div className="pointer-events-none absolute top-[35%] right-[-100px] w-[500px] h-[500px] bg-cyan-500/8 blur-[160px] rounded-full z-0" />
      <div className="pointer-events-none absolute bottom-[15%] left-[-100px] w-[500px] h-[500px] bg-violet-500/8 blur-[160px] rounded-full z-0" />

      {/* Main Structural Framing Container */}
      <div className="w-full max-w-none px-2 sm:px-4 lg:px-6 relative flex flex-col pt-24 pb-16 z-10">
        <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px] relative">

          {/* Left vertical border stripes bar */}
          <div
            aria-hidden="true"
            className="w-full border-x border-white/5 bg-stripes-vertical [mask-image:linear-gradient(to_bottom,transparent,black_10rem)] [WebkitMaskImage:linear-gradient(to_bottom,transparent,black_10rem)]"
          />

          {/* Center Main Content Body */}
          <div className="min-w-0 flex-1 px-3 sm:px-6 md:px-10">

            {/* ── HERO SECTION ── */}
            <section className="relative pt-6 pb-12 text-center flex flex-col items-center border-b border-white/5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span
                  className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-[0.35em] animate-[shimmer_3s_linear_infinite] mb-4 inline-block font-semibold"
                  style={{ animationDuration: "3s" }}
                >
                  ENGINEERED WITH CODE
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white font-medium font-instrument-serif leading-[1.12] max-w-4xl mb-6"
                style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
              >
                Intelligent Agents, RAG &amp; <br />
                <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400">
                  Production Systems
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-neutral-400 text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-8"
              >
                A curated catalog of open-source artificial intelligence systems, multi-agent frameworks, computer vision models, predictive engines, and FastAPI backend microservices.
              </motion.p>

              {/* GitHub Live Meta Stats Pills */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono"
              >
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-white/10 text-white/80 shadow-md">
                  <Code2 size={14} className="text-violet-400" />
                  <span><strong className="text-white font-bold">{totalRepos}+</strong> Repositories</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-white/10 text-white/80 shadow-md">
                  <Star size={14} className="text-amber-400 fill-amber-400/20" />
                  <span><strong className="text-white font-bold">{totalStars}+</strong> Stars</span>
                </div>
                <a
                  href="https://github.com/HarshitWaldia?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white transition-all shadow-md group"
                >
                  <Github size={14} />
                  <span>GitHub Profile</span>
                  <ArrowUpRight size={13} className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            </section>

            {/* ── CONTROLS: SEARCH & CATEGORY FILTER TABS ── */}
            <section className="sticky top-20 z-30 pt-6 pb-4 bg-black/85 backdrop-blur-xl border-b border-white/5 -mx-3 sm:-mx-6 md:-mx-10 px-3 sm:px-6 md:px-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">

                {/* Category Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium font-outfit whitespace-nowrap transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-[1.02]"
                            : "bg-[#111114] text-neutral-400 border border-white/[0.07] hover:text-white hover:bg-[#18181d] hover:border-white/15"
                        }`}
                      >
                        <span className={isSelected ? "text-black" : "text-neutral-400"}>
                          {cat.icon}
                        </span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Search Bar Input */}
                <div className="relative w-full lg:w-72 shrink-0">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects or tech..."
                    className="w-full bg-[#111114] border border-white/[0.08] rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-violet-500/60 focus:bg-[#16161b] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs font-mono"
                    >
                      ✕
                    </button>
                  )}
                </div>

              </div>

              {/* Status query display */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-3 pt-2 max-w-7xl mx-auto">
                <span>
                  Showing <strong className="text-white font-bold">{filteredProjects.length}</strong> of {totalRepos} repositories
                </span>
                {searchQuery && (
                  <span className="text-violet-400">
                    Filtering for &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </div>
            </section>

            {/* ── PROJECTS GRID ── */}
            <section className="py-10 max-w-7xl mx-auto">
              {filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-white/5 bg-[#0c0c0e]/60 p-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 mb-4">
                    <Search size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-white font-outfit mb-1">No matching projects found</h3>
                  <p className="text-xs text-neutral-500 max-w-sm mb-5">
                    We couldn&apos;t find any repository matching your query. Try clearing your search filter or selecting another category.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, idx) => {
                      const theme = ACCENT_STYLES[project.accent] || ACCENT_STYLES.violet;

                      return (
                        <motion.div
                          key={project.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.3) }}
                          className={`group/card relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0c0c0f]/90 hover:bg-[#111116] ${theme.glow} p-6 transition-all duration-500 shadow-xl overflow-hidden backdrop-blur-sm`}
                        >
                          {/* Ambient radial color spray */}
                          <div
                            className={`absolute top-0 right-0 w-52 h-36 bg-gradient-to-bl ${theme.cardGlow} opacity-20 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tr-2xl`}
                          />

                          {/* Top row: Category info on left + Unified GitHub stats pill on right */}
                          <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className={`w-6 h-6 rounded-md ${theme.iconBg} border flex items-center justify-center shrink-0 shadow-xs`}>
                                {getCategoryIcon(project.category)}
                              </div>
                              <span className="text-[11px] font-mono font-medium text-neutral-400 uppercase tracking-wider truncate">
                                {project.categoryLabel}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 font-mono text-[11px]">
                              {project.stars > 0 && (
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.07] text-neutral-300">
                                  <Star size={11} className="text-amber-400 fill-amber-400/30" />
                                  <span>{project.stars}</span>
                                </span>
                              )}
                              {project.forks > 0 && (
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.07] text-neutral-300">
                                  <GitFork size={11} className="text-neutral-400" />
                                  <span>{project.forks}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Title and Description */}
                          <div className="relative z-10 mb-6 text-left">
                            <h3
                              className="text-xl sm:text-2xl font-medium text-white group-hover/card:text-white transition-colors leading-snug font-instrument-serif mb-2.5"
                              style={{ textShadow: "0 0 20px rgba(255,255,255,0.06)" }}
                            >
                              {project.title}
                            </h3>
                            <p className="text-xs sm:text-[13px] text-neutral-400 font-light leading-relaxed line-clamp-3">
                              {project.description}
                            </p>
                          </div>

                          {/* Technology Badges List */}
                          <div className="relative z-10 flex flex-wrap gap-1.5 mb-6 text-left">
                            {project.tags.map((t) => (
                              <TechBadge key={t} name={t} />
                            ))}
                          </div>

                          {/* Card Footer Actions (GitHub link + Live Demo link) */}
                          <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs font-semibold font-outfit text-white/80 hover:text-white transition-colors group/link py-1"
                            >
                              <Github size={15} className="text-white/60 group-hover/link:text-white transition-colors" />
                              <span>View Repository</span>
                              <ArrowUpRight size={13} className="text-white/40 group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>

                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold font-mono bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/20 transition-all shadow-xs"
                              >
                                <ExternalLink size={12} />
                                <span>Live App</span>
                              </a>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </section>

            {/* ── BOTTOM CTA BANNER: VISIT GITHUB ── */}
            <section className="pt-8 pb-12 border-t border-white/5 relative">
              <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12 text-center bg-gradient-to-b from-[#121216] via-[#09090c] to-[#040405] shadow-2xl">
                {/* Background glow node */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-violet-500/20 blur-3xl rounded-full pointer-events-none" />

                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white font-instrument-serif leading-tight mb-4"
                  style={{ textShadow: "0 0 25px rgba(255,255,255,0.15)" }}
                >
                  Explore more repositories on{" "}
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400">
                    GitHub
                  </span>
                </h2>

                <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed mb-8">
                  Check out full source codes, commit history, deployment guides, datasets, and experiment logs on my GitHub profile.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="https://github.com/HarshitWaldia?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                  >
                    <Github size={16} />
                    <span>Open GitHub Repositories</span>
                    <ArrowUpRight size={15} />
                  </a>

                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] font-medium text-xs sm:text-sm transition-all"
                  >
                    <span>Read About Me</span>
                  </Link>
                </div>
              </div>
            </section>

          </div>

          {/* Right vertical border stripes bar */}
          <div
            aria-hidden="true"
            className="w-full border-x border-white/5 bg-stripes-vertical [mask-image:linear-gradient(to_bottom,transparent,black_10rem)] [WebkitMaskImage:linear-gradient(to_bottom,transparent,black_10rem)]"
          />

        </div>
      </div>
    </div>
  );
}

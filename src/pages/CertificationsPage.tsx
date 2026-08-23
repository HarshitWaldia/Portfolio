"use client";

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useMetadata } from "@/hooks/use-metadata";
import {
  Search,
  ExternalLink,
  Award,
  CheckCircle2,
  Sparkles,
  Layers,
  Cloud,
  Cpu,
  BrainCircuit,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar
} from "lucide-react";
import {
  Github,
  Linkedin,
  OracleIcon,
  MicrosoftIcon,
  AzureIcon,
  AwsIcon,
  GoogleIcon,
  GoogleCloudIcon,
  IbmIcon,
  CourseraIcon,
  CredlyIcon,
  GoogleDriveIcon,
  LinuxIcon,
  RoboticsIcon
} from "@/components/ui/brand-icons";

interface CertificationItem {
  id: string;
  name: string;
  type: string;
  issuer: string;
  issuerKey: "oracle" | "github" | "microsoft" | "aws" | "google" | "space" | "kennesaw" | "ibm" | "slog";
  issuerLogoUrl: string;
  description: string;
  verificationUrl: string;
  verificationPlatform: string;
  badgeImage: string;
  skills: string[];
  category: "oracle" | "ai-genai" | "cloud-devops" | "courses";
  categoryLabel: string;
  accent: "rose" | "violet" | "cyan" | "amber" | "blue" | "emerald";
  highlight?: boolean;
}

const ALL_CERTIFICATIONS: CertificationItem[] = [
  {
    id: "github-foundations",
    name: "GitHub Foundations",
    type: "Certification",
    issuer: "GitHub",
    issuerKey: "github",
    issuerLogoUrl: "https://cdn.simpleicons.org/github/white",
    description: "Core Git workflows, repository security, actions automation, collaborate with enterprise tools, and modern software engineering practices.",
    verificationUrl: "https://www.credly.com/badges/ae4542e1-7524-4d9b-a97e-a192b594b240/linked_in_profile",
    verificationPlatform: "Credly",
    badgeImage: "/images/badges/github_foundation.png",
    skills: ["Git", "GitHub Actions", "CI/CD", "DevSecOps", "Automation"],
    category: "cloud-devops",
    categoryLabel: "DevOps & Cloud",
    accent: "violet",
    highlight: true,
  },
  {
    id: "oracle-generative-ai-professional",
    name: "OCI Generative AI Certified Professional",
    type: "Certification",
    issuer: "Oracle",
    issuerKey: "oracle",
    issuerLogoUrl: "https://cdn.simpleicons.org/oracle/F80000",
    description: "Architecting, deploying, and operationalizing Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and fine-tuning on Oracle Cloud Infrastructure.",
    verificationUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=CF910A4C4C41C674DAD4228C4AC616038A2085DDA6EADFA8942D56D3FA16B397",
    verificationPlatform: "Oracle CertView",
    badgeImage: "/images/badges/Oracle Cloud Infrastructure 2024 Generative AI Certified Professional.png",
    skills: ["LLMs", "RAG Systems", "Model Fine-Tuning", "OCI GenAI", "Embeddings"],
    category: "ai-genai",
    categoryLabel: "AI & GenAI",
    accent: "rose",
    highlight: true,
  },
  {
    id: "oracle-ai-vector-search",
    name: "Oracle AI Vector Search Professional",
    type: "Certification",
    issuer: "Oracle",
    issuerKey: "oracle",
    issuerLogoUrl: "https://cdn.simpleicons.org/oracle/F80000",
    description: "AI vector database indexing, embedding models, high-dimensional similarity search algorithms, and contextual RAG optimization in enterprise databases.",
    verificationUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=44816003499E2DC41A37DA123630595EA97F8EBDCBAF91DD501B8581FED6AE05",
    verificationPlatform: "Oracle CertView",
    badgeImage: "/images/badges/Oracle AI Vector Search Certified Professional.png",
    skills: ["Vector DB", "Embeddings", "RAG", "Semantic Search", "Oracle 23ai"],
    category: "ai-genai",
    categoryLabel: "AI & GenAI",
    accent: "rose",
    highlight: true,
  },
  {
    id: "oracle-data-science-professional",
    name: "OCI Data Science Professional",
    type: "Certification",
    issuer: "Oracle",
    issuerKey: "oracle",
    issuerLogoUrl: "https://cdn.simpleicons.org/oracle/F80000",
    description: "Developing, training, deploying, and tracking production machine learning pipelines and predictive models on OCI Data Science.",
    verificationUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=FC82FD9B5A3A9CF8A50682219BB9CACBF480446C36B1D8589A2CF1A3BB48BF96",
    verificationPlatform: "Oracle CertView",
    badgeImage: "/images/badges/Oracle Cloud Infrastructure 2025 Certified Data Science Professional.png",
    skills: ["MLOps", "Model Tracking", "Python", "Data Science", "Accelerated ML"],
    category: "ai-genai",
    categoryLabel: "AI & GenAI",
    accent: "rose",
    highlight: true,
  },
  {
    id: "oracle-ai-foundations",
    name: "OCI AI Foundations Associate",
    type: "Certification",
    issuer: "Oracle",
    issuerKey: "oracle",
    issuerLogoUrl: "https://cdn.simpleicons.org/oracle/F80000",
    description: "Foundational machine learning architectures, computer vision, deep learning algorithms, natural language processing, and GenAI services on OCI.",
    verificationUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=3BB9DD36CBA2A4EB846AF89174E9E0146D793900932A2787F2296D36E8FCA017",
    verificationPlatform: "Oracle CertView",
    badgeImage: "/images/badges/Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate.png",
    skills: ["Machine Learning", "Computer Vision", "NLP", "Deep Learning", "OCI AI"],
    category: "oracle",
    categoryLabel: "Oracle Cloud",
    accent: "rose",
  },
  {
    id: "oracle-devops-professional",
    name: "OCI DevOps Professional",
    type: "Certification",
    issuer: "Oracle",
    issuerKey: "oracle",
    issuerLogoUrl: "https://cdn.simpleicons.org/oracle/F80000",
    description: "Continuous delivery pipelines, infrastructure as code (IaC), automated testing, and scalable cloud deployment pipelines on OCI.",
    verificationUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=FC82FD9B5A3A9CF8A50682219BB9CACBF6A32FB7C24035E5273026C64B58FC71",
    verificationPlatform: "Oracle CertView",
    badgeImage: "/images/badges/Oracle Cloud Infrastructure 2025 Certified DevOps Professional.png",
    skills: ["CI/CD Pipelines", "Terraform", "Infrastructure as Code", "Cloud Ops"],
    category: "cloud-devops",
    categoryLabel: "DevOps & Cloud",
    accent: "rose",
  },
  {
    id: "oracle-data-platform-foundations",
    name: "Oracle Data Platform Foundations",
    type: "Certification",
    issuer: "Oracle",
    issuerKey: "oracle",
    issuerLogoUrl: "https://cdn.simpleicons.org/oracle/F80000",
    description: "Modern cloud data platform engineering, data integration pipelines, enterprise analytics, and Oracle Cloud database structures.",
    verificationUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=FC82FD9B5A3A9CF8A50682219BB9CACBF480446C36B1D8589A2CF1A3BB48BF96",
    verificationPlatform: "Oracle CertView",
    badgeImage: "/images/badges/Oracle Data Platform 2025 Certified Foundations Associate.png",
    skills: ["Data Warehousing", "Oracle Database", "Data Pipelines", "Cloud Analytics"],
    category: "oracle",
    categoryLabel: "Oracle Cloud",
    accent: "rose",
  },
  {
    id: "azure-data-fundamentals",
    name: "Azure Data Fundamentals",
    type: "Certification",
    issuer: "Microsoft",
    issuerKey: "microsoft",
    issuerLogoUrl: "https://cdn.simpleicons.org/microsoftazure/0078D4",
    description: "Core data concepts, relational and NoSQL databases, data ingestion, big data analytics, and analytical workloads on Microsoft Azure.",
    verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-in/HarshitWaldia/910968F415F0256E?sharingId",
    verificationPlatform: "Microsoft Learn",
    badgeImage: "/images/badges/azure-data-fundamentals.png",
    skills: ["Azure Data", "Cosmos DB", "SQL / NoSQL", "Synapse Analytics"],
    category: "cloud-devops",
    categoryLabel: "DevOps & Cloud",
    accent: "cyan",
    highlight: true,
  },
  {
    id: "aws-machine-learning-foundations",
    name: "AWS Academy Machine Learning Foundations",
    type: "Certification",
    issuer: "Amazon Web Services (AWS)",
    issuerKey: "aws",
    issuerLogoUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
    description: "Core machine learning pipelines, SageMaker modeling, supervised & unsupervised algorithms, feature engineering, and deep learning on AWS.",
    verificationUrl: "https://www.credly.com/go/hYCCUTmy",
    verificationPlatform: "Credly",
    badgeImage: "/images/badges/aws-machine learning.png",
    skills: ["AWS SageMaker", "Machine Learning", "Deep Learning", "Feature Engineering"],
    category: "ai-genai",
    categoryLabel: "AI & GenAI",
    accent: "amber",
    highlight: true,
  },
  {
    id: "aws-cloud-foundations",
    name: "AWS Academy Cloud Foundations",
    type: "Certification",
    issuer: "Amazon Web Services (AWS)",
    issuerKey: "aws",
    issuerLogoUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
    description: "Cloud computing concepts, AWS core compute and storage architectures, IAM security policies, and reliable distributed system design.",
    verificationUrl: "https://www.credly.com/go/9DnVeOgP",
    verificationPlatform: "Credly",
    badgeImage: "/images/badges/aws-cloud Foundations.png",
    skills: ["AWS EC2", "S3 Storage", "IAM Security", "Cloud Architecture"],
    category: "cloud-devops",
    categoryLabel: "DevOps & Cloud",
    accent: "amber",
  },
  {
    id: "google-intro-to-generative-ai",
    name: "Intro to Generative AI",
    type: "Course",
    issuer: "Google Cloud",
    issuerKey: "google",
    issuerLogoUrl: "https://cdn.simpleicons.org/googlecloud/4285F4",
    description: "Generative AI models, transformer neural architecture concepts, attention mechanisms, and Google Cloud AI infrastructure.",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/J73PBJRCCG7Q",
    verificationPlatform: "Coursera",
    badgeImage: "https://cdn.simpleicons.org/googlecloud/4285F4",
    skills: ["Generative AI", "Transformers", "Google Cloud AI", "Prompt Design"],
    category: "courses",
    categoryLabel: "Courses",
    accent: "blue",
  },
  {
    id: "google-intro-to-llms",
    name: "Introduction to Large Language Models",
    type: "Course",
    issuer: "Google Cloud",
    issuerKey: "google",
    issuerLogoUrl: "https://cdn.simpleicons.org/googlecloud/4285F4",
    description: "Fundamental concepts of Large Language Models (LLMs), prompt tuning techniques, transformer self-attention, and enterprise GenAI application architectures.",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/ZVL5YYZB369L",
    verificationPlatform: "Coursera",
    badgeImage: "https://cdn.simpleicons.org/googlecloud/4285F4",
    skills: ["Large Language Models", "Transformers", "Google Cloud AI", "Prompt Tuning"],
    category: "ai-genai",
    categoryLabel: "AI & GenAI",
    accent: "blue",
  },
  {
    id: "aws-intro-cloud-sem-1",
    name: "AWS Academy Intro to Cloud Semester 1",
    type: "Course",
    issuer: "Amazon Web Services (AWS)",
    issuerKey: "aws",
    issuerLogoUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
    description: "Foundational curriculum exploring cloud economics, global AWS infrastructure, compute services (EC2), and cloud storage architectures.",
    verificationUrl: "https://drive.google.com/file/d/1ZUx_H_VTbvbM3QwEu8A1cDS3dvqwefnq/view?usp=drive_link",
    verificationPlatform: "Google Drive",
    badgeImage: "/images/badges/aws-cloud Foundations.png",
    skills: ["AWS Cloud", "Virtualization", "Cloud Infrastructure", "EC2 Compute"],
    category: "cloud-devops",
    categoryLabel: "DevOps & Cloud",
    accent: "amber",
  },
  {
    id: "aws-intro-cloud-sem-2",
    name: "AWS Academy Intro to Cloud Semester 2",
    type: "Course",
    issuer: "Amazon Web Services (AWS)",
    issuerKey: "aws",
    issuerLogoUrl: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
    description: "Advanced cloud architecture covering cloud security, elasticity, automated scaling, serverless execution, and managed database design.",
    verificationUrl: "https://drive.google.com/file/d/15Ry0DaObs0YUL2q7XHGX3wDO7e4kmqNS/view?usp=drive_link",
    verificationPlatform: "Google Drive",
    badgeImage: "/images/badges/aws-cloud Foundations.png",
    skills: ["AWS Elasticity", "Serverless", "Security Compliance", "Cloud Databases"],
    category: "cloud-devops",
    categoryLabel: "DevOps & Cloud",
    accent: "amber",
  },
  {
    id: "robotics-internship-space",
    name: "Robotics Internship",
    type: "Course / Internship",
    issuer: "SPACE",
    issuerKey: "space",
    issuerLogoUrl: "https://cdn.simpleicons.org/arduino/00979D",
    description: "Practical engineering internship covering robotics design principles, sensor integration, microcontroller programming, and autonomous telemetry.",
    verificationUrl: "https://kodacy.com/tutor-certificate/?cert_hash=c8dd4c5eba9ea68f",
    verificationPlatform: "Kodacy",
    badgeImage: "https://cdn.simpleicons.org/arduino/00979D",
    skills: ["Robotics", "Embedded Systems", "Microcontrollers", "Sensors"],
    category: "courses",
    categoryLabel: "Courses",
    accent: "cyan",
  },
  {
    id: "cybersecurity-iot-kennesaw",
    name: "Cybersecurity and Internet of Things",
    type: "Course",
    issuer: "Kennesaw State University",
    issuerKey: "kennesaw",
    issuerLogoUrl: "https://cdn.simpleicons.org/coursera/0056D2",
    description: "IoT device network architectures, embedded security vulnerabilities, wireless communication protocols, and cryptographic threat mitigations.",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/6PC4QF9WUJJ2",
    verificationPlatform: "Coursera",
    badgeImage: "https://cdn.simpleicons.org/coursera/0056D2",
    skills: ["Cybersecurity", "IoT Security", "Network Protocols", "Embedded Systems"],
    category: "courses",
    categoryLabel: "Courses",
    accent: "violet",
  },
  {
    id: "ibm-intro-to-ai",
    name: "IBM Intro to Artificial Intelligence (AI)",
    type: "Certification",
    issuer: "IBM",
    issuerKey: "ibm",
    issuerLogoUrl: "https://cdn.simpleicons.org/ibm/052FAD",
    description: "Foundations of artificial intelligence, neural networks, machine learning paradigms, natural language processing, and ethical AI frameworks.",
    verificationUrl: "https://www.credly.com/badges/27dbbad5-edf4-4b5d-8c29-5e8b1d2cdc72/public_url",
    verificationPlatform: "Credly",
    badgeImage: "/images/badges/ibm-ai-essentials.png",
    skills: ["Artificial Intelligence", "Neural Networks", "NLP", "AI Ethics"],
    category: "ai-genai",
    categoryLabel: "AI & GenAI",
    accent: "blue",
    highlight: true,
  },
  {
    id: "networking-linux-admin-slog",
    name: "Networking with Linux Administration",
    type: "Course",
    issuer: "SLOG Solutions Pvt. Ltd.",
    issuerKey: "slog",
    issuerLogoUrl: "https://cdn.simpleicons.org/linux/white",
    description: "Advanced Linux server administration, bash scripting, TCP/IP networking, firewall configuration, DNS/DHCP servers, and system security.",
    verificationUrl: "https://drive.google.com/file/d/1OANC1K9dwJusFAyOjuBtuIn-6_GMrO1u/view?usp=drive_link",
    verificationPlatform: "Google Drive",
    badgeImage: "https://cdn.simpleicons.org/linux/FCC624",
    skills: ["Linux", "Bash Scripting", "TCP/IP Networking", "Server Administration", "Firewall"],
    category: "cloud-devops",
    categoryLabel: "DevOps & Cloud",
    accent: "emerald",
  }
];

function getIssuerLogo(issuerKey: string) {
  switch (issuerKey) {
    case "oracle":
      return <OracleIcon size={16} />;
    case "microsoft":
      return <MicrosoftIcon size={16} />;
    case "aws":
      return <AwsIcon size={16} />;
    case "google":
      return <GoogleIcon size={16} />;
    case "github":
      return <Github size={16} className="text-white" />;
    case "ibm":
      return <IbmIcon size={16} />;
    case "coursera":
    case "kennesaw":
      return <CourseraIcon size={16} />;
    case "space":
      return <RoboticsIcon size={16} />;
    case "slog":
      return <LinuxIcon size={16} />;
    default:
      return <Award size={16} className="text-rose-400" />;
  }
}

function getPlatformIcon(platform: string) {
  switch (platform) {
    case "Oracle CertView":
      return <OracleIcon size={14} />;
    case "Credly":
      return <CredlyIcon size={14} />;
    case "Microsoft Learn":
      return <AzureIcon size={14} />;
    case "Coursera":
      return <CourseraIcon size={14} />;
    case "Google Drive":
      return <GoogleDriveIcon size={14} />;
    case "Kodacy":
      return <Award size={14} className="text-cyan-400 shrink-0" />;
    default:
      return <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />;
  }
}

const CATEGORIES = [
  { id: "all", label: "All Credentials", icon: <Layers size={14} /> },
  { id: "oracle", label: "Oracle Cloud (6)", icon: <OracleIcon size={14} /> },
  { id: "ai-genai", label: "AI & Generative AI", icon: <BrainCircuit size={14} /> },
  { id: "cloud-devops", label: "DevOps & Cloud", icon: <Cloud size={14} /> },
  { id: "courses", label: "Courses & Internships", icon: <BookOpen size={14} /> },
];

const ACCENT_STYLES = {
  rose: {
    borderGlow: "hover:border-rose-500/35 hover:shadow-[0_0_35px_rgba(244,63,94,0.12)]",
    cardGlow: "from-rose-500/15 via-rose-500/5 to-transparent",
    iconBg: "bg-rose-500/10 border-rose-500/20",
    badge: "text-rose-400 bg-rose-500/10 border-rose-500/25",
    btn: "hover:border-rose-500/40 hover:bg-rose-500/10 text-rose-300",
  },
  violet: {
    borderGlow: "hover:border-violet-500/35 hover:shadow-[0_0_35px_rgba(139,92,246,0.12)]",
    cardGlow: "from-violet-500/15 via-violet-500/5 to-transparent",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    badge: "text-violet-400 bg-violet-500/10 border-violet-500/25",
    btn: "hover:border-violet-500/40 hover:bg-violet-500/10 text-violet-300",
  },
  cyan: {
    borderGlow: "hover:border-cyan-500/35 hover:shadow-[0_0_35px_rgba(6,182,212,0.12)]",
    cardGlow: "from-cyan-500/15 via-cyan-500/5 to-transparent",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
    btn: "hover:border-cyan-500/40 hover:bg-cyan-500/10 text-cyan-300",
  },
  amber: {
    borderGlow: "hover:border-amber-500/35 hover:shadow-[0_0_35px_rgba(245,158,11,0.12)]",
    cardGlow: "from-amber-500/15 via-amber-500/5 to-transparent",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    badge: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    btn: "hover:border-amber-500/40 hover:bg-amber-500/10 text-amber-300",
  },
  blue: {
    borderGlow: "hover:border-blue-500/35 hover:shadow-[0_0_35px_rgba(59,130,246,0.12)]",
    cardGlow: "from-blue-500/15 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    badge: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    btn: "hover:border-blue-500/40 hover:bg-blue-500/10 text-blue-300",
  },
  emerald: {
    borderGlow: "hover:border-emerald-500/35 hover:shadow-[0_0_35px_rgba(16,185,129,0.12)]",
    cardGlow: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    btn: "hover:border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-300",
  },
};

export default function CertificationsPage() {
  useMetadata({ title: "Certifications" });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCerts = useMemo(() => {
    return ALL_CERTIFICATIONS.filter((c) => {
      const matchesCategory =
        selectedCategory === "all" ||
        c.category === selectedCategory ||
        (selectedCategory === "oracle" && c.issuerKey === "oracle") ||
        (selectedCategory === "ai-genai" && (c.category === "ai-genai" || c.name.toLowerCase().includes("ai") || c.name.toLowerCase().includes("data science")));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const oracleCount = useMemo(() => ALL_CERTIFICATIONS.filter((c) => c.issuerKey === "oracle").length, []);
  const issuerCount = useMemo(() => new Set(ALL_CERTIFICATIONS.map((c) => c.issuer)).size, []);
  const certCount = ALL_CERTIFICATIONS.length;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden selection:bg-violet-500/30">
      {/* Background texture & ambient glow overlays */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] mix-blend-screen pointer-events-none z-0"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1920&auto=format&fit=crop')` }}
      />

      {/* Top Ambient Light Blooms */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-r from-red-600/15 via-purple-600/15 to-blue-600/15 blur-[150px] rounded-full z-0" />
      <div className="pointer-events-none absolute top-[35%] right-[-100px] w-[500px] h-[500px] bg-rose-500/8 blur-[160px] rounded-full z-0" />
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
                  VERIFIED INDUSTRY CREDENTIALS
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white font-medium font-instrument-serif leading-[1.12] max-w-4xl mb-6"
                style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
              >
                Certifications, Cloud &amp; <br />
                <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400">
                  AI Specializations
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-neutral-400 text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-8"
              >
                Verified professional certifications, cloud architecture credentials, and artificial intelligence specializations from Oracle, GitHub, Microsoft, AWS, and Google Cloud.
              </motion.p>

              {/* Verified Live Meta Stats Pills */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono"
              >
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-white/10 text-white/80 shadow-md">
                  <Award size={14} className="text-rose-400" />
                  <span><strong className="text-white font-bold">{certCount}</strong> Verified Credentials</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-white/10 text-white/80 shadow-md">
                  <ShieldCheck size={14} className="text-violet-400" />
                  <span><strong className="text-white font-bold">{oracleCount}</strong> Oracle Certified</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-white/10 text-white/80 shadow-md">
                  <Sparkles size={14} className="text-amber-400" />
                  <span><strong className="text-white font-bold">{issuerCount}</strong> Industry Issuers</span>
                </div>
                <a
                  href="https://linkedin.com/in/harshit-waldia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white transition-all shadow-md group"
                >
                  <Linkedin size={14} className="text-[#0a66c2]" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight size={13} className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>

              {/* Verified Issuers Logo Showcase Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/[0.06] max-w-4xl"
              >
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                  Accredited by:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300 text-xs font-mono">
                    <OracleIcon size={14} />
                    <span>Oracle</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300 text-xs font-mono">
                    <MicrosoftIcon size={14} />
                    <span>Microsoft</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300 text-xs font-mono">
                    <AwsIcon size={15} />
                    <span>AWS</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300 text-xs font-mono">
                    <GoogleIcon size={14} />
                    <span>Google Cloud</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300 text-xs font-mono">
                    <IbmIcon size={14} />
                    <span>IBM</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300 text-xs font-mono">
                    <Github size={14} />
                    <span>GitHub</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300 text-xs font-mono">
                    <CourseraIcon size={14} />
                    <span>Coursera</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300 text-xs font-mono">
                    <CredlyIcon size={14} />
                    <span>Credly</span>
                  </div>
                </div>
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
                    placeholder="Search certifications, topics..."
                    className="w-full bg-[#111114] border border-white/[0.08] rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500/60 focus:bg-[#16161b] transition-all"
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

              {/* Query Result Count */}
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mt-3 pt-2 max-w-7xl mx-auto">
                <span>
                  Showing <strong className="text-white font-bold">{filteredCerts.length}</strong> of {certCount} credentials
                </span>
                {searchQuery && (
                  <span className="text-rose-400">
                    Filtering for &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </div>
            </section>

            {/* ── CERTIFICATIONS GRID ── */}
            <section className="py-10 max-w-7xl mx-auto">
              {filteredCerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-white/5 bg-[#0c0c0e]/60 p-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400 mb-4">
                    <Search size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-white font-outfit mb-1">No certifications found</h3>
                  <p className="text-xs text-neutral-500 max-w-sm mb-5">
                    We couldn&apos;t find any credentials matching your search filter. Try clearing your query.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredCerts.map((cert, idx) => {
                      const theme = ACCENT_STYLES[cert.accent] || ACCENT_STYLES.rose;

                      return (
                        <motion.div
                          key={cert.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.3) }}
                          className={`group/card relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0c0c0f]/90 hover:bg-[#111116] ${theme.borderGlow} p-6 transition-all duration-500 shadow-xl overflow-hidden backdrop-blur-sm`}
                        >
                          {/* Ambient radial color spray */}
                          <div
                            className={`absolute top-0 right-0 w-52 h-36 bg-gradient-to-bl ${theme.cardGlow} opacity-25 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none rounded-tr-2xl`}
                          />

                          {/* Top Row: Issuer Branding & Credential Type */}
                          <div className="relative z-10 flex items-center justify-between gap-2 mb-5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.1] p-1.5 flex items-center justify-center shrink-0 shadow-xs group-hover/card:border-white/20 transition-colors">
                                {getIssuerLogo(cert.issuerKey)}
                              </div>
                              <span className="text-[11px] font-mono font-medium text-neutral-300 uppercase tracking-wider truncate">
                                {cert.issuer}
                              </span>
                            </div>

                            <span
                              className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md border ${theme.badge} uppercase tracking-wider shrink-0`}
                            >
                              {cert.type}
                            </span>
                          </div>

                          {/* Badge Graphic Display Area */}
                          <div className="relative z-10 flex items-center justify-center my-3 py-4 bg-gradient-to-b from-white/[0.02] to-transparent rounded-xl border border-white/[0.04]">
                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center group-hover/card:scale-105 transition-transform duration-500">
                              {/* Ambient halo behind badge */}
                              <div className="absolute inset-0 bg-white/5 blur-xl rounded-full" />
                              <img
                                src={cert.badgeImage}
                                alt={cert.name}
                                className="w-full h-full object-contain relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          {/* Title & Description */}
                          <div className="relative z-10 mt-3 mb-5 text-left">
                            <h3
                              className="text-xl font-medium text-white group-hover/card:text-white transition-colors leading-snug font-instrument-serif mb-2"
                              style={{ textShadow: "0 0 20px rgba(255,255,255,0.06)" }}
                            >
                              {cert.name}
                            </h3>
                            <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-3">
                              {cert.description}
                            </p>
                          </div>

                          {/* Skills List */}
                          <div className="relative z-10 flex flex-wrap gap-1.5 mb-6 text-left">
                            {cert.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-neutral-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Footer Action: Verified Link with Platform Brand Logo */}
                          <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                            <a
                              href={cert.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-2.5 text-xs font-semibold font-outfit text-white/90 hover:text-white transition-colors group/link py-1`}
                            >
                              <div className="w-5 h-5 rounded-md bg-white/[0.05] border border-white/[0.08] p-0.5 flex items-center justify-center shrink-0">
                                {getPlatformIcon(cert.verificationPlatform)}
                              </div>
                              <span>
                                {cert.verificationPlatform === "Google Drive"
                                  ? "View Verified Document"
                                  : `Verify on ${cert.verificationPlatform}`}
                              </span>
                              <ArrowUpRight size={13} className="text-white/40 group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>
                          </div>

                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </section>

            {/* ── BOTTOM CTA BANNER: VERIFICATION / PORTFOLIO ── */}
            <section className="pt-8 pb-12 border-t border-white/5 relative">
              <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12 text-center bg-gradient-to-b from-[#121216] via-[#09090c] to-[#040405] shadow-2xl">
                {/* Background glow node */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-rose-500/20 blur-3xl rounded-full pointer-events-none" />

                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white font-instrument-serif leading-tight mb-4"
                  style={{ textShadow: "0 0 25px rgba(255,255,255,0.15)" }}
                >
                  View full credentials on{" "}
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400">
                    LinkedIn &amp; Credly
                  </span>
                </h2>

                <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed mb-8">
                  Verified digital badges can be inspected with cryptographic verification directly on Oracle CertView, Credly, and Microsoft Learn.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="https://linkedin.com/in/harshit-waldia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                  >
                    <Linkedin size={16} className="text-[#0a66c2]" />
                    <span>Open LinkedIn Licenses</span>
                    <ArrowUpRight size={15} />
                  </a>

                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] font-medium text-xs sm:text-sm transition-all"
                  >
                    <span>View Projects</span>
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

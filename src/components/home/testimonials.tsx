"use client";

import { Reveal } from "@/components/ui/reveal";

const testimonials = [
  {
    title: "His AI/ML and RAG Architecture Skills are Outstanding",
    quote: "I've collaborated with Harshit on several complex machine learning pipelines and I can't express enough how impressed I am with his talent. His ability to take LLM models, vector search, and RAG architectures from concept straight to high-throughput production systems is remarkable. He's extremely responsive, methodical, and efficient.",
    author: "Jatin Pant",
    role: "AI Collaborator • Software Engineer",
    avatar: "/images/friends/jatin-pant.jpg",
    bgClass: "from-[#0c2a38] via-[#051117] to-[#040d12]",
    borderClass: "border-cyan-500/30",
    glowColor: "rgba(6, 182, 212, 0.3)",
    themeClass: "card-cyan",
  },
  {
    title: "Not Just an ML Developer, a True Systems Architect",
    quote: "Harshit is exceptional. He is curious, mathematically grounded, and deeply invested in the systems he builds. He takes product visions—from computer vision pipelines to multi-modal document intelligence—and brings them to life seamlessly. He's a true partner in engineering.",
    author: "Priyanshu Shahi",
    role: "Engineer • Tech Lead",
    avatar: "/images/friends/priyanshu-shahi.jpg",
    bgClass: "from-[#2b1442] via-[#0b0412] to-[#07020b]",
    borderClass: "border-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.3)",
    themeClass: "card-purple",
  },
  {
    title: "Bridges Machine Learning and Robust Backend APIs",
    quote: "Harshit understands that great ML models are useless without great APIs and solid databases. His FastAPI microservices, JWT/RBAC security, and PostgreSQL integrations are rock solid. We went from raw data to a fully operational deployment in record time.",
    author: "Ritesh Singh",
    role: "Backend Architect • Developer",
    avatar: "/images/friends/ritesh-singh.jpg",
    bgClass: "from-[#112753] via-[#040812] to-[#03060f]",
    borderClass: "border-blue-500/30",
    glowColor: "rgba(59, 130, 246, 0.3)",
    themeClass: "card-blue",
  },
  {
    title: "We've Shipped Multiple Complex AI Pipelines Together",
    quote: "From intelligent document extraction to predictive analytics forecasting models, every project Harshit delivers is ahead of schedule and thoroughly tested. If you need someone who understands PyTorch, LangChain, and production engineering inside out, Harshit is the one.",
    author: "Shivam Sah",
    role: "Data Scientist • ML Engineer",
    avatar: "/images/friends/shivam-sah.jpg",
    bgClass: "from-[#1e1948] via-[#07050d] to-[#05030a]",
    borderClass: "border-indigo-500/30",
    glowColor: "rgba(99, 102, 241, 0.3)",
    themeClass: "card-indigo",
  },
  {
    title: "Went from Dataset to Production Model in Days",
    quote: "We were working on computer vision detection models and Harshit handled everything: preprocessing, YOLO model optimization, training runs, and real-time inference wrappers. The accuracy and inference latency exceeded all benchmarks.",
    author: "Udit Joshi",
    role: "Computer Vision Specialist",
    avatar: "/images/friends/udit-joshi.jpg",
    bgClass: "from-[#0b2f21] via-[#040c09] to-[#030906]",
    borderClass: "border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.3)",
    themeClass: "card-emerald",
  },
  {
    title: "End-to-End Problem Solver with Precision",
    quote: "Harshit's strength lies in transforming complex research ideas into usable applications. His DocTalk PDF assistant and archive digitization pipelines demonstrate deep mastery of retrieval systems and modern AI workflows. An absolute pleasure to build with.",
    author: "Yash Joshi",
    role: "Full Stack • ML Developer",
    avatar: "/images/friends/yash-joshi.jpg",
    bgClass: "from-[#33111f] via-[#0f0509] to-[#0a0206]",
    borderClass: "border-rose-500/30",
    glowColor: "rgba(244, 63, 94, 0.3)",
    themeClass: "card-rose",
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className={`testimonial-card-wrapper group ${testimonial.themeClass}`}>
      {/* Background Glow */}
      <div
        className="absolute top-0 right-0 w-36 h-36 rounded-full blur-[80px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: testimonial.glowColor }}
      />

      {/* Main Content Card */}
      <div className={`testimonial-card flex flex-col justify-between bg-gradient-to-b ${testimonial.bgClass} border ${testimonial.borderClass}`}>
        <div className="text-left">
          <h3
            className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug mb-4 font-instrument-serif"
            style={{ fontFamily: "'Playfair Display', 'Instrument Serif', serif" }}
          >
            {testimonial.title}
          </h3>
          <p className="text-white/70 text-[13px] sm:text-[14px] leading-relaxed font-light font-outfit">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>

        {/* User profile details: Perfectly aligned horizontally and vertically */}
        <div className="flex items-center gap-3.5 mt-8 pt-5 border-t border-white/5 text-left">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white/10 overflow-hidden shrink-0 shadow-lg ring-2 ring-white/5 bg-neutral-900">
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </div>
          <div className="flex flex-col justify-center text-left min-w-0">
            <h4 className="text-sm font-semibold text-white/90 leading-tight truncate">
              {testimonial.author}
            </h4>
            <p className="text-[11px] sm:text-xs text-white/40 mt-1 leading-tight">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-[#070708] relative overflow-hidden">
      <style>{CSS}</style>

      <div className="max-w-7xl mx-auto px-6 mb-10">
        {/* Section Header */}
        <Reveal y={20} className="text-center flex flex-col items-center gap-3">
          <div>
            <p
              className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-widest animate-[shimmer_3s_linear_infinite]"
              style={{ animationDuration: "3s" }}
            >
              TESTIMONIALS
            </p>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15]"
            style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
          >
            Word on the street{" "}
            <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-pink-500">
              about me
            </span>
          </h2>
        </Reveal>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Horizontal side gradient fade masks */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#070708] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#070708] to-transparent z-20 pointer-events-none" />

        <div className="marquee-container">
          {/* Track 1 */}
          <div className="marquee-track">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`track1-${idx}`} testimonial={t} />
            ))}
          </div>
          {/* Track 2 (for seamless loop) */}
          <div className="marquee-track" aria-hidden="true">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`track2-${idx}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
  .marquee-container {
    display: flex;
    width: max-content;
    gap: 24px;
    padding-left: 12px;
    padding-right: 12px;
  }

  @keyframes marquee-scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-100% - 12px));
    }
  }

  .marquee-track {
    display: flex;
    gap: 24px;
    width: max-content;
    animation: marquee-scroll 45s linear infinite;
  }

  .marquee-container:hover .marquee-track {
    animation-play-state: paused;
  }

  .testimonial-card-wrapper {
    position: relative;
    width: 310px;
    height: 450px;
    border-radius: 24px;
    overflow: hidden;
    flex-shrink: 0;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .testimonial-card-wrapper:hover {
    transform: translateY(-6px);
  }

  @media (min-width: 640px) {
    .testimonial-card-wrapper {
      width: 370px;
      height: 470px;
    }
  }

  /* Vibrant hover glows and borders per card theme */
  .card-cyan:hover {
    box-shadow: 0 20px 40px rgba(6, 182, 212, 0.12), 0 0 20px rgba(6, 182, 212, 0.08);
    border-color: rgba(6, 182, 212, 0.4) !important;
  }
  .card-purple:hover {
    box-shadow: 0 20px 40px rgba(168, 85, 247, 0.12), 0 0 20px rgba(168, 85, 247, 0.08);
    border-color: rgba(168, 85, 247, 0.4) !important;
  }
  .card-blue:hover {
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.12), 0 0 20px rgba(59, 130, 246, 0.08);
    border-color: rgba(59, 130, 246, 0.4) !important;
  }
  .card-indigo:hover {
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.12), 0 0 20px rgba(99, 102, 241, 0.08);
    border-color: rgba(99, 102, 241, 0.4) !important;
  }
  .card-emerald:hover {
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.12), 0 0 20px rgba(16, 185, 129, 0.08);
    border-color: rgba(16, 185, 129, 0.4) !important;
  }
  .card-rose:hover {
    box-shadow: 0 20px 40px rgba(244, 63, 94, 0.12), 0 0 20px rgba(244, 63, 94, 0.08);
    border-color: rgba(244, 63, 94, 0.4) !important;
  }

  .testimonial-card {
    width: 100%;
    height: 100%;
    padding: 24px;
    border-radius: 24px;
    position: relative;
    z-index: 10;
    backdrop-filter: blur(12px);
    transition: border-color 0.4s ease;
  }

  @media (min-width: 640px) {
    .testimonial-card {
      padding: 32px;
    }
  }
`;

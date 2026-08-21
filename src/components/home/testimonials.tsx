"use client";

import { Reveal } from "@/components/ui/reveal";

const testimonials = [
  {
    title: "His JavaScript/React Skills are Through the Roof",
    quote: "I've been working with Harshit for a couple of months now and I can't express enough how impressed I am with his talent. His JavaScript/React web UI programming skills are through the roof. We have a streamlined workflow, and he's extremely responsive, brief, and efficient. If Harshit says he can deliver a project, rest assured he can, he will, and it will be awesome.",
    author: "Akshita Bhandari",
    role: "Developer • Freelancer",
    avatar: "/connect-img/6265049918753935650.jpg",
    bgClass: "from-[#0c2a38] via-[#051117] to-[#040d12]",
    borderClass: "border-cyan-500/30",
    glowColor: "rgba(6, 182, 212, 0.3)",
    themeClass: "card-cyan",
  },
  {
    title: "He's Not Just a Developer, He's a True Partner",
    quote: "Harshit is a genius. He is open-minded, curious, and deeply invested in the projects he chooses to work on. He takes your product vision—even the vague 'dark theme, high tech' ideas—and brings it to life. He's not just a developer; he's a true partner in the process. He's brilliant!",
    author: "Sandeep Panwar",
    role: "Developer • Freelancer",
    avatar: "/connect-img/connect-2.jpg",
    bgClass: "from-[#2b1442] via-[#0b0412] to-[#07020b]",
    borderClass: "border-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.3)",
    themeClass: "card-purple",
  },
  {
    title: "An Artist with Code Who Delivers Real SEO Results",
    quote: "Harshit is an artist with code. We went from 'I want something high-tech and fast' to a fully built, high-ranking website in just over a week. He is constantly advancing his craft, ensuring our Sanity CMS implementation adheres to the newest standards for speed and efficiency. The results speak for themselves.",
    author: "Khushi Dhillon",
    role: "Developer • Freelancer",
    avatar: "/connect-img/connect-3.jpg",
    bgClass: "from-[#112753] via-[#040812] to-[#03060f]",
    borderClass: "border-blue-500/30",
    glowColor: "rgba(59, 130, 246, 0.3)",
    themeClass: "card-blue",
  },
  {
    title: "We've shipped 4 projects together now",
    quote: "First project was a simple landing page. Then he rebuilt our client portal, added a blog with headless CMS, and just finished an analytics dashboard. Every project is ahead of schedule. He's basically our dev team at this point. If you're a small agency that needs a reliable build partner, stop looking.",
    author: "Akshita Bhandari",
    role: "Developer • Freelancer",
    avatar: "/connect-img/connect-1.jpg",
    bgClass: "from-[#1e1948] via-[#07050d] to-[#05030a]",
    borderClass: "border-indigo-500/30",
    glowColor: "rgba(99, 102, 241, 0.3)",
    themeClass: "card-indigo",
  },
  {
    title: "Went from Figma to production in 11 days",
    quote: "We'd been sitting on designs for two months because our last dev kept pushing timelines. Harshit had a staging link in 4 days and we were live in 11. The site loads in under a second and our bounce rate dropped 35% the first week. Wish we'd found him sooner.",
    author: "Sandeep Panwar",
    role: "Developer • Freelancer",
    avatar: "/connect-img/connect-5.jpg",
    bgClass: "from-[#0b2f21] via-[#040c09] to-[#030906]",
    borderClass: "border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.3)",
    themeClass: "card-emerald",
  },
  {
    title: "Finally a developer who actually listens",
    quote: "I'm not technical at all, and past devs made me feel stupid for asking questions. Harshit sent Loom walkthroughs after every milestone so I always knew exactly where things stood. When I changed my mind about the checkout flow halfway through, he didn't push back — just adjusted and shipped it better than what I originally asked for.",
    author: "Aashish Dheeman",
    role: "Developer • Freelancer",
    avatar: "/connect-img/connect-4.jpg",
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

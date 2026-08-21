"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Laptop, MessageSquare } from "lucide-react";
import { getGuestbookEntries } from "@/actions/guestbook-actions";
import { Reveal } from "@/components/ui/reveal";

export default function ExploreMore() {
  const [avatars, setAvatars] = useState<string[]>([]);
  useEffect(() => {
    getGuestbookEntries().then((entries) => {
      const imgs = entries
        .map((e) => e.userImage)
        .filter((img): img is string => !!img);
      setAvatars(imgs.slice(0, 4));
    });
  }, []);

  return (
    <section id="explore" className="relative py-16 bg-[#070708] overflow-hidden">
      {/* Ambient Background Glow Elements */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-[10%] w-[350px] h-[350px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-10 right-[10%] w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <Reveal y={20} className="text-center flex flex-col items-center gap-3 mb-16 select-none">
          <div>
            <p
              className="bg-[linear-gradient(110deg,#909090,35%,#fff,50%,#909090,75%,#909090)] bg-[size:200%_100%] bg-clip-text text-xs text-transparent select-none uppercase font-mono tracking-widest animate-[shimmer_3s_linear_infinite]"
              style={{ animationDuration: '3s' }}
            >
              MY SITE
            </p>
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white font-medium font-instrument-serif leading-[1.15]"
            style={{ textShadow: "0px 4px 8px rgba(255, 255, 255, 0.05), 0px 8px 30px rgba(255, 255, 255, 0.25)" }}
          >
            Explore, experiment <br />
            <span className="relative inline-block italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
              && say hello
            </span>
          </h2>
        </Reveal>

        {/* 3-Column Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mx-auto">

          {/* Card 1: Uses (Tech Stack Stacked Carousel Effect) */}
          <Reveal y={30} index={0} className="h-[21rem] w-full">
            <Link
              to="/#uses"
              className="group relative bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between h-full overflow-hidden transition-all duration-500 hover:border-sky-500/20 hover:shadow-[0_0_40px_rgba(56,189,248,0.06)]"
            >
              {/* Ambient light bloom behind icons */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-20 bg-sky-500/10 blur-3xl rounded-full pointer-events-none transition-all duration-700 group-hover:bg-sky-500/20 group-hover:w-56 group-hover:h-28" />

              {/* Top label */}
              <div className="text-center z-10 w-full">
                <span className="text-[9px] tracking-[0.25em] text-gray-600 font-bold uppercase block font-mono">USES</span>
              </div>

              {/* Central heading — shimmer on hover like the rest of the site */}
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
            </Link>
          </Reveal>


          {/* Card 2: Visitors Guestbook */}
          <Reveal y={30} index={1} className="h-[21rem] w-full">
            <div className="group relative bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6 flex flex-col items-center justify-between h-full overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
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
          </Reveal>

          {/* Card 3: Last Played Status Panel */}
          <Reveal y={30} index={2} className="h-[21rem] w-full">
            <div className="group relative bg-[#0d0d0d] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between h-full overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">

              {/* Header Info */}
              <div className="text-center z-10 mt-2 w-full">
                <div className="flex items-center justify-center gap-2 text-emerald-400 text-[9px] font-bold tracking-widest uppercase font-mono">
                  <svg className="w-4 h-4 animate-spin-slow text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.077-.336.135-.668.47-.743 3.856-.88 7.15-.502 9.822 1.132.296.182.387.567.205.856zm1.224-2.722c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.847-.107-.972-.52-.125-.413.108-.847.52-.972 3.67-1.114 8.243-.574 11.347 1.33.367.226.488.708.259 1.084zm.106-2.833C14.392 8.775 8.463 8.577 5.033 9.618c-.53.16-1.09-.14-1.25-.67-.16-.53.14-1.09.67-1.25 3.945-1.197 10.495-.97 14.562 1.444.477.283.633.9.35 1.377-.283.478-.9.633-1.377.35z" />
                  </svg>
                  Last Played
                </div>
              </div>

              {/* Status details centered and enlarged */}
              <div className="text-center z-10 my-auto flex flex-col justify-center items-center px-4 w-full">
                <p className="text-sm text-gray-400 font-medium leading-relaxed font-outfit">
                  Last Played <br />
                  <span className="text-white font-semibold text-2xl sm:text-3xl block mt-1" style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.15)" }}>Not Playing</span> 
                  <span className="text-[10px] text-gray-500 block mt-1">by <span className="text-emerald-400 font-semibold">Spotify</span></span>
                </p>
              </div>

              {/* Vinyl Artwork Container Visual */}
              <div className="relative w-full h-28 mt-auto transform translate-y-4 transition-transform duration-500 group-hover:translate-y-2">
                {/* Vinyl Disc Blueprint Behind Album Cover */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-6 w-32 h-32 rounded-full border border-white/25 flex items-center justify-center transition-transform duration-700 ease-out group-hover:-translate-y-4 group-hover:rotate-180 pointer-events-none shadow-2xl"
                  style={{
                    background: "repeating-radial-gradient(circle, #2a2a2a, #141414 4px, #242424 8px, #0e0e0e 10px)"
                  }}
                >
                  {/* Center Label Spacer */}
                  <div className="w-10 h-10 rounded-full bg-[#181818] border border-white/30 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/spotify-cover.jpg"
                      alt="Mini cover"
                      className="w-full h-full object-cover rounded-full filter brightness-75 saturate-75"
                    />
                  </div>
                </div>

                {/* Album Artwork Cover Image - Beautiful Spiti Buddha image */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-24 rounded-lg overflow-hidden shadow-2xl border border-white/15 transition-transform duration-500 group-hover:scale-[1.02] select-none">
                  <img
                    src="/images/spotify-cover.jpg"
                    alt="Spotify Album Cover"
                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                  />
                </div>
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

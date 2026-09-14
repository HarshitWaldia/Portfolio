"use client";

import { Link } from "react-router-dom";
import { useContactDrawer } from "@/stores/contact-drawer";

export default function Footer() {
  const { open: openContact } = useContactDrawer();

  const handleBookCall = (e: React.MouseEvent) => {
    e.preventDefault();
    openContact();
  };

  return (
    <footer className="w-full max-w-none px-2 sm:px-4 lg:px-6">
      <div className="grid grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
        {/* Left vertical bar */}
        <div aria-hidden="true" className="w-full border-x border-white/5 bg-stripes-vertical" />

        {/* Middle: Content container */}
        <div className="border-t border-white/5 bg-black/40 backdrop-blur-sm pt-16">
          <div className="px-6 sm:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 mb-12">
              {/* Logo & Description */}
              <div className="flex flex-col gap-5 col-span-1 md:col-span-5 text-left md:border-r border-white/5 md:pr-12">
                <Link to="/" className="flex items-center w-fit text-white hover:opacity-80 transition-opacity" aria-label="Harshit Waldia - Home">
                  <span className="font-sans text-2xl font-black italic tracking-tighter text-white sm:text-3xl">
                    HW
                  </span>
                </Link>
                <p className="text-[13px] sm:text-sm text-white/40 max-w-sm leading-relaxed">
                  I&apos;m Harshit Waldia - an AI/ML engineer &amp; systems developer. Thanks for checking out my site!
                </p>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-neutral-300 w-fit select-none mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available for work
                </div>
              </div>

              {/* Links columns */}
              <div className="grid grid-cols-2 gap-8 col-span-1 md:col-span-7 md:pl-12">
                {/* GENERAL */}
                <div className="flex flex-col gap-3.5 text-left">
                  <h4 className="text-xs font-bold tracking-widest text-white/30 uppercase">General</h4>
                  <div className="flex flex-col gap-2.5 text-sm font-medium text-white/50">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <Link to="/about" className="hover:text-white transition-colors">About</Link>
                    <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
                    <Link to="/certifications" className="hover:text-white transition-colors">Certifications</Link>
                  </div>
                </div>

                {/* MORE */}
                <div className="flex flex-col gap-3.5 text-left">
                  <h4 className="text-xs font-bold tracking-widest text-white/30 uppercase">More</h4>
                  <div className="flex flex-col gap-2.5 text-sm font-medium text-white/50">
                    <a href="#contact" onClick={handleBookCall} className="hover:text-white transition-colors">Book a call</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom copyright */}
            <div className="border-t border-white/5 pt-8 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/35">
                &copy; {new Date().getFullYear()} Harshit Waldia. All rights reserved.
              </p>
            </div>
          </div>

          {/* Bottom Horizontal Stripes Bar */}
          <div aria-hidden="true" className="h-7 w-full border-t border-white/5 bg-stripes-horizontal" />
        </div>

        {/* Right vertical bar */}
        <div aria-hidden="true" className="w-full border-x border-white/5 bg-stripes-vertical" />
      </div>
    </footer>
  );
}

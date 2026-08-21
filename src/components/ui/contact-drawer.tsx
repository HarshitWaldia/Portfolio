"use client";

import { useState, useRef, useEffect } from "react";
import { useContactDrawer } from "@/stores/contact-drawer";
import { submitContactForm } from "@/actions/contact-form-actions";
import { X, CheckCircle, Mail, Search, Moon, Sun, ArrowLeft, ArrowRight, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteMetadata } from "@/lib/seo/site-metadata";
import { useNavigate } from "react-router-dom";

export default function ContactDrawer() {
  const { isOpen, close } = useContactDrawer();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = message, 2 = full form
  const [form, setForm] = useState({ name: "", email: "", topic: "Select a topic", message: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus logic
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSuccess(false);
      setError("");
      setAgreed(false);
      // Delay slightly for transition animation
      setTimeout(() => {
        messageTextareaRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [step]);

  if (!isOpen) return null;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) {
      setError("Please write a message first.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleContinue(e);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill out your name and email.");
      return;
    }
    if (form.topic === "Select a topic") {
      setError("Please select a topic.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the data processing.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await submitContactForm({
        name: form.name,
        email: form.email,
        subject: `[${form.topic}] Project Inquiry`,
        message: form.message
      });
      setLoading(false);
      if (result.success) {
        setSuccess(true);
        setForm({ name: "", email: "", topic: "Select a topic", message: "" });
        setAgreed(false);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("Failed to send message. Please check your connection.");
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Dark Ambient Backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={close}
      />

      {/* Rebuilt Premium Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-lg bg-[#0e0e11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 p-5 gap-4 select-none"
      >

        {/* ── HEADER NAVIGATION BAR ── */}
        <div className="flex items-center justify-between text-neutral-400">
          <button
            onClick={() => {
              if (step === 2) {
                setStep(1);
              } else {
                close();
              }
            }}
            className="flex items-center gap-1.5 text-xs hover:text-white transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>{step === 1 ? "Reach out" : "Drop a note"}</span>
          </button>

          <div className="flex items-center gap-3">
            <button className="hover:text-white transition-colors cursor-pointer" aria-label="Search">
              <Search size={16} />
            </button>
            <button className="hover:text-white transition-colors cursor-pointer" aria-label="Theme toggle">
              <Moon size={16} />
            </button>
            <button
              onClick={close}
              className="hover:text-white transition-colors cursor-pointer bg-neutral-900 border border-white/5 p-1 rounded-md"
              aria-label="Close dialog"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ── CONVERSATIONAL INPUT AREA / FORM ── */}
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#121216] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-sm font-semibold text-white">Message Sent!</h3>
              <p className="text-xs text-white/50 max-w-xs leading-relaxed">
                Thanks for reaching out! I&apos;ll check it and get back to you shortly.
              </p>
              <button
                onClick={() => { setSuccess(false); setStep(1); }}
                className="mt-2 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium cursor-pointer"
              >
                Send another message
              </button>
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#121216] border border-[#1e1e24] rounded-xl p-4 relative"
            >
              {/* Form Identity Row */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/profile.jpg"
                  alt={siteMetadata.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                />
                <div className="text-left">
                  <h3 className="text-xs font-semibold text-white">Send {siteMetadata.author.name} a message</h3>
                  <p className="text-[10px] text-white/40">I read every one</p>
                </div>
              </div>

              {/* Textarea field */}
              <textarea
                ref={messageTextareaRef}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder={`Hey ${siteMetadata.author.name}, I have a project idea...`}
                rows={3}
                className="w-full bg-transparent border-0 p-0 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-0 resize-none font-light leading-relaxed"
              />

              {error && <p className="text-[11px] text-red-400 mb-2">{error}</p>}

              {/* Footer with key guides and Continue button */}
              <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3 text-[10px] text-white/30 font-mono">
                <span className="flex items-center gap-1">
                  <CornerDownLeft size={10} /> to continue • ⇧ <CornerDownLeft size={10} /> new line
                </span>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex items-center gap-1.5 text-xs text-white bg-neutral-900 hover:bg-neutral-800 border border-white/10 px-3.5 py-1.5 rounded-lg transition-all font-semibold cursor-pointer shadow-md"
                >
                  <span>Continue</span>
                  <ArrowRight size={12} className="text-white/60" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 text-left"
            >
              {/* Grid for Name and Email */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold tracking-wider text-white/50 uppercase font-mono">Name</label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-[#121216] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-all font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold tracking-wider text-white/50 uppercase font-mono">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full bg-[#121216] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Topic Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold tracking-wider text-white/50 uppercase font-mono">Topic</label>
                <div className="relative">
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full bg-[#121216] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white/80 focus:outline-none focus:border-violet-500/50 transition-all font-sans appearance-none cursor-pointer"
                  >
                    <option disabled value="Select a topic">Select a topic</option>
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Freelance Opportunity">Freelance Opportunity</option>
                    <option value="Full-time Position">Full-time Position</option>
                    <option value="General Question">General Question</option>
                    <option value="Just saying hi">Just saying hi</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/40">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Field (editable) */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold tracking-wider text-white/50 uppercase font-mono">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message details..."
                  rows={4}
                  className="w-full bg-[#121216] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-all font-sans resize-none leading-relaxed"
                />
              </div>

              {/* GDPR Checkbox */}
              <div className="py-1">
                <label className="flex items-center gap-3 text-[10px] text-white/50 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="rounded-full bg-neutral-900 border-white/10 text-violet-500 focus:ring-0 focus:ring-offset-0 size-4 cursor-pointer"
                  />
                  <span className="leading-snug">I agree to the processing of my data to handle this request.</span>
                </label>
              </div>

              {error && <p className="text-[11px] text-red-400">{error}</p>}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !agreed || form.topic === "Select a topic" || !form.name.trim() || !form.email.trim() || !form.message.trim()}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-lg text-xs bg-white hover:bg-neutral-200 disabled:bg-[#1c1c21] text-black disabled:text-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold cursor-pointer shadow-md mt-2"
              >
                <span>Send Message</span>
                <ArrowRight size={13} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ALTERNATIVE ACTION CARDS & SOCIALSSTACK (ONLY IN STEP 1) ── */}
        <AnimatePresence>
          {step === 1 && !success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              {/* Booking & Email Cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Book a Call */}
                <div
                  onClick={() => {
                    close();
                    navigate("/contact");
                  }}
                  className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-[#121216] border border-white/5 hover:border-white/15 hover:bg-white/[0.02] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-2.5">
                    <img
                      src="/profile.jpg"
                      alt={siteMetadata.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-white/10"
                    />
                    <span className="text-white/20 text-[10px] font-mono select-none">+</span>
                    <div className="w-6 h-6 rounded-full bg-neutral-800 border border-white/5 flex items-center justify-center text-[8px] font-semibold text-white/60 select-none">
                      You
                    </div>
                  </div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-violet-400 transition-colors">Book a call</h4>
                  <p className="text-[10px] text-white/40 mt-0.5">30 min • no strings</p>
                </div>

                {/* Email me */}
                <a
                  href={`mailto:${siteMetadata.author.email}`}
                  className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-[#121216] border border-white/5 hover:border-white/15 hover:bg-white/[0.02] transition-all cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-800/80 border border-white/5 flex items-center justify-center mb-2.5 text-white/60 group-hover:text-violet-400 transition-colors select-none">
                    <Mail size={12} />
                  </div>
                  <h4 className="text-xs font-semibold text-white group-hover:text-violet-400 transition-colors">Email me</h4>
                  <p className="text-[10px] text-white/40 mt-0.5 max-w-[120px] truncate">{siteMetadata.author.email}</p>
                </a>
              </div>

              {/* Footer Socials */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-medium pt-1">
                <a
                  href={siteMetadata.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-lg border border-white/5 bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  LinkedIn
                </a>
                <a
                  href={siteMetadata.author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-lg border border-white/5 bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  X / Twitter
                </a>
                <a
                  href={siteMetadata.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 rounded-lg border border-white/5 bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}

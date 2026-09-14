"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useMetadata } from "@/hooks/use-metadata";
import {
  MessageSquare,
  Heart,
  Send,
  Trash2,
  Sparkles,
  CheckCircle2,
  Search,
  User,
  ArrowLeft,
  Flame,
  ShieldCheck,
  Smile,
  Clock,
  ThumbsUp
} from "lucide-react";
import {
  getGuestbookEntries,
  createGuestbookEntry,
  deleteGuestbookEntry,
  toggleLikeGuestbookEntry,
  isEntryLikedByUser,
  GuestbookEntry,
} from "@/actions/guestbook-actions";

const ROLE_OPTIONS = [
  { label: "AI Engineer", color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30" },
  { label: "Software Developer", color: "from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30" },
  { label: "Technical Recruiter", color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30" },
  { label: "Founder / Lead", color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30" },
  { label: "Student / Researcher", color: "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30" },
  { label: "Visitor", color: "from-neutral-500/20 to-gray-500/20 text-gray-300 border-white/10" },
];

export const KNOWN_PEER_ROLES: Record<string, { role: string; color: string }> = {
  "Jatin Pant": { role: "AI Collaborator • Software Engineer", color: "from-cyan-500/25 to-blue-500/20 text-cyan-300 border-cyan-500/40" },
  "Priyanshu Shahi": { role: "Engineer • Tech Lead", color: "from-purple-500/25 to-violet-500/20 text-purple-300 border-purple-500/40" },
  "Ritesh Singh": { role: "Backend Architect • Developer", color: "from-blue-500/25 to-sky-500/20 text-blue-300 border-blue-500/40" },
  "Shivam Sah": { role: "Data Scientist • ML Engineer", color: "from-indigo-500/25 to-violet-500/20 text-indigo-300 border-indigo-500/40" },
  "Udit Joshi": { role: "Computer Vision Specialist", color: "from-emerald-500/25 to-teal-500/20 text-emerald-300 border-emerald-500/40" },
  "Yash Joshi": { role: "Full Stack • ML Developer", color: "from-rose-500/25 to-pink-500/20 text-rose-300 border-rose-500/40" },
  "Harshit Waldia": { role: "Author • AI/ML Engineer", color: "from-violet-500/30 to-cyan-500/20 text-violet-300 border-violet-500/50" },
};

const AVATAR_PRESETS = [
  "/images/friends/jatin-pant.jpg",
  "/images/friends/priyanshu-shahi.jpg",
  "/images/friends/ritesh-singh.jpg",
  "/images/friends/shivam-sah.jpg",
  "/images/friends/udit-joshi.jpg",
  "/images/friends/yash-joshi.jpg",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
];

function formatTimeAgo(dateInput: Date | string) {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function GuestbookPage() {
  useMetadata({
    title: "Guestbook — Harshit Waldia",
    description: "Leave a note, share feedback, or sign the visitor guestbook on Harshit Waldia's portfolio.",
  });

  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("AI Engineer");
  const [message, setMessage] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0]);
  const [formError, setFormError] = useState("");

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    setLoading(true);
    const data = await getGuestbookEntries();
    setEntries(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Please enter your name or moniker.");
      return;
    }
    if (message.trim().length < 3) {
      setFormError("Message must be at least 3 characters.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    const result = await createGuestbookEntry(message, {
      name: name.trim(),
      role,
      avatar: selectedAvatar,
    });

    setSubmitting(false);

    if (result.success) {
      setSuccessAnim(true);
      setMessage("");
      await loadEntries();
      setTimeout(() => setSuccessAnim(false), 3000);
    } else {
      setFormError(result.error || "Failed to submit. Please try again.");
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteGuestbookEntry(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  }

  function handleLike(id: string) {
    const { count } = toggleLikeGuestbookEntry(id);
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, likes: count } : e))
    );
  }

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      const peerMeta = item.userName ? KNOWN_PEER_ROLES[item.userName] : undefined;
      const effectiveRole = item.role || peerMeta?.role || "Visitor";

      const matchesSearch =
        item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.userName && item.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        effectiveRole.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        selectedRoleFilter === "All" ||
        (selectedRoleFilter === "Collaborators" && !!peerMeta) ||
        effectiveRole.toLowerCase().includes(selectedRoleFilter.toLowerCase());

      return matchesSearch && matchesRole;
    });
  }, [entries, searchQuery, selectedRoleFilter]);

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* ── Background Atmospheric Glows ── */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-violet-600/15 via-pink-600/10 to-cyan-600/15 blur-[140px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-96 right-10 w-[450px] h-[450px] bg-blue-600/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-4xl mx-auto">
        {/* ── Top Back Button ── */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-full hover:bg-white/[0.06]"
          >
            <ArrowLeft size={13} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* ── Hero Section ── */}
        <header className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs text-violet-400 font-mono uppercase tracking-widest">
            <Sparkles size={12} className="text-violet-400 animate-pulse" />
            <span>COMMUNITY SIGNATURES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
            The Public{" "}
            <span className="italic font-instrument-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-cyan-400">
              Guestbook
            </span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Leave a note, share project feedback, drop your thoughts, or simply say hello. Your signature will be etched onto the site forever!
          </p>

          {/* Quick stats banner */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{entries.length} Total Signatures</span>
            </div>
            <div className="text-neutral-700">•</div>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck size={14} className="text-cyan-400" />
              <span>Realtime Verified</span>
            </div>
          </div>
        </header>

        {/* ── SIGNING FORM CARD ── */}
        <section className="mb-16">
          <div className="relative rounded-2xl bg-[#0d0d11]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
            {/* Ambient accent border glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6 border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Leave your signature</h3>
                  <p className="text-xs text-neutral-400">No complex signup required — takes 10 seconds</p>
                </div>
              </div>

              {successAnim && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-mono"
                >
                  <CheckCircle2 size={13} />
                  <span>Signature Saved! 🎉</span>
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Name and Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase font-mono tracking-wider text-neutral-400">
                    Your Name / Handle <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera or @alex_dev"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-violet-500/50 transition-all font-sans"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                      <User size={14} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase font-mono tracking-wider text-neutral-400">
                    Role / Identity
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#14141a] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-violet-500/50 transition-all cursor-pointer font-sans"
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <option key={opt.label} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Avatar Selection */}
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase font-mono tracking-wider text-neutral-400">
                  Choose an Avatar
                </label>
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {AVATAR_PRESETS.map((avatarUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatar(avatarUrl)}
                      className={`relative w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        selectedAvatar === avatarUrl
                          ? "border-violet-400 scale-110 shadow-lg shadow-violet-500/30"
                          : "border-white/15 opacity-60 hover:opacity-100 hover:border-white/30"
                      }`}
                    >
                      <img src={avatarUrl} alt="Avatar option" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Message Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] uppercase font-mono tracking-wider text-neutral-400">
                    Message <span className="text-pink-500">*</span>
                  </label>
                  <span className={`text-[10px] font-mono ${message.length > 230 ? "text-pink-400" : "text-neutral-500"}`}>
                    {message.length} / 250
                  </span>
                </div>
                <textarea
                  required
                  rows={3}
                  maxLength={250}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Drop a note, feedback on my projects, or just say hi from where you are! 👋"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-violet-500/50 transition-all resize-none leading-relaxed"
                />
              </div>

              {formError && (
                <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg">
                  {formError}
                </p>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-neutral-500 hidden sm:block">
                  Submissions are moderated & saved publicly.
                </p>
                <button
                  type="submit"
                  disabled={submitting || !message.trim() || !name.trim()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-white/10 cursor-pointer"
                >
                  {submitting ? (
                    <span>Signing...</span>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Sign Guestbook</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ── SEARCH & FILTER CONTROLS ── */}
        <section className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search signatures..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/20 transition-all font-mono"
            />
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["All", "Collaborators", "AI Engineer", "Software Developer", "Technical Recruiter"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedRoleFilter(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  selectedRoleFilter === tab
                    ? "bg-white/15 text-white border border-white/20"
                    : "text-neutral-400 hover:text-neutral-200 bg-white/[0.02] border border-white/[0.04]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* ── SIGNATURES FEED ── */}
        <section className="space-y-4">
          {loading ? (
            <div className="text-center py-20 text-neutral-500 text-xs font-mono animate-pulse">
              Loading signatures...
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-16 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
              <MessageSquare size={32} className="mx-auto text-neutral-600 mb-3 opacity-60" />
              <p className="text-neutral-300 font-medium text-sm">No signatures found</p>
              <p className="text-neutral-500 text-xs mt-1">Be the first to leave a message matching your search!</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredEntries.map((entry, index) => {
                const isLiked = isEntryLikedByUser(entry.id);
                const roleConfig = ROLE_OPTIONS.find((r) => r.label === entry.role);
                const peerMeta = entry.userName ? KNOWN_PEER_ROLES[entry.userName] : undefined;
                const displayRole = entry.role || peerMeta?.role;
                const roleColor = peerMeta?.color || (roleConfig ? roleConfig.color : "from-neutral-500/20 to-gray-500/20 text-gray-300 border-white/10");

                return (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
                    className="group relative bg-[#0c0c10] border border-white/[0.07] hover:border-white/15 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Avatar + Details */}
                      <div className="flex items-start gap-3.5">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/15 shrink-0 bg-neutral-800">
                          {entry.userImage ? (
                            <img
                              src={entry.userImage}
                              alt={entry.userName || "User"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-violet-400 bg-violet-950/40">
                              {(entry.userName || "A").charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-semibold text-white tracking-wide">
                              {entry.userName || "Anonymous Visitor"}
                            </h4>
                            {displayRole && (
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-md border bg-gradient-to-r ${roleColor}`}
                              >
                                {displayRole}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono mt-0.5">
                            <Clock size={11} />
                            <span>{formatTimeAgo(entry.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions (Like & Delete) */}
                      <div className="flex items-center gap-2">
                        {/* Like Button */}
                        <button
                          onClick={() => handleLike(entry.id)}
                          className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            isLiked
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                              : "bg-white/[0.03] border-white/[0.07] text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                          }`}
                        >
                          <Heart
                            size={13}
                            className={`transition-transform duration-200 ${
                              isLiked ? "fill-rose-500 text-rose-500 scale-110" : ""
                            }`}
                          />
                          <span>{entry.likes || 0}</span>
                        </button>

                        {/* Local Delete Option */}
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-neutral-600 hover:text-rose-400 transition-colors p-1.5 rounded-md hover:bg-rose-500/10 cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Message Body */}
                    <p className="mt-3.5 text-sm text-neutral-200 leading-relaxed font-light pl-[3.25rem]">
                      {entry.message}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </section>

        {/* ── FOOTER INVITATION ── */}
        <div className="mt-16 text-center border-t border-white/[0.06] pt-8">
          <p className="text-xs text-neutral-500 font-mono">
            Crafted with PostgreSQL, Prisma, and React. Powered by Harshit Waldia.
          </p>
        </div>
      </div>
    </div>
  );
}

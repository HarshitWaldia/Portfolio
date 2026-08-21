"use client";

import { useState } from "react";
import { submitContactForm } from "@/actions/contact-form-actions";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await submitContactForm(form);
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setError(result.error);
    }
  }

  const contacts = [
    { icon: <Mail size={18} />, label: "Email", value: "Harshit@example.com", href: "mailto:Harshit@example.com" },
    { icon: <Github size={18} />, label: "GitHub", value: "github.com/Harshit", href: "https://github.com/Harshit" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "linkedin.com/in/Harshit", href: "https://linkedin.com/in/Harshit" },
    { icon: <MapPin size={18} />, label: "Location", value: "India 🇮🇳", href: null },
  ];

  return (
    <section id="contact" className="section">
      <Reveal y={20} className="text-center mb-16">
        <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest text-violet-400 border border-violet-500/30 rounded-full mb-4 uppercase">
          Get In Touch
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold">
          Contact <span className="gradient-text">Me</span>
        </h2>
        <p className="mt-4 text-white/50 max-w-md mx-auto">
          Have a project in mind? Let&apos;s build something amazing together.
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact cards */}
        <Reveal index={0} y={36} className="space-y-4">
          {contacts.map((c, i) => (
            <Reveal key={c.label} index={i} stagger={0.08} delay={0.1} y={16} className="glass glass-hover rounded-xl p-4 flex items-center gap-4 transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                {c.icon}
              </div>
              <div>
                <p className="text-xs text-white/40 mb-0.5">{c.label}</p>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                    className="text-sm font-medium text-white/80 hover:text-violet-300 transition-colors">
                    {c.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-white/80">{c.value}</p>
                )}
              </div>
            </Reveal>
          ))}
        </Reveal>

        {/* Form */}
        {success ? (
          <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center">
            <CheckCircle size={48} className="text-green-400" />
            <h3 className="text-xl font-semibold">Message Sent! 🎉</h3>
            <p className="text-white/50">I&apos;ll get back to you within 24 hours.</p>
            <button onClick={() => setSuccess(false)} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
              Send another message
            </button>
          </div>
        ) : (
          <Reveal
            as="div"
            index={1}
            y={36}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Name</label>
                  <input type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all" />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Email</label>
                  <input type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Subject</label>
                <input type="text" value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project Inquiry"
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all" />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Message</label>
                <textarea required rows={5} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all resize-none" />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-violet-500/25">
                {loading ? "Sending..." : <><Send size={15} /> Send Message</>}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

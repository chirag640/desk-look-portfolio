"use client";

import React, { useState } from "react";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { Mail, Send, CheckCircle2, ArrowUpRight, FileText } from "lucide-react";
import { personalData } from "@/data/social";
import { GithubIcon, LinkedinIcon, XIcon } from "@/ui/BrandIcons";
import { getAssetPath } from "@/lib/assets";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSent, setIsSent] = useState(false);
  const [cliInput, setCliInput] = useState("");
  const [cliOutput, setCliOutput] = useState<string[]>([
    "Chirag Chaudhary Terminal v2.6.0 [Gandhinagar, India]",
    "Type 'help' to view available commands."
  ]);

  const { playClick, playThock } = useSoundEffects();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playClick();
    const mailSubject = encodeURIComponent(
      formData.subject ? `[Portfolio] ${formData.subject}` : `[Portfolio Inquiry] From ${formData.name}`
    );
    const mailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:chaudharychirag640@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    setIsSent(true);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    playThock("cherry_blue");
    let response = "";

    switch (cmd) {
      case "help":
        response = "Available: whoami, stack, projects, experience, contact, clear";
        break;
      case "whoami":
        response = "Chirag Chaudhary — Software Engineer at TCS & creator of flutter_blueprint.";
        break;
      case "stack":
        response = "Flutter, Dart, NestJS, TypeScript, PostgreSQL, Docker, Next.js, Redis.";
        break;
      case "projects":
        response = "flutter_blueprint (Pub.dev v3.0.0), FinFlow (Flutter+NestJS), CollabStream.";
        break;
      case "experience":
        response = "Tata Consultancy Services (TCS) — Software Engineer (Enterprise Mobile & Microservices).";
        break;
      case "contact":
        response = "Email: chaudharychirag640@gmail.com | GitHub: @chirag640 | LinkedIn: in/chirag-chaudhary-";
        break;
      case "clear":
        setCliOutput([]);
        setCliInput("");
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for command list.`;
    }

    setCliOutput((prev) => [...prev, `$ ${cliInput}`, response]);
    setCliInput("");
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 pt-24 pb-12 flex flex-col justify-between pointer-events-none"
    >
      <div className="max-w-6xl pointer-events-auto space-y-12 w-full">
        {/* ── Chapter Header ── */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs tracking-widest uppercase">
            <span>05 // TERMINAL &amp; DISPATCH</span>
            <span className="w-8 h-px bg-sky-400/40" />
            <span>COMMUNICATION STATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            Initiate Connection.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            Open for architectural discussions, enterprise consulting, and high-impact engineering ventures.
          </p>
        </div>

        {/* ── Two Column Grid: Form & Interactive CLI ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Direct Dispatch Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0D121F]/90 border border-white/10 shadow-2xl backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>DIRECT DISPATCH FORM</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">● FAST RESPONSE</span>
            </div>

            {isSent ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                <h4 className="text-lg font-bold text-white">Client Dispatched!</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Your mail client has been opened with your pre-filled inquiry.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="text-xs text-sky-400 underline font-mono cursor-pointer pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 uppercase text-[10px]">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B14] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 uppercase text-[10px]">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B14] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 uppercase text-[10px]">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Engineering Discussion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B14] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 uppercase text-[10px]">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your timeline, goals, or architectural context..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080B14] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                  />
                </div>

                <MagneticWrapper strength={12} className="w-full">
                  <button
                    type="submit"
                    data-cursor="link"
                    className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-black font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </MagneticWrapper>
              </form>
            )}
          </div>

          {/* Right: Quick Links & Interactive CLI */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            {/* Quick Direct Channels */}
            <div className="p-6 rounded-3xl bg-[#0D121F]/90 border border-white/10 space-y-4 backdrop-blur-md font-mono">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                VERIFIED CHANNELS &amp; PROFILES
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="p-3 rounded-xl bg-[#090C16] hover:bg-[#12182B] border border-white/5 hover:border-white/20 text-slate-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-sky-400" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="p-3 rounded-xl bg-[#090C16] hover:bg-[#12182B] border border-white/5 hover:border-white/20 text-slate-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={personalData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="external"
                  className="p-3 rounded-xl bg-[#090C16] hover:bg-[#12182B] border border-white/5 hover:border-white/20 text-slate-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <XIcon className="w-4 h-4 text-sky-400" />
                    <span>Twitter / X</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={getAssetPath("/resume/Chirag_Resume.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="p-3 rounded-xl bg-[#090C16] hover:bg-[#12182B] border border-white/5 hover:border-white/20 text-slate-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-400" />
                    <span>Resume.pdf</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Interactive Mini CLI Terminal */}
            <div className="p-5 rounded-3xl bg-[#060910] border border-white/10 shadow-inner flex flex-col font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 text-slate-300 font-bold">zsh — chirag@studio</span>
                </div>
                <span>Gandhinagar, IN</span>
              </div>

              {/* Output log */}
              <div className="space-y-1 text-slate-300 max-h-32 overflow-y-auto text-[11px] leading-relaxed scrollbar-none">
                {cliOutput.map((line, idx) => (
                  <div key={idx} className={line.startsWith("$") ? "text-sky-400 font-bold" : "text-slate-400"}>
                    {line}
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleCliSubmit} className="flex items-center gap-2 pt-1 border-t border-white/5">
                <span className="text-emerald-400 font-bold">➜</span>
                <span className="text-sky-400">~</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="type 'help'..."
                  className="flex-1 bg-transparent text-white focus:outline-none font-mono text-[11px]"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ── Minimal Technical Footer ── */}
      <footer className="w-full pt-16 border-t border-white/10 mt-16 pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
        <div>
          <span>© {new Date().getFullYear()} Chirag Chaudhary. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Next.js 16 · React 19 · Three.js · Tailwind v4</span>
        </div>
        <div>
          <span className="text-emerald-400">● Available for Enterprise &amp; Contract Work</span>
        </div>
      </footer>
    </section>
  );
};

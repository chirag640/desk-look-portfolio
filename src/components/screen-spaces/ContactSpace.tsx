"use client";

import React, { useState } from "react";
import { personalData } from "@/data/social";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Mail, Send, CheckCircle2, ArrowUp, MessageSquare, Box } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/ui/BrandIcons";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface ContactSpaceProps {
  onNavigateSpace: (spaceIndex: number) => void;
}

export const ContactSpace: React.FC<ContactSpaceProps> = ({ onNavigateSpace }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const { playClick, playWindowOpen } = useSoundEffects();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    playClick();

    setTimeout(() => {
      setStatus("success");
      playWindowOpen();
      setFormData({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <div className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between select-none overflow-y-auto">
      {/* Space Title Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#5B8DEF20] border border-[#5B8DEF40] flex items-center justify-center text-[#5B8DEF]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Communication Terminal & Direct Transmission
            </h2>
            <p className="text-xs font-mono text-slate-400">
              GANDHINAGAR NODE · VIRTUAL SPACE 7
            </p>
          </div>
        </div>

        <Badge variant="green" size="sm">
          Transmission Channels Online
        </Badge>
      </div>

      {/* Main Grid: Left Direct Form + Right Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Left Direct Form */}
        <div className="lg:col-span-7">
          {status === "success" ? (
            <div className="p-8 rounded-2xl bg-[#63C58A15] border border-[#63C58A33] text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#63C58A] mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-white">
                Transmission Received Successfully!
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you for reaching out. Chirag Chaudhary will respond to your transmission as soon as possible.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setStatus("idle")}
                className="mt-2 text-white border-white/20 hover:bg-white/10"
              >
                Send Another Transmission
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="screen-contact-name"
                    className="block text-xs font-mono font-semibold text-slate-300"
                  >
                    YOUR NAME
                  </label>
                  <input
                    id="screen-contact-name"
                    type="text"
                    required
                    placeholder="e.g. Maya Chen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#5B8DEF] focus:bg-white/10 focus:outline-none text-xs sm:text-sm text-white transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="screen-contact-email"
                    className="block text-xs font-mono font-semibold text-slate-300"
                  >
                    YOUR EMAIL
                  </label>
                  <input
                    id="screen-contact-email"
                    type="email"
                    required
                    placeholder="e.g. maya@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#5B8DEF] focus:bg-white/10 focus:outline-none text-xs sm:text-sm text-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="screen-contact-message"
                  className="block text-xs font-mono font-semibold text-slate-300"
                >
                  TRANSMISSION MESSAGE
                </label>
                <textarea
                  id="screen-contact-message"
                  required
                  rows={4}
                  placeholder="Discuss an enterprise Flutter product, full-stack NestJS service, or engineering collaboration..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#5B8DEF] focus:bg-white/10 focus:outline-none text-xs sm:text-sm text-white transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={status === "submitting"}
                icon={<Send className="w-3.5 h-3.5" />}
              >
                {status === "submitting" ? "Transmitting..." : "Send Transmission"}
              </Button>
            </form>
          )}
        </div>

        {/* Right Direct Channels Column */}
        <div className="lg:col-span-5 rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4 shadow-xl">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
            Direct Endpoints
          </span>

          <div className="space-y-2.5">
            <a
              href={`mailto:${personalData.email}`}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B8DEF] text-xs font-medium text-white transition-all no-underline shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#5B8DEF] shrink-0" />
              <span className="truncate">{personalData.email}</span>
            </a>

            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B8DEF] text-xs font-medium text-white transition-all no-underline shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4 text-[#5B8DEF] shrink-0" />
              <span>LinkedIn (Chirag Chaudhary)</span>
            </a>

            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white text-xs font-medium text-white transition-all no-underline shadow-sm"
            >
              <GithubIcon className="w-4 h-4 text-white shrink-0" />
              <span>GitHub (@chirag640 · 70 Repos)</span>
            </a>

            <a
              href={personalData.pubDev}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F4C95D] text-xs font-medium text-white transition-all no-underline shadow-sm"
            >
              <Box className="w-4 h-4 text-[#F4C95D] shrink-0" />
              <span>flutter_blueprint on Pub.dev</span>
            </a>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-slate-400">
            Location: {personalData.location}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
        <span>SPACE 7/7 · END OF TRANSMISSION</span>
        <button
          onClick={() => onNavigateSpace(0)}
          className="flex items-center gap-1.5 text-[#5B8DEF] hover:underline cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Master Desktop (Space 1)</span>
        </button>
      </div>
    </div>
  );
};

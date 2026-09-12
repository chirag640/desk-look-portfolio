"use client";

import React, { useState, useEffect } from "react";
import { X, Check, Trash2, Pin, MessageSquare, Sparkles } from "lucide-react";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface SavedNote {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export const StickyNoteModal: React.FC = () => {
  const { isStickyNoteOpen, setStickyNoteOpen } = useAtmosphereStore();
  const { playClick, playPaperRustle } = useSoundEffects();

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("chirag_desk_sticky_notes");
      if (stored) {
        setSavedNotes(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    playPaperRustle();
    const newNote: SavedNote = {
      id: String(Date.now()),
      author: author.trim() || "Anonymous Visitor",
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newNote, ...savedNotes.slice(0, 4)];
    setSavedNotes(updated);
    try {
      localStorage.setItem("chirag_desk_sticky_notes", JSON.stringify(updated));
    } catch {}

    setContent("");
    setIsPinned(true);
    setTimeout(() => setIsPinned(false), 2000);
  };

  const handleClearHistory = () => {
    playClick();
    setSavedNotes([]);
    try {
      localStorage.removeItem("chirag_desk_sticky_notes");
    } catch {}
  };

  if (!isStickyNoteOpen) return null;

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* 3M Yellow Post-It Pad Container */}
      <div className="relative w-full max-w-sm sm:max-w-md rounded-2xl bg-[#FEF08A] text-slate-800 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-yellow-300 transform -rotate-1 hover:rotate-0 transition-transform select-none font-sans">
        {/* Frosted Tape Graphic at Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/50 backdrop-blur-md border border-white/60 rounded-sm transform rotate-1 shadow-sm pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-yellow-300/80 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 shadow-inner">
              <Pin className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-yellow-950 tracking-tight font-mono">
                DESK SCRATCHPAD · 3M NOTE
              </h3>
              <p className="text-[10px] text-yellow-800/80 font-mono">
                Leave a quick thought or feedback for Chirag
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClick();
              setStickyNoteOpen(false);
            }}
            className="w-7 h-7 rounded-full bg-yellow-300/80 hover:bg-yellow-400 text-yellow-900 flex items-center justify-center transition-colors cursor-pointer"
            title="Close Note"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Note Form */}
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Your name or handle (e.g. Alex / @alex_dev)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-yellow-200/70 border border-yellow-300 text-xs text-yellow-950 placeholder:text-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-mono"
            />
          </div>

          <div>
            <textarea
              rows={4}
              placeholder="Write a quick message or note for Chirag..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-lg bg-yellow-200/50 border border-yellow-300 text-xs text-yellow-950 placeholder:text-yellow-700/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none font-sans leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-[10px] text-yellow-800 font-mono">
              {isPinned ? (
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <Check className="w-3 h-3" /> Note pinned to desk!
                </span>
              ) : (
                <span>Preserved locally in browser</span>
              )}
            </div>

            <button
              type="submit"
              disabled={!content.trim()}
              className="px-4 py-2 rounded-xl bg-yellow-900 hover:bg-yellow-950 text-yellow-100 font-mono text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Stick Note</span>
            </button>
          </div>
        </form>

        {/* Recent Pinned Notes */}
        {savedNotes.length > 0 && (
          <div className="mt-4 pt-3 border-t border-yellow-300/80 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-yellow-900 font-bold">
              <span>RECENT DESK NOTES ({savedNotes.length})</span>
              <button
                onClick={handleClearHistory}
                className="flex items-center gap-1 text-yellow-800 hover:text-red-700 cursor-pointer"
                title="Clear Notes"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {savedNotes.map((n) => (
                <div
                  key={n.id}
                  className="p-2 rounded-lg bg-yellow-200/80 border border-yellow-300 text-[11px] text-yellow-950"
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-yellow-800 font-semibold mb-0.5">
                    <span>{n.author}</span>
                    <span>{n.timestamp}</span>
                  </div>
                  <p className="line-clamp-2 leading-tight">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

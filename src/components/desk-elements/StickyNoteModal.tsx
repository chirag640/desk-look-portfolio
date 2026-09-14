"use client";

import { useState } from "react";
import { X, Sparkles, Trash2, Pin, Check } from "lucide-react";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface SavedNote {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export const StickyNoteModal: React.FC = () => {
  const { isStickyNoteOpen, setStickyNoteOpen } = useAtmosphereStore();
  const { windows, closeWindow } = useWindowManager();
  const { playPaperRustle, playClick } = useSoundEffects();

  const isOpen = isStickyNoteOpen || windows.notes.isOpen;

  const handleClose = () => {
    playClick();
    setStickyNoteOpen(false);
    closeWindow("notes");
  };

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("chirag_desk_sticky_notes");
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return [];
  });
  const [isPinned, setIsPinned] = useState(false);

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

  if (!isOpen) return null;

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
        <div className="flex items-center justify-between border-b border-yellow-300/80 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 shadow-inner">
              <Pin className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-yellow-950 tracking-tight font-mono">
                DESK SCRATCHPAD · 3M NOTE
              </h3>
              <p className="text-[10px] text-yellow-800/80 font-mono">
                Pinned to walnut studio desk · Gandhinagar
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-yellow-300/80 hover:bg-yellow-400 text-yellow-900 flex items-center justify-center transition-colors cursor-pointer"
            title="Close Note"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── CHIRAG'S HANDWRITTEN WELCOME GREETING ── */}
        <div className="p-3.5 mb-3.5 rounded-xl bg-yellow-300/50 border border-yellow-400/60 shadow-sm relative overflow-hidden">
          <p className="font-handwriting text-xl sm:text-2xl text-yellow-950 leading-relaxed drop-shadow-sm font-medium">
            &ldquo;Hey! Thanks for visiting my studio. Grab a coffee ☕, hit [Z] to view the display, or play some retro vinyl tracks. Feel free to leave a note or feedback below!&rdquo;
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-yellow-400/30 mt-2">
            <span className="text-[10px] font-mono text-yellow-800/70">3M Studio Desk Note</span>
            <span className="font-handwriting text-lg sm:text-xl text-yellow-900 font-bold tracking-wide">
              — Chirag ✍️
            </span>
          </div>
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
              rows={3}
              placeholder="Write your note or feedback for Chirag..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-lg bg-yellow-200/60 border border-yellow-300 text-base font-handwriting text-yellow-950 placeholder:text-yellow-800/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none leading-relaxed"
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

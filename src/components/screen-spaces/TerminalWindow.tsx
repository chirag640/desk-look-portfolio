"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, X, Minus, Square, Send } from "lucide-react";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useMusicStore, PLAYLISTS } from "@/hooks/useMusicStore";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "matrix";
  text: string;
}

export const TerminalWindow: React.FC = () => {
  const { isTerminalOpen, setTerminalOpen } = useAtmosphereStore();
  const { playClick, playThock } = useSoundEffects();
  const {
    activePlaylist,
    isPlaying,
    togglePlay,
    switchPlaylist,
    triggerNext,
    triggerPrev,
    setPlayerOpen
  } = useMusicStore();

  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "init-1",
      type: "system",
      text: "ChiragOS Terminal v2.6 [TCS Node Architecture Active]"
    },
    {
      id: "init-2",
      type: "system",
      text: "Type 'help' to inspect available commands, or 'music' to control the Vinyl Player."
    }
  ]);

  const [position, setPosition] = useState({ x: 60, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, posX: 60, posY: 50 });
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input on open
  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      setPosition({
        x: Math.max(10, Math.min(window.innerWidth - 650, dragStartRef.current.posX + dx)),
        y: Math.max(40, Math.min(window.innerHeight - 450, dragStartRef.current.posY + dy))
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [
      ...history,
      { id: String(Date.now()), type: "input", text: `chirag@tcs-node:~$ ${cmd}` }
    ];

    if (trimmed === "help") {
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `AVAILABLE COMMANDS:
  neofetch     - Display Chirag's engineering system specs
  skills       - Print verified technologies and frameworks
  blueprint    - Inspect flutter_blueprint (v3.0.0 on Pub.dev)
  repos        - List featured GitHub repositories (70 total)
  matrix       - Stream digital matrix telemetry
  music        - Studio Vinyl Player (Old Songs & English Chill)
  music next   - Skip to next track in playlist
  music prev   - Return to previous track in playlist
  music switch - Toggle between Retro Hindi & English Chill
  clear        - Clear terminal scrollback
  contact      - Direct email and LinkedIn endpoints
  exit         - Close terminal session`
      });
    } else if (trimmed === "neofetch") {
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `      __                 chirag@tcs-workstation
    /    \\               ----------------------
   | () () |             OS: ChiragOS v2.6 on Darwin x86_64
    \\  __ /              Host: Apple Studio Display 5K + MacBook Pro
     |  |                Role: Software Engineer @ TCS (Tata Consultancy Services)
    /    \\               Location: Gandhinagar, Gujarat, India
                         Education: B.Tech Computer Science & Engineering
                         Flagship: flutter_blueprint on Pub.dev (20★)
                         Public Repos: 70 Repositories on GitHub
                         Shell: zsh 5.9 with Starship prompt
                         Audio: Studio Vinyl Player (${PLAYLISTS[activePlaylist].name})
                         Uptime: 24/7 Production Ready`
      });
    } else if (trimmed === "skills") {
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `STACK & ARCHITECTURES:
  Mobile:      Flutter, Dart, Android Native, iOS Native, BLoC, Riverpod, Provider, GetX
  Full-Stack:  NestJS, Node.js, TypeScript, React, Next.js (App Router, Turbopack)
  Databases:   PostgreSQL, MySQL, Firebase, Firestore, MongoDB, Redis
  DevOps & CI: Docker, GitHub Actions, Pub.dev Package Publishing, Linux`
      });
    } else if (trimmed === "blueprint") {
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `PACKAGE: flutter_blueprint (v3.0.0)
Registry: https://pub.dev/packages/flutter_blueprint
Stars:    20 GitHub Stars
Overview: CLI generator to scaffold enterprise clean architecture apps in Flutter with
          pre-configured state management (BLoC/Riverpod/Provider/GetX) and CI pipelines.`
      });
    } else if (trimmed === "repos") {
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `TOP REPOSITORIES (GitHub: @chirag640):
  1. flutter_blueprint-Package   (20★) [Dart]    - Enterprise Flutter generator on Pub.dev
  2. FinFlow-Frontend            (6★)  [Dart]    - Personal & group finance mobile app
  3. FinFlow-Backend             (5★)  [TS]      - NestJS high-concurrency ledger service
  4. CollabStream                (4★)  [TS]      - Collaborative real-time canvas platform
  5. Flutter-splitWiseClone      (3★)  [Dart]    - Expense splitting with Firebase sync
  ... and 65 more public repositories.`
      });
    } else if (trimmed === "matrix") {
      newHistory.push({
        id: String(Date.now() + 1),
        type: "matrix",
        text: `01000011 01101000 01101001 01110010 01100001 01100111 
SYSTEM_OVERRIDE: ALL REPOSITORIES INJECTED. ENTERPRISE DEPLOYED.`
      });
    } else if (trimmed === "music next") {
      triggerNext();
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `⏭️ Studio Player: Skipped to next track in ${PLAYLISTS[activePlaylist].name}.`
      });
    } else if (trimmed === "music prev") {
      triggerPrev();
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `⏮️ Studio Player: Returning to previous track.`
      });
    } else if (trimmed === "music switch") {
      const nextPlaylist = activePlaylist === "retro_hindi" ? "english_chill" : "retro_hindi";
      switchPlaylist(nextPlaylist);
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `📻 Switched playlist to: ${PLAYLISTS[nextPlaylist].name} (${PLAYLISTS[nextPlaylist].badge}).`
      });
    } else if (trimmed === "music" || trimmed === "lofi" || trimmed === "song" || trimmed === "play") {
      togglePlay();
      setPlayerOpen(true);
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `🎵 Studio Vinyl Player: ${!isPlaying ? "PLAYING" : "PAUSED"}
   Current Playlist: ${PLAYLISTS[activePlaylist].name}
   Options: 'music next', 'music prev', 'music switch'`
      });
    } else if (trimmed === "clear") {
      setHistory([]);
      return;
    } else if (trimmed === "contact") {
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `CONTACT ENDPOINTS:
  Email:    chiragchaudhary1910@gmail.com
  LinkedIn: https://www.linkedin.com/in/chiragchaudhary1910/
  GitHub:   https://github.com/chirag640`
      });
    } else if (trimmed === "exit") {
      setTerminalOpen(false);
      return;
    } else {
      newHistory.push({
        id: String(Date.now() + 1),
        type: "output",
        text: `zsh: command not found: ${cmd}. Type 'help' to see valid commands.`
      });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playThock();
    if (e.key === "Enter") {
      if (inputVal.trim()) {
        handleCommand(inputVal);
      }
      setInputVal("");
    }
  };

  if (!isTerminalOpen) return null;

  return (
    <div
      data-terminal-window="true"
      onWheel={(e) => e.stopPropagation()}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      className="absolute z-50 w-full max-w-[620px] rounded-xl border border-white/20 bg-[#0B0F19]/95 backdrop-blur-2xl shadow-2xl overflow-hidden font-mono text-xs flex flex-col select-text"
    >
      {/* Draggable Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-9 px-3 bg-[#131926] border-b border-white/10 flex items-center justify-between cursor-move select-none"
      >
        <div className="flex items-center gap-2">
          {/* Traffic light buttons */}
          <button
            onClick={() => {
              playClick();
              setTerminalOpen(false);
            }}
            className="w-3 h-3 rounded-full bg-[#EF4444] hover:brightness-125 transition-all flex items-center justify-center cursor-pointer"
            title="Close"
          >
            <X className="w-2 h-2 text-black/70" />
          </button>
          <button
            onClick={() => {
              playClick();
              setTerminalOpen(false);
            }}
            className="w-3 h-3 rounded-full bg-[#F59E0B] hover:brightness-125 transition-all flex items-center justify-center cursor-pointer"
            title="Minimize"
          >
            <Minus className="w-2 h-2 text-black/70" />
          </button>
          <button
            onClick={() => playClick()}
            className="w-3 h-3 rounded-full bg-[#10B981] hover:brightness-125 transition-all flex items-center justify-center cursor-pointer"
            title="Maximize"
          >
            <Square className="w-1.5 h-1.5 text-black/70" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>chirag@tcs-node: ~ (zsh)</span>
        </div>

        <div className="w-12 text-right">
          <span className="text-[10px] text-slate-500">v2.6</span>
        </div>
      </div>

      {/* Terminal Scrollback Output */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="p-4 h-[290px] overflow-y-auto space-y-2 text-slate-300 leading-relaxed font-mono"
      >
        {history.map((item) => {
          if (item.type === "input") {
            return (
              <div key={item.id} className="text-white font-semibold">
                <span className="text-[#38BDF8]">chirag@tcs-node</span>
                <span className="text-slate-500">:</span>
                <span className="text-[#A855F7]">~</span>
                <span className="text-slate-400">$</span> {item.text.replace("chirag@tcs-node:~$ ", "")}
              </div>
            );
          }
          if (item.type === "system") {
            return (
              <div key={item.id} className="text-slate-400">
                {item.text}
              </div>
            );
          }
          if (item.type === "matrix") {
            return (
              <div key={item.id} className="text-[#10B981] font-bold tracking-widest animate-pulse whitespace-pre-line">
                {item.text}
              </div>
            );
          }
          return (
            <div key={item.id} className="text-slate-300 whitespace-pre-line bg-black/30 p-2 rounded-lg border border-white/5">
              {item.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Line */}
      <div className="px-4 py-2.5 bg-[#0D1322] border-t border-white/10 flex items-center gap-2">
        <span className="text-[#38BDF8] font-bold">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'neofetch', 'skills'..."
          className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600 font-mono text-xs"
        />
        <button
          onClick={() => {
            if (inputVal.trim()) {
              handleCommand(inputVal);
              setInputVal("");
            }
          }}
          className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

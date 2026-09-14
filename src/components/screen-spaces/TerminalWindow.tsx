"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Terminal, X, Minus, Square, Send, Sparkles, Trophy, RefreshCw, Mail, ExternalLink } from "lucide-react";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useMusicStore, PLAYLISTS } from "@/hooks/useMusicStore";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "matrix" | "success";
  text: string;
}

export const TerminalWindow: React.FC = () => {
  const { isTerminalOpen, setTerminalOpen, keyboardSwitch } = useAtmosphereStore();
  const { windows, closeWindow, minimizeWindow, focusWindow } = useWindowManager();
  const { playClick, playThock } = useSoundEffects();

  const isOpen = isTerminalOpen || (windows.terminal?.isOpen && !windows.terminal?.isMinimized);
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
      text: "Type 'help' for commands, 'matrix' for digital rain, 'snake' to play, or 'hire chirag'."
    }
  ]);

  const [position, setPosition] = useState({ x: 60, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, posX: 60, posY: 50 });
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Easter Egg States
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isSnakeActive, setIsSnakeActive] = useState(false);
  const [isCelebrationActive, setIsCelebrationActive] = useState(false);

  // Auto-scroll terminal
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input on open
  useEffect(() => {
    if (isTerminalOpen && !isMatrixActive && !isSnakeActive) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen, isMatrixActive, isSnakeActive]);

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
  matrix       - Stream interactive falling green code digital rain
  snake        - Play mini arcade Snake game in the terminal
  hire chirag  - Celebrate and initiate hiring endpoints
  music        - Studio Vinyl Player (Old Songs & English Chill)
  music next   - Skip to next track in playlist
  music prev   - Return to previous track in playlist
  music switch - Toggle between Retro Hindi & English Chill
  clear        - Clear terminal scrollback
  contact      - Direct email and LinkedIn endpoints
  exit         - Close terminal session`
      });
    } else if (trimmed === "matrix") {
      setIsMatrixActive(true);
      return;
    } else if (trimmed === "snake" || trimmed === "play snake") {
      setIsSnakeActive(true);
      return;
    } else if (
      trimmed === "hire" ||
      trimmed === "hire chirag" ||
      trimmed === "hire me" ||
      trimmed === "offer"
    ) {
      setIsCelebrationActive(true);
      newHistory.push({
        id: String(Date.now() + 1),
        type: "success",
        text: `🎉 EXCELLENT DECISION! Chirag Chaudhary is available for software engineering roles.
→ Scaffolded enterprise clean architecture offer package.
→ Direct connection lines unlocked.`
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
    playThock(keyboardSwitch, e.key);
    if (e.key === "Enter") {
      if (inputVal.trim()) {
        handleCommand(inputVal);
      }
      setInputVal("");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ── DRAGGABLE TERMINAL ENCLOSURE ── */}
      <div
        data-terminal-window="true"
        onClick={() => focusWindow("terminal")}
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
                closeWindow("terminal");
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
                minimizeWindow("terminal");
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
            <span>
              {isMatrixActive
                ? "chirag@matrix: stream-telemetry"
                : isSnakeActive
                ? "chirag@arcade: snake-game.exe"
                : "chirag@tcs-node: ~ (zsh)"}
            </span>
          </div>

          <div className="w-12 text-right">
            <span className="text-[10px] text-slate-500">v2.6</span>
          </div>
        </div>

        {/* ── 1. MATRIX MODE VIEW ── */}
        {isMatrixActive ? (
          <MatrixRainView onExit={() => setIsMatrixActive(false)} />
        ) : isSnakeActive ? (
          /* ── 2. SNAKE ARCADE GAME VIEW ── */
          <SnakeGameView onExit={() => setIsSnakeActive(false)} />
        ) : (
          /* ── 3. STANDARD SHELL VIEW ── */
          <>
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
                if (item.type === "success") {
                  return (
                    <div
                      key={item.id}
                      className="text-emerald-300 font-bold bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg whitespace-pre-line shadow-sm"
                    >
                      {item.text}
                    </div>
                  );
                }
                return (
                  <div
                    key={item.id}
                    className="text-slate-300 whitespace-pre-line bg-black/30 p-2 rounded-lg border border-white/5"
                  >
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
                placeholder="type 'help', 'matrix', 'snake', 'hire chirag'..."
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
          </>
        )}
      </div>

      {/* ── 4. CELEBRATION CONFETTI OVERLAY MODAL ── */}
      {isCelebrationActive && (
        <CelebrationConfettiModal onClose={() => setIsCelebrationActive(false)} />
      )}
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   EASTER EGG 1: MATRIX DIGITAL RAIN CANVAS
   ───────────────────────────────────────────────────────────── */
const MatrixRainView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 320;

    const chars = "0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(11, 15, 25, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10B981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillStyle = Math.random() > 0.88 ? "#FFFFFF" : "#10B981";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "q" || e.key === "Escape") {
        onExit();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onExit]);

  return (
    <div className="relative h-[326px] bg-[#0B0F19] flex flex-col items-center justify-between p-2 overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 w-full flex items-center justify-between p-2 bg-black/70 backdrop-blur-md rounded-lg border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
        <span className="flex items-center gap-1.5 font-bold">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          DIGITAL MATRIX OVERRIDE · CHIRAG.IO
        </span>
        <button
          onClick={onExit}
          className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-white font-bold border border-emerald-500/40 cursor-pointer"
        >
          Exit [ESC / Q]
        </button>
      </div>
      <div className="relative z-10 text-[10px] text-emerald-400/80 font-mono pb-1">
        Press &apos;Q&apos; or ESC to return to shell
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   EASTER EGG 2: MINI ARCADE SNAKE GAME
   ───────────────────────────────────────────────────────────── */
const SnakeGameView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { playThock, playClick } = useSoundEffects();
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 10, y: 7 },
    { x: 9, y: 7 },
    { x: 8, y: 7 }
  ]);
  const [dir, setDir] = useState<{ x: number; y: number }>({ x: 1, y: 0 });
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 14, y: 7 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("chirag_snake_highscore");
        if (saved) return parseInt(saved, 10);
      } catch {}
    }
    return 0;
  });
  const [gameOver, setGameOver] = useState(false);

  const COLS = 24;
  const ROWS = 13;

  const spawnFood = useCallback((currentSnake: { x: number; y: number }[]) => {
    let newFood = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    while (currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y)) {
      newFood = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    }
    return newFood;
  }, [COLS, ROWS]);

  const resetGame = () => {
    playClick();
    setSnake([
      { x: 10, y: 7 },
      { x: 9, y: 7 },
      { x: 8, y: 7 }
    ]);
    setDir({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setFood({ x: 15, y: 7 });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key.toLowerCase() === "q") {
        onExit();
        return;
      }
      if (gameOver) {
        if (e.key === " " || e.key === "Enter") {
          resetGame();
        }
        return;
      }

      if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        playThock(undefined, e.key);
        if (dir.y === 0) setDir({ x: 0, y: -1 });
      } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        playThock(undefined, e.key);
        if (dir.y === 0) setDir({ x: 0, y: 1 });
      } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        playThock(undefined, e.key);
        if (dir.x === 0) setDir({ x: -1, y: 0 });
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        playThock(undefined, e.key);
        if (dir.x === 0) setDir({ x: 1, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dir, gameOver, onExit]);

  // Game Tick Loop
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { x: prevSnake[0].x + dir.x, y: prevSnake[0].y + dir.y };

        // Wall collision
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Eat food
        if (head.x === food.x && head.y === food.y) {
          playThock();
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              try {
                localStorage.setItem("chirag_snake_highscore", String(nextScore));
              } catch {}
            }
            return nextScore;
          });
          setFood(spawnFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 115);

    return () => clearInterval(interval);
  }, [dir, food, gameOver, highScore, playThock, spawnFood, COLS, ROWS]);

  return (
    <div className="relative h-[326px] bg-[#0A0E17] flex flex-col justify-between p-3 select-none font-mono">
      {/* Game Header */}
      <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10 text-slate-300">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>Score: {score}</span>
          </span>
          <span className="text-slate-400">High: {highScore}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 hidden sm:inline">Use Arrow keys or WASD</span>
          <button
            onClick={onExit}
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] cursor-pointer"
          >
            Exit [Q]
          </button>
        </div>
      </div>

      {/* Snake Grid Canvas Arena */}
      <div className="relative flex-1 my-1 bg-black/60 rounded-lg border border-white/10 overflow-hidden flex items-center justify-center">
        <div
          className="grid gap-[2px] p-2"
          style={{
            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
            width: "100%",
            height: "100%"
          }}
        >
          {Array.from({ length: ROWS }).map((_, r) =>
            Array.from({ length: COLS }).map((_, c) => {
              const isHead = snake[0].x === c && snake[0].y === r;
              const isBody = snake.slice(1).some((s) => s.x === c && s.y === r);
              const isFood = food.x === c && food.y === r;

              return (
                <div
                  key={`${r}-${c}`}
                  className={`rounded-xs transition-colors ${
                    isHead
                      ? "bg-emerald-300 shadow-[0_0_8px_#34D399]"
                      : isBody
                      ? "bg-emerald-600"
                      : isFood
                      ? "bg-rose-500 rounded-full animate-ping"
                      : "bg-white/[0.02]"
                  }`}
                />
              );
            })
          )}
        </div>

        {/* Game Over Banner */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-2 text-center p-4">
            <h4 className="text-rose-400 font-bold text-base tracking-tight">GAME OVER!</h4>
            <p className="text-xs text-slate-300">
              Final Score: <span className="text-emerald-400 font-bold">{score}</span>
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={resetGame}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Play Again (Space)</span>
              </button>
              <button
                onClick={onExit}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer"
              >
                Exit [Q]
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
        <span>Controls: Arrow Keys / WASD · Q to quit</span>
        <span className="text-emerald-500/80 font-bold">ChiragOS Arcade</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   EASTER EGG 3: HIRE CHIRAG CELEBRATION CONFETTI MODAL
   ───────────────────────────────────────────────────────────── */
const CelebrationConfettiModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Confetti particles
    const colors = ["#F59E0B", "#38BDF8", "#10B981", "#EC4899", "#A855F7", "#F43F5E", "#FBBF24"];
    const particles = Array.from({ length: 140 }).map(() => ({
      x: canvas.width * 0.5 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 14,
      vy: -10 - Math.random() * 12,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      gravity: 0.35 + Math.random() * 0.15,
      drag: 0.985
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Celebratory Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg rounded-2xl bg-gradient-to-br from-[#131B2E] via-[#0E1526] to-[#0A0E1A] p-6 sm:p-8 border-2 border-amber-400/50 shadow-[0_20px_70px_rgba(245,158,11,0.3)] text-white select-none text-center space-y-4"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 mx-auto flex items-center justify-center shadow-inner">
          <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
            🎉 EXCELLENT DECISION!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            You&apos;re taking the first step to add a high-caliber software engineer to your engineering team.
          </p>
        </div>

        {/* Credentials Pill */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left font-mono text-xs space-y-1 text-slate-300">
          <div className="flex items-center justify-between text-emerald-400 font-bold">
            <span>CHIRAG CHAUDHARY</span>
            <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">TCS Software Engineer</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Enterprise Clean Architecture (Flutter &amp; NestJS) · flutter_blueprint author (20★) · 70 Repositories
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 font-mono text-xs">
          <a
            href="mailto:chiragchaudhary1910@gmail.com?subject=Software%20Engineering%20Opportunity%20-%20Chirag%20Chaudhary&body=Hi%20Chirag,%0A%0AWe%20explored%20your%203D%20interactive%20portfolio%20and%20would%20love%20to%20connect%20regarding%20an%20engineering%20opportunity."
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Email Chirag</span>
          </a>

          <a
            href="https://www.linkedin.com/in/chiragchaudhary1910/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>LinkedIn Profile</span>
          </a>
        </div>

        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer pt-2 block mx-auto font-mono"
        >
          [ Dismiss Celebration ]
        </button>
      </div>
    </div>
  );
};

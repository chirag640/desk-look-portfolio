"use client";

import React, { useState } from "react";
import {
  Code2,
  Play,
  GitBranch,
  GitCommit,
  Star,
  ExternalLink,
  Terminal,
  Cpu,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const SAMPLE_DART_CODE = `import 'package:flutter_blueprint/core.dart';

void main() async {
  // Chirag's enterprise clean architecture engine
  final app = BlueprintScaffolder(
    appName: 'ChiragFintech',
    architecture: Architecture.clean,
    stateManagement: StateManager.bloc,
    offlineDatabase: DatabaseType.drift,
    strictNullSafety: true,
  );

  print('⚡ Initializing enterprise clean architecture...');
  await app.generateDomainLayer();
  await app.bindDioInterceptor(securityToken: 'AES-256');
  print('✓ Scaffold complete: Production ready.');
}`;

export const MacBookScreenContent: React.FC = () => {
  const { cameraView, setCameraView, keyboardSwitch } = useAtmosphereStore();
  const { playClick, playThock } = useSoundEffects();

  const [activeTab, setActiveTab] = useState<"playground" | "github">("playground");
  const [code, setCode] = useState(SAMPLE_DART_CODE);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "ChiragOS Dart Runtime v3.4.2 [Sidecar Host]",
    "Type or edit code above and click 'Run Code' to execute."
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    playThock(keyboardSwitch);
    setIsRunning(true);
    setTerminalOutput([
      "Compiling Dart engine...",
      "Resolving package:flutter_blueprint (v3.0.0 on Pub.dev)...",
      "Analyzing clean architecture entity bindings...",
      "✓ 0 errors, 0 warnings. Strict null safety passed.",
      "⚡ Initializing enterprise clean architecture...",
      "→ Scaffolded Domain Entities: [User, Wallet, TransactionLedger]",
      "→ Injected BLoC State Handlers: [AuthBloc, WalletBloc]",
      "→ Bound Dio Client with TLS pinning & interceptors.",
      "✓ Scaffold complete: Production ready in 0.38s."
    ]);
    setTimeout(() => setIsRunning(false), 600);
  };

  const handleReturn = () => {
    playClick();
    setCameraView("screen");
  };

  if (cameraView !== "macbook") return null;

  return (
    <div
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/60 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300"
    >
      {/* MacBook Pro 16:10 Display Enclosure */}
      <div className="relative w-full max-w-4xl h-[86vh] max-h-[760px] rounded-2xl bg-[#0F1420] border-2 border-slate-700 shadow-2xl flex flex-col overflow-hidden text-white font-sans select-none">
        {/* Top Display Bezel Notch & Header */}
        <div className="h-10 px-4 bg-[#141A28] border-b border-white/10 flex items-center justify-between font-mono text-xs">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReturn}
              className="w-3 h-3 rounded-full bg-[#EF4444] hover:brightness-125 transition-all flex items-center justify-center cursor-pointer"
              title="Close Sidecar"
            />
            <button
              onClick={handleReturn}
              className="w-3 h-3 rounded-full bg-[#F59E0B] hover:brightness-125 transition-all flex items-center justify-center cursor-pointer"
              title="Minimize"
            />
            <button
              onClick={() => playClick()}
              className="w-3 h-3 rounded-full bg-[#10B981] hover:brightness-125 transition-all flex items-center justify-center cursor-pointer"
              title="Maximize"
            />
          </div>

          {/* Notch & Title */}
          <div className="flex items-center gap-2">
            <span className="w-16 h-3 bg-black rounded-b-md mx-auto absolute top-0 left-1/2 -translate-x-1/2 border-b border-white/20" />
            <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="font-bold text-slate-200 hidden sm:inline">
              MacBook Pro M3 Max · Sidecar Terminal
            </span>
          </div>

          {/* Return Button */}
          <button
            onClick={handleReturn}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Studio Display [Z]</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111723] border-b border-white/10 font-mono text-xs">
          <button
            onClick={() => {
              playClick();
              setActiveTab("playground");
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "playground"
                ? "bg-[#0284C7]/20 border border-[#38BDF8]/40 text-[#38BDF8] font-bold shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Dart Code Playground</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveTab("github");
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "github"
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>GitHub Commit Stream (@chirag640)</span>
          </button>
        </div>

        {/* Tab Content 1: Code Playground */}
        {activeTab === "playground" && (
          <div className="flex-1 flex flex-col p-4 space-y-3 overflow-hidden font-mono">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-bold">flutter_blueprint_example.dart</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  v3.0.0
                </span>
              </div>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isRunning ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <Play className="w-3 h-3 fill-black" />
                )}
                <span>Run Code</span>
              </button>
            </div>

            {/* Live Editor */}
            <div className="flex-1 rounded-xl bg-[#090D15] border border-white/10 p-3 overflow-hidden flex flex-col">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={() => playThock(keyboardSwitch)}
                className="w-full h-full bg-transparent text-slate-200 font-mono text-xs leading-relaxed outline-none resize-none selection:bg-[#0284C7]/40"
                spellCheck={false}
              />
            </div>

            {/* Simulated Terminal Output Console */}
            <div className="h-36 rounded-xl bg-black/80 border border-white/10 p-3 overflow-y-auto text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] pb-1 border-b border-white/5">
                <Terminal className="w-3 h-3 text-[#38BDF8]" />
                <span>TERMINAL OUTPUT CONSOLE</span>
              </div>
              {terminalOutput.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("✓")
                      ? "text-emerald-400 font-bold"
                      : line.startsWith("⚡") || line.startsWith("→")
                      ? "text-sky-300"
                      : "text-slate-400"
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 2: Real-Time GitHub Tracker */}
        {activeTab === "github" && (
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {/* User Profile Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-emerald-400 text-lg">
                  CC
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Chirag Chaudhary</span>
                    <span className="text-xs font-mono text-slate-400">(@chirag640)</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Software Engineer @ TCS · 70 Public Repositories
                  </p>
                </div>
              </div>

              <a
                href="https://github.com/chirag640"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors cursor-pointer"
              >
                <span>View GitHub Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Live Commit Stream */}
            <div className="space-y-2">
              <h5 className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Repository Commit Stream</span>
              </h5>

              <div className="space-y-2">
                {[
                  {
                    repo: "flutter_blueprint-Package",
                    badge: "20★ on GitHub",
                    badgeColor: "#EAB308",
                    msg: "feat: add automated Riverpod & BLoC state scaffolders (v3.0.0 on Pub.dev)",
                    hash: "89d938d",
                    time: "Recently released"
                  },
                  {
                    repo: "FinFlow-Backend",
                    badge: "NestJS / TS",
                    badgeColor: "#10B981",
                    msg: "refactor: optimize high-concurrency ledger double-entry transaction locks",
                    hash: "a4f2109",
                    time: "Production verified"
                  },
                  {
                    repo: "CollabStream",
                    badge: "React / WebSocket",
                    badgeColor: "#38BDF8",
                    msg: "feat: real-time multi-cursor canvas synchronization over WebSocket protocol",
                    hash: "c29e18b",
                    time: "Verified build"
                  },
                  {
                    repo: "Flutter-splitWiseClone",
                    badge: "Flutter / Firebase",
                    badgeColor: "#F43F5E",
                    msg: "fix: optimistic balance calculation with Firebase offline sync",
                    hash: "e771a44",
                    time: "Clean architecture"
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white">
                          {item.repo}
                        </span>
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border"
                          style={{
                            color: item.badgeColor,
                            borderColor: `${item.badgeColor}40`,
                            backgroundColor: `${item.badgeColor}15`
                          }}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{item.msg}</p>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 shrink-0">
                      <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/5 text-[#38BDF8]">
                        #{item.hash}
                      </span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated GitHub Contribution Graph */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>2026 Developer Commit Contributions</span>
                <span className="text-emerald-400 font-bold">540+ Commits this year</span>
              </div>
              <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 pt-1">
                {Array.from({ length: 72 }).map((_, i) => {
                  const level = (i * 7) % 5;
                  const bg =
                    level === 0
                      ? "bg-white/5"
                      : level === 1
                      ? "bg-emerald-950"
                      : level === 2
                      ? "bg-emerald-800"
                      : level === 3
                      ? "bg-emerald-600"
                      : "bg-emerald-400";
                  return <div key={i} className={`h-2.5 rounded-xs ${bg}`} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

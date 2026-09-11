"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DesktopWorkspaceProps {
  progress: number;
  isMobile?: boolean;
}

export const DesktopWorkspace: React.FC<DesktopWorkspaceProps> = ({ progress, isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ambientScreenBar = useRef<THREE.PointLight>(null);

  // 1. Procedural High-Res Texture for Curved Ultrawide Display (Main Center)
  const ultrawideTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Dark sleek desktop gradient wallpaper
    const grad = ctx.createLinearGradient(0, 0, 1600, 720);
    grad.addColorStop(0, "#0B0F19");
    grad.addColorStop(0.5, "#161D2F");
    grad.addColorStop(1, "#1E1838");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1600, 720);

    // Subtle wallpaper geometric grid lines
    ctx.strokeStyle = "rgba(91, 141, 239, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 1600; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 720);
      ctx.stroke();
    }
    for (let y = 0; y < 720; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1600, y);
      ctx.stroke();
    }

    // Top OS Menu Bar
    ctx.fillStyle = "rgba(18, 22, 34, 0.85)";
    ctx.fillRect(0, 0, 1600, 44);
    ctx.fillStyle = "#63C58A";
    ctx.beginPath();
    ctx.arc(36, 22, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("ChiragOS v2.6.0  •  TCS Workstation", 54, 27);

    ctx.fillStyle = "#94A3B8";
    ctx.font = "14px monospace";
    ctx.fillText("Kernel: ACTIVE · Flutter 3.29 · Dart 3.7 · NestJS 10.4", 950, 27);
    ctx.fillText("22:18 IST", 1510, 27);

    // Left Window Mockup: Architecture Overview
    ctx.fillStyle = "rgba(23, 28, 44, 0.92)";
    ctx.roundRect(80, 80, 680, 560, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Title bar
    ctx.fillStyle = "rgba(35, 42, 64, 0.8)";
    ctx.roundRect(80, 80, 680, 44, [16, 16, 0, 0]);
    ctx.fill();
    // Traffic dots
    ctx.fillStyle = "#FF5F56";
    ctx.beginPath();
    ctx.arc(106, 102, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFBD2E";
    ctx.beginPath();
    ctx.arc(126, 102, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#27C93F";
    ctx.beginPath();
    ctx.arc(146, 102, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#E2E8F0";
    ctx.font = "bold 14px monospace";
    ctx.fillText("Chirag Chaudhary — System Profile", 180, 107);

    // Content inside Left Window
    ctx.fillStyle = "#5B8DEF";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("CHIRAG CHAUDHARY", 116, 175);
    ctx.fillStyle = "#94A3B8";
    ctx.font = "bold 15px monospace";
    ctx.fillText("Software Engineer · Tata Consultancy Services (TCS)", 116, 205);
    ctx.fillText("Gandhinagar, Gujarat, India  |  B.Tech CSE", 116, 230);

    ctx.fillStyle = "#CBD5E1";
    ctx.font = "14px sans-serif";
    ctx.fillText("• Creator of flutter_blueprint (Pub.dev package, v3.0.0, 20 GitHub stars)", 116, 275);
    ctx.fillText("• Lead Architect: FinFlow (Flutter + NestJS full-stack personal finance platform)", 116, 305);
    ctx.fillText("• 70 Public Software Repositories across Flutter, Mobile, and Web systems", 116, 335);

    // Status cards
    ctx.fillStyle = "rgba(59, 130, 246, 0.12)";
    ctx.roundRect(116, 370, 280, 100, 10);
    ctx.fill();
    ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
    ctx.stroke();
    ctx.fillStyle = "#93C5FD";
    ctx.font = "12px monospace";
    ctx.fillText("OPEN SOURCE FLAGSHIP", 132, 400);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 22px monospace";
    ctx.fillText("flutter_blueprint", 132, 432);
    ctx.fillStyle = "#34D399";
    ctx.font = "12px sans-serif";
    ctx.fillText("★ 20 Stars on GitHub · Pub.dev", 132, 455);

    ctx.fillStyle = "rgba(139, 92, 246, 0.12)";
    ctx.roundRect(420, 370, 300, 100, 10);
    ctx.fill();
    ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
    ctx.stroke();
    ctx.fillStyle = "#C4B5FD";
    ctx.font = "12px monospace";
    ctx.fillText("ENTERPRISE PROFILE", 436, 400);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px monospace";
    ctx.fillText("TCS Engineer", 436, 432);
    ctx.fillStyle = "#38BDF8";
    ctx.font = "12px sans-serif";
    ctx.fillText("Full-Stack Mobile & Web Systems", 436, 455);

    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.roundRect(116, 495, 604, 105, 10);
    ctx.fill();
    ctx.fillStyle = "#94A3B8";
    ctx.font = "13px monospace";
    ctx.fillText("$ git clone https://github.com/chirag640/flutter_blueprint-Package", 132, 530);
    ctx.fillText("$ dart pub add flutter_blueprint --dev", 132, 555);
    ctx.fillStyle = "#34D399";
    ctx.fillText("✓ Successfully installed flutter_blueprint v3.0.0 (Clean Architecture Ready)", 132, 580);

    // Right Window Mockup: Architecture Pipeline
    ctx.fillStyle = "rgba(19, 23, 36, 0.94)";
    ctx.roundRect(800, 80, 720, 560, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.stroke();

    ctx.fillStyle = "rgba(35, 42, 64, 0.8)";
    ctx.roundRect(800, 80, 720, 44, [16, 16, 0, 0]);
    ctx.fill();
    ctx.fillStyle = "#FF5F56";
    ctx.beginPath();
    ctx.arc(826, 102, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFBD2E";
    ctx.beginPath();
    ctx.arc(846, 102, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#27C93F";
    ctx.beginPath();
    ctx.arc(866, 102, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#E2E8F0";
    ctx.font = "bold 14px monospace";
    ctx.fillText("FinFlow Architecture — NestJS & Flutter Engine", 895, 107);

    // Code & diagrams
    const archLines = [
      { text: "// Full-Stack FinFlow Cloud Architecture", color: "#64748B" },
      { text: "import { Controller, Post, Body, UseGuards } from '@nestjs/common';", color: "#C084FC" },
      { text: "import { JwtAuthGuard, RolesGuard } from '@chirag/security';", color: "#C084FC" },
      { text: "", color: "" },
      { text: "@Controller('finflow/v1/sync')", color: "#60A5FA" },
      { text: "export class FinancialSyncController {", color: "#60A5FA" },
      { text: "  @Post('delta-envelope')", color: "#34D399" },
      { text: "  async syncMobileClient(@Body() payload: SyncPayloadDto) {", color: "#FBBF24" },
      { text: "    // Resolves CRDT offline expense graph from Flutter client", color: "#94A3B8" },
      { text: "    return this.syncService.processTransactions(payload);", color: "#38BDF8" },
      { text: "  }", color: "#34D399" },
      { text: "}", color: "#60A5FA" },
      { text: "", color: "" },
      { text: "// Reactive Flutter Consumer (BLoC / Riverpod)", color: "#64748B" },
      { text: "class ExpenseBloc extends Bloc<ExpenseEvent, ExpenseState> {", color: "#F472B6" },
      { text: "  void _onSyncRequested() => emit(ExpenseSynced(latencyMs: 14.2));", color: "#34D399" },
      { text: "}", color: "#F472B6" }
    ];

    archLines.forEach((line, idx) => {
      ctx.fillStyle = "#4B5563";
      ctx.font = "13px monospace";
      ctx.fillText(String(idx + 1).padStart(2, " "), 824, 160 + idx * 28);
      if (line.text) {
        ctx.fillStyle = line.color;
        ctx.font = "14px monospace";
        ctx.fillText(line.text, 860, 160 + idx * 28);
      }
    });

    // Floating OS Dock at bottom
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.roundRect(620, 660, 360, 48, 14);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.stroke();

    const dockIcons = ["#5B8DEF", "#8B6FE8", "#63C58A", "#F4C95D", "#F29A5A", "#E982B5"];
    dockIcons.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.roundRect(645 + i * 52, 670, 28, 28, 7);
      ctx.fill();
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  // 2. Procedural High-Res Texture for Vertical 27-inch Display (Mounted Right)
  const verticalTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 1120;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#0D1117";
    ctx.fillRect(0, 0, 640, 1120);

    // Top terminal bar
    ctx.fillStyle = "#161B22";
    ctx.fillRect(0, 0, 640, 52);
    ctx.fillStyle = "#58A6FF";
    ctx.font = "bold 16px monospace";
    ctx.fillText("TERMINAL & CODE RUNTIME (DART / TS)", 24, 32);

    // Code lines from flutter_blueprint
    const lines = [
      { text: "// flutter_blueprint CLI generator", color: "#8B949E" },
      { text: "import 'package:args/args.dart';", color: "#FF7B72" },
      { text: "import 'package:flutter_blueprint/core.dart';", color: "#FF7B72" },
      { text: "", color: "" },
      { text: "void main(List<String> arguments) async {", color: "#D2A8FF" },
      { text: "  final parser = ArgParser()", color: "#79C0FF" },
      { text: "    ..addOption('state',", color: "#FFA657" },
      { text: "        allowed: ['bloc', 'riverpod',", color: "#A5D6FF" },
      { text: "                  'provider', 'getx'])", color: "#A5D6FF" },
      { text: "    ..addFlag('clean-arch', defaultsTo: true)", color: "#FFA657" },
      { text: "    ..addFlag('ci-cd', defaultsTo: true);", color: "#FFA657" },
      { text: "", color: "" },
      { text: "  final results = parser.parse(arguments);", color: "#79C0FF" },
      { text: "  final engine = BlueprintEngine(results);", color: "#79C0FF" },
      { text: "  await engine.scaffoldProductionApp();", color: "#7EE787" },
      { text: "}", color: "#D2A8FF" },
      { text: "", color: "" },
      { text: "class BlueprintEngine {", color: "#79C0FF" },
      { text: "  Future<void> scaffoldProductionApp() async {", color: "#D2A8FF" },
      { text: "    stdout.writeln('Scaffolding BLoC layers...');", color: "#A5D6FF" },
      { text: "    await createDomainEntities();", color: "#7EE787" },
      { text: "    await createDataRepositories();", color: "#7EE787" },
      { text: "    await injectDioClient();", color: "#7EE787" },
      { text: "    stdout.writeln('✓ Scaffold verified');", color: "#7EE787" },
      { text: "  }", color: "#D2A8FF" },
      { text: "}", color: "#79C0FF" },
      { text: "", color: "" },
      { text: "── TERMINAL OUTPUT ──────────────────", color: "#58A6FF" },
      { text: "$ pub global activate flutter_blueprint", color: "#E6EDF3" },
      { text: "Package flutter_blueprint is activated (v3.0.0).", color: "#7EE787" },
      { text: "$ flutter_blueprint create my_app --state bloc", color: "#E6EDF3" },
      { text: "Scaffolding Clean Architecture project...", color: "#79C0FF" },
      { text: "  ▸ Presentation Layer generated (4 widgets)", color: "#8B949E" },
      { text: "  ▸ Domain Layer contracts established", color: "#8B949E" },
      { text: "  ▸ Data Sources & Dio interceptors bound", color: "#8B949E" },
      { text: "✓ 100% tests passed. Ready to build.", color: "#7EE787" },
      { text: "$ git status", color: "#E6EDF3" },
      { text: "On branch main: Your branch is up to date.", color: "#7EE787" }
    ];

    lines.forEach((line, idx) => {
      ctx.fillStyle = line.color.startsWith("#") ? line.color : "#C9D1D9";
      ctx.font = "14px monospace";
      ctx.fillText(line.text, 24, 90 + idx * 28);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  // 3. Procedural High-Res Texture for MacBook Laptop Display (Mounted Left)
  const laptopTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, 960, 600);

    // Browser chrome bar
    ctx.fillStyle = "#1E293B";
    ctx.fillRect(0, 0, 960, 48);
    ctx.fillStyle = "#FF5F56";
    ctx.beginPath();
    ctx.arc(28, 24, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFBD2E";
    ctx.beginPath();
    ctx.arc(48, 24, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#27C93F";
    ctx.beginPath();
    ctx.arc(68, 24, 6, 0, Math.PI * 2);
    ctx.fill();

    // Browser URL bar
    ctx.fillStyle = "#334155";
    ctx.roundRect(100, 8, 760, 32, 6);
    ctx.fill();
    ctx.fillStyle = "#94A3B8";
    ctx.font = "13px monospace";
    ctx.fillText("https://chirag640.github.io/Flutter_Blueprint_Website", 120, 29);

    // Page Content: Flutter Blueprint Website
    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("flutter_blueprint", 48, 120);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("Enterprise CLI Generator for Flutter", 48, 155);

    ctx.fillStyle = "#94A3B8";
    ctx.font = "15px sans-serif";
    ctx.fillText("Scaffold Clean Architecture with BLoC, Riverpod, Provider, or GetX.", 48, 190);

    // Command block
    ctx.fillStyle = "#1E293B";
    ctx.roundRect(48, 220, 864, 80, 10);
    ctx.fill();
    ctx.fillStyle = "#F8FAFC";
    ctx.font = "17px monospace";
    ctx.fillText("dart pub global activate flutter_blueprint", 72, 268);

    // Feature cards
    ctx.fillStyle = "#1E293B";
    ctx.roundRect(48, 330, 270, 220, 10);
    ctx.fill();
    ctx.fillStyle = "#38BDF8";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Architecture Presets", 68, 370);
    ctx.fillStyle = "#94A3B8";
    ctx.font = "13px sans-serif";
    ctx.fillText("Preconfigured Clean", 68, 405);
    ctx.fillText("Architecture domain,", 68, 430);
    ctx.fillText("data & UI isolation.", 68, 455);

    ctx.fillStyle = "#1E293B";
    ctx.roundRect(345, 330, 270, 220, 10);
    ctx.fill();
    ctx.fillStyle = "#34D399";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Multi-State Options", 365, 370);
    ctx.fillStyle = "#94A3B8";
    ctx.font = "13px sans-serif";
    ctx.fillText("Full support for BLoC,", 365, 405);
    ctx.fillText("Riverpod, Provider,", 365, 430);
    ctx.fillText("and GetX patterns.", 365, 455);

    ctx.fillStyle = "#1E293B";
    ctx.roundRect(642, 330, 270, 220, 10);
    ctx.fill();
    ctx.fillStyle = "#C084FC";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("CI/CD Guardrails", 662, 370);
    ctx.fillStyle = "#94A3B8";
    ctx.font = "13px sans-serif";
    ctx.fillText("GitHub Actions pipelines", 662, 405);
    ctx.fillText("with automated tests,", 662, 430);
    ctx.fillText("linting and analysis.", 662, 455);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (ambientScreenBar.current) {
      ambientScreenBar.current.intensity = 1.4 + Math.sin(elapsed * 2.0) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* ── 1. WIDE EXECUTIVE WALNUT DESK ── */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.6, 0.09, 2.6]} />
        <meshStandardMaterial color="#E8E8E4" roughness={0.4} metalness={0.08} />
      </mesh>
      {/* Subtle chamfer border */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[5.64, 0.02, 2.64]} />
        <meshStandardMaterial color="#D3D4CE" roughness={0.6} />
      </mesh>

      {/* Desk Mat (Charcoal Microfiber) */}
      <mesh position={[0, 0.047, 0.25]} receiveShadow>
        <boxGeometry args={[3.2, 0.008, 1.4]} />
        <meshStandardMaterial color="#1E2024" roughness={0.8} />
      </mesh>
      {/* Desk Mat stitched rim */}
      <mesh position={[0, 0.047, 0.25]}>
        <boxGeometry args={[3.24, 0.004, 1.44]} />
        <meshStandardMaterial color="#374151" roughness={0.7} />
      </mesh>

      {/* ── 2. SCREEN 1: CURVED ULTRAWIDE DISPLAY (34-inch Center) ── */}
      <group position={[0, 1.05, -0.42]}>
        {/* Monitor Heavy Aluminum Base */}
        <mesh position={[0, -0.9, 0]} castShadow>
          <boxGeometry args={[0.7, 0.03, 0.4]} />
          <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.7} />
        </mesh>
        {/* Curved Stand Arm */}
        <mesh position={[0, -0.4, -0.08]} castShadow>
          <boxGeometry args={[0.1, 0.85, 0.08]} />
          <meshStandardMaterial color="#475569" roughness={0.25} metalness={0.75} />
        </mesh>

        {/* Curved Monitor Chassis */}
        <mesh castShadow>
          <boxGeometry args={[3.2, 1.45, 0.08]} />
          <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.3} />
        </mesh>

        {/* Ultrawide Display Surface */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[3.12, 1.38]} />
          {ultrawideTexture ? (
            <meshBasicMaterial map={ultrawideTexture} toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#0B0F19" emissive="#1E3A8A" roughness={0.2} />
          )}
        </mesh>

        {/* Sleek Minimalist ScreenBar Light Mounted to Top */}
        <group position={[0, 0.76, 0.05]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 1.2, 16]} />
            <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Downward light strip */}
          <pointLight
            ref={ambientScreenBar}
            position={[0, -0.15, 0.2]}
            intensity={1.5}
            distance={2.8}
            color="#FFF2D6"
          />
        </group>

        {/* Ambient Display Glow into Desk */}
        <pointLight position={[0, 0, 0.6]} intensity={0.7} distance={3.2} color="#60A5FA" />
      </group>

      {/* ── 3. SCREEN 2: VERTICAL 27-INCH MONITOR (Mounted to the Right) ── */}
      <group position={[1.85, 1.15, -0.22]} rotation={[0, -0.26, 0]}>
        {/* Monitor Stand Base */}
        <mesh position={[0, -1.0, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.25, 0.03, 24]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Stand Arm */}
        <mesh position={[0, -0.5, -0.05]} castShadow>
          <cylinderGeometry args={[0.035, 0.04, 0.9, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.25} metalness={0.75} />
        </mesh>

        {/* Vertical Monitor Chassis (Portrait Mode) */}
        <mesh castShadow>
          <boxGeometry args={[1.05, 1.85, 0.07]} />
          <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.3} />
        </mesh>

        {/* Vertical Screen Glass */}
        <mesh position={[0, 0, 0.038]}>
          <planeGeometry args={[0.98, 1.77]} />
          {verticalTexture ? (
            <meshBasicMaterial map={verticalTexture} toneMapped={false} />
          ) : (
            <meshStandardMaterial color="#0D1117" emissive="#0284C7" roughness={0.2} />
          )}
        </mesh>

        {/* Vertical Screen Glow */}
        <pointLight position={[0, 0, 0.4]} intensity={0.6} distance={2.4} color="#58A6FF" />
      </group>

      {/* ── 4. SCREEN 3: MACBOOK PRO ON ELEVATED STAND (Mounted Left) ── */}
      <group position={[-1.75, 0.55, 0.05]} rotation={[0, 0.32, 0]}>
        {/* Elevated Aluminum Laptop Stand */}
        <mesh position={[0, -0.15, 0]} castShadow>
          <boxGeometry args={[0.55, 0.28, 0.5]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* Laptop Bottom Case */}
        <mesh position={[0, 0.01, 0]} castShadow>
          <boxGeometry args={[1.0, 0.02, 0.68]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Laptop Keyboard Well */}
        <mesh position={[0, 0.022, 0.04]}>
          <boxGeometry args={[0.88, 0.005, 0.38]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>

        {/* Laptop Screen (Angled 112 degrees back) */}
        <group position={[0, 0.02, -0.34]} rotation={[-0.38, 0, 0]}>
          {/* Lid Chassis */}
          <mesh castShadow>
            <boxGeometry args={[1.0, 0.65, 0.015]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Laptop Screen Glass */}
          <mesh position={[0, 0, 0.009]}>
            <planeGeometry args={[0.96, 0.61]} />
            {laptopTexture ? (
              <meshBasicMaterial map={laptopTexture} toneMapped={false} />
            ) : (
              <meshStandardMaterial color="#0F172A" emissive="#38BDF8" roughness={0.15} />
            )}
          </mesh>
          <pointLight position={[0, 0, 0.3]} intensity={0.5} distance={1.8} color="#38BDF8" />
        </group>
      </group>

      {/* ── 5. MECHANICAL KEYBOARD & MOUSE ── */}
      {/* 75% Custom Mechanical Keyboard */}
      <group position={[0, 0.06, 0.45]} rotation={[-0.04, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.32, 0.028, 0.46]} />
          <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Keycaps */}
        <mesh position={[0, 0.018, 0]}>
          <boxGeometry args={[1.26, 0.012, 0.41]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
        {/* Soft RGB underglow */}
        <pointLight position={[0, 0.04, 0]} intensity={0.35} distance={0.8} color="#5B8DEF" />
      </group>

      {/* Ergonomic Mouse */}
      <group position={[1.0, 0.065, 0.45]}>
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.055, 0.12, 8, 16]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.15} />
        </mesh>
      </group>

      {/* Ceramic Coffee Mug / Developer Companion */}
      <group position={[-1.25, 0.12, 0.55]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.07, 0.065, 0.14, 20]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.15} />
        </mesh>
        {/* Mug Handle */}
        <mesh position={[-0.08, 0, 0]}>
          <torusGeometry args={[0.04, 0.012, 8, 16]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
};

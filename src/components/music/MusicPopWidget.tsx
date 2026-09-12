"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Radio,
  Disc3,
  X,
  Minus,
  Maximize2,
  Tv,
  ChevronDown,
  Sparkles,
  Music
} from "lucide-react";
import { useMusicStore, PLAYLISTS, PlaylistId } from "@/hooks/useMusicStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const MusicPopWidget: React.FC = () => {
  const {
    activePlaylist,
    isPlaying,
    isPlayerOpen,
    isMinimized,
    showVideoDrawer,
    volume,
    isMuted,
    currentTrackTitle,
    userHasInteracted,
    togglePlay,
    setIsPlaying,
    switchPlaylist,
    togglePlayerOpen,
    setPlayerOpen,
    toggleMinimize,
    toggleVideoDrawer,
    setVolume,
    toggleMute,
    commandTrigger,
    setUserHasInteracted
  } = useMusicStore();

  const { playClick } = useSoundEffects();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentPlaylist = PLAYLISTS[activePlaylist];

  // Helper to send postMessage commands to YouTube IFrame
  const postYTCommand = (func: string, args: any[] = []) => {
    if (!iframeRef.current?.contentWindow) return;
    try {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func,
          args
        }),
        "*"
      );
    } catch {
      // ignore
    }
  };

  // Handle command triggers from store (e.g. from 3D speakers, terminal, dock)
  useEffect(() => {
    if (commandTrigger.type === "none") return;

    if (commandTrigger.type === "play") {
      postYTCommand("playVideo");
    } else if (commandTrigger.type === "pause") {
      postYTCommand("pauseVideo");
    } else if (commandTrigger.type === "next") {
      postYTCommand("nextVideo");
    } else if (commandTrigger.type === "prev") {
      postYTCommand("previousVideo");
    } else if (commandTrigger.type === "switch") {
      // Reload iframe with the new playlist
      postYTCommand("loadPlaylist", [{ list: currentPlaylist.youtubePlaylistId, listType: "playlist" }]);
      postYTCommand("playVideo");
    }
  }, [commandTrigger, currentPlaylist.youtubePlaylistId]);

  // Sync volume with iframe
  useEffect(() => {
    if (isMuted) {
      postYTCommand("mute");
    } else {
      postYTCommand("unMute");
      postYTCommand("setVolume", [volume]);
    }
  }, [volume, isMuted]);

  // Listen to postMessage from YouTube iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        if (typeof e.data !== "string") return;
        const data = JSON.parse(e.data);
        if (data.event === "onReady") {
          setPlayerReady(true);
        } else if (data.event === "infoDelivery" && data.info) {
          if (data.info.playerState === 1) {
            setIsPlaying(true);
          } else if (data.info.playerState === 2) {
            setIsPlaying(false);
          }
          if (data.info.videoData?.title) {
            useMusicStore.getState().setCurrentTrackTitle(data.info.videoData.title);
          }
        }
      } catch {
        // ignore non-json messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setIsPlaying]);

  const handleTogglePlay = () => {
    playClick();
    setUserHasInteracted(true);
    if (!isPlaying) {
      postYTCommand("playVideo");
      setIsPlaying(true);
    } else {
      postYTCommand("pauseVideo");
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    playClick();
    setUserHasInteracted(true);
    postYTCommand("nextVideo");
    setIsPlaying(true);
  };

  const handlePrev = () => {
    playClick();
    setUserHasInteracted(true);
    postYTCommand("previousVideo");
    setIsPlaying(true);
  };

  const handleSwitchPlaylist = (pId: PlaylistId) => {
    playClick();
    switchPlaylist(pId);
  };

  // If player is minimized, show compact floating vinyl badge
  if (isMinimized) {
    return (
      <div
        data-music-popup="true"
        onClick={() => {
          playClick();
          toggleMinimize();
        }}
        className="fixed bottom-20 right-6 z-50 flex items-center gap-3 px-3 py-2 rounded-full bg-[#131926]/95 border border-white/20 shadow-2xl backdrop-blur-xl cursor-pointer group hover:scale-105 transition-all"
        title="Expand Music Player"
      >
        {/* Spinning mini vinyl */}
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-tr from-[#111] via-[#222] to-[#111] border-2 border-white/20 shadow-lg flex items-center justify-center relative overflow-hidden ${
            isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
          }`}
        >
          {/* Concentric vinyl groove lines */}
          <div className="absolute inset-1 rounded-full border border-white/10" />
          <div className="absolute inset-2 rounded-full border border-white/5" />
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold"
            style={{ backgroundColor: currentPlaylist.themeColor, color: "#000" }}
          >
            {activePlaylist === "retro_hindi" ? "📻" : "🎧"}
          </div>
        </div>

        <div className="flex flex-col pr-1">
          <span className="text-[11px] font-bold text-white flex items-center gap-1.5 font-mono">
            <span>{activePlaylist === "retro_hindi" ? "Old Hindi Songs" : "English Chill"}</span>
            {isPlaying && (
              <span className="flex items-center gap-0.5 ml-1">
                <span className="w-0.5 h-2 bg-[#F59E0B] animate-bounce" />
                <span className="w-0.5 h-3 bg-[#F59E0B] animate-pulse" />
                <span className="w-0.5 h-1.5 bg-[#F59E0B] animate-bounce" />
              </span>
            )}
          </span>
          <span className="text-[9px] text-slate-400 truncate max-w-[130px]">
            {isPlaying ? "Playing on Studio Speakers" : "Paused • Click to open"}
          </span>
        </div>
      </div>
    );
  }

  if (!isPlayerOpen) return null;

  return (
    <div
      data-music-popup="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed bottom-20 right-4 sm:right-8 z-50 w-[320px] sm:w-[350px] rounded-2xl bg-[#0D121E]/95 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden font-sans text-white transition-all select-none animate-in fade-in zoom-in-95 duration-200"
    >
      {/* ── TOP HEADER / MAC OS BAR ── */}
      <div className="h-9 px-3.5 bg-[#141B2D] border-b border-white/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <button
            onClick={() => {
              playClick();
              setPlayerOpen(false);
            }}
            className="w-3 h-3 rounded-full bg-[#EF4444] hover:brightness-125 transition-all flex items-center justify-center cursor-pointer"
            title="Close Player"
          >
            <X className="w-2 h-2 text-black/70" />
          </button>
          <button
            onClick={() => {
              playClick();
              toggleMinimize();
            }}
            className="w-3 h-3 rounded-full bg-[#F59E0B] hover:brightness-125 transition-all flex items-center justify-center cursor-pointer"
            title="Minimize to Disc"
          >
            <Minus className="w-2 h-2 text-black/70" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-slate-300 font-bold text-[11px]">
          <Disc3 className={`w-3.5 h-3.5 text-[#F59E0B] ${isPlaying ? "animate-spin" : ""}`} />
          <span>STUDIO VINYL PLAYER</span>
        </div>

        {/* Equalizer animation */}
        <div className="flex items-center gap-0.5 h-3">
          {isPlaying ? (
            <>
              <span className="w-0.5 h-2.5 bg-[#F59E0B] animate-bounce" />
              <span className="w-0.5 h-3.5 bg-[#F59E0B] animate-pulse" />
              <span className="w-0.5 h-2 bg-[#F59E0B] animate-bounce" />
            </>
          ) : (
            <span className="text-[10px] text-slate-500 font-mono">STANDBY</span>
          )}
        </div>
      </div>

      {/* ── PLAYLIST SELECTOR TABS ── */}
      <div className="p-2.5 bg-[#111726] border-b border-white/10 grid grid-cols-2 gap-1.5 text-xs font-mono">
        <button
          onClick={() => handleSwitchPlaylist("retro_hindi")}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            activePlaylist === "retro_hindi"
              ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 font-bold shadow-sm"
              : "bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <span>📻</span>
          <span className="truncate">Old Songs</span>
        </button>

        <button
          onClick={() => handleSwitchPlaylist("english_chill")}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            activePlaylist === "english_chill"
              ? "bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-sky-500/40 text-sky-300 font-bold shadow-sm"
              : "bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <span>🎧</span>
          <span className="truncate">English Chill</span>
        </button>
      </div>

      {/* ── MAIN BODY: ROTATING CIRCULAR VINYL DISC ── */}
      <div className="p-5 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent to-black/30">
        {/* Glow backdrop based on active theme */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none blur-3xl"
          style={{ backgroundColor: currentPlaylist.themeColor }}
        />

        {/* Circular Spinning Vinyl Record with Grooves and Album Art Badge */}
        <div className="relative my-2">
          {/* Vinyl Disc Body */}
          <div
            className={`w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[radial-gradient(ellipse_at_center,_#202020_0%,_#0d0d0d_70%,_#000000_100%)] ring-4 ring-black/80 shadow-[0_12px_35px_rgba(0,0,0,0.8)] border border-white/15 relative flex items-center justify-center overflow-hidden transition-transform ${
              isPlaying ? "animate-[spin_6s_linear_infinite]" : ""
            }`}
          >
            {/* Vinyl Concentric Sound Grooves */}
            <div className="absolute inset-2 rounded-full border border-white/5" />
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-6 rounded-full border border-white/5" />
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-10 rounded-full border border-white/5" />

            {/* Dynamic Vinyl Light Reflection Sheen */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.12)_45deg,transparent_90deg,transparent_180deg,rgba(255,255,255,0.12)_225deg,transparent_270deg)] pointer-events-none" />

            {/* Center Circular Album Art Thumbnail */}
            <div
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 shadow-2xl relative flex flex-col items-center justify-center text-center overflow-hidden border-2"
              style={{
                borderColor: currentPlaylist.themeColor,
                background:
                  activePlaylist === "retro_hindi"
                    ? "radial-gradient(circle, #78350F 0%, #451A03 60%, #1E0F04 100%)"
                    : "radial-gradient(circle, #0369A1 0%, #0C4A6E 60%, #082F49 100%)"
              }}
            >
              {/* Inner Vinyl Spindle Hole with Metallic Ring */}
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-white/40 shadow-inner z-20 flex items-center justify-center" />

              {/* Label Text */}
              <span className="text-[8px] font-black uppercase tracking-wider text-amber-200 mt-1 font-mono leading-none z-10">
                {activePlaylist === "retro_hindi" ? "OLD SONGS" : "CHILL HIT"}
              </span>
              <span className="text-[6px] text-white/70 font-mono z-10 leading-tight">
                {activePlaylist === "retro_hindi" ? "BOLLYWOOD" : "ENGLISH"}
              </span>
            </div>
          </div>

          {/* Tonearm Needle Visual */}
          <div
            className={`absolute -top-1 -right-2 w-14 h-12 pointer-events-none transition-transform duration-500 origin-top-right ${
              isPlaying ? "rotate-12" : "-rotate-12 opacity-60"
            }`}
          >
            <div className="w-1.5 h-10 bg-slate-300/80 rounded-full shadow-md ml-auto border border-black/40 rotate-[28deg]" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute top-0 right-0 shadow-md" />
          </div>
        </div>

        {/* Track / Playlist Information */}
        <div className="text-center mt-2 px-2 max-w-full">
          <div className="flex items-center justify-center gap-1.5">
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${currentPlaylist.themeColor}20`,
                color: currentPlaylist.themeColor,
                borderColor: `${currentPlaylist.themeColor}40`
              }}
            >
              {currentPlaylist.badge}
            </span>
          </div>

          <h4 className="text-sm font-bold text-white tracking-tight mt-1 truncate">
            {currentPlaylist.name}
          </h4>
          <p className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
            {currentPlaylist.subtitle}
          </p>
        </div>

        {/* Initial Click-to-Play Notice if not yet started */}
        {!userHasInteracted && !isPlaying && (
          <button
            onClick={handleTogglePlay}
            className="mt-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer animate-pulse"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Click to Start Old Songs</span>
          </button>
        )}

        {/* ── AUDIO CONTROLS (PREVIOUS, PLAY/PAUSE, NEXT) ── */}
        <div className="flex items-center justify-center gap-4 mt-3">
          {/* Previous Track */}
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="Previous Song"
          >
            <SkipBack className="w-4 h-4 fill-white" />
          </button>

          {/* Big Play / Pause Button */}
          <button
            onClick={handleTogglePlay}
            className="w-12 h-12 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all hover:scale-108 active:scale-95 cursor-pointer border"
            style={{
              backgroundColor: currentPlaylist.themeColor,
              borderColor: "#FFFFFF40",
              color: "#000000"
            }}
            title={isPlaying ? "Pause Song" : "Play Song"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current stroke-current" />
            ) : (
              <Play className="w-5 h-5 fill-current stroke-current ml-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="Next Song"
          >
            <SkipForward className="w-4 h-4 fill-white" />
          </button>
        </div>

        {/* ── VOLUME CONTROL & VIDEO TOGGLE ── */}
        <div className="w-full flex items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 flex-1">
            <button
              onClick={() => {
                playClick();
                toggleMute();
              }}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F59E0B]"
            />
          </div>

          {/* Toggle Video Drawer */}
          <button
            onClick={() => {
              playClick();
              toggleVideoDrawer();
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
              showVideoDrawer
                ? "bg-white/20 text-white font-bold"
                : "bg-white/5 text-slate-400 hover:text-white"
            }`}
            title="Toggle YouTube Video Frame"
          >
            <Tv className="w-3 h-3" />
            <span>{showVideoDrawer ? "Hide Video" : "Video"}</span>
          </button>
        </div>
      </div>

      {/* ── EXPANDABLE VIDEO DRAWER (SHOWING YOUTUBE IFRAME) ── */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 border-t border-white/10 bg-black ${
          showVideoDrawer ? "h-[185px]" : "h-0"
        }`}
      >
        <div className="w-full h-[185px]">
          {/* Video drawer frame space */}
        </div>
      </div>

      {/* ── PERMANENT BACKGROUND YOUTUBE HOST CONTAINER ── */}
      {/* 
        This iframe stays permanently in the viewport with valid dimensions (320x180)
        so browser/YouTube anti-background policies never pause the audio.
      */}
      <div
        className={`fixed transition-all duration-300 z-10 ${
          showVideoDrawer
            ? "bottom-[84px] right-4 sm:right-8 w-[320px] sm:w-[350px] h-[185px] pointer-events-auto opacity-100 shadow-2xl"
            : "bottom-20 right-4 sm:right-8 w-[320px] sm:w-[350px] h-[185px] pointer-events-none opacity-[0.005] -z-10"
        }`}
      >
        <iframe
          ref={iframeRef}
          key={activePlaylist}
          id="chirag-studio-youtube-player"
          src={
            currentPlaylist.seedVideoId
              ? `https://www.youtube.com/embed/${currentPlaylist.seedVideoId}?list=${currentPlaylist.youtubePlaylistId}&enablejsapi=1&autoplay=1`
              : `https://www.youtube.com/embed/videoseries?list=${currentPlaylist.youtubePlaylistId}&enablejsapi=1&autoplay=1`
          }
          allow="autoplay; encrypted-media; picture-in-picture"
          className="w-full h-full border-0 rounded-b-2xl"
          title="Chirag OS Studio Player"
          onLoad={() => {
            if (isPlaying || userHasInteracted) {
              setTimeout(() => {
                postYTCommand("playVideo");
                setIsPlaying(true);
              }, 400);
            }
          }}
        />
      </div>
    </div>
  );
};

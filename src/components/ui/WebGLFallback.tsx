import React from "react";
import { AlertTriangle } from "lucide-react";

export const WebGLFallbackNotice: React.FC = () => {
  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-40 max-w-md w-[90%] mx-auto px-4 py-2.5 rounded-xl bg-[#FFF9E6] border border-[#F4C95D66] text-[#8C6300] text-xs flex items-center gap-2.5 shadow-sm">
      <AlertTriangle className="w-4 h-4 shrink-0 text-[#E08A00]" />
      <span>
        3D hardware acceleration is unavailable. Running in high-performance 2D OS Mode.
      </span>
    </div>
  );
};

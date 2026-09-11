"use client";

import React from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  onClick,
  ...props
}) => {
  const { playClick } = useSoundEffects();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) onClick(e);
  };

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none rounded-xl active:scale-95 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8DEF] focus-visible:ring-offset-2";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5 font-semibold"
  }[size];

  const variantStyles = {
    primary:
      "bg-[#151515] text-[#FFFFFF] hover:bg-[#252525] shadow-sm hover:shadow",
    secondary:
      "bg-[#FFFFFF] text-[#151515] border border-[rgba(21,21,21,0.12)] hover:bg-[#F0F1EE] shadow-sm",
    outline:
      "bg-transparent text-[#151515] border border-[rgba(21,21,21,0.16)] hover:bg-[rgba(21,21,21,0.04)]",
    ghost:
      "bg-transparent text-[#6B6F73] hover:text-[#151515] hover:bg-[rgba(21,21,21,0.05)]"
  }[variant];

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "purple" | "cyan" | "green" | "orange" | "pink";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "sm",
  className = "",
  icon
}) => {
  const variantStyles = {
    default: "bg-[#F0F1EE] text-[#151515] border-[rgba(21,21,21,0.08)]",
    blue: "bg-[#5B8DEF14] text-[#3465C5] border-[#5B8DEF33]",
    purple: "bg-[#8B6FE814] text-[#6948CD] border-[#8B6FE833]",
    cyan: "bg-[#56C7D914] text-[#188B9E] border-[#56C7D933]",
    green: "bg-[#63C58A14] text-[#29834E] border-[#63C58A33]",
    orange: "bg-[#F29A5A14] text-[#B85712] border-[#F29A5A33]",
    pink: "bg-[#E982B514] text-[#B03C76] border-[#E982B533]"
  }[variant];

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3 py-1 text-xs font-semibold"
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles} ${sizeStyles} ${className} select-none transition-colors`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

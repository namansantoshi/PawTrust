"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const strokeWidth = size === "lg" ? "2px" : "1.2px";
  const shadowOffset = size === "lg" ? "3.5px" : "2.5px";

  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <span
        className={`${sizeClasses[size]} font-black tracking-tight`}
        style={{
          color: "#FF007A", // Vibrant Magenta/Pink from the image
          WebkitTextStroke: `${strokeWidth} black`,
          textShadow: `${shadowOffset} ${shadowOffset} 0px black`,
          fontFamily: '"Source Serif 4", "Merriweather", "Georgia", serif',
          fontStyle: "normal",
          display: "inline-block",
          transform: "skewX(-2deg)", // Slight slant matching the hand-drawn feel
        }}
      >
        PawTrust.in
      </span>
    </Link>
  );
}

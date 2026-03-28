"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { width: 120, height: 40 },
    md: { width: 160, height: 55 },
    lg: { width: 240, height: 85 },
  };

  const { width, height } = sizeMap[size];

  return (
    <Link href="/" className={`flex items-center group ${className}`}>
        <Image 
          src="/logo.png" 
          alt="PawTrust Logo" 
          width={width} 
          height={height}
          className="object-contain"
        />
    </Link>
  );
}

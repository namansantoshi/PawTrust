"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { width: 100, height: 35 },
    md: { width: 140, height: 48 },
    lg: { width: 220, height: 75 },
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

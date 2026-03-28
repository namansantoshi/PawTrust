"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { width: 90, height: 32 },
    md: { width: 130, height: 46 },
    lg: { width: 210, height: 75 },
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

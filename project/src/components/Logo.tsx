import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 2L2 9L16 16L30 9L16 2Z"
        fill="url(#gradient-1)"
        fillOpacity="0.8"
      />
      <path
        d="M2 9V23L16 30V16L2 9Z"
        fill="url(#gradient-2)"
        fillOpacity="0.6"
      />
      <path
        d="M30 9V23L16 30V16L30 9Z"
        fill="url(#gradient-3)"
        fillOpacity="0.4"
      />
      <defs>
        <linearGradient
          id="gradient-1"
          x1="2"
          y1="2"
          x2="30"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFE1" />
          <stop offset="1" stopColor="#7000FF" />
        </linearGradient>
        <linearGradient
          id="gradient-2"
          x1="2"
          y1="9"
          x2="16"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFE1" />
          <stop offset="1" stopColor="#7000FF" />
        </linearGradient>
        <linearGradient
          id="gradient-3"
          x1="30"
          y1="9"
          x2="16"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFE1" />
          <stop offset="1" stopColor="#7000FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
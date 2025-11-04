import React from "react";

type LogoProps = {
  className?: string;
  title?: string;
};

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8", title = "Typing Master" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f172a" />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="240" height="240" rx="28" fill="url(#lg)" />
      <rect x="36" y="76" width="184" height="80" rx="18" fill="#0b1220" stroke="#1f2937" strokeWidth="6" />
      <g fill="#0f1a2c" stroke="#334155" strokeWidth="4">
        <rect x="56" y="92" width="18" height="18" rx="3" />
        <rect x="78" y="92" width="18" height="18" rx="3" />
        <rect x="100" y="92" width="18" height="18" rx="3" />
        <rect x="122" y="92" width="18" height="18" rx="3" />
        <rect x="144" y="92" width="18" height="18" rx="3" />
        <rect x="166" y="92" width="18" height="18" rx="3" />
        <rect x="188" y="92" width="18" height="18" rx="3" />
      </g>
      <rect x="84" y="118" width="88" height="16" rx="4" fill="#0f1a2c" stroke="#334155" strokeWidth="4" />
      <path d="M128 56c0 16 10 18 10 28" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
      <g fill="#22c55e">
        <circle cx="98" cy="70" r="4" />
        <circle cx="158" cy="70" r="4" />
        <circle cx="138" cy="60" r="4" />
      </g>
      <path d="M86 178c-6 0-10-5-10-11v-17c0-7 6-12 13-12h5c7 0 13 5 13 12v5h42v-5c0-7 6-12 13-12h5c7 0 13 5 13 12v17c0 6-4 11-10 11h-15c-8 0-14-6-14-14v-4h-26v4c0 8-6 14-14 14H86z" fill="#0b2545" stroke="#22d3ee" strokeOpacity={0.25} />
    </svg>
  );
};

export default Logo;



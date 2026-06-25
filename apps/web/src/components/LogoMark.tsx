interface LogoMarkProps {
  className?: string;
  size?: number;
}

export default function LogoMark({ className = '', size = 42 }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      className={`cz-logo-mark ${className}`}
      role="img"
      aria-label="CodzHub Code Spark Mark"
    >
      <defs>
        <linearGradient id="czhSpark" x1="244" y1="258" x2="782" y2="762" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6D5BFF"/>
          <stop offset="0.43" stopColor="#2F7BFF"/>
          <stop offset="0.76" stopColor="#12D8FF"/>
          <stop offset="1" stopColor="#49F2A8"/>
        </linearGradient>
        <radialGradient id="czhGlow" cx="50%" cy="50%" r="58%">
          <stop offset="0" stopColor="#12D8FF" stopOpacity="0.42"/>
          <stop offset="0.48" stopColor="#2F7BFF" stopOpacity="0.18"/>
          <stop offset="1" stopColor="#6D5BFF" stopOpacity="0"/>
        </radialGradient>
        <filter id="softShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="28" stdDeviation="30" floodColor="#000000" floodOpacity="0.18"/>
        </filter>
      </defs>

      <circle cx="512" cy="512" r="338" fill="url(#czhGlow)" className="cz-logo-glow" opacity="0.48" />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#softShadow)">
        {/* Left angle bracket < */}
        <path
          d="M418 326 L248 512 L418 698"
          stroke="currentColor"
          strokeWidth="82"
          className="cz-logo-path cz-logo-bracket-left"
        />
        {/* Right angle bracket > */}
        <path
          d="M606 326 L776 512 L606 698"
          stroke="currentColor"
          strokeWidth="82"
          className="cz-logo-path cz-logo-bracket-right"
        />
        {/* Lightning Spark */}
        <path
          d="M570 316 L490 505 L548 505 L454 708"
          stroke="url(#czhSpark)"
          strokeWidth="74"
          className="cz-logo-path cz-logo-spark"
        />
      </g>
      <g opacity="0.22" fill="none" stroke="url(#czhSpark)" strokeWidth="22" strokeLinecap="round" className="cz-logo-outer-curves">
        <path d="M328 232 C430 170 592 170 696 232" className="cz-logo-curve-top" />
        <path d="M696 792 C590 854 432 854 328 792" className="cz-logo-curve-bottom" />
      </g>
      <circle cx="512" cy="512" r="22" fill="currentColor" opacity="0.94" className="cz-logo-dot-bg" />
      <circle cx="512" cy="512" r="10" fill="url(#czhSpark)" className="cz-logo-dot-fg" />
    </svg>
  );
}

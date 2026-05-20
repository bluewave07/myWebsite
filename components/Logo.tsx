'use client';
import { useId } from 'react';

export default function CloneLogo({ size = 52 }: { size?: number }) {
  const uid   = useId().replace(/:/g, '');
  const gMain = `lg-main-${uid}`;
  const gGlow = `lg-glow-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-2 -2 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Brand gradient */}
        <linearGradient id={gMain} x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#aa367c" />
          <stop offset="1" stopColor="#4a2fbd" />
        </linearGradient>
        {/* Soft inner glow */}
        <radialGradient id={gGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#aa367c" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4a2fbd" stopOpacity="0"    />
        </radialGradient>
      </defs>

      {/* ── Background fill glow ── */}
      <polygon
        points="26,2 47,14 47,38 26,50 5,38 5,14"
        fill={`url(#${gGlow})`}
      />

      {/* ── Outer hexagon ── */}
      <polygon
        points="26,2 47,14 47,38 26,50 5,38 5,14"
        stroke={`url(#${gMain})`}
        strokeWidth="1.5"
      />

      {/* ── Inner accent hexagon (dashed) ── */}
      <polygon
        points="26,9 41,18 41,34 26,43 11,34 11,18"
        stroke={`url(#${gMain})`}
        strokeWidth="0.7"
        strokeDasharray="3 2.5"
        opacity="0.40"
      />

      {/* ── Letter A — left leg ── */}
      <line
        x1="13" y1="42"
        x2="26" y2="11"
        stroke={`url(#${gMain})`}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* ── Letter A — right leg ── */}
      <line
        x1="39" y1="42"
        x2="26" y2="11"
        stroke={`url(#${gMain})`}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* ── Letter A — crossbar ── */}
      <line
        x1="17.8" y1="31"
        x2="34.2" y2="31"
        stroke={`url(#${gMain})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* ── Apex accent dot ── */}
      <circle cx="26" cy="11" r="2.2" fill={`url(#${gMain})`} />

      {/* ── Corner dots on outer hex vertices ── */}
      {([
        [26, 2], [47, 14], [47, 38], [26, 50], [5, 38], [5, 14],
      ] as [number, number][]).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill={`url(#${gMain})`} opacity="0.55" />
      ))}
    </svg>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';

const roles = ['Blockchain Enthusiast', 'QA Engineer', 'Software Developer', 'Tech Explorer'];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setDisplay(word.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === word.length) {
        setTimeout(() => setDeleting(true), pause);
      } else if (deleting && charIdx > 0) {
        setDisplay(word.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const PlanetScene = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Nebula glow behind */}
    <div
      className="absolute rounded-full"
      style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(123,47,247,0.25) 0%, rgba(241,7,163,0.1) 50%, transparent 70%)',
        animation: 'pulse-glow 4s ease-in-out infinite',
      }}
    />
    {/* Planet */}
    <div
      className="relative rounded-full"
      style={{
        width: 340, height: 340,
        background: 'radial-gradient(circle at 35% 35%, #9b59f5, #6b21a8 50%, #4a1272 100%)',
        boxShadow: '0 0 60px rgba(123,47,247,0.5), inset -30px -30px 60px rgba(0,0,0,0.4)',
      }}
    >
      {/* Planet ring */}
      <div
        className="absolute"
        style={{
          width: 480, height: 140,
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%) rotateX(75deg)',
          border: '2px solid rgba(180,100,255,0.4)',
          borderRadius: '50%',
          animation: 'spin-slow 12s linear infinite',
        }}
      />
      <div
        className="absolute"
        style={{
          width: 440, height: 120,
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%) rotateX(75deg)',
          border: '1px solid rgba(241,7,163,0.25)',
          borderRadius: '50%',
          animation: 'spin-slow 18s linear infinite reverse',
        }}
      />
    </div>

    {/* Floating astronaut */}
    <div
      className="absolute"
      style={{
        top: '8%', right: '12%',
        width: 120, height: 120,
        animation: 'float 4s ease-in-out infinite',
      }}
    >
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Helmet */}
        <circle cx="60" cy="38" r="26" fill="#e8e8f0" stroke="#c0b0e0" strokeWidth="2"/>
        <circle cx="60" cy="38" r="18" fill="#1a0a2e" opacity="0.8"/>
        {/* Visor reflection */}
        <ellipse cx="55" cy="32" rx="6" ry="4" fill="white" opacity="0.3" transform="rotate(-20 55 32)"/>
        {/* Body suit */}
        <rect x="38" y="60" width="44" height="38" rx="12" fill="#d0c8e8" stroke="#b0a0d0" strokeWidth="1.5"/>
        {/* Arms */}
        <rect x="18" y="62" width="22" height="14" rx="7" fill="#d0c8e8" stroke="#b0a0d0" strokeWidth="1.5" transform="rotate(-15 29 69)"/>
        <rect x="80" y="62" width="22" height="14" rx="7" fill="#d0c8e8" stroke="#b0a0d0" strokeWidth="1.5" transform="rotate(15 91 69)"/>
        {/* Gloves */}
        <circle cx="16" cy="73" r="7" fill="#f0e8ff" stroke="#c0a0f0" strokeWidth="1.5"/>
        <circle cx="104" cy="73" r="7" fill="#f0e8ff" stroke="#c0a0f0" strokeWidth="1.5"/>
        {/* Legs */}
        <rect x="42" y="94" width="16" height="20" rx="6" fill="#d0c8e8" stroke="#b0a0d0" strokeWidth="1.5"/>
        <rect x="62" y="94" width="16" height="20" rx="6" fill="#d0c8e8" stroke="#b0a0d0" strokeWidth="1.5"/>
        {/* Boots */}
        <rect x="40" y="108" width="20" height="10" rx="4" fill="#4a2080"/>
        <rect x="60" y="108" width="20" height="10" rx="4" fill="#4a2080"/>
        {/* Chest panel */}
        <rect x="50" y="68" width="20" height="16" rx="4" fill="#8b5cf6" opacity="0.6"/>
        <circle cx="60" cy="76" r="4" fill="#f107a3" opacity="0.8"/>
        {/* Backpack */}
        <rect x="56" y="58" width="16" height="20" rx="4" fill="#b8aad8" stroke="#a090c8" strokeWidth="1"/>
      </svg>
    </div>

    {/* Rocket */}
    <div
      className="absolute"
      style={{
        bottom: '15%', right: '5%',
        width: 50, height: 50,
        animation: 'float 6s ease-in-out infinite 1s',
        transform: 'rotate(45deg)',
      }}
    >
      <svg viewBox="0 0 50 50" fill="none">
        <path d="M25 5 L32 30 L25 26 L18 30 Z" fill="#ff6b6b" stroke="#ff4444" strokeWidth="1"/>
        <path d="M20 28 L15 38 L25 34 L35 38 L30 28 Z" fill="#ffd93d"/>
        <circle cx="25" cy="20" r="5" fill="#4ecdc4" stroke="#2ebdb4" strokeWidth="1"/>
        <path d="M18 28 L12 34 L18 32 Z" fill="#ff6b6b"/>
        <path d="M32 28 L38 34 L32 32 Z" fill="#ff6b6b"/>
        <ellipse cx="25" cy="36" rx="4" ry="6" fill="#ff6b35" opacity="0.8"/>
      </svg>
    </div>

    {/* Glowing orb top-left */}
    <div
      className="absolute"
      style={{
        top: '15%', left: '10%',
        width: 50, height: 50,
        background: 'radial-gradient(circle, rgba(100,200,255,0.9), rgba(50,100,255,0.5))',
        borderRadius: '50%',
        boxShadow: '0 0 30px rgba(100,200,255,0.7)',
        animation: 'pulse-glow 3s ease-in-out infinite',
      }}
    />

    {/* Scattered dots */}
    {[
      { t: '20%', l: '25%', s: 6 },
      { t: '60%', l: '8%', s: 4 },
      { t: '75%', l: '40%', s: 5 },
      { t: '30%', l: '85%', s: 4 },
      { t: '50%', l: '92%', s: 7 },
    ].map((d, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white/60"
        style={{ top: d.t, left: d.l, width: d.s, height: d.s }}
      />
    ))}
  </div>
);

export default function Hero() {
  const role = useTypewriter(roles);
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: 80 }}
    >
      {/* Background gradient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%', left: '-10%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(123,47,247,0.15) 0%, transparent 65%)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '5%', right: '-5%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(241,7,163,0.1) 0%, transparent 65%)',
          borderRadius: '50%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
        {/* Left: Text */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #7b2ff7, #f107a3)', maxWidth: 'fit-content' }}
          >
            Welcome to my Portfolio
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Hi! I&apos;m Abdulkadir
          </h1>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6" style={{ minHeight: '1.2em' }}>
            <span className="gradient-text">{role}</span>
            <span className="cursor-blink gradient-text">|</span>
          </h2>

          <p className="text-white/60 text-base leading-relaxed mb-4">
            ISTQB Certified Quality Engineer
          </p>
          <p className="text-white/60 text-base leading-relaxed mb-10">
            Enjoy learning new technologies and challenging concepts.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-white font-semibold text-base hover:gap-5 transition-all"
          >
            Let&apos;s Connect
            <span
              className="w-10 h-10 rounded-full border-2 border-white/70 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>
        </div>

        {/* Right: Planet scene */}
        <div
          className="relative w-full"
          style={{
            height: 500,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          }}
        >
          <PlanetScene />
        </div>
      </div>
    </section>
  );
}

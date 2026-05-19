'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const SolarSystem      = dynamic(() => import('./SolarSystem'),                       { ssr: false });
const ShaderBackground = dynamic(() => import('@/components/ui/shader-background'),   { ssr: false });

const ROLES = ['Blockchain Enthusiast', 'QA Engineer', 'Web Developer', 'Tech Explorer'];

function useTypewriter(words: string[], speed = 90, pause = 1600) {
  const [text, setText]     = useState('');
  const [wIdx, setWIdx]     = useState(0);
  const [cIdx, setCIdx]     = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word  = words[wIdx];
    const delay = deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!deleting && cIdx < word.length) {
        setText(word.slice(0, cIdx + 1)); setCIdx(c => c + 1);
      } else if (!deleting && cIdx === word.length) {
        setTimeout(() => setDeleting(true), pause);
      } else if (deleting && cIdx > 0) {
        setText(word.slice(0, cIdx - 1)); setCIdx(c => c - 1);
      } else {
        setDeleting(false); setWIdx(i => (i + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [cIdx, deleting, wIdx, words, speed, pause]);

  return text;
}

export default function CloneBanner() {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="home"
      style={{
        padding: '260px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Layer 0 – WebGL plasma shader */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <ShaderBackground />
      </div>

      {/* Layer 1 – Solar system (transparent canvas) */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <SolarSystem />
      </div>

      {/* Layer 2 – left-to-right veil so text is readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(18,18,18,0.92) 0%, rgba(18,18,18,0.55) 55%, rgba(18,18,18,0.05) 100%)',
          zIndex: 2,
        }}
      />

      {/* Layer 3 – content */}
      <div
        className="relative w-full px-6"
        style={{ zIndex: 3, maxWidth: 1140, margin: '0 auto' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text ──────────────────────────────────────────────── */}
          <div>
            {/* Tagline */}
            <div
              className="inline-block font-bold tracking-[0.8px] mb-4"
              style={{
                background: 'linear-gradient(90.21deg, rgba(170,54,124,.5) -5.91%, rgba(74,47,189,.5) 111.58%)',
                border: '1px solid rgba(255,255,255,0.5)',
                fontSize: 20,
                padding: '8px 10px',
              }}
            >
              Welcome to my Portfolio
            </div>

            <h1
              className="text-white font-bold"
              style={{ fontSize: 65, lineHeight: 1, letterSpacing: '0.8px', marginBottom: 20, display: 'block' }}
            >
              Hi! I&apos;m Abdulkadir
            </h1>

            <h2
              className="font-bold"
              style={{
                fontSize: 'clamp(30px, 3.5vw, 45px)',
                letterSpacing: '0.8px',
                lineHeight: 1.2,
                minHeight: '1.3em',
                background: 'linear-gradient(90.21deg, #aa367c -5.91%, #4a2fbd 111.58%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 20,
              }}
            >
              {role}
              <span
                className="cursor-blink"
                style={{ WebkitTextFillColor: 'white', color: 'white' }}
              >|</span>
            </h2>

            <p style={{ color: '#b8b8b8', fontSize: 18, letterSpacing: '0.8px', lineHeight: '1.5em', width: '96%' }}>
              ISTQB Certified Quality Engineer. Enjoy learning new technologies and challenging concepts.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center text-white font-bold group"
              style={{ fontSize: 20, letterSpacing: '0.8px', marginTop: 60 }}
            >
              Let&apos;s Connect
              <svg
                className="group-hover:ml-6 transition-all duration-300"
                style={{ marginLeft: 10, fontSize: 25 }}
                width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* ── Right: empty – solar system visible through ────────────── */}
          <div className="hidden lg:block" />

        </div>
      </div>
    </section>
  );
}

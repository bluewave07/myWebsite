'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Spotlight } from '@/components/ui/spotlight';

const SplineScene = dynamic(
  () => import('@/components/ui/splite').then(m => ({ default: m.SplineScene })),
  { ssr: false }
);

const ROLES = ['Blockchain Enthusiast', 'QA Engineer', 'Web Developer', 'Tech Explorer'];

function useTypewriter(words: string[], speed = 90, pause = 1600) {
  const [text, setText]         = useState('');
  const [wIdx, setWIdx]         = useState(0);
  const [cIdx, setCIdx]         = useState(0);
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

export default function Banner() {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ background: 'rgb(2, 2, 10)', minHeight: '100vh' }}
    >
      {/* Aceternity spotlight beam — animates in from upper-left */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full min-h-screen">
        {/* Left — portfolio content */}
        <div
          className="flex-1 flex flex-col justify-center relative z-10"
          style={{ padding: '120px 48px 80px' }}
        >
          <div
            className="inline-block font-bold tracking-[0.8px] mb-6"
            style={{
              background: 'linear-gradient(90.21deg, rgba(170,54,124,.5) -5.91%, rgba(74,47,189,.5) 111.58%)',
              border: '1px solid rgba(255,255,255,0.5)',
              fontSize: 18,
              padding: '7px 10px',
              width: 'fit-content',
            }}
          >
            Welcome to my Portfolio
          </div>

          <h1
            className="text-white font-bold"
            style={{ fontSize: 'clamp(40px, 5vw, 65px)', lineHeight: 1.05, letterSpacing: '0.8px', marginBottom: 20 }}
          >
            Hi! I&apos;m Abdulkadir
          </h1>

          <h2
            className="font-bold"
            style={{
              fontSize: 'clamp(26px, 3vw, 42px)',
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
            <span className="cursor-blink" style={{ WebkitTextFillColor: 'white', color: 'white' }}>|</span>
          </h2>

          <p style={{ color: '#b8b8b8', fontSize: 18, letterSpacing: '0.8px', lineHeight: '1.5em', maxWidth: 480, marginBottom: 48 }}>
            ISTQB Certified Quality Engineer. Enjoy learning new technologies and challenging concepts.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center text-white font-bold group"
            style={{ fontSize: 20, letterSpacing: '0.8px', width: 'fit-content' }}
          >
            Let&apos;s Connect
            <svg
              className="group-hover:ml-6 transition-all duration-300"
              style={{ marginLeft: 10 }}
              width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Right — Spline robot */}
        <div className="flex-1 relative hidden md:block">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

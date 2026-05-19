'use client';
import { useEffect, useRef, useState } from 'react';

const skills = [
  { label: 'Quality Assurance', percent: 95 },
  { label: 'Development', percent: 80 },
  { label: 'Blockchain', percent: 90 },
  { label: 'Testing Tools', percent: 88 },
  { label: 'DevOps', percent: 72 },
];

const RADIUS = 70;
const STROKE = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircularProgress({ percent, label, animate }: { percent: number; label: string; animate: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let start: number | null = null;
    const duration = 1200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCurrent(Math.round(percent * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animate, percent]);

  const offset = CIRCUMFERENCE - (current / 100) * CIRCUMFERENCE;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: RADIUS * 2 + 20, height: RADIUS * 2 + 20 }}>
        <svg width={RADIUS * 2 + 20} height={RADIUS * 2 + 20}>
          <defs>
            <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7b2ff7" />
              <stop offset="100%" stopColor="#f107a3" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx={RADIUS + 10}
            cy={RADIUS + 10}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={STROKE}
          />
          {/* Progress */}
          <circle
            cx={RADIUS + 10}
            cy={RADIUS + 10}
            r={RADIUS}
            fill="none"
            stroke={`url(#grad-${label})`}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${RADIUS + 10} ${RADIUS + 10})`}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{current}%</span>
        </div>
      </div>
      <span className="text-white/70 text-sm font-medium text-center">{label}</span>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const prev = () => setActive(a => (a - 1 + skills.length) % skills.length);
  const next = () => setActive(a => (a + 1) % skills.length);

  const visibleSkills = [
    skills[(active - 1 + skills.length) % skills.length],
    skills[active],
    skills[(active + 1) % skills.length],
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-28 overflow-hidden"
    >
      {/* Gradient fade top */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(123,47,247,0.15), transparent)' }}
      />

      <div
        className="max-w-5xl mx-auto px-6 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <h2 className="text-4xl font-bold mb-4">Skills</h2>
        <p className="text-white/50 text-sm mb-16 max-w-lg mx-auto">
          Technology fancier &amp; Quality assurance provider &amp; Blockchain enthusiast.<br />
          Technical and analytical skills
        </p>

        <div className="relative flex items-center justify-center gap-12">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="flex items-center gap-10 sm:gap-16">
            {visibleSkills.map((s, i) => (
              <div
                key={s.label}
                style={{
                  opacity: i === 1 ? 1 : 0.45,
                  transform: i === 1 ? 'scale(1.15)' : 'scale(0.88)',
                  transition: 'opacity 0.3s, transform 0.3s',
                }}
              >
                <CircularProgress percent={s.percent} label={s.label} animate={visible} />
              </div>
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

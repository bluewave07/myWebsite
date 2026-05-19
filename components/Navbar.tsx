'use client';
import { useEffect, useState } from 'react';

const Logo = () => (
  <div className="relative w-14 h-14 flex-shrink-0">
    <div className="absolute inset-0 border border-white/70 grid grid-cols-2 grid-rows-2">
      <div className="flex items-center justify-center border-r border-b border-white/70 text-white font-bold text-sm">A</div>
      <div className="flex items-center justify-center border-b border-white/70 text-white font-bold text-sm">K</div>
      <div className="flex items-center justify-center border-r border-white/70 text-white font-bold text-sm">Y</div>
      <div className="flex items-center justify-center text-white font-bold text-sm">U</div>
    </div>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
    </div>
  </div>
);

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors"
  >
    {children}
  </a>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,18,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Home</a>
          <a href="#skills" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Skills</a>
          <a href="#articles" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Articles</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <SocialIcon href="https://linkedin.com">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </SocialIcon>
          <SocialIcon href="https://facebook.com">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </SocialIcon>
          <SocialIcon href="https://instagram.com">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </SocialIcon>
          <a
            href="#contact"
            className="ml-2 px-5 py-2 rounded border border-white/60 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Let&apos;s Connect
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-[#0a0a12]/95">
          <a href="#home" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#skills" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#articles" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Articles</a>
          <a href="#contact" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>Let&apos;s Connect</a>
        </div>
      )}
    </nav>
  );
}

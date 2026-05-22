'use client';
import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 77);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9999] py-[10px]"
      style={{
        background: scrolled ? 'rgba(18,18,18,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background .32s ease-in-out, backdrop-filter .32s ease-in-out',
      }}
    >
      <div className="max-w-[1140px] mx-auto px-6 flex items-center justify-between" style={{ margin: '0 auto' }}>
        <a href="#home" className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Logo size={104} />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Home','Skills'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-white/80 hover:text-white text-[14px] font-medium tracking-[0.8px] transition-colors duration-300">{l}</a>
          ))}
          <a href="#articles" className="text-white/80 hover:text-white text-[14px] font-medium tracking-[0.8px] transition-colors duration-300">Articles</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {[
            { href:'https://www.linkedin.com/in/bluewave24/', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
            { href:'https://www.instagram.com/akyurt.ak/', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
            { href:'https://x.com/bluewave1729', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
          ].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon-link"
              style={{ background: 'rgba(217,217,217,0.1)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '50%', width: 42, height: 42, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: 6, position: 'relative', overflow: 'hidden', color: 'rgba(255,255,255,0.7)', transition: 'color 0.3s ease-in-out' }}
            >
              <span className="social-icon-bg" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff', transform: 'scale(0)', transition: '0.3s ease-in-out', zIndex: 0 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>{s.icon}</span>
            </a>
          ))}
          <a href="#contact" className="navbar-connect-btn" style={{ marginLeft: 18 }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Let&apos;s Connect</span>
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(o => !o)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-[#121212]/95">
          {['Home','Skills'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-white/80 text-sm" onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href="#articles" className="text-white/80 text-sm" onClick={() => setOpen(false)}>Articles</a>
          <a href="#contact" className="text-white/80 text-sm" onClick={() => setOpen(false)}>Let&apos;s Connect</a>
        </div>
      )}
    </nav>
  );
}

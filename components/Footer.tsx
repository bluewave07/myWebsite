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

const SocialLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/70 transition-colors"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="py-10 px-6" style={{ background: '#0a0a12', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Logo />

        <p className="text-white/30 text-xs text-center">
          Copyright {new Date().getFullYear()}. All Rights Reserved by Abdulkadir Akyurt
        </p>

        <div className="flex items-center gap-3">
          <SocialLink href="https://linkedin.com">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </SocialLink>
          <SocialLink href="https://facebook.com">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </SocialLink>
          <SocialLink href="https://instagram.com">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </SocialLink>
        </div>
      </div>
    </footer>
  );
}

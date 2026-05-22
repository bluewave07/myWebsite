import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="py-10 px-6" style={{ background: '#121212', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6" style={{ margin: '0 auto' }}>
        <Logo size={52} />
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, letterSpacing: '0.8px' }} className="text-center">
          Copyright {new Date().getFullYear()}. All Rights Reserved by Abdulkadir Akyurt
        </p>
        <div className="flex items-center gap-3">
          {[
            { href: 'https://www.linkedin.com/in/bluewave24/',        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
            { href: 'https://www.instagram.com/akyurt.ak/',            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
            { href: 'https://x.com/bluewave1729',                      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            { href: 'https://medium.com/@abdulkadirakyurt.de',          icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg> },
          ].map(s => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/70 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

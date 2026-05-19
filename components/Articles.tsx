'use client';
import { useEffect, useRef, useState } from 'react';

type Tab = 'Articles' | 'Blockchain' | 'Projects';

const data: Record<Tab, { title: string; gradient: string }[]> = {
  Articles: [
    { title: 'AI & Automation in QA Testing', gradient: 'linear-gradient(135deg,#1a0533,#2d1b69)' },
    { title: 'Performance Testing Deep Dive', gradient: 'linear-gradient(135deg,#0a1628,#1e3a5f)' },
    { title: 'Postman API Development Platform', gradient: 'linear-gradient(135deg,#0d2137,#1a4a6b)' },
    { title: 'GraphQL vs REST: Which to Choose?', gradient: 'linear-gradient(135deg,#1a0a2e,#3d1a6b)' },
    { title: 'Docker for Testers', gradient: 'linear-gradient(135deg,#0a1a2e,#0d3a5c)' },
    { title: 'Cloud Testing Strategies', gradient: 'linear-gradient(135deg,#0d1a3a,#1a3a6b)' },
  ],
  Blockchain: [
    { title: 'Smart Contract Testing', gradient: 'linear-gradient(135deg,#1a0a2e,#4a1272)' },
    { title: 'DeFi Security Auditing', gradient: 'linear-gradient(135deg,#0a1a1a,#0d4a4a)' },
    { title: 'Web3 vs Web2 Architecture', gradient: 'linear-gradient(135deg,#1a1a0a,#4a4a12)' },
    { title: 'NFT Platform Development', gradient: 'linear-gradient(135deg,#1a0a0a,#5a1a1a)' },
    { title: 'Ethereum vs Solana', gradient: 'linear-gradient(135deg,#0a0a1a,#1a1a5a)' },
    { title: 'Crypto Wallet Security', gradient: 'linear-gradient(135deg,#1a0a1a,#4a124a)' },
  ],
  Projects: [
    { title: 'Test Automation Framework', gradient: 'linear-gradient(135deg,#0a1a0a,#1a4a1a)' },
    { title: 'QA Dashboard App', gradient: 'linear-gradient(135deg,#1a0a0a,#4a1a2a)' },
    { title: 'Blockchain Voting System', gradient: 'linear-gradient(135deg,#0a0a1a,#2a1a5a)' },
    { title: 'API Testing Suite', gradient: 'linear-gradient(135deg,#1a1a0a,#3a3a0a)' },
    { title: 'Performance Monitor Tool', gradient: 'linear-gradient(135deg,#0a1a1a,#0a3a3a)' },
    { title: 'CI/CD Pipeline Builder', gradient: 'linear-gradient(135deg,#1a0a1a,#3a0a3a)' },
  ],
};

export default function Articles() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<Tab>('Articles');

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="articles"
      ref={ref}
      className="relative py-24 px-6"
    >
      <div
        className="max-w-5xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <h2 className="text-4xl font-bold text-center mb-3">Articles &amp; Projects</h2>
        <p className="text-white/50 text-center text-sm mb-10">
          Write stories about QA, Development, Tech, Blockchain and more!
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {(['Articles', 'Blockchain', 'Projects'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-8 py-2.5 rounded-full text-sm font-medium transition-all"
              style={
                tab === t
                  ? { background: 'linear-gradient(135deg,#7b2ff7,#f107a3)', color: '#fff' }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)' }
              }
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data[tab].map(item => (
            <div
              key={item.title}
              className="rounded-2xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: '4/3', background: item.gradient }}
            >
              <div className="w-full h-full flex items-end p-4 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(123,47,247,0.2)' }}
                />
                <div className="relative">
                  <div
                    className="w-8 h-0.5 mb-2"
                    style={{ background: 'linear-gradient(to right,#7b2ff7,#f107a3)' }}
                  />
                  <p className="text-white text-sm font-medium leading-tight">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden py-24"
      style={{ background: 'linear-gradient(135deg, #4a1272 0%, #7b2ff7 35%, #c026d3 65%, #f107a3 100%)' }}
    >
      <div
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* Photo placeholder */}
        <div className="flex justify-center lg:justify-start">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ width: 320, height: 380, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.3) 100%)' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                AA
              </div>
              <p className="text-white font-semibold text-lg">Abdulkadir Akyurt</p>
              <p className="text-white/70 text-sm">QA Engineer</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="rounded-2xl px-5 py-4 text-white placeholder-white/50 text-sm outline-none focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="rounded-2xl px-5 py-4 text-white placeholder-white/50 text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-2xl px-5 py-4 text-white placeholder-white/50 text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
              />
              <input
                type="tel"
                placeholder="Phone No."
                className="rounded-2xl px-5 py-4 text-white placeholder-white/50 text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
              />
            </div>
            <textarea
              rows={4}
              placeholder="Message"
              className="rounded-2xl px-5 py-4 text-white placeholder-white/50 text-sm outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
            />
            <button
              type="submit"
              className="self-start mt-2 px-8 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

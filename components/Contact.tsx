'use client';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function CloneContact() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch('https://formspree.io/f/mgoqawrg', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="contact"
      style={{
        background: 'linear-gradient(90.21deg, #aa367c -5.91%, #4a2fbd 111.58%)',
        padding: '60px 0 80px',
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Photo card */}
        <div className="flex justify-center lg:justify-start">
          <div
            style={{
              width: '92%',
              maxWidth: 400,
              height: 460,
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 30,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="Abdulkadir Akyurt"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 12%', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%',
                background: 'linear-gradient(to top, rgba(74,47,189,0.95) 0%, rgba(170,54,124,0.7) 60%, transparent 100%)',
              }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px', textAlign: 'center' }}>
              <p className="text-white font-bold" style={{ fontSize: 20, letterSpacing: '0.8px', marginBottom: 4 }}>
                Abdulkadir Akyurt
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, letterSpacing: '1px' }}>
                QA Engineer · Blockchain Enthusiast
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-white font-bold tracking-[0.8px]" style={{ fontSize: 45, marginBottom: 30 }}>
            Get In Touch
          </h2>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <input
                name="firstName" type="text" placeholder="First Name" required
                className="contact-input" style={inputStyle}
              />
              <input
                name="lastName" type="text" placeholder="Last Name" required
                className="contact-input" style={inputStyle}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <input
                name="email" type="email" placeholder="Email Address" required
                className="contact-input" style={inputStyle}
              />
              <input
                name="phone" type="tel" placeholder="Phone No."
                className="contact-input" style={inputStyle}
              />
            </div>
            <textarea
              name="message" rows={6} placeholder="Message" required
              className="contact-input"
              style={{ ...inputStyle, resize: 'none', marginBottom: 0 }}
            />

            <div style={{ marginTop: 25, display: 'flex', alignItems: 'center', gap: 20 }}>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="contact-btn group"
                style={{
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  fontSize: 18,
                  fontWeight: 700,
                  padding: '14px 48px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.8px',
                  transition: '0.3s ease-in-out',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {status === 'sending' ? 'Sending...' : 'Send It'}
                </span>
              </button>

              {status === 'success' && (
                <p style={{ color: '#fff', fontSize: 15, fontWeight: 600, letterSpacing: '0.5px' }}>
                  ✓ Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p style={{ color: '#ffcccc', fontSize: 15, fontWeight: 600 }}>
                  ✗ Something went wrong. Please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.5)',
  borderRadius: 20,
  color: '#fff',
  fontSize: 18,
  fontWeight: 500,
  letterSpacing: '0.8px',
  padding: '18px 26px',
  width: '100%',
  transition: '0.3s ease-in-out',
  marginBottom: 8,
};

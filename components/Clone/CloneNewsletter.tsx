'use client';
import { useState } from 'react';

export default function CloneNewsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone]   = useState(false);

  return (
    // This section sits below contact — the white box pulls up with negative margin
    <section style={{ background: '#121212', padding: '0 0 80px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 55,
            color: '#121212',
            marginTop: -122,
            padding: '85px 125px',
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-bold" style={{ fontSize: 24, letterSpacing: '0.5px', lineHeight: '1.2em' }}>
                Subscribe to my Newsletter<br />&amp; Never miss latest updates
              </h3>
            </div>

            {done
              ? (
                <p className="font-semibold tracking-[0.8px]" style={{ color: '#aa367c' }}>
                  Thanks for subscribing!
                </p>
              ) : (
                <form
                  className="flex gap-3 w-full sm:w-auto"
                  onSubmit={e => { e.preventDefault(); if (email) setDone(true); }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="flex-1 sm:w-64 text-sm outline-none tracking-[0.8px]"
                    style={{
                      border: '2px solid #aa367c',
                      borderRadius: 20,
                      color: '#121212',
                      padding: '14px 20px',
                    }}
                  />
                  <button
                    type="submit"
                    className="whitespace-nowrap font-semibold tracking-[0.8px] hover:opacity-90 transition-opacity"
                    style={{
                      background: 'linear-gradient(90.21deg, #aa367c -5.91%, #4a2fbd 111.58%)',
                      color: '#fff',
                      borderRadius: 50,
                      padding: '14px 28px',
                      fontSize: 14,
                    }}
                  >
                    Submit
                  </button>
                </form>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <section className="relative py-20 px-6" style={{ background: 'linear-gradient(135deg,#1a0a2e 0%,#2d1b4e 50%,#1a0a2e 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-8"
          style={{ background: '#ffffff' }}
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-900 leading-snug">
              Subscribe to my Newsletter<br />
              &amp; Never miss latest updates
            </h3>
          </div>

          {sent ? (
            <p className="text-purple-600 font-semibold text-sm">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="flex-1 sm:w-64 px-5 py-3.5 rounded-xl text-gray-800 text-sm outline-none border-2 focus:border-purple-500 transition-colors"
                style={{ border: '2px solid #a855f7', color: '#1a1a1a' }}
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg,#7b2ff7,#f107a3)', whiteSpace: 'nowrap' }}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

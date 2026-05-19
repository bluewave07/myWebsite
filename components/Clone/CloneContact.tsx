'use client';

export default function CloneContact() {
  return (
    <section
      id="contact"
      style={{
        background: 'linear-gradient(90.21deg, #aa367c -5.91%, #4a2fbd 111.58%)',
        padding: '60px 0 200px',
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
            {/* Full-bleed profile photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="Abdulkadir Akyurt"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 12%',
                display: 'block',
              }}
            />
            {/* Gradient overlay at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '42%',
                background: 'linear-gradient(to top, rgba(74,47,189,0.95) 0%, rgba(170,54,124,0.7) 60%, transparent 100%)',
              }}
            />
            {/* Name & title */}
            <div
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '24px 28px',
                textAlign: 'center',
              }}
            >
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
          <form className="flex flex-col" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <input
                type="text" placeholder="First Name"
                className="contact-input"
                style={inputStyle}
              />
              <input
                type="text" placeholder="Last Name"
                className="contact-input"
                style={inputStyle}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <input
                type="email" placeholder="Email Address"
                className="contact-input"
                style={inputStyle}
              />
              <input
                type="tel" placeholder="Phone No."
                className="contact-input"
                style={inputStyle}
              />
            </div>
            <textarea
              rows={6} placeholder="Message"
              className="contact-input"
              style={{ ...inputStyle, resize: 'none', marginBottom: 0 }}
            />
            <div style={{ marginTop: 25 }}>
              <button
                type="submit"
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
                  cursor: 'pointer',
                  letterSpacing: '0.8px',
                  transition: '0.3s ease-in-out',
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Send It</span>
              </button>
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

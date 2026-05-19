'use client';

// Tech stack items – replacing the original Owl Carousel images
const STACK = [
  { name: 'React',      color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js',    color: '#68A063' },
  { name: 'Python',     color: '#F7CA3E' },
  { name: 'Solidity',   color: '#A8B9CC' },
  { name: 'Ethereum',   color: '#9B86FF' },
  { name: 'Docker',     color: '#2496ED' },
  { name: 'AWS',        color: '#FF9900' },
  { name: 'Jest',       color: '#C21325' },
  { name: 'Cypress',    color: '#17202C' },
  { name: 'Selenium',   color: '#43B02A' },
  { name: 'Postman',    color: '#FF6C37' },
];

// Duplicate for seamless marquee loop
const ROW = [...STACK, ...STACK];

function SkillItem({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center gap-3"
      style={{ width: 120, padding: '0 20px' }}
    >
      <div
        className="rounded-full flex items-center justify-center font-bold text-white text-[11px] tracking-[0.8px]"
        style={{
          width: 68, height: 68,
          background: `radial-gradient(circle at 35% 35%, ${color}44, ${color}22)`,
          border: `2px solid ${color}66`,
          color,
        }}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
      <span className="text-white text-[13px] tracking-[0.8px] text-center">{name}</span>
    </div>
  );
}

export default function CloneSkills() {
  return (
    <section id="skills" style={{ padding: '0 0 50px', position: 'relative' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            background: '#151515',
            borderRadius: 64,
            marginTop: -60,
            padding: '60px 50px',
            textAlign: 'center',
          }}
        >
          <h2 className="text-white font-bold" style={{ fontSize: 45 }}>Skills</h2>
          <p style={{ color: '#b8b8b8', fontSize: 18, letterSpacing: '0.8px', lineHeight: '1.5em', margin: '14px 0 75px' }}>
            Technology fancier &amp; Quality assurance provider &amp; Blockchain enthusiast.<br />
            Technical and analytical skills
          </p>

          {/* Marquee */}
          <div style={{ width: '80%', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
            {/* Fade edges */}
            <div
              className="absolute inset-y-0 left-0 pointer-events-none"
              style={{ width: 80, background: 'linear-gradient(90deg, #151515, transparent)', zIndex: 2 }}
            />
            <div
              className="absolute inset-y-0 right-0 pointer-events-none"
              style={{ width: 80, background: 'linear-gradient(270deg, #151515, transparent)', zIndex: 2 }}
            />

            <div
              className="flex"
              style={{ animation: 'marquee-scroll 22s linear infinite', width: 'max-content' }}
            >
              {ROW.map((s, i) => (
                <SkillItem key={`${s.name}-${i}`} name={s.name} color={s.color} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

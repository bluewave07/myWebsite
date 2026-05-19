'use client';
import { useEffect, useRef } from 'react';

export default function SolarSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;

    // Mutable planet angles
    const ang = { mercury: 0.8, venus: 2.1, earth: 4.0, earthMoon: 0, mars: 1.2, jupiter: 3.5, saturn: 5.2, saturnMoon: 1.0 };

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ── Helpers ────────────────────────────────────────────────────────────────

    const glow = (x: number, y: number, r: number, color: string, spread = 3.5) => {
      const g = ctx.createRadialGradient(x, y, r * 0.4, x, y, r * spread);
      g.addColorStop(0, color);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(x, y, r * spread, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    };

    const orbit = (cx: number, cy: number, rx: number, tilt: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, rx * tilt, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.10)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    };

    // ── Sun ────────────────────────────────────────────────────────────────────

    const drawSun = (cx: number, cy: number, t: number) => {
      const R = 46;
      const pulse = Math.sin(t * 1.1) * 6;

      // Wide outer corona
      const c1 = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 4 + pulse);
      c1.addColorStop(0,   'rgba(255,250,180,0.22)');
      c1.addColorStop(0.25,'rgba(255,180,30,0.14)');
      c1.addColorStop(0.6, 'rgba(255,100,0,0.06)');
      c1.addColorStop(1,   'rgba(255,60,0,0)');
      ctx.beginPath(); ctx.arc(cx, cy, R * 4 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = c1; ctx.fill();

      // Inner halo
      const c2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2);
      c2.addColorStop(0, 'rgba(255,240,160,0.40)');
      c2.addColorStop(1, 'rgba(255,120,0,0)');
      ctx.beginPath(); ctx.arc(cx, cy, R * 2, 0, Math.PI * 2);
      ctx.fillStyle = c2; ctx.fill();

      // Body
      const body = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.05, cx, cy, R);
      body.addColorStop(0,   '#fffce0');
      body.addColorStop(0.15,'#fff080');
      body.addColorStop(0.45,'#ffcc30');
      body.addColorStop(0.75,'#ff9010');
      body.addColorStop(1,   '#e85000');
      ctx.shadowBlur = 55; ctx.shadowColor = '#ffa020';
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = body; ctx.fill();
      ctx.shadowBlur = 0;

      // Specular flare
      const spec = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, 0, cx - R * 0.35, cy - R * 0.35, R * 0.55);
      spec.addColorStop(0, 'rgba(255,255,255,0.45)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = spec; ctx.fill();
    };

    // ── Earth ─────────────────────────────────────────────────────────────────

    const drawEarth = (x: number, y: number, r: number, t: number) => {
      // atmosphere glow (drawn first, behind the sphere)
      const atmo = ctx.createRadialGradient(x, y, r * 0.88, x, y, r * 1.55);
      atmo.addColorStop(0,   'rgba(80,160,255,0.28)');
      atmo.addColorStop(0.5, 'rgba(50,110,220,0.12)');
      atmo.addColorStop(1,   'rgba(30,80,200,0)');
      ctx.beginPath(); ctx.arc(x, y, r * 1.55, 0, Math.PI * 2);
      ctx.fillStyle = atmo; ctx.fill();

      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();

      // Ocean base
      const ocean = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      ocean.addColorStop(0,   '#7ccffc');
      ocean.addColorStop(0.3, '#2a8fd4');
      ocean.addColorStop(0.7, '#1460a0');
      ocean.addColorStop(1,   '#082848');
      ctx.fillStyle = ocean; ctx.fill();

      // Continents
      const continents: [number, number, number, number, number][] = [
        [-0.28, -0.12, 0.24, 0.30, -0.25],  // North America
        [-0.12,  0.25, 0.16, 0.22, -0.10],  // South America
        [ 0.08, -0.10, 0.13, 0.28,  0.12],  // Europe
        [ 0.10,  0.10, 0.16, 0.26,  0.08],  // Africa
        [ 0.28, -0.06, 0.28, 0.30,  0.18],  // Asia
        [ 0.32,  0.30, 0.18, 0.13,  0.20],  // Australia
      ];
      continents.forEach(([rx, ry, rw, rh, rot]) => {
        ctx.save();
        ctx.translate(x + rx * r, y + ry * r);
        ctx.rotate(rot);
        ctx.fillStyle = '#3a7a38';
        ctx.beginPath();
        ctx.ellipse(0, 0, rw * r, rh * r, 0, 0, Math.PI * 2);
        ctx.fill();
        // Highlight edge of continent
        const cg = ctx.createRadialGradient(-rw * r * 0.3, -rh * r * 0.3, 0, 0, 0, rw * r * 0.9);
        cg.addColorStop(0, 'rgba(80,160,70,0.5)');
        cg.addColorStop(1, 'rgba(30,80,30,0)');
        ctx.fillStyle = cg; ctx.fill();
        ctx.restore();
      });

      // Polar ice caps
      ctx.fillStyle = 'rgba(235,248,255,0.88)';
      ctx.beginPath(); ctx.ellipse(x, y - r * 0.83, r * 0.36, r * 0.22, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(220,240,255,0.80)';
      ctx.beginPath(); ctx.ellipse(x, y + r * 0.88, r * 0.26, r * 0.14, 0, 0, Math.PI * 2); ctx.fill();

      // Clouds (drift over time)
      const co = (t * 0.003) % (r * 2);
      ctx.globalAlpha = 0.52;
      ctx.fillStyle = '#fff';
      const clouds: [number, number, number, number][] = [
        [-0.42 + co / r, -0.18, 0.34, 0.11],
        [ 0.18 + co / r, -0.32, 0.28, 0.09],
        [-0.10 + co / r,  0.18, 0.38, 0.12],
        [ 0.38 + co / r,  0.36, 0.22, 0.08],
        [-0.52 + co / r,  0.42, 0.30, 0.10],
      ];
      clouds.forEach(([cx2, cy2, cw, ch]) => {
        ctx.save();
        ctx.translate(x + cx2 * r, y + cy2 * r);
        ctx.beginPath(); ctx.ellipse(0, 0, cw * r, ch * r, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
      ctx.globalAlpha = 1;

      // Night-side shadow (light from upper-left)
      const shadow = ctx.createRadialGradient(x + r * 0.55, y + r * 0.55, 0, x + r * 0.22, y + r * 0.22, r * 1.05);
      shadow.addColorStop(0,   'rgba(0,0,20,0)');
      shadow.addColorStop(0.38,'rgba(0,0,20,0)');
      shadow.addColorStop(0.68,'rgba(0,0,20,0.28)');
      shadow.addColorStop(1,   'rgba(0,0,20,0.72)');
      ctx.fillStyle = shadow; ctx.fill();

      ctx.restore();

      // City lights on night side (subtle yellow dots)
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = '#ffe080';
      const cityPositions: [number, number][] = [
        [0.38, 0.18], [0.44, 0.10], [0.40, 0.30], [0.50, 0.00], [0.30, 0.38],
      ];
      cityPositions.forEach(([lx, ly]) => {
        ctx.beginPath();
        ctx.arc(x + lx * r, y + ly * r, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // Specular highlight
      const spec = ctx.createRadialGradient(x - r * 0.38, y - r * 0.38, 0, x - r * 0.38, y - r * 0.38, r * 0.62);
      spec.addColorStop(0, 'rgba(255,255,255,0.32)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = spec; ctx.fill();
    };

    // ── Jupiter ────────────────────────────────────────────────────────────────

    const drawJupiter = (x: number, y: number, r: number) => {
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();

      // Banded atmosphere
      const bands: [number, number, string][] = [
        [-1.00, 0.22, '#f0d070'],
        [-0.78, 0.18, '#c07830'],
        [-0.60, 0.28, '#e8bc58'],
        [-0.32, 0.24, '#b86828'],
        [-0.08, 0.28, '#e8c060'],
        [ 0.20, 0.22, '#c47030'],
        [ 0.42, 0.26, '#dca848'],
        [ 0.68, 0.20, '#b86020'],
        [ 0.88, 0.22, '#d89838'],
      ];
      bands.forEach(([by, bh, bc]) => {
        ctx.fillStyle = bc;
        ctx.fillRect(x - r, y + by * r, r * 2, bh * r + 1);
      });

      // Great Red Spot
      ctx.save();
      ctx.translate(x + r * 0.18, y + r * 0.14);
      ctx.scale(1.0, 0.55);
      const grs = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.24);
      grs.addColorStop(0,   '#d03010');
      grs.addColorStop(0.5, '#b84020');
      grs.addColorStop(1,   'rgba(160,50,20,0)');
      ctx.beginPath(); ctx.arc(0, 0, r * 0.24, 0, Math.PI * 2);
      ctx.fillStyle = grs; ctx.fill();
      ctx.restore();

      // Night shadow
      const shadow = ctx.createRadialGradient(x + r * 0.5, y + r * 0.5, 0, x + r * 0.2, y + r * 0.2, r * 1.05);
      shadow.addColorStop(0,   'rgba(0,0,0,0)');
      shadow.addColorStop(0.45,'rgba(0,0,0,0)');
      shadow.addColorStop(0.78,'rgba(0,0,0,0.30)');
      shadow.addColorStop(1,   'rgba(0,0,0,0.65)');
      ctx.fillStyle = shadow; ctx.fill();

      ctx.restore();

      // Specular
      const spec = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, 0, x - r * 0.35, y - r * 0.35, r * 0.55);
      spec.addColorStop(0, 'rgba(255,255,255,0.22)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = spec; ctx.fill();

      // Rings (around Jupiter)
      ctx.save();
      ctx.translate(x, y); ctx.scale(1, 0.26);
      ctx.beginPath(); ctx.arc(0, 0, r + 14, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(200,155,70,0.30)'; ctx.lineWidth = 6; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, r + 22, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(200,155,70,0.15)'; ctx.lineWidth = 3; ctx.stroke();
      ctx.restore();
    };

    // ── Saturn ─────────────────────────────────────────────────────────────────

    const drawSaturn = (x: number, y: number, r: number) => {
      // Back rings (behind planet)
      ctx.save();
      ctx.translate(x, y); ctx.scale(1, 0.32);
      ctx.beginPath(); ctx.arc(0, 0, r + 36, -Math.PI, 0);
      ctx.strokeStyle = 'rgba(210,175,100,0.50)'; ctx.lineWidth = 12; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, r + 52, -Math.PI, 0);
      ctx.strokeStyle = 'rgba(190,155,80,0.30)'; ctx.lineWidth = 7; ctx.stroke();
      ctx.restore();

      // Planet body
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
      const bands: [number, number, string][] = [
        [-1.0, 0.30, '#f4dea0'],
        [-0.7, 0.25, '#e0c070'],
        [-0.45,0.30, '#f0d888'],
        [-0.15,0.30, '#dac068'],
        [ 0.15,0.30, '#ecca78'],
        [ 0.45,0.30, '#d4b858'],
        [ 0.75,0.25, '#e8d080'],
      ];
      bands.forEach(([by, bh, bc]) => {
        ctx.fillStyle = bc;
        ctx.fillRect(x - r, y + by * r, r * 2, bh * r + 1);
      });
      const shadow = ctx.createRadialGradient(x + r*0.5, y + r*0.5, 0, x + r*0.2, y + r*0.2, r * 1.05);
      shadow.addColorStop(0, 'rgba(0,0,0,0)'); shadow.addColorStop(0.5, 'rgba(0,0,0,0)');
      shadow.addColorStop(0.8, 'rgba(0,0,0,0.25)'); shadow.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = shadow; ctx.fill();
      ctx.restore();

      // Specular
      const spec = ctx.createRadialGradient(x - r*0.35, y - r*0.35, 0, x - r*0.35, y - r*0.35, r*0.55);
      spec.addColorStop(0, 'rgba(255,255,255,0.28)'); spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = spec; ctx.fill();

      // Front rings (in front of planet)
      ctx.save();
      ctx.translate(x, y); ctx.scale(1, 0.32);
      ctx.beginPath(); ctx.arc(0, 0, r + 36, 0, Math.PI);
      ctx.strokeStyle = 'rgba(210,175,100,0.55)'; ctx.lineWidth = 12; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, r + 52, 0, Math.PI);
      ctx.strokeStyle = 'rgba(190,155,80,0.32)'; ctx.lineWidth = 7; ctx.stroke();
      ctx.restore();
    };

    // ── Generic rocky planet ───────────────────────────────────────────────────

    const drawPlanet = (x: number, y: number, r: number, colors: string[]) => {
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();

      const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
      ctx.fillStyle = grad; ctx.fill();

      const shadow = ctx.createRadialGradient(x + r*0.5, y + r*0.5, 0, x + r*0.2, y + r*0.2, r*1.05);
      shadow.addColorStop(0, 'rgba(0,0,0,0)'); shadow.addColorStop(0.4, 'rgba(0,0,0,0)');
      shadow.addColorStop(0.72, 'rgba(0,0,0,0.3)'); shadow.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = shadow; ctx.fill();
      ctx.restore();

      const spec = ctx.createRadialGradient(x - r*0.35, y - r*0.35, 0, x - r*0.35, y - r*0.35, r*0.55);
      spec.addColorStop(0, 'rgba(255,255,255,0.25)'); spec.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = spec; ctx.fill();
    };

    // ── Moon ───────────────────────────────────────────────────────────────────

    const drawMoon = (x: number, y: number, r: number) => {
      const grad = ctx.createRadialGradient(x - r*0.3, y - r*0.3, 0, x, y, r);
      grad.addColorStop(0, '#e0e0e0');
      grad.addColorStop(1, '#888');
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
    };

    // ── Frame ─────────────────────────────────────────────────────────────────

    const frame = () => {
      ctx.clearRect(0, 0, W, H);

      const t   = Date.now();
      // Shift center right so solar system sits in the right half of the banner
      const cx  = W * 0.62;
      const cy  = H * 0.50;

      // Orbit tilt factors
      const T = { mercury: 0.32, venus: 0.30, earth: 0.28, mars: 0.26, jupiter: 0.24, saturn: 0.22 };
      // Orbit radii
      const OR = { mercury: 88, venus: 135, earth: 188, mars: 248, jupiter: 318, saturn: 400 };

      // Draw all orbit rings first
      Object.entries(OR).forEach(([name, r]) => orbit(cx, cy, r, T[name as keyof typeof T]));

      // Sun
      drawSun(cx, cy, t / 1000);

      // Step angles
      ang.mercury   += 0.022;
      ang.venus     += 0.013;
      ang.earth     += 0.009;
      ang.earthMoon += 0.060;
      ang.mars      += 0.006;
      ang.jupiter   += 0.0025;
      ang.saturn    += 0.0015;

      // ── Mercury ────────────────────────────────────────────────────────────
      const mpx = cx + Math.cos(ang.mercury) * OR.mercury;
      const mpy = cy + Math.sin(ang.mercury) * OR.mercury * T.mercury;
      glow(mpx, mpy, 7, 'rgba(160,140,120,0.35)');
      drawPlanet(mpx, mpy, 7, ['#d0c8b8', '#a09080', '#706050']);

      // ── Venus ──────────────────────────────────────────────────────────────
      const vpx = cx + Math.cos(ang.venus) * OR.venus;
      const vpy = cy + Math.sin(ang.venus) * OR.venus * T.venus;
      // Venus thick atmosphere glow
      const vatmo = ctx.createRadialGradient(vpx, vpy, 10, vpx, vpy, 10 * 1.6);
      vatmo.addColorStop(0, 'rgba(220,180,60,0.2)'); vatmo.addColorStop(1, 'rgba(220,180,60,0)');
      ctx.beginPath(); ctx.arc(vpx, vpy, 10 * 1.6, 0, Math.PI * 2); ctx.fillStyle = vatmo; ctx.fill();
      drawPlanet(vpx, vpy, 10, ['#f8e898', '#e8c060', '#c89030', '#a07020']);

      // ── Earth ──────────────────────────────────────────────────────────────
      const epx = cx + Math.cos(ang.earth) * OR.earth;
      const epy = cy + Math.sin(ang.earth) * OR.earth * T.earth;
      drawEarth(epx, epy, 18, t);

      // Moon
      const moonX = epx + Math.cos(ang.earthMoon) * 30;
      const moonY = epy + Math.sin(ang.earthMoon) * 30 * 0.5;
      drawMoon(moonX, moonY, 4);

      // ── Mars ───────────────────────────────────────────────────────────────
      const rpx = cx + Math.cos(ang.mars) * OR.mars;
      const rpy = cy + Math.sin(ang.mars) * OR.mars * T.mars;
      glow(rpx, rpy, 10, 'rgba(180,60,20,0.35)');
      drawPlanet(rpx, rpy, 10, ['#e07050', '#c04418', '#901808', '#600808']);
      // Mars polar cap
      ctx.save(); ctx.beginPath(); ctx.arc(rpx, rpy, 10, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = 'rgba(240,240,255,0.70)';
      ctx.beginPath(); ctx.ellipse(rpx, rpy - 8, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      // ── Jupiter ────────────────────────────────────────────────────────────
      const jpx = cx + Math.cos(ang.jupiter) * OR.jupiter;
      const jpy = cy + Math.sin(ang.jupiter) * OR.jupiter * T.jupiter;
      glow(jpx, jpy, 26, 'rgba(180,130,50,0.30)');
      drawJupiter(jpx, jpy, 26);

      // Jupiter moons
      ang.saturnMoon += 0.03;
      const jm1x = jpx + Math.cos(ang.saturnMoon)        * 38;
      const jm1y = jpy + Math.sin(ang.saturnMoon)        * 38 * 0.4;
      const jm2x = jpx + Math.cos(ang.saturnMoon + 2.1)  * 52;
      const jm2y = jpy + Math.sin(ang.saturnMoon + 2.1)  * 52 * 0.4;
      drawMoon(jm1x, jm1y, 3);
      drawMoon(jm2x, jm2y, 2.5);

      // ── Saturn ─────────────────────────────────────────────────────────────
      const spx = cx + Math.cos(ang.saturn) * OR.saturn;
      const spy = cy + Math.sin(ang.saturn) * OR.saturn * T.saturn;
      glow(spx, spy, 22, 'rgba(200,170,100,0.28)');
      drawSaturn(spx, spy, 22);

      raf = requestAnimationFrame(frame);
    };

    frame();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

import React, { useEffect, useRef } from 'react';

type Particle = {
  radius: number;
  angle: number;
  speed: number;
  size: number;
  hue: number;
};

const TILT = 0.2;
const CENTER_Y = 0.62;

const spawn = (maxRadius: number, coreRadius: number, anywhere: boolean): Particle => ({
  radius: anywhere
    ? coreRadius * 1.05 + Math.pow(Math.random(), 2.2) * (maxRadius - coreRadius)
    : maxRadius * (0.8 + Math.random() * 0.2),
  angle: Math.random() * Math.PI * 2,
  speed: 0.7 + Math.random() * 0.6,
  size: 0.5 + Math.random() * 1.4,
  hue: 270 + Math.random() * 55,
});

const BlackHole = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Particles draw onto two trail layers (behind and in front of the core) that fade each frame.
    const back = document.createElement('canvas');
    const front = document.createElement('canvas');
    const backCtx = back.getContext('2d');
    const frontCtx = front.getContext('2d');
    if (!backCtx || !frontCtx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let coreRadius = 0;
    let maxRadius = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      for (const [c, context] of [[canvas, ctx], [back, backCtx], [front, frontCtx]] as const) {
        c.width = width * dpr;
        c.height = height * dpr;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      coreRadius = Math.min(width, height) * 0.085;
      maxRadius = Math.hypot(width, height) * 0.55;
      const count = Math.round(Math.min(2600, (width * height) / 450));
      particles = Array.from({ length: count }, () => spawn(maxRadius, coreRadius, true));
    };

    const position = (p: Particle, cx: number, cy: number) => ({
      x: cx + Math.cos(p.angle) * p.radius,
      y: cy + Math.sin(p.angle) * p.radius * TILT,
    });

    const fade = (layer: CanvasRenderingContext2D, amount: number) => {
      layer.globalCompositeOperation = 'destination-out';
      layer.fillStyle = `rgba(0, 0, 0, ${amount})`;
      layer.fillRect(0, 0, width, height);
      layer.globalCompositeOperation = 'lighter';
    };

    const stepParticles = (cx: number, cy: number, dt: number) => {
      fade(backCtx, 0.08);
      fade(frontCtx, 0.08);

      for (const p of particles) {
        const closeness = coreRadius / p.radius;
        const from = position(p, cx, cy);

        p.angle += 0.045 * p.speed * Math.pow(closeness, 1.5) * dt;
        p.radius -= (0.15 + 1.6 * closeness * closeness) * p.speed * dt;

        const to = position(p, cx, cy);
        const layer = Math.sin(p.angle) > 0 ? frontCtx : backCtx;
        const light = 40 + 50 * Math.min(1, closeness * 1.3);
        const alpha = Math.min(1, 0.3 + closeness * 1.2);

        layer.strokeStyle = `hsla(${p.hue}, 100%, ${light}%, ${alpha})`;
        layer.lineWidth = p.size * (0.5 + closeness * 1.2);
        layer.beginPath();
        layer.moveTo(from.x, from.y);
        layer.lineTo(to.x, to.y);
        layer.stroke();

        if (p.radius < coreRadius * 1.05) Object.assign(p, spawn(maxRadius, coreRadius, false));
      }
    };

    // Accretion disk as one smooth glowing band (no hard rings), hottest at the inner edge.
    const drawDisk = (cx: number, cy: number, r: number, half: 'back' | 'front', glow: number) => {
      const inner = r * 1.02;
      const outer = r * 4.6;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, TILT);
      ctx.beginPath();
      if (half === 'back') ctx.rect(-outer, -outer, outer * 2, outer);
      else ctx.rect(-outer, 0, outer * 2, outer);
      ctx.clip();
      const band = ctx.createRadialGradient(0, 0, inner, 0, 0, outer);
      band.addColorStop(0, `rgba(250, 232, 255, ${0.85 * glow})`);
      band.addColorStop(0.06, `rgba(240, 171, 252, ${0.6 * glow})`);
      band.addColorStop(0.22, `rgba(192, 38, 211, ${0.4 * glow})`);
      band.addColorStop(0.55, 'rgba(109, 40, 217, 0.15)');
      band.addColorStop(1, 'rgba(59, 0, 115, 0)');
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = band;
      ctx.beginPath();
      ctx.arc(0, 0, outer, 0, Math.PI * 2);
      ctx.arc(0, 0, inner, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.restore();
    };

    // Far side of the disk, bent by gravity into arcs over the top and under the bottom of the shadow.
    const drawLensedArcs = (cx: number, cy: number, r: number, glow: number) => {
      ctx.globalCompositeOperation = 'lighter';
      for (const [side, reach, strength] of [['top', 1.6, 0.95], ['bottom', 1.25, 0.3]] as const) {
        ctx.save();
        ctx.beginPath();
        if (side === 'top') ctx.rect(cx - r * 3, cy - r * 3, r * 6, r * 3);
        else ctx.rect(cx - r * 3, cy, r * 6, r * 3);
        ctx.clip();
        const arc = ctx.createRadialGradient(cx, cy, r * 1.02, cx, cy, r * reach);
        arc.addColorStop(0, `rgba(250, 232, 255, ${strength * 0.5 * glow})`);
        arc.addColorStop(0.18, `rgba(250, 232, 255, ${strength * glow})`);
        arc.addColorStop(0.4, `rgba(240, 171, 252, ${strength * 0.45 * glow})`);
        arc.addColorStop(0.7, `rgba(192, 38, 211, ${strength * 0.12 * glow})`);
        arc.addColorStop(1, 'rgba(109, 40, 217, 0)');
        ctx.fillStyle = arc;
        ctx.beginPath();
        ctx.arc(cx, cy, r * reach, 0, Math.PI * 2);
        ctx.arc(cx, cy, r * 1.02, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();
      }
    };

    // Thin photon ring right at the shadow edge, smooth all the way round.
    const drawPhotonRing = (cx: number, cy: number, r: number, glow: number) => {
      ctx.globalCompositeOperation = 'lighter';
      const ring = ctx.createConicGradient(0, cx, cy);
      ring.addColorStop(0, `rgba(253, 236, 255, ${0.3 * glow})`);
      ring.addColorStop(0.25, `rgba(253, 236, 255, ${0.12 * glow})`);
      ring.addColorStop(0.5, `rgba(253, 236, 255, ${0.6 * glow})`);
      ring.addColorStop(0.75, `rgba(253, 236, 255, ${0.75 * glow})`);
      ring.addColorStop(1, `rgba(253, 236, 255, ${0.3 * glow})`);
      ctx.strokeStyle = ring;
      ctx.shadowColor = 'rgba(240, 171, 252, 0.9)';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.02, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawShadow = (cx: number, cy: number, r: number) => {
      // Soft edge, so it reads as light bending away rather than a flat disc.
      const shadow = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.03);
      shadow.addColorStop(0, 'rgba(0, 0, 0, 1)');
      shadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.03, 0, Math.PI * 2);
      ctx.fill();
    };

    // Doppler beaming: the side of the disk spinning toward the viewer is brighter.
    const applyDoppler = (cx: number, r: number) => {
      const beam = ctx.createLinearGradient(cx - r * 5, 0, cx + r * 5, 0);
      beam.addColorStop(0, 'rgba(0, 0, 0, 1)');
      beam.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = beam;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
    };

    let last = performance.now();
    const render = (t: number) => {
      const dt = Math.min(3, (t - last) / 16.67);
      last = t;
      const cx = width / 2;
      const cy = height * CENTER_Y;
      const glow = 0.92 + Math.sin(t * 0.0015) * 0.08;
      const r = coreRadius;

      stepParticles(cx, cy, dt);

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, width, height);
      drawDisk(cx, cy, r, 'back', glow);
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(back, 0, 0, width, height);
      drawLensedArcs(cx, cy, r, glow);
      drawShadow(cx, cy, r);
      drawPhotonRing(cx, cy, r, glow);
      drawDisk(cx, cy, r, 'front', glow);
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(front, 0, 0, width, height);
      applyDoppler(cx, r);

      if (!reducedMotion && visible) frame = requestAnimationFrame(render);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      last = performance.now();
      frame = requestAnimationFrame(render);
    };

    resize();
    start();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion) start();
    });
    observer.observe(canvas);

    const onResize = () => {
      resize();
      if (reducedMotion) start();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
};

export default BlackHole;

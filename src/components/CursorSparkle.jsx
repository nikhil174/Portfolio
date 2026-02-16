import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TRAIL_SPEED_THRESHOLD,
  TRAIL_LIFETIME_MS,
  SPARKLE_THROTTLE_MS,
  SPARKLE_LIFETIME_MS,
} from '../constants';

// ─── Canvas Glow Trail (only on fast swipes) ───────────────
function useGlowTrail(canvasRef) {
  const points = useRef([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const speedBuf = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      lastPos.current = { x: e.clientX, y: e.clientY };

      speedBuf.current.push(dist);
      if (speedBuf.current.length > 4) speedBuf.current.shift();
      const avgSpeed = speedBuf.current.reduce((a, b) => a + b, 0) / speedBuf.current.length;

      if (avgSpeed > TRAIL_SPEED_THRESHOLD) {
        points.current.push({ x: e.clientX, y: e.clientY, time: Date.now() });
      }
    };
    window.addEventListener('mousemove', handleMove);

    const draw = () => {
      const now = Date.now();
      points.current = points.current.filter((p) => now - p.time < TRAIL_LIFETIME_MS);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = points.current;
      if (pts.length > 2) {
        // Outer glow
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(147,197,253,0.35)';
        ctx.shadowBlur = 18;

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          const cx = (pts[i].x + pts[i + 1].x) / 2;
          const cy = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, cx, cy);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.stroke();
        ctx.restore();

        // Per-segment fading line
        for (let i = 1; i < pts.length; i++) {
          const age = (now - pts[i].time) / TRAIL_LIFETIME_MS;
          const opacity = Math.max(0, 1 - age);
          const width = 2 + (1 - age) * 2.5;

          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineWidth = width;
          ctx.shadowColor = `rgba(147,197,253,${opacity * 0.5})`;
          ctx.shadowBlur = 10;
          ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.65})`;
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x, pts[i].y);
          ctx.stroke();
          ctx.restore();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [canvasRef]);
}

// ─── Main CursorSparkle Component ──────────────────────────
export default function CursorSparkle() {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const [sparkles, setSparkles] = useState([]);
  const sparkleThrottle = useRef(0);

  // Canvas trail
  useGlowTrail(canvasRef);

  // Ambient glow follows cursor
  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Sparkle generation
  useEffect(() => {
    const handleSparkle = (e) => {
      const now = Date.now();
      if (now - sparkleThrottle.current < SPARKLE_THROTTLE_MS) return;
      sparkleThrottle.current = now;

      const count = 1 + Math.floor(Math.random() * 2);
      const batch = Array.from({ length: count }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 10 + Math.random() * 24;
        return {
          id: now + Math.random() + i,
          x: e.clientX + Math.cos(angle) * dist,
          y: e.clientY + Math.sin(angle) * dist,
          size: 2 + Math.random() * 3,
          rotation: Math.random() * 180,
          driftX: (Math.random() - 0.5) * 16,
          driftY: -6 - Math.random() * 14,
        };
      });

      setSparkles((prev) => [...prev.slice(-12), ...batch]);

      const ids = batch.map((s) => s.id);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !ids.includes(s.id)));
      }, SPARKLE_LIFETIME_MS);
    };

    window.addEventListener('mousemove', handleSparkle);
    return () => window.removeEventListener('mousemove', handleSparkle);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9998]" />

      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 220,
          height: 220,
          marginLeft: -110,
          marginTop: -110,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(147,197,253,0.03) 40%, transparent 70%)',
          transition: 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      />

      {/* Four-point star sparkles */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute"
              style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
              initial={{ opacity: 0, scale: 0, rotate: s.rotation }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0, 1.2, 0],
                rotate: s.rotation + 90,
                x: s.driftX,
                y: s.driftY,
              }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'white',
                  borderRadius: '1px',
                  boxShadow: `0 0 ${s.size * 2}px rgba(147,197,253,0.6), 0 0 ${s.size * 4}px rgba(147,197,253,0.2)`,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'white',
                  borderRadius: '1px',
                  transform: 'rotate(90deg)',
                  boxShadow: `0 0 ${s.size * 2}px rgba(147,197,253,0.6)`,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

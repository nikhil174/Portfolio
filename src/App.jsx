import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, MotionConfig, useScroll, useMotionValueEvent } from 'framer-motion';
import { socialLinks, navItems, sectionIds, heroOrbs, coreStrengths, techStack, experiences, projects, skillGroups, achievements, EMAIL_URL } from './data/portfolio';

const bgClass = 'bg-slate-950 text-slate-50';
const cardClass = 'bg-slate-900 border-slate-800 hover:border-blue-500/30';
const smoothEase = [0.22, 1, 0.36, 1];
const inViewTransition = { duration: 0.6, ease: smoothEase };
const inViewViewport = { once: true, amount: 0.15 };

// ─── Cursor Effects ───────────────────────────────────────────
function CursorSparkle() {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const animRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const speedBuf = useRef([]); // rolling speed buffer
  const glowRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const SPEED_THRESHOLD = 35; // pixels-per-frame average — needs truly fast movement

    const handleMove = (e) => {
      const now = Date.now();
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      lastPos.current = { x: e.clientX, y: e.clientY };

      // Rolling average of last 4 distances to smooth out jitter
      speedBuf.current.push(dist);
      if (speedBuf.current.length > 4) speedBuf.current.shift();
      const avgSpeed =
        speedBuf.current.reduce((a, b) => a + b, 0) / speedBuf.current.length;

      // Only add trail points when user is genuinely swiping fast
      if (avgSpeed > SPEED_THRESHOLD) {
        points.current.push({ x: e.clientX, y: e.clientY, time: now });
      }

      // Move the ambient glow
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMove);

    const draw = () => {
      const now = Date.now();
      points.current = points.current.filter((p) => now - p.time < 350);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = points.current;
      if (pts.length > 2) {
        // Outer soft glow layer
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

        // Main glowing line with per-segment fading
        for (let i = 1; i < pts.length; i++) {
          const age = (now - pts[i].time) / 350;
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
  }, []);

  // Sparkle state
  const [sparkles, setSparkles] = useState([]);
  const sparkleThrottle = useRef(0);

  // Add sparkle generation to the existing mousemove
  useEffect(() => {
    const handleSparkle = (e) => {
      const now = Date.now();
      if (now - sparkleThrottle.current < 90) return;
      sparkleThrottle.current = now;

      const count = 1 + Math.floor(Math.random() * 2);
      const newSparkles = [];

      for (let i = 0; i < count; i++) {
        const id = now + Math.random() + i;
        const angle = Math.random() * Math.PI * 2;
        const dist = 10 + Math.random() * 24;
        const x = e.clientX + Math.cos(angle) * dist;
        const y = e.clientY + Math.sin(angle) * dist;
        const size = 2 + Math.random() * 3;
        const rotation = Math.random() * 180;
        const driftX = (Math.random() - 0.5) * 16;
        const driftY = -6 - Math.random() * 14;

        newSparkles.push({ id, x, y, size, rotation, driftX, driftY });
      }

      setSparkles((prev) => [...prev.slice(-12), ...newSparkles]);

      const ids = newSparkles.map((s) => s.id);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !ids.includes(s.id)));
      }, 600);
    };

    window.addEventListener('mousemove', handleSparkle);
    return () => window.removeEventListener('mousemove', handleSparkle);
  }, []);

  return (
    <>
      {/* Canvas trail — only appears on genuinely fast swipes */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />
      {/* Soft ambient light that follows cursor */}
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
      {/* Sparkles — tiny 4-point stars */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              className="absolute"
              style={{
                left: s.x,
                top: s.y,
                width: s.size,
                height: s.size,
              }}
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
              {/* 4-point star shape using two rotated rects */}
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

// ─── Navigation ────────────────────────────────────────────
function Navigation({ activeSection, scrollToSection, hideNav }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  const handleNav = useCallback(
    (id) => {
      setIsMenuOpen(false);
      scrollToSection(id);
    },
    [scrollToSection],
  );

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ease-out ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-lg border-b border-slate-800/60 shadow-lg shadow-slate-950/30'
          : 'bg-transparent border-b border-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hideNav ? -100 : 0, opacity: hideNav ? 0 : 1 }}
      transition={{ duration: 0.4, ease: smoothEase }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          className="text-2xl font-light tracking-tight bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent hover:from-blue-300 hover:to-teal-200 transition-all duration-300"
        >
          {'{ }'}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => handleNav(id)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeSection === id
                    ? 'text-blue-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item}
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          {/* Header social icons */}
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-800">
            {socialLinks.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-400 transition-colors duration-300"
                aria-label={name}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-300"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/60 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: smoothEase }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNav(item.toLowerCase())}
                  className="text-left text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
              <div className="flex gap-4 pt-4 border-t border-slate-800">
                {socialLinks.map(({ name, url, icon: Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-blue-400 transition-colors duration-200"
                    aria-label={name}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Floating Orbs Background ──────────────────────────────
function FloatingOrbs() {
  const orbs = [
    { size: 350, x: '15%', y: '20%', color: 'from-blue-500/20 to-blue-600/5', duration: 18, delay: 0 },
    { size: 280, x: '75%', y: '60%', color: 'from-teal-400/15 to-cyan-500/5', duration: 22, delay: 2 },
    { size: 200, x: '60%', y: '15%', color: 'from-indigo-500/15 to-purple-500/5', duration: 20, delay: 4 },
    { size: 160, x: '25%', y: '70%', color: 'from-blue-400/10 to-teal-400/5', duration: 25, delay: 1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to))`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 0.8, 0.6, 0.9, 0.7],
            scale: [0.6, 1, 0.9, 1.05, 1],
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* Horizontal light sweep */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)',
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
        transition={{ duration: 3, delay: 0.8, ease: smoothEase }}
      />
    </div>
  );
}



// ─── Hero Section ──────────────────────────────────────────
function HeroSection({ scrollToSection }) {
  return (
    <section
      id="home"
      className={`relative min-h-screen ${bgClass} flex items-center justify-center px-6 pt-20 overflow-hidden`}
    >
      <FloatingOrbs />

      <div className="relative z-10 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: smoothEase }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-teal-300 bg-clip-text text-transparent">
              Nikhil Srivastava
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: smoothEase }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-200">
            Backend Software Engineer
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-slate-400">
            Building systems that handle millions of events. 3+ years crafting reliable, high-performance
            backend infrastructure with expertise in distributed systems, microservices, and scalable architecture.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: smoothEase }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="relative px-8 py-3 bg-blue-500 text-white rounded-lg font-medium overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="relative z-10">View Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: smoothEase }}
            />
          </motion.button>
          <motion.a
            href="https://mail.google.com/mail/?view=cm&to=nikhilsrivastava174@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border rounded-lg font-medium border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Hero Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: smoothEase }}
          className="flex justify-center gap-4 mt-10"
        >
          {socialLinks.map(({ name, url, icon: Icon }, i) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-slate-800 text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300"
              aria-label={name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1, ease: smoothEase }}
              whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="min-h-screen bg-slate-900 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewViewport}
          transition={inViewTransition}
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={inViewTransition}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-slate-300">
              I'm a backend engineer passionate about building systems that scale. With 3+ years at cutting-edge
              startups, I've designed and shipped platforms handling massive event throughputs with near-perfect reliability.
            </p>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-400">Core Strengths</h3>
              {coreStrengths.map((strength) => (
                <div key={strength} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-300">{strength}</span>
                </div>
              ))}
            </div>
            {/* <p className="text-sm mt-8 text-slate-400">
              Currently pursuing MCA at IIIT Ranchi | BCA from Prof. Rajendra Singh University
            </p> */}
          </motion.div>

          {/* Right Column - Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={inViewTransition}
          >
            <h3 className="text-lg font-semibold mb-6 text-blue-400">Tech Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((group) => (
                <div key={group.category} className={`p-4 rounded-lg border transition-colors duration-300 ${cardClass}`}>
                  <h4 className="font-semibold text-blue-400 mb-3 text-sm">{group.category}</h4>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div key={item} className="text-sm text-slate-400">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Experience Section ────────────────────────────────────
function ExperienceSection() {

  return (
    <section id="experience" className={`min-h-screen ${bgClass} px-6 py-20`}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewViewport}
          transition={inViewTransition}
        >
          Experience
        </motion.h2>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewViewport}
              transition={{ ...inViewTransition, delay: idx * 0.1 }}
              className="border-l-2 border-blue-500 pl-8 pb-12"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <p className="text-blue-400 font-semibold">{exp.company}</p>
                </div>
                <div className="text-sm text-slate-400">{exp.duration}</div>
              </div>
              <p className="text-sm mb-4 text-slate-400">{exp.location}</p>
              <ul className="space-y-2 mb-6">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-slate-300">
                    • {highlight}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ──────────────────────────────────────
function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen bg-slate-900 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewViewport}
          transition={inViewTransition}
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewViewport}
              transition={{ ...inViewTransition, delay: idx * 0.08 }}
              className={`border rounded-lg p-6 ${cardClass} transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5`}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
            >
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="mb-4 leading-relaxed text-slate-400">{project.description}</p>
              <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20">
                <p className="text-blue-400 font-semibold text-sm">{project.metric}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded border border-slate-700 bg-slate-800 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills Section ────────────────────────────────────────
function SkillsSection() {
  return (
    <section id="skills" className={`min-h-screen ${bgClass} px-6 py-20`}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewViewport}
          transition={inViewTransition}
        >
          Skills & Achievements
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewViewport}
            transition={inViewTransition}
          >
            <h3 className="text-2xl font-bold mb-8">Technical Expertise</h3>
            <div className="space-y-6">
              {skillGroups.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h4 className="text-blue-400 font-semibold mb-3">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 text-sm rounded-lg border bg-slate-800 border-slate-700 text-slate-300 hover:border-blue-500/30 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewViewport}
            transition={{ ...inViewTransition, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-8">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inViewViewport}
                  transition={{ ...inViewTransition, delay: idx * 0.08 }}
                  className={`p-4 rounded-lg border transition-colors duration-300 ${cardClass}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-blue-400">{achievement.award}</h4>
                    <span className="text-xs text-slate-500">{achievement.year}</span>
                  </div>
                  <p className="text-sm text-slate-400">{achievement.org}</p>
                  <p className="text-sm mt-2 text-slate-400">{achievement.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Night Sky ─────────────────────────────────────────────
function NightSky() {
  const stars = React.useMemo(() => {
    const result = [];
    // Tiny stars
    for (let i = 0; i < 120; i++) {
      const size = 0.5 + Math.random() * 0.7;
      result.push({
        id: `t${i}`, x: Math.random() * 100, y: Math.random() * 100, size,
        opacity: 0.3 + Math.random() * 0.5,
        twinkle: Math.random() > 0.5,
        dur: 2 + Math.random() * 4,
        del: Math.random() * 6,
        color: 'white',
      });
    }
    // Small stars
    for (let i = 0; i < 60; i++) {
      const size = 1.2 + Math.random() * 0.8;
      result.push({
        id: `s${i}`, x: Math.random() * 100, y: Math.random() * 100, size,
        opacity: 0.4 + Math.random() * 0.6,
        twinkle: Math.random() > 0.4,
        dur: 2 + Math.random() * 4,
        del: Math.random() * 6,
        color: Math.random() > 0.8 ? '#bfdbfe' : 'white',
      });
    }
    // Bright stars
    for (let i = 0; i < 20; i++) {
      const size = 2 + Math.random() * 1;
      result.push({
        id: `b${i}`, x: Math.random() * 100, y: Math.random() * 100, size,
        opacity: 0.6 + Math.random() * 0.4,
        twinkle: Math.random() > 0.3,
        dur: 2.5 + Math.random() * 3,
        del: Math.random() * 5,
        color: Math.random() > 0.7 ? '#93c5fd' : 'white',
      });
    }
    return result;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep space subtle gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(15,23,42,0.3) 0%, transparent 60%)',
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: star.color,
            boxShadow: star.size > 1.5 ? `0 0 ${star.size * 3}px rgba(255,255,255,0.3)` : 'none',
          }}
          animate={
            star.twinkle
              ? {
                  opacity: [star.opacity, star.opacity * 0.2, star.opacity, star.opacity * 0.4, star.opacity],
                  scale: [1, 0.7, 1, 0.85, 1],
                }
              : { opacity: star.opacity }
          }
          transition={
            star.twinkle
              ? { duration: star.dur, repeat: Infinity, delay: star.del, ease: 'easeInOut' }
              : { duration: 1.5, delay: Math.random() * 2 }
          }
        />
      ))}

      {/* Shooting star 1 */}
      <motion.div
        className="absolute"
        style={{
          width: 100,
          height: 1,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.8), transparent)',
          top: '18%',
          left: '10%',
          transformOrigin: 'left center',
          rotate: '25deg',
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          x: [0, 300, 500],
          y: [0, 120, 200],
          scaleX: [0, 1, 0.5],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatDelay: 8,
          delay: 3,
          ease: 'easeOut',
        }}
      />

      {/* Shooting star 2 */}
      <motion.div
        className="absolute"
        style={{
          width: 70,
          height: 1,
          background: 'linear-gradient(90deg, rgba(147,197,253,0.8), transparent)',
          top: '35%',
          right: '15%',
          transformOrigin: 'right center',
          rotate: '155deg',
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          x: [0, -250, -400],
          y: [0, 100, 170],
          scaleX: [0, 1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 12,
          delay: 7,
          ease: 'easeOut',
        }}
      />

      {/* Faint nebula */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.5), rgba(139,92,246,0.3), transparent)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}

// ─── Glow Card ─────────────────────────────────────────────
function GlowCard({ children, className = '' }) {
  return (
    <div className={`relative group ${className}`}>
      {/* Static gradient border */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500/30 via-teal-500/20 to-purple-500/30 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Glow behind */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      {/* Card content */}
      <div className="relative rounded-2xl bg-black/80 backdrop-blur-sm p-8 md:p-12 border border-slate-800/30">
        {children}
      </div>
    </div>
  );
}

// ─── Contact Section ───────────────────────────────────────
function ContactSection() {
  return (
    <section id="contact" className="relative min-h-screen bg-black px-6 py-20 flex items-center overflow-hidden">
      <NightSky />

      {/* Subtle top-edge glow transition from previous section */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgb(15,23,42), transparent)' }}
      />

      {/* Background glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.1), transparent)' }}
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={inViewViewport}
          transition={{ duration: 0.8, ease: smoothEase }}
        >
          <GlowCard>
            <div className="text-center">
              {/* Heading with gradient */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewViewport}
                transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              >
                <span className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4 block">
                  Get in touch
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-teal-200 bg-clip-text text-transparent">
                    Let's Build Something
                  </span>
                </h2>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Extraordinary
                  </span>
                </h2>
              </motion.div>

              <motion.p
                className="text-lg mb-10 text-slate-400 max-w-lg mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={inViewViewport}
                transition={{ duration: 0.6, delay: 0.35, ease: smoothEase }}
              >
                Open to opportunities. Whether you have a question or want to discuss potential projects, feel free to reach out.
              </motion.p>

              {/* Email Button with animated gradient */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewViewport}
                transition={{ duration: 0.6, delay: 0.45, ease: smoothEase }}
              >
                <motion.a
                  href="https://mail.google.com/mail/?view=cm&to=nikhilsrivastava174@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg text-white overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2dd4bf)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(45,212,191,0.2)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {/* Shine sweep */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                  />
                  <span className="relative z-10">Send me an Email</span>
                  <ExternalLink size={18} className="relative z-10" />
                </motion.a>
              </motion.div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Social Links — fancy cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {socialLinks.map(({ name, url, icon: Icon }, i) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-5 rounded-xl border border-slate-800/50 bg-black/60 backdrop-blur-sm text-center overflow-hidden transition-colors duration-300 hover:border-blue-500/40"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewViewport}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: smoothEase }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent)' }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <motion.div
                  className="p-3 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-blue-500/30 group-hover:bg-slate-800/80 transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                >
                  <Icon size={24} className="text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
                </motion.div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors duration-300">
                  {name}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewViewport}
          transition={{ duration: 0.6, delay: 1, ease: smoothEase }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent to-slate-700 flex-1 max-w-[100px]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inViewViewport}
              transition={{ duration: 0.8, delay: 1.1, ease: smoothEase }}
              style={{ transformOrigin: 'right' }}
            />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-600">2026</span>
            <motion.div
              className="h-px bg-gradient-to-l from-transparent to-slate-700 flex-1 max-w-[100px]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inViewViewport}
              transition={{ duration: 0.8, delay: 1.1, ease: smoothEase }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
          <p className="text-sm text-slate-500">
            Built with React, Framer Motion & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Portfolio ────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <CursorSparkle />
      <div className={`${bgClass} min-h-screen`}>
        <Navigation activeSection={activeSection} scrollToSection={scrollToSection} hideNav={activeSection === 'contact'} />
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </MotionConfig>
  );
}

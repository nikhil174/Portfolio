import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { smoothEase, inViewTransition, inViewViewport, bgClass, cardClass, springHover } from '../constants';
import {
  socialLinks,
  heroOrbs,
  coreStrengths,
  techStack,
  experiences,
  projects,
  skillGroups,
  achievements,
  EMAIL_URL,
} from '../data/portfolio';

// ─── Floating Orbs Background ──────────────────────────────
export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {heroOrbs.map((orb, i) => (
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

      <motion.div
        className="absolute top-1/2 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)' }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
        transition={{ duration: 3, delay: 0.8, ease: smoothEase }}
      />
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────
export function HeroSection({ scrollToSection }) {
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
            href={EMAIL_URL}
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
              whileHover={{ y: -3, transition: springHover }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────
export function AboutSection() {
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
            <p className="text-sm mt-8 text-slate-400">
              Currently pursuing MCA at IIIT Ranchi | BCA from Prof. Rajendra Singh University
            </p>
          </motion.div>

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
                      <div key={item} className="text-sm text-slate-400">{item}</div>
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

// ─── Experience ────────────────────────────────────────────
export function ExperienceSection() {
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
                {exp.highlights.map((h, i) => (
                  <li key={i} className="text-slate-300">• {h}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                    {t}
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

// ─── Projects ──────────────────────────────────────────────
export function ProjectsSection() {
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
              whileHover={{ y: -6, transition: springHover }}
            >
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="mb-4 leading-relaxed text-slate-400">{project.description}</p>
              <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20">
                <p className="text-blue-400 font-semibold text-sm">{project.metric}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs rounded border border-slate-700 bg-slate-800 text-slate-300">
                    {t}
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

// ─── Skills & Achievements ─────────────────────────────────
export function SkillsSection() {
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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewViewport}
            transition={inViewTransition}
          >
            <h3 className="text-2xl font-bold mb-8">Technical Expertise</h3>
            <div className="space-y-6">
              {skillGroups.map((sg) => (
                <div key={sg.category}>
                  <h4 className="text-blue-400 font-semibold mb-3">{sg.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {sg.skills.map((skill) => (
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewViewport}
            transition={{ ...inViewTransition, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-8">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((a, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inViewViewport}
                  transition={{ ...inViewTransition, delay: idx * 0.08 }}
                  className={`p-4 rounded-lg border transition-colors duration-300 ${cardClass}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-blue-400">{a.award}</h4>
                    <span className="text-xs text-slate-500">{a.year}</span>
                  </div>
                  <p className="text-sm text-slate-400">{a.org}</p>
                  <p className="text-sm mt-2 text-slate-400">{a.desc}</p>
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
function generateStars() {
  const result = [];
  const configs = [
    { prefix: 't', count: 120, sizeMin: 0.5, sizeRange: 0.7, opMin: 0.3, opRange: 0.5, twinkleChance: 0.5, colorChance: 0, color: 'white' },
    { prefix: 's', count: 60, sizeMin: 1.2, sizeRange: 0.8, opMin: 0.4, opRange: 0.6, twinkleChance: 0.6, colorChance: 0.2, color: '#bfdbfe' },
    { prefix: 'b', count: 20, sizeMin: 2, sizeRange: 1, opMin: 0.6, opRange: 0.4, twinkleChance: 0.7, colorChance: 0.3, color: '#93c5fd' },
  ];

  for (const cfg of configs) {
    for (let i = 0; i < cfg.count; i++) {
      const size = cfg.sizeMin + Math.random() * cfg.sizeRange;
      result.push({
        id: `${cfg.prefix}${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        opacity: cfg.opMin + Math.random() * cfg.opRange,
        twinkle: Math.random() < cfg.twinkleChance,
        dur: 2 + Math.random() * 4,
        del: Math.random() * 6,
        color: Math.random() < cfg.colorChance ? cfg.color : 'white',
      });
    }
  }
  return result;
}

export function NightSky() {
  const stars = React.useMemo(generateStars, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(15,23,42,0.3) 0%, transparent 60%)' }}
      />

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
              ? { opacity: [star.opacity, star.opacity * 0.2, star.opacity, star.opacity * 0.4, star.opacity], scale: [1, 0.7, 1, 0.85, 1] }
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
          width: 100, height: 1,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.8), transparent)',
          top: '18%', left: '10%', transformOrigin: 'left center', rotate: '25deg',
        }}
        animate={{ opacity: [0, 1, 1, 0], x: [0, 300, 500], y: [0, 120, 200], scaleX: [0, 1, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 8, delay: 3, ease: 'easeOut' }}
      />

      {/* Shooting star 2 */}
      <motion.div
        className="absolute"
        style={{
          width: 70, height: 1,
          background: 'linear-gradient(90deg, rgba(147,197,253,0.8), transparent)',
          top: '35%', right: '15%', transformOrigin: 'right center', rotate: '155deg',
        }}
        animate={{ opacity: [0, 1, 1, 0], x: [0, -250, -400], y: [0, 100, 170], scaleX: [0, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 12, delay: 7, ease: 'easeOut' }}
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
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500/30 via-teal-500/20 to-purple-500/30 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative rounded-2xl bg-black/80 backdrop-blur-sm p-8 md:p-12 border border-slate-800/30">
        {children}
      </div>
    </div>
  );
}

// ─── Contact ───────────────────────────────────────────────
export function ContactSection() {
  return (
    <section id="contact" className="relative min-h-screen bg-black px-6 py-20 flex items-center overflow-hidden">
      <NightSky />

      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgb(15,23,42), transparent)' }}
      />

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
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={inViewViewport}
          transition={{ duration: 0.8, ease: smoothEase }}
        >
          <GlowCard>
            <div className="text-center">
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

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewViewport}
                transition={{ duration: 0.6, delay: 0.45, ease: smoothEase }}
              >
                <motion.a
                  href={EMAIL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg text-white overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #2dd4bf)' }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(45,212,191,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={springHover}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)' }}
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

        {/* Social cards */}
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
              whileHover={{ y: -6, transition: springHover }}
            >
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
          <p className="text-sm text-slate-500">Built with React, Framer Motion & Tailwind CSS</p>
        </motion.div>
      </div>
    </section>
  );
}

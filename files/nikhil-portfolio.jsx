'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Github, Linkedin, Mail, Download, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const bgClass = isDarkMode ? 'bg-slate-950 text-slate-50' : 'bg-white text-slate-900';
  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 hover:border-blue-500/30'
    : 'bg-slate-50 border-slate-200 hover:border-blue-400';

  // Navigation
  const Navigation = () => (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'
      } ${scrollY > 50 ? 'border-b backdrop-blur-md' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold tracking-tight"
          whileHover={{ letterSpacing: '0.05em' }}
        >
          NS
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.toLowerCase()
                  ? 'text-blue-400'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`md:hidden ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'} border-t`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );

  // Hero Section
  const HeroSection = () => (
    <section
      id="home"
      className={`min-h-screen ${bgClass} flex items-center justify-center px-6 pt-20`}
    >
      <div className="max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-200">
            Backend Software Engineer
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Building systems that handle millions of events. 3+ years crafting reliable, high-performance
            backend infrastructure with expertise in distributed systems, microservices, and scalable architecture.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-xl mx-auto"
        >
          {[
            { label: 'Daily Events', value: '50K+' },
            { label: 'Reliability', value: '99.9%' },
            { label: 'ARR Impact', value: '$300K' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`p-4 rounded-lg border ${cardClass} backdrop-blur`}
            >
              <div className="text-blue-400 font-bold text-2xl">{stat.value}</div>
              <div className={`text-xs mt-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Work
          </motion.button>
          <motion.a
            href="mailto:nikhilsrivastava174@gmail.com"
            className={`px-8 py-3 border rounded-lg font-medium transition-colors ${
              isDarkMode
                ? 'border-slate-700 hover:border-slate-500 hover:bg-slate-900'
                : 'border-slate-300 hover:border-slate-400 hover:bg-slate-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>
    </section>
  );

  // About Section
  const AboutSection = () => (
    <section
      id="about"
      className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'} px-6 py-20`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 tracking-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              I'm a backend engineer passionate about building systems that scale. With 3+ years at cutting-edge
              startups, I've designed and shipped platforms handling massive event throughputs with near-perfect reliability.
            </p>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-400">Core Strengths</h3>
              {[
                'Distributed Systems & Microservices',
                'Event-Driven Architecture',
                'System Design & Scalability',
                'High-Performance APIs',
                'Infrastructure & DevOps',
              ].map((strength) => (
                <div key={strength} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{strength}</span>
                </div>
              ))}
            </div>
            <p className={`text-sm mt-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Currently pursuing MCA at IIIT Ranchi | BCA from Prof. Rajendra Singh University
            </p>
          </motion.div>

          {/* Right Column - Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 text-blue-400">Tech Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { category: 'Languages', items: ['Java', 'Node.js', 'Python', 'JavaScript'] },
                { category: 'Backend', items: ['Spring Boot', 'Microservices', 'Kafka', 'REST APIs'] },
                { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
                { category: 'DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'] },
              ].map((group) => (
                <div key={group.category} className={`p-4 rounded-lg border ${cardClass}`}>
                  <h4 className="font-semibold text-blue-400 mb-3 text-sm">{group.category}</h4>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
                      >
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

  // Experience Section
  const ExperienceSection = () => (
    <section id="experience" className={`min-h-screen ${bgClass} px-6 py-20`}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 tracking-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <div className="space-y-12">
          {[
            {
              company: 'Vymo Technologies',
              role: 'Solutions Engineer (Backend)',
              duration: 'May 2024 – Present',
              location: 'Bengaluru, India',
              highlights: [
                'Built AI calling system processing 50K+ daily interactions, reducing manual effort by 75%',
                'Designed event-driven workflow system handling 40-50K events daily with 99% reliability',
                'Scaled backend services powering goals, leaderboards for 20K+ users',
                'Built monitoring service improving observability, reducing downtime by 30%',
              ],
              tech: ['Python', 'Java', 'Kafka', 'Redis', 'AWS', 'Kubernetes'],
            },
            {
              company: 'Faclon Labs',
              role: 'Software Backend Developer',
              duration: 'July 2022 – December 2023',
              location: 'Mumbai, India (Remote)',
              highlights: [
                'Designed Meter Offset system with automated calculations and secure RBAC/OAuth',
                'Built scalable AMR billing platform handling high-volume IoT consumption tracking',
                'Created high-performance device dashboard improving efficiency by 20-25%',
                'Led zero-downtime migration of 500K+ device records maintaining 100% data integrity',
              ],
              tech: ['Node.js', 'MongoDB', 'RabbitMQ', 'OAuth 2.0', 'InfluxDB'],
            },
          ].map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`border-l-2 border-blue-500 pl-8 pb-12`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <p className="text-blue-400 font-semibold">{exp.company}</p>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {exp.duration}
                </div>
              </div>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {exp.location}
              </p>
              <ul className="space-y-2 mb-6">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    • {highlight}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-xs rounded-full border ${
                      isDarkMode
                        ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                        : 'border-blue-400/30 bg-blue-50 text-blue-600'
                    }`}
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

  // Projects Section
  const ProjectsSection = () => (
    <section
      id="projects"
      className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'} px-6 py-20`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 tracking-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'AI Calling System',
              description:
                'Event-driven agentic architecture processing 50K+ daily interactions with lead qualification, meeting scheduling, and CRM integration.',
              metric: '50K+ Daily Interactions',
              tech: ['Python', 'Java', 'Event-Driven', 'MCP'],
            },
            {
              title: 'Showman Platform',
              description:
                'High-throughput data platform serving internal teams, processing 10K+ records daily with near-perfect uptime.',
              metric: '99%+ Uptime',
              tech: ['Java', 'Microservices', 'Kafka', 'MySQL'],
            },
            {
              title: 'Meter Offset System',
              description:
                'Automated offset calculations with secure RBAC/OAuth flows, audit logs, and full traceability across operations.',
              metric: '100% Data Integrity',
              tech: ['Node.js', 'OAuth 2.0', 'Design Patterns'],
            },
            {
              title: 'AMR Billing Platform',
              description:
                'Scalable billing system for IoT water consumption tracking with JWT authentication, invoicing, and real-time analytics.',
              metric: 'High-Volume Processing',
              tech: ['Node.js', 'MongoDB', 'IoT', 'Real-time Analytics'],
            },
          ].map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`border rounded-lg p-6 ${cardClass} transition-all duration-300 hover:shadow-lg`}
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {project.description}
              </p>
              <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20">
                <p className="text-blue-400 font-semibold text-sm">{project.metric}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 text-xs rounded border ${
                      isDarkMode
                        ? 'border-slate-700 bg-slate-800 text-slate-300'
                        : 'border-slate-300 bg-white text-slate-600'
                    }`}
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

  // Skills Section
  const SkillsSection = () => (
    <section id="skills" className={`min-h-screen ${bgClass} px-6 py-20`}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 tracking-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Skills & Achievements
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Technical Expertise</h3>
            <div className="space-y-6">
              {[
                { category: 'Languages', skills: ['Java', 'Node.js', 'JavaScript', 'Python'] },
                {
                  category: 'Backend & Architecture',
                  skills: ['Spring Boot', 'Design Patterns', 'Microservices', 'REST APIs', 'Kafka', 'Event-driven Architecture'],
                },
                {
                  category: 'Databases & Infrastructure',
                  skills: ['PostgreSQL/MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'AWS', 'Docker', 'Jenkins', 'Kubernetes'],
                },
              ].map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h4 className="text-blue-400 font-semibold mb-3">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className={`px-3 py-2 text-sm rounded-lg border ${
                          isDarkMode
                            ? 'bg-slate-800 border-slate-700 text-slate-300'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Achievements</h3>
            <div className="space-y-4">
              {[
                {
                  award: 'Lightning Bolt Team Award',
                  org: 'Vymo Technologies',
                  year: '2024',
                  desc: 'High-impact backend and automation platforms',
                },
                {
                  award: 'Employee Excellence Award',
                  org: 'Faclon Labs',
                  year: '2023',
                  desc: 'Owning and shipping billing and reporting systems',
                },
                {
                  award: 'DSA Mastery',
                  org: 'GeeksForGeeks & Crio.do',
                  year: '2024',
                  desc: '650+ Data Structures & Algorithms problems solved',
                },
              ].map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-lg border ${cardClass}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-blue-400">{achievement.award}</h4>
                    <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                      {achievement.year}
                    </span>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {achievement.org}
                  </p>
                  <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {achievement.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Contact Section
  const ContactSection = () => (
    <section
      id="contact"
      className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'} px-6 py-20 flex items-center`}
    >
      <div className="max-w-2xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className={`text-lg mb-12 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Open to opportunities. Whether you have a question or want to discuss potential projects, feel free to reach out.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <motion.a
              href="mailto:nikhilsrivastava174@gmail.com"
              className={`inline-block px-8 py-4 rounded-lg border-2 border-blue-500 bg-blue-500 text-white font-semibold text-lg transition-all`}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Send me an Email
            </motion.a>

            {/* Social Links */}
            <div className="flex justify-center gap-6 pt-8">
              {[
                {
                  name: 'LinkedIn',
                  url: 'https://linkedin.com/in/nikhilsrivastava174',
                  icon: Linkedin,
                },
                {
                  name: 'GitHub',
                  url: 'https://github.com',
                  icon: Github,
                },
              ].map(({ name, url, icon: Icon }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-lg border ${cardClass} transition-all`}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className={`mt-16 pt-8 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
            © 2024 Nikhil Srivastava. Built with React, Framer Motion & Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </section>
  );

  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-300`}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}

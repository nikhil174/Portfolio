import { Github, Linkedin, Code2 } from 'lucide-react';

// ─── Social Links ──────────────────────────────────────────
export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/nikhil174', icon: Github },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nikhilsrivastava174', icon: Linkedin },
  { name: 'LeetCode', url: 'https://leetcode.com/u/nikhil174/', icon: Code2 },
];

// ─── Navigation ────────────────────────────────────────────
export const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export const sectionIds = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];

// ─── Contact ───────────────────────────────────────────────
export const EMAIL_URL = 'https://mail.google.com/mail/?view=cm&to=nikhilsrivastava174@gmail.com';

// ─── Hero Orbs ─────────────────────────────────────────────
export const heroOrbs = [
  { size: 350, x: '15%', y: '20%', color: 'from-blue-500/20 to-blue-600/5', duration: 18, delay: 0 },
  { size: 280, x: '75%', y: '60%', color: 'from-teal-400/15 to-cyan-500/5', duration: 22, delay: 2 },
  { size: 200, x: '60%', y: '15%', color: 'from-indigo-500/15 to-purple-500/5', duration: 20, delay: 4 },
  { size: 160, x: '25%', y: '70%', color: 'from-blue-400/10 to-teal-400/5', duration: 25, delay: 1 },
];

// ─── About — Core Strengths ────────────────────────────────
export const coreStrengths = [
  'Distributed Systems & Microservices',
  'Event-Driven Architecture',
  'System Design & Scalability',
  'High-Performance APIs',
  'Infrastructure & DevOps',
];

export const techStack = [
  { category: 'Languages', items: ['Java', 'Node.js', 'Python', 'JavaScript'] },
  { category: 'Backend', items: ['Spring Boot', 'Microservices', 'Kafka', 'REST APIs'] },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
  { category: 'DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'] },
];

// ─── Experience ────────────────────────────────────────────
export const experiences = [
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
];

// ─── Projects ──────────────────────────────────────────────
export const projects = [
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
];

// ─── Skills & Achievements ─────────────────────────────────
export const skillGroups = [
  { category: 'Languages', skills: ['Java', 'Node.js', 'JavaScript', 'Python'] },
  { category: 'Frontend', skills: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'] },
  {
    category: 'Backend & Architecture',
    skills: ['Spring Boot', 'Design Patterns', 'Microservices', 'REST APIs', 'Kafka', 'Event-driven Architecture'],
  },
  {
    category: 'Databases & Infrastructure',
    skills: ['PostgreSQL/MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'AWS', 'Docker', 'Jenkins', 'Kubernetes'],
  },
];

export const achievements = [
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
];

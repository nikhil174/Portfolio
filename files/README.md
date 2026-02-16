# Nikhil Srivastava - Professional Portfolio

A modern, production-grade portfolio website showcasing 3+ years of backend engineering expertise with distributed systems, microservices, and scalable architecture.

## Features

✨ **Design Excellence**
- Dark/light mode toggle for accessibility
- Premium minimalist aesthetic with refined typography
- Smooth scroll animations and micro-interactions
- Responsive design (mobile, tablet, desktop)
- High-performance, clean codebase

🎯 **Key Sections**
- **Hero**: Animated introduction with impact metrics
- **About**: Professional summary with core strengths and tech stack
- **Experience**: Interactive timeline with detailed role highlights
- **Projects**: Featured projects with metrics and tech stacks
- **Skills**: Comprehensive technical expertise and achievements
- **Contact**: Direct email and social links

📊 **Impact-Focused**
- Highlights key metrics: 50K+ daily events, 99.9% reliability, $300K ARR impact
- Emphasizes scalability and system performance
- Shows tangible business outcomes

## Technology Stack

**Frontend Framework**
- React (functional components with hooks)
- Next.js 13+ (App Router recommended)

**Styling & Animation**
- Tailwind CSS (core utilities only)
- Framer Motion (smooth animations and interactions)

**Icons**
- Lucide React

**Deployment**
- Vercel (recommended for Next.js)
- Netlify or any static host

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm/yarn
- Basic knowledge of React and Tailwind CSS

### Installation

1. **Create a Next.js project** (if starting fresh):
```bash
npx create-next-app@latest nikhil-portfolio --typescript --tailwind
cd nikhil-portfolio
```

2. **Install dependencies**:
```bash
npm install framer-motion lucide-react
```

3. **Add the portfolio component**:
   - Copy `nikhil-portfolio.jsx` into your `app/page.js` or `pages/index.js`
   - Replace the default content

4. **Update Tailwind config** (if needed):
   Ensure `tailwind.config.js` includes:
   ```js
   theme: {
     extend: {
       colors: {
         slate: require('tailwindcss/colors').slate
       }
     }
   }
   ```

5. **Run locally**:
```bash
npm run dev
```
Visit `http://localhost:3000`

## Customization Guide

### Colors
- **Primary Blue**: `#3B82F6` → Adjust in gradient classes
- **Dark Background**: `slate-950` → Change to your preference
- **Card Background**: `slate-900` → Modify for light/dark mode

**To customize colors globally**, update Tailwind config:
```js
theme: {
  colors: {
    primary: '#3B82F6',
    dark: '#0A1929'
  }
}
```

### Content Updates

**Hero Section**
- Update tagline in `HeroSection` component
- Modify impact stats in the stats grid

**Experience**
- Edit the experience array in `ExperienceSection`
- Add/remove roles, companies, highlights

**Projects**
- Update project details in `ProjectsSection`
- Add new project cards to the array

**Skills**
- Modify skill categories in `SkillsSection`
- Update achievements and awards

**Links**
- Replace LinkedIn URL: `linkedin.com/in/nikhilsrivastava174`
- Add GitHub URL
- Update email: `nikhilsrivastava174@gmail.com`

### Typography
Currently using system fonts (Inter via Tailwind defaults):
- **Headings**: Bold, tracking-tight
- **Body**: Regular weight, leading-relaxed
- **Code/Monospace**: SF Mono (via Tailwind)

To use custom fonts:
1. Import from Google Fonts in `layout.js`:
```js
import { Inter, Space_Mono } from 'next/font/google';
```
2. Apply to HTML element

### Animations
All animations use Framer Motion. Adjust animation values in:
- `initial`: Starting state
- `animate`: End state
- `transition`: Duration and delay
- `whileHover`: Hover interactions

Example: Make animations faster
```jsx
transition={{ duration: 0.4 }} // default is 0.8
```

## Performance Optimization

✅ **Already Optimized**
- Code-split components
- Lazy-loaded sections with `whileInView`
- CSS-only hover effects where possible
- Minimal JavaScript footprint

**Further Optimization**
- Use Next.js Image optimization for profile picture
- Enable ISR (Incremental Static Regeneration)
- Minify CSS (Tailwind handles this)
- Use dynamic imports for heavy components

## SEO & Meta Tags

Add to `layout.js` or `next.config.js`:
```jsx
export const metadata = {
  title: 'Nikhil Srivastava - Backend Software Engineer',
  description: 'Portfolio of Nikhil Srivastava, backend engineer specializing in distributed systems and scalable architecture.',
  keywords: ['backend engineer', 'java', 'microservices', 'distributed systems'],
  robots: 'index, follow',
  openGraph: {
    title: 'Nikhil Srivastava',
    description: 'Backend Software Engineer | 3+ years experience',
    url: 'https://yourportfolio.com'
  }
}
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel dashboard
3. Deploy (automatic on push to main)

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next` (if using Next.js)

### Custom Domain
- Update DNS records to point to your hosting provider
- Add domain in hosting dashboard

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Lighthouse Metrics

Target scores:
- **Performance**: >90
- **Accessibility**: >95
- **Best Practices**: >95
- **SEO**: >95

## File Structure

```
project/
├── app/
│   ├── layout.js       # Metadata & providers
│   ├── page.js         # Portfolio component
│   └── globals.css     # Tailwind imports
├── public/
│   └── favicon.ico
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Accessibility Features

✅ Semantic HTML (nav, section, article)
✅ ARIA labels on interactive elements
✅ Keyboard navigation support
✅ Color contrast ratios meet WCAG AA
✅ Focus states on all interactive elements
✅ Dark mode reduces eye strain

## Troubleshooting

**Animations not working?**
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check browser DevTools for errors

**Styling issues?**
- Verify Tailwind CSS is configured
- Clear `.next` build cache: `rm -rf .next && npm run dev`

**Mobile layout broken?**
- Check responsive breakpoints (md: for tablet+)
- Test with browser DevTools device emulation

## Future Enhancements

- Add blog section with MDX
- Integrate GitHub API to show live projects
- Add contact form with email service
- Add resume download functionality
- Implement scroll progress indicator
- Add dark mode system preference detection

## License

MIT - Feel free to use and modify for your needs

## Contact

Built for Nikhil Srivastava
- Email: nikhilsrivastava174@gmail.com
- LinkedIn: linkedin.com/in/nikhilsrivastava174

---

**Last Updated**: February 2026
**React Version**: 18+
**Next.js Version**: 13+
**Node.js Version**: 16+

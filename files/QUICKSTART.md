# Quick Start Guide - Nikhil's Portfolio

## 5-Minute Setup

### Option 1: Use in Next.js Project (Recommended)

```bash
# 1. Create Next.js project
npx create-next-app@latest nikhil-portfolio --typescript --tailwind

# 2. Install required packages
cd nikhil-portfolio
npm install framer-motion lucide-react

# 3. Replace app/page.js with the portfolio component
# Copy content from nikhil-portfolio.jsx to app/page.js

# 4. Run development server
npm run dev
```

Visit: `http://localhost:3000`

### Option 2: Deploy Directly to Vercel

1. Create a GitHub repository with the Next.js project
2. Go to [vercel.com](https://vercel.com)
3. Import the GitHub repository
4. Vercel auto-detects Next.js configuration
5. Deploy with one click
6. Add custom domain in Vercel dashboard

### Option 3: Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

## Customization Checklist

- [ ] Update name and headline in hero section
- [ ] Change email address to your email
- [ ] Update LinkedIn URL
- [ ] Modify experience roles and companies
- [ ] Update project descriptions and metrics
- [ ] Add/remove skills as needed
- [ ] Update achievements and awards
- [ ] Change color scheme if desired
- [ ] Test on mobile devices
- [ ] Check all links work correctly

## Essential File Changes

### 1. Email Address
Search for `nikhilsrivastava174@gmail.com` and replace with your email

### 2. LinkedIn URL
Update in Contact Section:
```jsx
url: 'https://linkedin.com/in/YOUR_USERNAME'
```

### 3. Experience
Modify the experience array in `ExperienceSection`:
```jsx
{
  company: 'Your Company',
  role: 'Your Role',
  duration: 'Jan 2024 – Present',
  location: 'City, Country',
  highlights: [
    'Your achievement 1',
    'Your achievement 2'
  ],
  tech: ['Tech1', 'Tech2']
}
```

### 4. Projects
Update the projects array in `ProjectsSection` with your projects

### 5. Skills
Modify skill categories in `SkillsSection`

## Color Customization

### Change Primary Color (Blue → Green)
Find all `blue-` classes and replace with `green-`:
```
blue-400 → green-400
blue-500 → green-500
blue-5X0/10 → green-5X0/10
```

### Change Dark Mode Shade
- `slate-950` → `gray-950` or `zinc-950`
- `slate-900` → `gray-900` or `zinc-900`
- `slate-800` → `gray-800` or `zinc-800`

## Performance Tips

1. **Optimize Images**: Use Next.js Image component
2. **Add Meta Tags**: Update in `layout.js` for SEO
3. **Enable Compression**: Vercel does this automatically
4. **Lazy Load Sections**: Already implemented with Framer Motion
5. **Minify CSS**: Tailwind handles this

## Testing Checklist

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile (iPhone, Android)
- [ ] Test dark/light mode toggle
- [ ] Test all navigation links
- [ ] Test email and social links
- [ ] Check all animations work smoothly
- [ ] Verify responsive design
- [ ] Test on slow 3G network

## Common Issues & Solutions

### Issue: "Module not found: framer-motion"
**Solution**: `npm install framer-motion`

### Issue: Tailwind styles not applying
**Solution**: Verify `tailwind.config.js` and restart dev server

### Issue: Animations lag on mobile
**Solution**: Reduce animation duration or disable on mobile:
```jsx
const isMobile = window.innerWidth < 768;
transition={{ duration: isMobile ? 0.2 : 0.8 }}
```

### Issue: Dark mode toggle doesn't persist
**Solution**: Add localStorage persistence:
```jsx
useEffect(() => {
  const saved = localStorage.getItem('darkMode');
  if (saved) setIsDarkMode(JSON.parse(saved));
}, []);
```

## SEO Optimization

Add to your `layout.js`:
```jsx
export const metadata = {
  title: 'Nikhil Srivastava - Backend Software Engineer',
  description: 'Backend engineer with 3+ years experience in distributed systems, microservices, and scalable architecture.',
  keywords: 'backend engineer, java, microservices, distributed systems',
};
```

## Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Follow DNS configuration steps

### Custom Email
Use services like:
- **Zoho Mail** (free tier available)
- **Gmail** (forward from custom domain)
- **AWS SES** (send only)

## Monitoring & Analytics

Add Google Analytics:
```jsx
// In layout.js
import Script from 'next/script';

<Script
  strategy="afterInteractive"
  src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"
/>
```

## Next Steps

1. ✅ Deploy to Vercel/Netlify
2. ✅ Add custom domain
3. ✅ Set up analytics
4. ✅ Share portfolio link
5. ✅ Monitor engagement

## Need Help?

- **Framer Motion Docs**: https://www.framer.com/motion/
- **Tailwind CSS Docs**: https://tailwindcss.com/
- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev/

---

**Ready to deploy?** Follow the setup steps above and you'll have your portfolio live in minutes! 🚀

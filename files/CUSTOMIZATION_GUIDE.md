# Customization Guide

## Quick Customizations

### 1. Change Primary Color (Blue → Your Color)

**Option A: Global Color Change**

In `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#your-color-here',
    }
  }
}
```

Then replace all `blue-` classes with `primary` classes.

**Option B: Search and Replace**

Find all instances of:
- `blue-400` → `green-400` (or your color)
- `blue-500` → `green-500`
- `blue-500/10` → `green-500/10`
- `blue-500/30` → `green-500/30`
- `blue-600` → `green-600`

### 2. Change Dark/Light Theme Defaults

**Make Light Mode Default:**
```jsx
const [isDarkMode, setIsDarkMode] = useState(false); // Changed from true

// In dark mode class check
const bgClass = isDarkMode ? 'bg-slate-950 text-slate-50' : 'bg-white text-slate-900';
```

**Change Dark Background Color:**
```jsx
// From slate-950/900 to zinc-950/900
className={`min-h-screen ${isDarkMode ? 'bg-zinc-950 text-zinc-50' : '...'}`}
```

### 3. Add Custom Fonts

In `app/layout.js`:
```jsx
import { Poppins, Space_Mono } from 'next/font/google';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '600', '700']
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700']
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={spaceMono.className}>
        {children}
      </body>
    </html>
  );
}
```

Then update `tailwind.config.js`:
```js
fontFamily: {
  sans: ['var(--font-poppins)', 'sans-serif'],
  mono: ['var(--font-space-mono)', 'monospace'],
}
```

### 4. Add Profile Picture to Hero

```jsx
<div className="mb-8">
  <img 
    src="/profile.jpg" 
    alt="Nikhil Srivastava" 
    className="w-24 h-24 rounded-full border-2 border-blue-500 mx-auto"
  />
</div>
```

### 5. Update Impact Stats

In `HeroSection`, modify the stats array:
```jsx
{[
  { label: 'Projects Built', value: '15+' },
  { label: 'GitHub Stars', value: '500+' },
  { label: 'Clients Served', value: '20+' },
].map((stat) => (...))}
```

### 6. Add GitHub Contributions Graph

```jsx
<div className="mt-8 p-4 rounded-lg border border-slate-800">
  <h4 className="font-semibold mb-4">Recent Activity</h4>
  <img 
    src="https://ghchart.rshah.org/3b82f6/nikhilsrivastava174"
    alt="GitHub Activity"
    className="w-full"
  />
</div>
```

### 7. Change Animation Speed

**Make animations faster:**
```jsx
transition={{ duration: 0.3 }} // was 0.8
```

**Disable animations for mobile:**
```jsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

<motion.div
  transition={{ duration: isMobile ? 0 : 0.8 }}
>
```

### 8. Add Copy Email Button

Replace email link with:
```jsx
const [copied, setCopied] = useState(false);

const copyEmail = () => {
  navigator.clipboard.writeText('nikhilsrivastava174@gmail.com');
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

<motion.button
  onClick={copyEmail}
  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg"
>
  {copied ? '✓ Email Copied!' : 'Copy Email'}
</motion.button>
```

### 9. Add Blog Section

```jsx
const BlogSection = () => (
  <section id="blog" className="min-h-screen bg-slate-900 px-6 py-20">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-16">Latest Articles</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            title: 'Building Scalable Event-Driven Systems',
            date: 'Mar 15, 2024',
            excerpt: 'How to design event-driven architectures...',
            slug: 'scalable-events'
          },
          // Add more articles
        ].map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="border border-slate-800 p-6 rounded-lg hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{post.date}</p>
            <p className="text-slate-300">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
);
```

### 10. Add Testimonials Section

```jsx
const TestimonialsSection = () => (
  <section className="bg-slate-900 px-6 py-20">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-16">What Others Say</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            quote: 'Nikhil built a system that scaled seamlessly...',
            author: 'CEO Name',
            role: 'Company Name',
            image: '/testimonial1.jpg'
          },
        ].map((test, idx) => (
          <div key={idx} className="p-6 border border-slate-800 rounded-lg">
            <p className="text-slate-300 mb-4">"{test.quote}"</p>
            <div className="flex items-center gap-4">
              <img 
                src={test.image} 
                alt={test.author}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{test.author}</p>
                <p className="text-sm text-slate-400">{test.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
```

### 11. Add Dark/Light Mode Persistence

```jsx
useEffect(() => {
  // Save to localStorage
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
}, [isDarkMode]);

useEffect(() => {
  // Load from localStorage
  const saved = localStorage.getItem('darkMode');
  if (saved) {
    setIsDarkMode(JSON.parse(saved));
  }
}, []);
```

### 12. Add Resume Download

```jsx
<motion.a
  href="/resume.pdf"
  download="Nikhil_Srivastava_Resume.pdf"
  className="px-8 py-3 bg-blue-500 text-white rounded-lg flex items-center gap-2"
  whileHover={{ scale: 1.05 }}
>
  <Download size={20} />
  Download Resume
</motion.a>
```

### 13. Add Form Validation (Contact)

```jsx
const [formData, setFormData] = useState({ name: '', email: '', message: '' });
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.name.trim()) newErrors.name = 'Name is required';
  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    newErrors.email = 'Invalid email';
  }
  if (!formData.message.trim()) newErrors.message = 'Message is required';
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  // Send form via email service
  // Example: EmailJS, SendGrid, etc.
};
```

### 14. Add Search/Filter to Projects

```jsx
const [searchTerm, setSearchTerm] = useState('');

const filteredProjects = projects.filter(p =>
  p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  p.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
);

<input
  type="text"
  placeholder="Search projects..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full px-4 py-2 rounded-lg border border-slate-800 bg-slate-900"
/>
```

### 15. Add Analytics Events

```jsx
const trackEvent = (eventName, params = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Usage
<button onClick={() => {
  trackEvent('view_project', { project_name: 'Showman' });
  // ... button action
}}>
  View Project
</button>
```

## Advanced Customizations

### Add Dark Mode Toggle to Navigation

Already included! But to customize:

```jsx
const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
  document.documentElement.classList.toggle('dark');
};
```

### Add Smooth Scroll Indicator

```jsx
const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    setScrollProgress(progress);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// In navigation
<div 
  className="h-1 bg-blue-500 fixed bottom-0 left-0"
  style={{ width: `${scrollProgress}%` }}
/>
```

### Add Page Transition Animation

```jsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  <motion.div
    key={currentPage}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* Page content */}
  </motion.div>
</AnimatePresence>
```

### Add Lazy Loading Images

```jsx
const LazyImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    let img;

    if (imageRef && imageSrc === null) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(imageRef);
    }

    return () => observer?.disconnect();
  }, [imageRef, imageSrc, src]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className="w-full"
    />
  );
};
```

---

**Pro Tips:**
- Always test changes in dark AND light modes
- Use browser DevTools to inspect responsive behavior
- Check console for React warnings
- Test animations on slower devices (Chrome DevTools throttling)
- Validate HTML/CSS with W3C validators

// app/layout.js
import './globals.css';
import { Metadata } from 'next';

export const metadata = {
  title: 'Nikhil Srivastava - Backend Software Engineer',
  description:
    'Backend engineer with 3+ years experience building scalable distributed systems, microservices, and high-performance infrastructure. Java, Spring Boot, Node.js, Kafka, AWS.',
  keywords: [
    'backend engineer',
    'java developer',
    'microservices',
    'distributed systems',
    'spring boot',
    'kafka',
    'nodejs',
    'aws',
    'scalability',
  ],
  authors: [{ name: 'Nikhil Srivastava' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Nikhil Srivastava - Backend Software Engineer',
    description: 'Building systems that handle millions of events. 3+ years of distributed systems expertise.',
    url: 'https://nikhilsrivastava.dev',
    siteName: 'Nikhil Srivastava Portfolio',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikhil Srivastava - Backend Software Engineer',
    description: 'Building scalable distributed systems and microservices.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0A1929" />
        <link rel="canonical" href="https://nikhilsrivastava.dev" />
        
        {/* Preload fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className="bg-slate-950 text-slate-50">
        {/* Prevent layout shift */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}

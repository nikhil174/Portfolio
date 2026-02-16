// ─── Shared Animation Constants ────────────────────────────
export const smoothEase = [0.22, 1, 0.36, 1];

export const inViewTransition = { duration: 0.6, ease: smoothEase };

export const inViewViewport = { once: true, amount: 0.15 };

export const springTap = { type: 'spring', stiffness: 400, damping: 17 };

export const springHover = { type: 'spring', stiffness: 300, damping: 15 };

// ─── Shared Theme Classes ──────────────────────────────────
export const bgClass = 'bg-slate-950 text-slate-50';

export const cardClass = 'bg-slate-900 border-slate-800 hover:border-blue-500/30';

// ─── Cursor Trail Config ───────────────────────────────────
export const TRAIL_SPEED_THRESHOLD = 35;
export const TRAIL_LIFETIME_MS = 350;
export const SPARKLE_THROTTLE_MS = 90;
export const SPARKLE_LIFETIME_MS = 600;

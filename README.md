# Nikhil Srivastava Portfolio (React + Vite)

This repository is now a standard React project using Vite + Tailwind CSS.

## Local Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

Build output is generated in `dist/`.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Use the root directory `/` as project root.
4. Vercel should auto-detect Vite. If needed, set:

- Build Command: `npm run build`
- Output Directory: `dist`

5. Click **Deploy**.

`vercel.json` is already added for SPA routing and Vite build output.

## Project Structure

- `index.html`
- `src/main.jsx`
- `src/App.jsx`
- `src/index.css`
- `tailwind.config.js`
- `postcss.config.js`
- `vite.config.js`
- `vercel.json`

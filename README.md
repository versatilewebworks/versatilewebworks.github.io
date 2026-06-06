# versatilewebworks.online

A mobile-first serverless typing practice SaaS rebuilt with Next.js, Tailwind CSS, and TypeScript.

## Features

- Language selection with English, Spanish, French, and German practice text.
- Paste-blocked practice and typing inputs for honest training.
- AI-style generated practice passages and speech playback.
- Automatic listen-while-typing mode.
- Live WPM, accuracy, elapsed time, and mistakes tracking.

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000 in your browser.

## Deployment

This repo is ready for Vercel deployment. Configure `versatilewebworks.online` in the Vercel dashboard to point to this project and ensure DNS is directed at Vercel.

The `vercel.json` file is included so Vercel builds the Next.js app correctly.

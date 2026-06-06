import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Versatile WebWorks | Productivity Utilities',
  description: 'Versatile WebWorks delivers polished web utilities and productivity tools for modern professionals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

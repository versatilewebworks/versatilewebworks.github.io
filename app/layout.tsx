import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stenotypist Practice | Versatile WebWorks',
  description: 'Mobile-first, serverless typing practice for stenotypists powered by Next.js and Tailwind CSS.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

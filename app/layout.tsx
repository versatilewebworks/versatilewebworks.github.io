import type { Metadata } from 'next';
import './globals.css';
import AuthHeader from '../components/AuthHeader';

export const metadata: Metadata = {
  title: 'Versatile WebWorks | Productivity Utilities',
  description: 'Versatile WebWorks delivers polished web utilities and productivity tools for modern professionals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthHeader />
        {children}
      </body>
    </html>
  );
}

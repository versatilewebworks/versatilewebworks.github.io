import type { Metadata } from 'next';
import './globals.css';
import AuthHeader from '../components/AuthHeader';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Versatile WebWorks | Productivity Utilities',
  description: 'Versatile WebWorks delivers polished web utilities and productivity tools for modern professionals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthHeader />
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ActionPulse — AI Account Intelligence & Daily Action Copilot',
  description: 'Autonomous B2B account intelligence, change signal detection, deterministic scoring, and contextual outreach.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-slate-200">
        {children}
      </body>
    </html>
  );
}

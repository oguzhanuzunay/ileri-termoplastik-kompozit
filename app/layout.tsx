import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Recycled Carbon Panel - High Performance Sustainable Materials',
  description:
    'High-performance carbon panels derived from aerospace scrap, ready for your next lightweight project.',
  openGraph: {
    title: 'Recycled Carbon Panel - High Performance Sustainable Materials',
    description:
      'High-performance carbon panels derived from aerospace scrap, ready for your next lightweight project.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'tr_TR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

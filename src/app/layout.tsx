import type { Metadata } from 'next';
import { Geist, Geist_Mono, Mr_Dafoe } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const mrDafoe = Mr_Dafoe({
  variable: '--font-mr-dafoe',
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'StepUp | Sneakers for Everyday Adventure',
  description: 'Find your perfect sneakers at StepUp — built for comfort and designed for style.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mrDafoe.variable} antialiased`}
      >
        <Layout>{children}</Layout>
        <Toaster position="bottom-left" />
      </body>
    </html>
  );
}

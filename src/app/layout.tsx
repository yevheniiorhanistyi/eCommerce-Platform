import type { Metadata } from 'next';
import { Montserrat, Mr_Dafoe } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
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
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body className={`${montserrat.variable} ${mrDafoe.variable} antialiased`}>
        <Layout>{children}</Layout>
        <Toaster position="bottom-left" />
      </body>
    </html>
  );
}

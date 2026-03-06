import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { I18nProvider } from '@/context/I18nContext';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Golden Key Car Rental | Luxury Car Rental in Dubai',
  description: 'Dubai\'s premier luxury car rental service. Choose from 200+ premium vehicles. Instant booking, transparent pricing, and 24/7 support. Book now!',
  keywords: 'car rental dubai, luxury car rental dubai, rent a car dubai, golden key car rental',
  openGraph: {
    title: 'Golden Key Car Rental | Luxury Car Rental in Dubai',
    description: 'Dubai\'s premier luxury car rental service. Choose from 200+ premium vehicles.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <I18nProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#12121a',
                  color: '#f8f8f8',
                  border: '1px solid rgba(201,162,39,0.3)',
                },
                success: {
                  iconTheme: { primary: '#c9a227', secondary: '#000' },
                },
              }}
            />
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

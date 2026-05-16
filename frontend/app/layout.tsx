import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/src/lib/authContext';

export const metadata: Metadata = {
  title: 'AUTO REPUBLIC MANAGER',
  description: 'Plateforme de gestion showroom et garage automobile',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

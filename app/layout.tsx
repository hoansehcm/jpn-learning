import type { Metadata } from 'next';
import './globals.css';
import { Be_Vietnam_Pro, Libre_Baskerville, JetBrains_Mono } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const sans = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const serif = Libre_Baskerville({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  weight: ['400', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'NihongoMaster | Studio học tiếng Nhật từ N5 đến N1',
  description: 'Nền tảng học tiếng Nhật với từ vựng, ngữ pháp, kanji, flashcard và lộ trình JLPT rõ ràng.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${sans.variable} ${serif.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

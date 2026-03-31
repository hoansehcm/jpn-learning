import type { Metadata } from 'next';
import './globals.css';
import { Inter, Lora, JetBrains_Mono } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
});

const lora = Lora({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'NihongoMaster - Sổ tay học tiếng Nhật',
  description: 'Nền tảng học tiếng Nhật toàn diện từ N5 đến N1 với phong cách sổ tay ghi chép.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#fdfbf7] text-[#2c2c2c] font-sans antialiased flex flex-col min-h-screen selection:bg-indigo-200 selection:text-indigo-900">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

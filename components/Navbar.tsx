'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import {
  Book,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Mic,
  Shield,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import GlobalSearch from './GlobalSearch';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Từ vựng', href: '/vocabulary', icon: BookOpen },
  { name: 'Ngữ pháp', href: '/grammar', icon: BrainCircuit },
  { name: 'Kanji', href: '/kanji', icon: GraduationCap },
  { name: 'Giao tiếp', href: '/speaking', icon: Mic },
  { name: 'Sổ tay', href: '/notebooks', icon: Book },
  { name: 'Ôn tập', href: '/flashcards', icon: Sparkles },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, userProfile, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 pt-3">
      <div className="surface-panel max-w-7xl mx-auto rounded-[28px] px-4 sm:px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-8 min-w-0">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-2xl bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center shadow-lg shadow-orange-900/10">
              <span className="font-bold text-lg">日</span>
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="font-serif text-lg font-bold leading-none">NihongoMaster</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-soft mt-1">Learning Studio</p>
            </div>
          </Link>

          {user && (
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium ${
                    isActive(link.href)
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                      : 'text-soft hover:bg-black/5 hover:text-[var(--text-color)]'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <GlobalSearch />
          <ThemeToggle />

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/profile"
                className="surface-card rounded-full px-4 py-2 text-sm font-medium text-soft hover:text-[var(--text-color)]"
              >
                {userProfile?.displayName || user.displayName || 'Học viên'}
              </Link>
              {userProfile?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-3 py-2 text-sm font-semibold text-amber-800"
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="surface-card rounded-full p-2.5 text-soft hover:text-rose-600"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)]"
            >
              <User className="w-4 h-4" />
              Đăng nhập
            </Link>
          )}

          <button
            className="lg:hidden surface-card rounded-full p-2.5 text-soft"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Mở menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden max-w-7xl mx-auto mt-3"
          >
            <div className="surface-panel rounded-[28px] p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {user ? (
                  <>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
                          isActive(link.href)
                            ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                            : 'surface-card text-soft hover:text-[var(--text-color)]'
                        }`}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="surface-card rounded-2xl px-4 py-3 text-soft"
                    >
                      {userProfile?.displayName || user.displayName || 'Học viên'}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="rounded-2xl px-4 py-3 text-left bg-rose-50 text-rose-700"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3 font-semibold text-[var(--accent-ink)]"
                  >
                    <User className="w-5 h-5" />
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

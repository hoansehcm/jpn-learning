'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
import { useAuth } from '../contexts/AuthContext';
import GlobalSearch from './GlobalSearch';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Trang học', href: '/dashboard', icon: LayoutDashboard },
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
      <div className="surface-panel max-w-7xl mx-auto rounded-[30px] px-4 sm:px-5 min-h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-8 min-w-0">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 rounded-[18px] bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center shadow-lg shadow-orange-900/10">
              <span className="font-bold text-lg">あ</span>
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="font-serif text-lg font-bold leading-none">NihongoMaster</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-soft mt-1">Friendly study app</p>
            </div>
          </Link>

          {user && (
            <div className="hidden xl:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium ${
                    isActive(link.href)
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)] accent-ring'
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
          <div className="hidden md:block">
            <GlobalSearch />
          </div>
          <ThemeToggle />

          {user ? (
            <div className="hidden lg:flex items-center gap-2">
              <div className="soft-pill rounded-full px-4 py-2 text-sm">
                <span className="text-soft">Mục tiêu:</span>{' '}
                <span className="font-semibold">JLPT {userProfile?.targetLevel || 'N5'}</span>
              </div>
              <Link
                href="/profile"
                className="surface-card rounded-full px-4 py-2 text-sm font-medium text-soft hover:text-[var(--text-color)]"
              >
                {userProfile?.displayName || user.displayName || 'Học viên'}
              </Link>
              {userProfile?.role === 'admin' && (
                <Link href="/admin" className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-3 py-2 text-sm font-semibold text-amber-800">
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
              <button onClick={logout} className="surface-card rounded-full p-2.5 text-soft hover:text-rose-600" title="Đăng xuất">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] accent-ring"
            >
              <User className="w-4 h-4" />
              Đăng nhập
            </Link>
          )}

          <button
            className="xl:hidden surface-card rounded-full p-2.5 text-soft"
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
            className="xl:hidden max-w-7xl mx-auto mt-3"
          >
            <div className="surface-panel rounded-[28px] p-4 space-y-3">
              <div className="md:hidden">
                <GlobalSearch />
              </div>

              {user ? (
                <>
                  <div className="soft-pill rounded-2xl px-4 py-3 text-sm">
                    <p className="text-soft">Hôm nay mình đang học</p>
                    <p className="font-semibold mt-1">JLPT {userProfile?.targetLevel || 'N5'} • {userProfile?.displayName || user.displayName || 'Học viên'}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="surface-card rounded-2xl px-4 py-3 text-soft"
                    >
                      Hồ sơ học tập
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
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3 font-semibold text-[var(--accent-ink)]"
                >
                  <User className="w-5 h-5" />
                  Đăng nhập để bắt đầu học
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

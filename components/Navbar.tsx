'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, LogOut, User, Menu, X, BrainCircuit, GraduationCap, LayoutDashboard, Mic, Book } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GlobalSearch from './GlobalSearch';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, userProfile, signInWithGoogle, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Từ vựng', href: '/vocabulary', icon: BookOpen },
    { name: 'Ngữ pháp', href: '/grammar', icon: BrainCircuit },
    { name: 'Kanji', href: '/kanji', icon: GraduationCap },
    { name: 'Giao tiếp', href: '/speaking', icon: Mic },
    { name: 'Sổ tay', href: '/notebooks', icon: Book },
    { name: 'Ôn tập', href: '/flashcards', icon: BrainCircuit },
    { name: 'Thi thử', href: '/quizzes', icon: BrainCircuit },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">
              NihongoMaster
            </span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2"
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <GlobalSearch />
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Bảng điều khiển
              </Link>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="flex items-center gap-3">
                {userProfile?.role === 'admin' && (
                  <Link href="/admin" className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                    Admin
                  </Link>
                )}
                <Link href="/profile" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">
                  {userProfile?.displayName || user.displayName}
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <User className="w-4 h-4" />
              Đăng nhập
            </Link>
          )}

          <div className="flex items-center gap-2 md:hidden">
            <GlobalSearch />
            <button
              className="p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg"
          >
            <div className="p-4 flex flex-col gap-4">
              {user ? (
                <>
                  <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    <LayoutDashboard className="w-5 h-5 text-indigo-600" /> Bảng điều khiển
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <link.icon className="w-5 h-5 text-indigo-600" /> {link.name}
                    </Link>
                  ))}
                  {userProfile?.role === 'admin' && (
                    <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 text-amber-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="w-5 h-5 text-amber-600" /> Quản trị hệ thống
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 font-medium mt-2 border-t border-slate-100"
                  >
                    <LogOut className="w-5 h-5" /> Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-medium"
                >
                  <User className="w-5 h-5" /> Đăng nhập
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

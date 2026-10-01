"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // If we are on the homepage, the background is dark. Otherwise (dashboard, login), it's light.
  const isLightPage = pathname !== "/";
  const textColor = isLightPage ? "text-primary-wine" : "text-primary-ivory";
  const textColorMuted = isLightPage ? "text-primary-wine/80" : "text-primary-ivory/80";
  const textColorHover = isLightPage ? "hover:text-primary-burgundy" : "hover:text-primary-ivory";
  const logoColor = isLightPage ? "text-primary-wine" : "text-primary-ivory";
  const navBg = isLightPage ? (isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-black/5 py-4" : "bg-transparent py-6") : (isScrolled ? "glass-nav py-4" : "bg-transparent py-6");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className={`text-2xl font-display font-medium tracking-wide ${logoColor}`}>
          CARE
        </Link>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${textColorMuted}`}>
          <Link href="/#experiences" className={`${textColorHover} drop-shadow-sm transition-all`}>
            Experiences
          </Link>
          <Link href="/#how-it-works" className={`${textColorHover} drop-shadow-sm transition-all`}>
            How It Works
          </Link>
          <Link href="/#examples" className={`${textColorHover} drop-shadow-sm transition-all`}>
            Examples
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn && user ? (
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium ${isLightPage ? 'text-primary-wine/70' : 'text-primary-ivory/70'}`}>
                Hi, {user.name}
              </span>
              <Link href="/dashboard" className={`text-sm font-medium ${textColorMuted} ${textColorHover} transition-colors`}>
                Dashboard
              </Link>
              <button onClick={() => logout()} className={`text-sm font-medium ${isLightPage ? 'text-primary-wine/50 hover:text-primary-wine' : 'text-primary-ivory/50 hover:text-white'} transition-colors`}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className={`text-sm font-medium ${textColorMuted} ${textColorHover} transition-colors`}>
              Log In
            </Link>
          )}
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-primary-wine bg-primary-ivory rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary-ivory/10"
          >
            <span className="relative z-10 flex items-center gap-2">
              Craft Your Love Page
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden ${isLightPage ? 'text-primary-wine' : 'text-primary-ivory'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-0 w-full ${isLightPage ? 'bg-white border-b border-black/10' : 'bg-primary-wine border-b border-white/10 glass-nav'} py-6 px-6 md:hidden flex flex-col gap-6`}
          >
            <Link
              href="/#experiences"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium ${isLightPage ? 'text-primary-wine' : 'text-primary-ivory'}`}
            >
              Experiences
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium ${isLightPage ? 'text-primary-wine' : 'text-primary-ivory'}`}
            >
              How It Works
            </Link>
            <Link
              href="/#examples"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium ${isLightPage ? 'text-primary-wine' : 'text-primary-ivory'}`}
            >
              Examples
            </Link>
            <div className={`h-px ${isLightPage ? 'bg-black/10' : 'bg-white/20'} w-full my-2`} />
            {isLoggedIn && user ? (
              <div className="flex flex-col gap-4">
                <span className={`text-sm font-medium ${isLightPage ? 'text-primary-wine/70' : 'text-primary-ivory/70'}`}>
                  Logged in as {user.name}
                </span>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium ${isLightPage ? 'text-primary-wine' : 'text-primary-ivory'}`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className={`text-lg font-medium ${isLightPage ? 'text-primary-wine/50 hover:text-primary-wine' : 'text-primary-ivory/50 hover:text-white'} text-left`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium ${isLightPage ? 'text-primary-wine' : 'text-primary-ivory'}`}
              >
                Log In
              </Link>
            )}
            <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className={`inline-flex items-center justify-center px-6 py-3 text-base font-medium ${isLightPage ? 'text-primary-ivory bg-primary-wine' : 'text-primary-wine bg-primary-ivory'} rounded-full`}
            >
              Craft Your Love Page →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

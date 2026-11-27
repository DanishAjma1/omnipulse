"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Activity, Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

const CONSOLE_LOGIN_URL =
  process.env.NEXT_PUBLIC_CONSOLE_URL?.replace(/\/$/, "")
    ? `${process.env.NEXT_PUBLIC_CONSOLE_URL.replace(/\/$/, "")}/login`
    : "http://localhost:5173/login";

interface NavLinkItem {
  label: string;
  href: string;
  /** Kept visible when the navbar compresses to 8/12 width on scroll down. */
  keepOnScroll: boolean;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "Services", href: "/services", keepOnScroll: true },
  { label: "Docs & Guide", href: "/docs", keepOnScroll: true },
  { label: "Pricing", href: "/pricing", keepOnScroll: true },
  { label: "Security", href: "/security", keepOnScroll: false },
  { label: "Contact", href: "/contact", keepOnScroll: false },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest <= 36) {
      setIsScrolledDown(false);
    } else if (latest > prev + 3 && latest > 48) {
      setIsScrolledDown(true);
    } else if (latest < prev - 12) {
      setIsScrolledDown(false);
    }
  });

  const visibleDesktopLinks = isScrolledDown
    ? NAV_LINKS.filter((l) => l.keepOnScroll)
    : NAV_LINKS;

  return (
    <header className="sticky top-0 z-50 h-20 w-full pointer-events-none flex items-start justify-center">
      <div
        className={cn(
          "pointer-events-auto mx-auto transition-all duration-300 ease-out backdrop-blur-xl",
          isScrolledDown
            ? "mt-2.5 w-[94%] md:w-9/12 lg:w-8/12 rounded-2xl border border-zinc-300/60 dark:border-white/15 bg-white/40 dark:bg-[#0A0A0A]/40 px-4 sm:px-5 py-1.5 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.35)]"
            : "mt-0 w-full rounded-none border-b border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0A0A0A]/80 px-4 sm:px-6 lg:px-8 py-4"
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between transition-all duration-300",
            isScrolledDown ? "max-w-none h-10" : "max-w-7xl h-12"
          )}
        >
          {/* Left: Logo (Acts as Home link) */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div
              className={cn(
                "flex items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-all",
                isScrolledDown ? "w-8 h-8" : "w-10 h-10"
              )}
            >
              <Activity
                className={cn(
                  "stroke-[2.5] transition-all",
                  isScrolledDown ? "w-4 h-4" : "w-5 h-5"
                )}
              />
            </div>
            <span
              className={cn(
                "font-bold tracking-tight text-zinc-900 dark:text-white transition-all",
                isScrolledDown ? "text-base sm:text-lg" : "text-xl"
              )}
            >
              Omni
              <span className="text-indigo-600 dark:text-indigo-400">
                Pulse
              </span>
            </span>
          </Link>

          {/* Center: Animated Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleDesktopLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -4 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "relative block rounded-lg font-medium transition-colors whitespace-nowrap",
                        isScrolledDown
                          ? "px-2.5 py-1.5 text-xs lg:text-sm"
                          : "px-3.5 py-2 text-sm",
                        isActive
                          ? "text-zinc-900 dark:text-white font-semibold"
                          : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </nav>

          {/* Right: Actions (Compresses secondary Console Login link on scroll down) */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3.5 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className={cn(
                "rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/70 transition-colors",
                isScrolledDown ? "p-1.5" : "p-2"
              )}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {!isScrolledDown && (
                <motion.a
                  key="console-login"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.18 }}
                  href={CONSOLE_LOGIN_URL}
                  className="overflow-hidden whitespace-nowrap text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Console Login
                </motion.a>
              )}
            </AnimatePresence>

            <Button
              variant="primary"
              size={isScrolledDown ? "sm" : "md"}
              href="/register"
              className="whitespace-nowrap"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open mobile menu"
              className="p-2 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 border-t border-zinc-200 dark:border-zinc-800 pt-3 pb-4 space-y-2"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 flex flex-col gap-2">
                <a
                  href={CONSOLE_LOGIN_URL}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Login to Agency Console
                </a>
                <Button
                  variant="primary"
                  size="md"
                  href="/register"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

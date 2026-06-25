"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const pathname = usePathname();

  // Read theme from html document attribute on mount
  useEffect(() => {
    const isLight = !document.documentElement.classList.contains("dark");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy logic for active homepage sections
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScrollSpy = () => {
      const sections = ["about", "our-work", "contact"];
      const scrollPosition = window.scrollY + 200; // offset

      if (window.scrollY < 120) {
        setActiveSection("home");
        return;
      }

      let current = "home";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy(); // Run initially
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Our Work", href: "/#our-work" },
    { name: "Our Team", href: "/our-team" },
    { name: "Contact Us", href: "/#contact" },
  ];

  const isActiveLink = (href: string) => {
    if (pathname === "/our-team") {
      return href === "/our-team";
    }
    if (href === "/") {
      return activeSection === "home";
    }
    if (href.startsWith("/#")) {
      const sec = href.replace("/#", "");
      return activeSection === sec;
    }
    return false;
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-md py-3 border-b border-border/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logos */}
        <div className="flex items-center gap-3">
          <Link href="/" className="relative h-10 w-32 md:h-12 md:w-40 block transition-transform duration-300 active:scale-95">
            <Image
              src="/Images/logo wie.png"
              alt="IEEE WIE Logo"
              fill
              className={`object-contain transition-all duration-300 ${
                theme !== "dark" ? "brightness-0 opacity-80" : "brightness-0 invert"
              }`}
              priority
            />
          </Link>
          <div className="hidden sm:block h-6 w-px bg-border/60 mx-1"></div>
          <div className="hidden sm:block relative h-7 w-20 md:w-24">
            <Image
              src="/Images/official-ieee-white.png"
              alt="IEEE Logo"
              fill
              className={`object-contain transition-all duration-300 ${
                theme !== "dark" ? "brightness-0 invert-0 grayscale opacity-70" : ""
              }`}
              priority
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-semibold transition-colors py-2 px-1 hover:text-primary ${
                isActiveLink(link.href)
                  ? "text-primary"
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {link.name}
              {isActiveLink(link.href) && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </Link>
          ))}

          {/* Theme Toggle Button */}
          {theme && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted text-foreground transition-all duration-300 active:scale-90 border border-border/20"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-indigo-600" />
              )}
            </button>
          )}

          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSejHQ_xvdMFQAJx6kzegu04RKTDMbG6WigsT6z6ISbeyDq8iQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/95 rounded-full transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] active:scale-95"
          >
            Volunteer
          </Link>
        </nav>

        {/* Mobile Header Actions (Theme & Menu Toggle) */}
        <div className="flex items-center gap-2 md:hidden">
          {theme && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted text-foreground transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-indigo-600" />
              )}
            </button>
          )}
          <button
            className="p-2 text-foreground rounded-full hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full glass border-b border-border shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col py-5 px-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-semibold py-2 border-b border-border/30 transition-colors ${
                    isActiveLink(link.href)
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSejHQ_xvdMFQAJx6kzegu04RKTDMbG6WigsT6z6ISbeyDq8iQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-5 py-3 text-center font-bold text-white bg-primary rounded-xl transition-colors hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Become a Volunteer
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

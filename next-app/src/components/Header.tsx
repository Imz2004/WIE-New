"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const sections = ["about", "our-work", "contact"];
        let current = "home";
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // A section is considered active if its top is above 1/3 of the viewport
            // and its bottom is still within view
            if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
              current = section;
            }
          }
        }
        
        // Catch the very bottom of the page for the last section
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
          current = "contact";
        }
        
        setActiveSection(current);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Our Work", href: "/#our-work" },
    { name: "Our Team", href: "/our-team" },
    { name: "Contact Us", href: "/#contact" },
  ];

  const isEventPage = pathname.startsWith("/events");

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isEventPage
          ? "bg-transparent py-5"
          : isScrolled
          ? "glass shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="relative h-10 w-32 md:h-12 md:w-40">
            <Image
              src="/Images/logo wie.png"
              alt="IEEE WIE Logo"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </Link>
          <div className="hidden sm:block h-8 w-px bg-border mx-2"></div>
          <div className="hidden sm:block relative h-8 w-24">
            <Image
              src="/Images/official-ieee-white.png"
              alt="IEEE Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            let isActive = false;
            if (pathname === "/") {
              if (link.href === "/" && activeSection === "home") isActive = true;
              else if (link.href === `/#${activeSection}`) isActive = true;
            } else {
              isActive = pathname === link.href;
            }
            
            return (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-foreground"
              }`}
            >
              {link.name}
            </Link>
          )})}
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSejHQ_xvdMFQAJx6kzegu04RKTDMbG6WigsT6z6ISbeyDq8iQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-medium text-foreground bg-primary hover:bg-primary/90 rounded-full transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] active:scale-95"
          >
            Volunteer
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full glass border-b border-border shadow-lg"
        >
          <nav className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((link) => {
              let isActive = false;
              if (pathname === "/") {
                if (link.href === "/" && activeSection === "home") isActive = true;
                else if (link.href === `/#${activeSection}`) isActive = true;
              } else {
                isActive = pathname === link.href;
              }
              
              return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-medium py-2 border-b border-border/50 hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            )})}
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSejHQ_xvdMFQAJx6kzegu04RKTDMbG6WigsT6z6ISbeyDq8iQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-5 py-3 text-center font-medium text-foreground bg-primary rounded-lg transition-colors"
            >
              Become a Volunteer
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

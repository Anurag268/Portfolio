"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ portfolio }: { portfolio: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!portfolio) return null;

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 text-2xl font-bold tracking-tighter text-white group z-50">
          {portfolio.navbar?.logoImage && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-colors shrink-0 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              <motion.img 
                src={portfolio.navbar.logoImage} 
                alt="Logo" 
                className="w-full h-full object-cover"
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </div>
          )}
          <span>
            {portfolio.navbar?.logoText ? (
              <>{portfolio.navbar.logoText}</>
            ) : (
              <>{portfolio.hero.name.split(" ")[0]}<span className="text-primary">.dev</span></>
            )}
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              {link.name}
            </Link>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors">
            Resume
          </a>
        </nav>

        <button className="md:hidden text-white focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass flex flex-col items-center py-6 space-y-4 shadow-2xl border-t border-zinc-800 md:hidden"
          >
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-300 hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors w-11/12 text-center mt-4" onClick={() => setMobileMenuOpen(false)}>
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

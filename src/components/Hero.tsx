"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function Hero({ portfolio }: { portfolio: any }) {
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    if (!portfolio?.hero?.taglines?.length) return;
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % portfolio.hero.taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [portfolio]);

  if (!portfolio) return null;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-[120px] -z-10"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-[120px] -z-10"
      />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-primary font-medium tracking-wider uppercase mb-4 text-sm md:text-base">
            {portfolio.hero.title}
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Hi, I&apos;m <span className="text-gradient">{portfolio.hero.name}</span>
          </h1>
          
          <div className="h-10 md:h-12 mb-6 relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTagline}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-zinc-300 font-light absolute w-full left-0 right-0"
              >
                {portfolio.hero.taglines?.[currentTagline] || "Developer"}
              </motion.p>
            </AnimatePresence>
          </div>
          
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed mt-4 md:mt-0">
            {portfolio.hero.valueProposition}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#projects" className="group flex items-center justify-center space-x-2 bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 w-full sm:w-auto shadow-lg shadow-primary/20">
              <span>View Projects</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center space-x-2 bg-transparent border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 w-full sm:w-auto">
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

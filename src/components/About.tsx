"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Server } from "lucide-react";

export default function About({ portfolio }: { portfolio: any }) {
  if (!portfolio) return null;

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center space-x-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{portfolio.about.title}</h2>
            <div className="h-px bg-zinc-800 flex-1 ml-4 hidden sm:block"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed whitespace-pre-line">
              <p>{portfolio.about.description}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: Smartphone, title: "Mobile Development", desc: "Crafting fluid, native-like experiences." },
                { icon: Server, title: "Backend Systems", desc: "Designing scalable APIs and databases." },
                { icon: Code2, title: "Web Interfaces", desc: "Building responsive, modern web apps." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-2xl flex items-start space-x-4 hover:border-primary/50 transition-colors"
                >
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-zinc-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

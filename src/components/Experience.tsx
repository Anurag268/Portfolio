"use client";

import { motion } from "framer-motion";

export default function Experience({ portfolio }: { portfolio: any }) {
  if (!portfolio) return null;

  return (
    <section id="experience" className="py-24 relative bg-zinc-900/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center space-x-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Experience & Education</h2>
            <div className="h-px bg-zinc-800 flex-1 ml-4 hidden sm:block"></div>
          </div>
          
          <div className="relative border-l border-zinc-800 ml-4 md:ml-6 space-y-12">
            {portfolio.experience?.map((item: any, index: number) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute w-4 h-4 bg-zinc-950 border-2 border-primary rounded-full -left-[9px] top-1.5"></div>
                
                <div className="glass p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-xl md:text-2xl">{item.title}</h3>
                    <span className="text-primary font-medium text-sm mt-2 sm:mt-0 bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-zinc-300 font-medium text-lg mb-4">{item.company}</div>
                  <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

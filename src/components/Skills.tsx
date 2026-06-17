"use client";

import { motion } from "framer-motion";

export default function Skills({ portfolio }: { portfolio: any }) {
  if (!portfolio) return null;

  return (
    <section id="skills" className="py-24 relative bg-zinc-900/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center space-x-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Technical Skills</h2>
            <div className="h-px bg-zinc-800 flex-1 ml-4 hidden sm:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.skills?.map((skillGroup: any, groupIndex: number) => (
              <motion.div
                key={skillGroup.category || groupIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                className="glass p-8 rounded-3xl"
              >
                <h3 className="text-xl font-semibold text-white mb-6 border-b border-zinc-800 pb-4">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items?.map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-zinc-800/50 hover:bg-primary/20 hover:text-primary hover:border-primary/50 border border-zinc-700/50 rounded-full text-zinc-300 text-sm font-medium transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

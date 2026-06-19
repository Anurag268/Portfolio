"use client";

import { motion } from "framer-motion";
import { ExternalLink, PlayCircle } from "lucide-react";

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function Projects({ portfolio }: { portfolio: any }) {
  if (!portfolio) return null;

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center space-x-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
            <div className="h-px bg-zinc-800 flex-1 ml-4 hidden sm:block"></div>
          </div>
          
          <div className="space-y-20">
            {portfolio.projects?.map((project: any, index: number) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                <div className="relative glass p-8 md:p-10 rounded-3xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    <div className="lg:col-span-7 flex flex-col justify-center">
                      <div className="mb-2 text-primary font-medium tracking-wide text-sm uppercase">
                        {project.role}
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-xl text-zinc-300 font-light mb-6">
                        {project.shortPitch}
                      </p>
                      
                      <div className="space-y-4 mb-8 text-zinc-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
                        <p><strong className="text-zinc-200 font-medium">Problem solved:</strong> {project.problemSolved}</p>
                        <div>
                          <strong className="text-zinc-200 font-medium block mb-2">Key Challenges Overcome:</strong>
                          <ul className="list-disc pl-5 space-y-1">
                            {project.challenges?.map((challenge: string, i: number) => (
                              <li key={i}>{challenge}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack?.map((tech: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-medium rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-6 mt-auto">
                        {project.links?.live && project.links.live !== "#" && (
                          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-white hover:text-primary transition-colors">
                            <ExternalLink size={18} />
                            <span className="font-medium text-sm md:text-base">Live App</span>
                          </a>
                        )}
                        {project.links?.repo && project.links.repo !== "#" && (
                          <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors">
                            <GithubIcon size={18} />
                            <span className="font-medium text-sm md:text-base">Source</span>
                          </a>
                        )}
                        {project.links?.demo && project.links.demo !== "#" && (
                          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors">
                            <PlayCircle size={18} />
                            <span className="font-medium text-sm md:text-base">Demo Video</span>
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="lg:col-span-5 flex items-center justify-center">
                      <div className="w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full min-h-[300px] bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-colors">
                        <div className="text-center p-6">
                          <p className="text-zinc-500 mb-2 font-medium">Project Preview</p>
                          <p className="text-xs text-zinc-600">Preview for {project.title} coming soon</p>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { submitContactForm } from "@/app/actions/portfolio";

export default function Contact({ portfolio }: { portfolio: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!portfolio) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const result = await submitContactForm(data);
      
      if (result.success) {
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert(result.error || "Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center space-x-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Get In Touch</h2>
            <div className="h-px bg-zinc-800 flex-1 ml-4 hidden sm:block"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {portfolio.contact?.title || "Let's talk about your next project."}
                </h3>
                <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                  {portfolio.contact?.description || "Whether you have a freelance opportunity, a full-time role, or just want to say hi, my inbox is always open. I'll try my best to get back to you!"}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-primary shrink-0">
                    <Send size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${portfolio.contact.email}`} className="text-white hover:text-primary transition-colors md:text-lg truncate block">
                      {portfolio.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
                    <input type="text" id="name" name="name" required className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
                    <input type="email" id="email" name="email" required className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm font-medium text-zinc-300">Reason for contacting</label>
                  <select id="reason" name="reason" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all appearance-none">
                    <option value="Job Opportunity" className="bg-zinc-900">Job Opportunity</option>
                    <option value="Freelance Project" className="bg-zinc-900">Freelance Project</option>
                    <option value="Just saying hi" className="bg-zinc-900">Just saying hi</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
                  <textarea id="message" name="message" required rows={5} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none" placeholder="Hello! I'd like to discuss..."></textarea>
                </div>
                
                <button type="submit" disabled={isSubmitting || isSubmitted} className={`w-full py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-300 ${isSubmitted ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/20"}`}>
                  {isSubmitting ? (<><Loader2 size={20} className="animate-spin" /><span>Sending...</span></>) : isSubmitted ? (<span>Message Sent!</span>) : (<><span>Send Message</span><Send size={18} /></>)}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

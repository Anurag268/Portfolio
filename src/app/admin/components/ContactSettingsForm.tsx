"use client";

import { useState } from "react";
import { updatePortfolioSection } from "@/app/actions/portfolio";
import { Loader2, Save } from "lucide-react";

export default function ContactSettingsForm({ data }: { data: any }) {
  const defaultData = {
    title: "Let's talk about your next project.",
    description: "Whether you have a freelance opportunity, a full-time role, or just want to say hi, my inbox is always open. I'll try my best to get back to you!",
    email: "john@example.com",
    social: {
      github: "",
      linkedin: "",
      twitter: ""
    }
  };

  const [formData, setFormData] = useState(data || defaultData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name.startsWith("social.")) {
      const field = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        social: {
          ...(formData.social || {}),
          [field]: e.target.value
        }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    
    const res = await updatePortfolioSection("contact", formData);
    if (res.success) {
      setMessage("Contact settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error saving contact settings.");
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      
      {/* Get in Touch Text */}
      <div className="space-y-6 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800">
        <h4 className="text-lg font-semibold text-white mb-2">Get In Touch Section</h4>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Section Title</label>
          <input 
            type="text" name="title" required value={formData.title || ""} onChange={handleChange}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="Let's talk about your next project."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Description</label>
          <textarea 
            name="description" required value={formData.description || ""} onChange={handleChange} rows={3}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y"
            placeholder="Whether you have a freelance opportunity..."
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-6 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800">
        <h4 className="text-lg font-semibold text-white mb-2">Links & Email (Footer & Contact)</h4>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Your Email Address</label>
          <input 
            type="email" name="email" required value={formData.email || ""} onChange={handleChange}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">GitHub Profile URL</label>
            <input 
              type="url" name="social.github" value={formData.social?.github || ""} onChange={handleChange}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="https://github.com/yourusername"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">LinkedIn Profile URL</label>
            <input 
              type="url" name="social.linkedin" value={formData.social?.linkedin || ""} onChange={handleChange}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Twitter/X Profile URL</label>
            <input 
              type="url" name="social.twitter" value={formData.social?.twitter || ""} onChange={handleChange}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="https://twitter.com/yourusername"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-zinc-800/50">
        <span className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</span>
        <button type="submit" disabled={isSaving} className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 flex items-center">
          {isSaving ? <><Loader2 size={18} className="animate-spin mr-2" /> Saving...</> : <><Save size={18} className="mr-2" /> Save Contact Info</>}
        </button>
      </div>
    </form>
  );
}

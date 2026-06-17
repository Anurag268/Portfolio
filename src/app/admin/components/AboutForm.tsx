"use client";

import { useState } from "react";
import { updatePortfolioSection } from "@/app/actions/portfolio";
import { Loader2, Save } from "lucide-react";

export default function AboutForm({ data }: { data: any }) {
  const [formData, setFormData] = useState(data || { title: "", description: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    
    const res = await updatePortfolioSection("about", formData);
    if (res.success) {
      setMessage("About section saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error saving about data.");
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Section Title</label>
        <input 
          type="text" name="title" required value={formData.title} onChange={handleChange}
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Detailed Description</label>
        <textarea 
          name="description" required value={formData.description} onChange={handleChange} rows={10}
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y"
          placeholder="Tell your story..."
        />
        <p className="text-xs text-zinc-500">You can use multiple paragraphs here.</p>
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-zinc-800/50">
        <span className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</span>
        <button type="submit" disabled={isSaving} className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 flex items-center">
          {isSaving ? <><Loader2 size={18} className="animate-spin mr-2" /> Saving...</> : <><Save size={18} className="mr-2" /> Save About</>}
        </button>
      </div>
    </form>
  );
}

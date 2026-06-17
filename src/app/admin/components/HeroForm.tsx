"use client";

import { useState } from "react";
import { updatePortfolioSection } from "@/app/actions/portfolio";
import { Loader2, Plus, Trash2, Save } from "lucide-react";

export default function HeroForm({ data }: { data: any }) {
  const [formData, setFormData] = useState(data || { name: "", title: "", valueProposition: "", taglines: [] });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTaglineChange = (index: number, value: string) => {
    const newTaglines = [...formData.taglines];
    newTaglines[index] = value;
    setFormData({ ...formData, taglines: newTaglines });
  };

  const addTagline = () => setFormData({ ...formData, taglines: [...formData.taglines, ""] });
  const removeTagline = (index: number) => {
    const newTaglines = [...formData.taglines];
    newTaglines.splice(index, 1);
    setFormData({ ...formData, taglines: newTaglines });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    
    // Filter empty taglines
    const cleanedData = { ...formData, taglines: formData.taglines.filter((t: string) => t.trim() !== "") };
    
    const res = await updatePortfolioSection("hero", cleanedData);
    if (res.success) {
      setMessage("Hero saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error saving hero data.");
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Name</label>
          <input 
            type="text" name="name" required value={formData.name} onChange={handleChange}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Title</label>
          <input 
            type="text" name="title" required value={formData.title} onChange={handleChange}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Value Proposition (Main Description)</label>
        <textarea 
          name="valueProposition" required value={formData.valueProposition} onChange={handleChange} rows={3}
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-300">Taglines (Animated text)</label>
          <button type="button" onClick={addTagline} className="text-primary text-sm flex items-center hover:text-blue-400">
            <Plus size={16} className="mr-1" /> Add Tagline
          </button>
        </div>
        
        {formData.taglines.map((tag: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <input 
              type="text" value={tag} onChange={(e) => handleTaglineChange(index, e.target.value)}
              className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="e.g. Full Stack Developer"
            />
            <button type="button" onClick={() => removeTagline(index)} className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-zinc-800/50">
        <span className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</span>
        <button type="submit" disabled={isSaving} className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 flex items-center">
          {isSaving ? <><Loader2 size={18} className="animate-spin mr-2" /> Saving...</> : <><Save size={18} className="mr-2" /> Save Hero</>}
        </button>
      </div>
    </form>
  );
}

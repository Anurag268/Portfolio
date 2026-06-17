"use client";

import { useState } from "react";
import { updatePortfolioSection } from "@/app/actions/portfolio";
import { Loader2, Save } from "lucide-react";

export default function NavbarForm({ data }: { data: any }) {
  const [formData, setFormData] = useState(data || { logoText: "", logoImage: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    
    const res = await updatePortfolioSection("navbar", formData);
    if (res.success) {
      setMessage("Navbar settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error saving navbar settings.");
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="space-y-6 bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800">
        <h4 className="text-lg font-semibold text-white mb-4">Navbar & Branding</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Custom Logo Text</label>
            <input 
              type="text" name="logoText" value={formData.logoText || ""} onChange={handleChange}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="e.g. anurag.dev (Leave blank to use your name)"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Animated Avatar / Logo Image URL</label>
            <input 
              type="url" name="logoImage" value={formData.logoImage || ""} onChange={handleChange}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="https://example.com/my-avatar.gif"
            />
            <p className="text-xs text-zinc-500 mt-1">Provide a URL to an image or GIF to display next to your logo text.</p>
          </div>
        </div>

        {/* Live Preview */}
        {formData.logoImage && (
          <div className="mt-4 p-4 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              <img src={formData.logoImage} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm text-zinc-400">Live Preview</span>
          </div>
        )}
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-zinc-800/50">
        <span className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</span>
        <button type="submit" disabled={isSaving} className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 flex items-center">
          {isSaving ? <><Loader2 size={18} className="animate-spin mr-2" /> Saving...</> : <><Save size={18} className="mr-2" /> Save Navbar</>}
        </button>
      </div>
    </form>
  );
}

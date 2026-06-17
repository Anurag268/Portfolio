"use client";

import { useState } from "react";
import { updatePortfolioSection } from "@/app/actions/portfolio";
import { Loader2, Plus, Trash2, Save, ChevronDown, ChevronUp } from "lucide-react";

export default function ExperienceForm({ data }: { data: any }) {
  const [experiences, setExperiences] = useState<any[]>(data || []);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addExperience = () => {
    setExperiences([{
      title: "Job Title",
      company: "Company Name",
      period: "2024 - Present",
      description: ""
    }, ...experiences]);
    setExpandedIndex(0);
  };

  const removeExperience = (index: number) => {
    const newExp = [...experiences];
    newExp.splice(index, 1);
    setExperiences(newExp);
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExp = [...experiences];
    newExp[index][field] = value;
    setExperiences(newExp);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    const res = await updatePortfolioSection("experience", experiences);
    if (res.success) {
      setMessage("Experience saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error saving experience.");
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex justify-end">
        <button type="button" onClick={addExperience} className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center">
          <Plus size={16} className="mr-2" /> Add Experience / Education
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden transition-all">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800/30 transition-colors"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-zinc-500 font-mono text-xs">{index + 1}</span>
                <h3 className="text-lg font-semibold text-white">
                  {exp.title || "Untitled Role"} <span className="text-zinc-500 font-normal">at</span> {exp.company || "Company"}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button type="button" onClick={(e) => { e.stopPropagation(); removeExperience(index); }} className="text-red-400 hover:text-red-300 p-2">
                  <Trash2 size={18} />
                </button>
                {expandedIndex === index ? <ChevronUp size={20} className="text-zinc-400" /> : <ChevronDown size={20} className="text-zinc-400" />}
              </div>
            </div>

            {expandedIndex === index && (
              <div className="p-6 border-t border-zinc-800 space-y-6 bg-zinc-950/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Job Title / Degree</label>
                    <input type="text" value={exp.title} onChange={(e) => updateExperience(index, "title", e.target.value)} required className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Company / Institution</label>
                    <input type="text" value={exp.company} onChange={(e) => updateExperience(index, "company", e.target.value)} required className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Period (e.g., 2023 - Present)</label>
                    <input type="text" value={exp.period} onChange={(e) => updateExperience(index, "period", e.target.value)} required className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Description / Achievements</label>
                  <textarea value={exp.description} onChange={(e) => updateExperience(index, "description", e.target.value)} rows={4} required className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary resize-none" placeholder="Describe your responsibilities and achievements..." />
                </div>
              </div>
            )}
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500">No experience added yet.</p>
          </div>
        )}
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-zinc-800/50">
        <span className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</span>
        <button type="submit" disabled={isSaving} className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 flex items-center">
          {isSaving ? <><Loader2 size={18} className="animate-spin mr-2" /> Saving...</> : <><Save size={18} className="mr-2" /> Save Experience</>}
        </button>
      </div>
    </form>
  );
}

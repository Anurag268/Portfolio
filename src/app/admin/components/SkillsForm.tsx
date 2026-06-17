"use client";

import { useState } from "react";
import { updatePortfolioSection } from "@/app/actions/portfolio";
import { Loader2, Plus, Trash2, Save, GripVertical } from "lucide-react";

export default function SkillsForm({ data }: { data: any }) {
  const [skillGroups, setSkillGroups] = useState<any[]>(data || []);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const addGroup = () => {
    setSkillGroups([...skillGroups, { category: "", items: [] }]);
  };

  const removeGroup = (index: number) => {
    const newGroups = [...skillGroups];
    newGroups.splice(index, 1);
    setSkillGroups(newGroups);
  };

  const updateCategory = (index: number, value: string) => {
    const newGroups = [...skillGroups];
    newGroups[index].category = value;
    setSkillGroups(newGroups);
  };

  const addSkillToGroup = (groupIndex: number) => {
    const newGroups = [...skillGroups];
    newGroups[groupIndex].items.push("");
    setSkillGroups(newGroups);
  };

  const updateSkill = (groupIndex: number, skillIndex: number, value: string) => {
    const newGroups = [...skillGroups];
    newGroups[groupIndex].items[skillIndex] = value;
    setSkillGroups(newGroups);
  };

  const removeSkill = (groupIndex: number, skillIndex: number) => {
    const newGroups = [...skillGroups];
    newGroups[groupIndex].items.splice(skillIndex, 1);
    setSkillGroups(newGroups);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    
    // Cleanup empty skills and groups
    const cleanedGroups = skillGroups
      .map(group => ({
        category: group.category.trim(),
        items: group.items.filter((item: string) => item.trim() !== "")
      }))
      .filter(group => group.category !== "" || group.items.length > 0);

    const res = await updatePortfolioSection("skills", cleanedGroups);
    if (res.success) {
      setSkillGroups(cleanedGroups); // Update state with cleaned data
      setMessage("Skills saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error saving skills.");
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      
      <div className="flex justify-end">
        <button type="button" onClick={addGroup} className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center">
          <Plus size={16} className="mr-2" /> Add Skill Category
        </button>
      </div>

      <div className="space-y-6">
        {skillGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 mr-4">
                <input 
                  type="text" 
                  value={group.category} 
                  onChange={(e) => updateCategory(groupIndex, e.target.value)}
                  placeholder="Category Name (e.g., Frontend)"
                  className="w-full bg-transparent border-b border-zinc-700 pb-2 text-lg font-semibold text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button type="button" onClick={() => removeGroup(groupIndex)} className="text-red-400 hover:text-red-300 transition-colors p-2">
                <Trash2 size={20} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {group.items.map((skill: string, skillIndex: number) => (
                <div key={skillIndex} className="flex items-center bg-zinc-800 rounded-full pl-3 pr-1 py-1">
                  <input 
                    type="text" 
                    value={skill} 
                    onChange={(e) => updateSkill(groupIndex, skillIndex, e.target.value)}
                    placeholder="Skill"
                    className="bg-transparent text-sm text-zinc-200 focus:outline-none w-24 sm:w-32"
                  />
                  <button type="button" onClick={() => removeSkill(groupIndex, skillIndex)} className="text-zinc-500 hover:text-red-400 p-1 rounded-full ml-1">
                    <XIcon size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            <button type="button" onClick={() => addSkillToGroup(groupIndex)} className="text-primary text-sm font-medium hover:text-blue-400 flex items-center mt-2">
              <Plus size={14} className="mr-1" /> Add Skill
            </button>
          </div>
        ))}
        
        {skillGroups.length === 0 && (
          <div className="text-center py-10 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500">No skill categories added yet.</p>
          </div>
        )}
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-zinc-800/50">
        <span className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</span>
        <button type="submit" disabled={isSaving} className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 flex items-center">
          {isSaving ? <><Loader2 size={18} className="animate-spin mr-2" /> Saving...</> : <><Save size={18} className="mr-2" /> Save Skills</>}
        </button>
      </div>
    </form>
  );
}

function XIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  );
}

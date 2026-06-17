"use client";

import { useState } from "react";
import { updatePortfolioSection } from "@/app/actions/portfolio";
import { Loader2, Plus, Trash2, Save, ChevronDown, ChevronUp } from "lucide-react";

export default function ProjectsForm({ data }: { data: any }) {
  const [projects, setProjects] = useState<any[]>(data || []);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const addProject = () => {
    setProjects([{
      title: "New Project",
      shortPitch: "",
      problemSolved: "",
      role: "",
      techStack: [],
      challenges: [],
      links: { live: "", repo: "", demo: "" }
    }, ...projects]);
    setExpandedIndex(0);
  };

  const removeProject = (index: number) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const updateProject = (index: number, field: string, value: any) => {
    const newProjects = [...projects];
    // Handle nested links object
    if (field.startsWith('links.')) {
      const linkField = field.split('.')[1];
      if (!newProjects[index].links) newProjects[index].links = {};
      newProjects[index].links[linkField] = value;
    } else {
      newProjects[index][field] = value;
    }
    setProjects(newProjects);
  };

  // Array handlers
  const updateArrayItem = (projIndex: number, field: 'techStack' | 'challenges', itemIndex: number, value: string) => {
    const newProjects = [...projects];
    newProjects[projIndex][field][itemIndex] = value;
    setProjects(newProjects);
  };

  const addArrayItem = (projIndex: number, field: 'techStack' | 'challenges') => {
    const newProjects = [...projects];
    if (!newProjects[projIndex][field]) newProjects[projIndex][field] = [];
    newProjects[projIndex][field].push("");
    setProjects(newProjects);
  };

  const removeArrayItem = (projIndex: number, field: 'techStack' | 'challenges', itemIndex: number) => {
    const newProjects = [...projects];
    newProjects[projIndex][field].splice(itemIndex, 1);
    setProjects(newProjects);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    
    // Clean empty items
    const cleanedProjects = projects.map(p => ({
      ...p,
      techStack: p.techStack?.filter((i: string) => i.trim() !== "") || [],
      challenges: p.challenges?.filter((i: string) => i.trim() !== "") || []
    }));

    const res = await updatePortfolioSection("projects", cleanedProjects);
    if (res.success) {
      setProjects(cleanedProjects);
      setMessage("Projects saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Error saving projects.");
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex justify-end">
        <button type="button" onClick={addProject} className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center">
          <Plus size={16} className="mr-2" /> Add Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden transition-all">
            {/* Header / Accordion Toggle */}
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800/30 transition-colors"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-zinc-500 font-mono text-xs">{index + 1}</span>
                <h3 className="text-lg font-semibold text-white">{project.title || "Untitled Project"}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button type="button" onClick={(e) => { e.stopPropagation(); removeProject(index); }} className="text-red-400 hover:text-red-300 p-2">
                  <Trash2 size={18} />
                </button>
                {expandedIndex === index ? <ChevronUp size={20} className="text-zinc-400" /> : <ChevronDown size={20} className="text-zinc-400" />}
              </div>
            </div>

            {/* Expanded Form Content */}
            {expandedIndex === index && (
              <div className="p-6 border-t border-zinc-800 space-y-6 bg-zinc-950/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Project Title</label>
                    <input type="text" value={project.title} onChange={(e) => updateProject(index, "title", e.target.value)} required className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Your Role</label>
                    <input type="text" value={project.role} onChange={(e) => updateProject(index, "role", e.target.value)} required className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Short Pitch (Summary)</label>
                  <input type="text" value={project.shortPitch} onChange={(e) => updateProject(index, "shortPitch", e.target.value)} required className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Problem Solved</label>
                  <textarea value={project.problemSolved} onChange={(e) => updateProject(index, "problemSolved", e.target.value)} rows={3} required className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary resize-none" />
                </div>

                {/* Tech Stack Array */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Tech Stack</label>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech: string, tIndex: number) => (
                      <div key={tIndex} className="flex items-center bg-zinc-800 rounded-md overflow-hidden">
                        <input type="text" value={tech} onChange={(e) => updateArrayItem(index, 'techStack', tIndex, e.target.value)} className="bg-transparent text-sm text-zinc-200 focus:outline-none px-2 py-1 w-24" />
                        <button type="button" onClick={() => removeArrayItem(index, 'techStack', tIndex)} className="text-zinc-500 hover:text-red-400 p-1">✕</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem(index, 'techStack')} className="text-xs text-primary font-medium border border-primary/30 rounded-md px-2 py-1 hover:bg-primary/10">
                      + Add Tech
                    </button>
                  </div>
                </div>

                {/* Challenges Array */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Key Challenges Overcome</label>
                  {project.challenges?.map((chal: string, cIndex: number) => (
                    <div key={cIndex} className="flex items-center space-x-2">
                      <input type="text" value={chal} onChange={(e) => updateArrayItem(index, 'challenges', cIndex, e.target.value)} className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary" />
                      <button type="button" onClick={() => removeArrayItem(index, 'challenges', cIndex)} className="text-red-400 hover:bg-red-500/20 p-2 rounded-lg">✕</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem(index, 'challenges')} className="text-xs text-primary font-medium hover:underline mt-1 block">
                    + Add Challenge
                  </button>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-zinc-800">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Live URL</label>
                    <input type="text" value={project.links?.live || ""} onChange={(e) => updateProject(index, "links.live", e.target.value)} className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-2 py-1.5 text-sm text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Repo URL</label>
                    <input type="text" value={project.links?.repo || ""} onChange={(e) => updateProject(index, "links.repo", e.target.value)} className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-2 py-1.5 text-sm text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Demo Video URL</label>
                    <input type="text" value={project.links?.demo || ""} onChange={(e) => updateProject(index, "links.demo", e.target.value)} className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-2 py-1.5 text-sm text-white" />
                  </div>
                </div>

              </div>
            )}
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500">No projects added yet.</p>
          </div>
        )}
      </div>

      <div className="pt-4 flex items-center justify-between border-t border-zinc-800/50">
        <span className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</span>
        <button type="submit" disabled={isSaving} className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 flex items-center">
          {isSaving ? <><Loader2 size={18} className="animate-spin mr-2" /> Saving...</> : <><Save size={18} className="mr-2" /> Save Projects</>}
        </button>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import HeroForm from "./components/HeroForm";
import NavbarForm from "./components/NavbarForm";
import AboutForm from "./components/AboutForm";
import SkillsForm from "./components/SkillsForm";
import ProjectsForm from "./components/ProjectsForm";
import ExperienceForm from "./components/ExperienceForm";
import ContactSettingsForm from "./components/ContactSettingsForm";
import MessagesView from "./components/MessagesView";
import ResumeForm from "./components/ResumeForm";
import AnalyticsPanel from "./components/AnalyticsPanel";

export default function EditorForm({ portfolio }: { portfolio: any }) {
  const [activeTab, setActiveTab] = useState("hero");

  const tabs = [
    { id: "hero", label: "Hero Banner" },
    { id: "navbar", label: "Navbar & Logo" },
    { id: "about", label: "About Me" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact Info" },
    { id: "resume", label: "Resume Upload" },
    { id: "messages", label: "Inbox" },
    { id: "analytics", label: "Analytics" }
  ];

  return (
    <div className="glass rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-800 overflow-x-auto bg-zinc-900/50 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors flex-1 md:flex-none text-center ${
              activeTab === tab.id 
                ? "border-b-2 border-primary text-primary bg-primary/5" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Form Content Area */}
      <div className="p-6 md:p-8 bg-zinc-950/30">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-2">{tabs.find(t => t.id === activeTab)?.label} Settings</h2>
          <p className="text-sm text-zinc-400">Update the information below. Changes will be reflected live on your portfolio.</p>
        </div>
        
        {/* Render corresponding form component */}
        {activeTab === "hero" && <HeroForm data={portfolio.hero} />}
        {activeTab === "navbar" && <NavbarForm data={portfolio.navbar} />}
        {activeTab === "about" && <AboutForm data={portfolio.about} />}
        {activeTab === "skills" && <SkillsForm data={portfolio.skills} />}
        {activeTab === "projects" && <ProjectsForm data={portfolio.projects} />}
        {activeTab === "experience" && <ExperienceForm data={portfolio.experience} />}
        { activeTab === "contact" && <ContactSettingsForm data={portfolio.contact} /> }
        { activeTab === "resume" && <ResumeForm /> }
        { activeTab === "messages" && <MessagesView /> }
        { activeTab === "analytics" && <AnalyticsPanel /> }
      </div>
    </div>
  );
}

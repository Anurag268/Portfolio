import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  taglines: [{ type: String }],
  valueProposition: { type: String, required: true },
});

const AboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const SkillGroupSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: [{ type: String }],
});

const ProjectLinkSchema = new mongoose.Schema({
  live: { type: String },
  repo: { type: String },
  demo: { type: String },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortPitch: { type: String, required: true },
  problemSolved: { type: String },
  role: { type: String },
  techStack: [{ type: String }],
  challenges: [{ type: String }],
  links: {
    live: { type: String },
    repo: { type: String },
    demo: { type: String }
  },
  imageId: { type: String }
});

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, required: true },
});

const ContactSchema = new mongoose.Schema({
  title: { type: String, default: "Let's talk about your next project." },
  description: { type: String, default: "Whether you have a freelance opportunity, a full-time role, or just want to say hi, my inbox is always open. I'll try my best to get back to you!" },
  email: { type: String, required: true },
  social: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
  },
});

const NavbarSchema = new mongoose.Schema({
  logoText: { type: String, default: "" },
  logoImage: { type: String, default: "" },
});

const PortfolioSchema = new mongoose.Schema({
  navbar: NavbarSchema,
  hero: HeroSchema,
  about: AboutSchema,
  skills: [SkillGroupSchema],
  projects: [ProjectSchema],
  experience: [ExperienceSchema],
  contact: ContactSchema,
}, { timestamps: true });

export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);

export const portfolioData = {
  hero: {
    name: "Anurag Singh",
    title: "Full-Stack & Mobile App Developer",
    taglines: [
      "I build end-to-end products.",
      "Job-ready Full-Stack Developer.",
      "Available for freelance projects."
    ],
    valueProposition: "I specialize in building scalable mobile applications and robust backends, delivering complete end-to-end solutions from concept to deployment."
  },
  about: {
    title: "About Me",
    description: "With a strong foundation in Computer Science, I am deeply passionate about solving real-world problems through software. I don't just build the user interface; I architect the entire system, from the mobile app layer to the backend infrastructure that powers it. I leverage modern AI-assisted development workflows to ship high-quality products rapidly and efficiently."
  },
  skills: [
    {
      category: "Languages",
      items: ["Dart", "TypeScript", "JavaScript", "HTML/CSS"]
    },
    {
      category: "Frameworks",
      items: ["Flutter", "Next.js", "React", "Node.js"]
    },
    {
      category: "Backend & Infra",
      items: ["Firebase", "REST APIs", "Serverless", "Database Design"]
    },
    {
      category: "Tools & Practices",
      items: ["Git", "Cursor/AI-Assisted Dev", "Figma", "Agile Workflow"]
    }
  ],
  projects: [
    {
      id: "chal-chal-gaadi",
      title: "Chal Chal Gaadi",
      shortPitch: "Ola/Uber-style ride-hailing platform",
      problemSolved: "Provided a streamlined ride-hailing solution with a unique cash/call-based fare model and driver subscription system.",
      techStack: ["Flutter", "Node.js", "Firebase", "Google Maps API"],
      role: "Lead Full-Stack Developer (AI-assisted workflow)",
      challenges: [
        "Real-time ride status synchronization",
        "Push notification duplicate-trigger fixes",
        "Driver subscription billing model implementation"
      ],
      links: {
        live: "https://chalchal.ridealdigitalseva.com", // Replace with actual live link if different
        repo: "#", // Replace with repo link if public
        demo: "#" // Replace with demo video link
      }
    },
    {
      id: "ridego",
      title: "RideGo",
      shortPitch: "v1 Ride-hailing concept with live tracking",
      problemSolved: "Built the foundational prototype for live driver tracking and authentication, which later evolved into Chal Chal Gaadi.",
      techStack: ["Flutter", "Firebase Auth", "FCM", "Google Maps"],
      role: "Mobile Developer",
      challenges: [
        "Live driver location tracking on map",
        "Seamless user authentication"
      ],
      links: {
        live: "#",
        repo: "#"
      }
    },
    {
      id: "exam-tracker",
      title: "Competitive Exam Tracker",
      shortPitch: "Comprehensive class tracker for competitive exams",
      problemSolved: "Helps students organize and track their progress across various subjects like Reasoning, History, GK, and Science.",
      techStack: ["React", "Next.js", "Tailwind CSS"],
      role: "Frontend Developer",
      challenges: [
        "Creating an intuitive progress tracking dashboard",
        "Managing complex state for various subjects"
      ],
      links: {
        live: "#",
        repo: "#"
      }
    }
  ],
  experience: [
    {
      id: "edu-cs",
      title: "B.S. in Computer Science",
      company: "University Name", // Replace with actual university
      period: "Graduation Year", // Replace with actual year
      description: "Focus on software engineering, algorithms, and full-stack development."
    }
  ],
  contact: {
    email: "anurag.singh@example.com", // Replace with your email
    social: {
      github: "https://github.com/anuragsingh", // Replace with your github
      linkedin: "https://linkedin.com/in/anuragsingh", // Replace with your linkedin
      twitter: "https://twitter.com/anuragsingh" // Replace with your twitter
    }
  }
};

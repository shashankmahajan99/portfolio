export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  metrics: string[];
  status: 'Live' | 'In Development' | 'Discontinued' | 'Enterprise';
  type: string;
  year: string;
  architecture?: string;
  dsa?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: 'Expert' | 'Proficient' | 'Skilled' | 'Familiar';
  category: 'Backend' | 'Frontend' | 'Cloud' | 'Security' | 'Database' | 'DevOps' | 'Algorithms';
  icon?: string;
  experience?: string;
}

export interface Achievement {
  title: string;
  subtitle: string;
  year: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  location: string;
  summary: string;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  achievements: Achievement[];
  education: {
    degree: string;
    institution: string;
    period: string;
    details: string;
  }[];
}

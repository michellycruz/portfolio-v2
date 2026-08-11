export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  summary: string[];
  profileBadge: string;
  photoUrl: string;
  resumeUrl: string;
  social: SocialLink[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  results?: string;
}

export interface Education {
  course: string;
  institution: string;
  period: string;
}

export interface InfraSkill {
  title: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Project {
  title: string;
  tech: string[];
  imageUrl: string;
  linkUrl: string;
}

export interface Content {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  infraSkills: InfraSkill[];
  infraHighlights: string[];
  skillCategories: SkillCategory[];
  projects: Project[];
}

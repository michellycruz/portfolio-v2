interface IconMeta {
  src: string;
  label: string;
}

const techIcons: Record<string, IconMeta> = {
  figma: { src: "/images/tech/figma.png", label: "Figma" },
  balsamiq: { src: "/images/tech/balsamiq.webp", label: "Balsamiq" },
  sql: { src: "/images/tech/sql.png", label: "SQL" },
  gitlab: { src: "/images/tech/gitlab.png", label: "GitLab" },
  git: { src: "/images/tech/git.png", label: "Git" },
  "github-icon": { src: "/images/icons/github-icon.png", label: "GitHub" },
  excel: { src: "/images/tech/excel.png", label: "Excel" },
  teams: { src: "/images/tech/teams.png", label: "Teams" },
  word: { src: "/images/tech/word.png", label: "Word" },
  outlook: { src: "/images/tech/outlook.png", label: "Outlook" },
  notion: { src: "/images/tech/notion.png", label: "Notion" },
  html: { src: "/images/tech/html.png", label: "HTML5" },
  css: { src: "/images/tech/css.png", label: "CSS3" },
  js: { src: "/images/tech/js.png", label: "JavaScript" },
  bootstrap: { src: "/images/tech/bootstrap.png", label: "Bootstrap" },
  sass: { src: "/images/tech/sass.png", label: "Sass" },
  react: { src: "/images/tech/react.png", label: "React" },
  tailwind: { src: "/images/tech/tailwind.png", label: "Tailwind" },
  ia: { src: "/images/tech/ia.svg", label: "Inteligência Artificial" },
};

const socialIcons: Record<string, IconMeta> = {
  linkedin: { src: "/images/icons/linkedin.png", label: "LinkedIn" },
  instagram: { src: "/images/icons/instagram.png", label: "Instagram" },
  github: { src: "/images/icons/github.png", label: "GitHub" },
  whatsapp: { src: "/images/icons/whatsapp.png", label: "WhatsApp" },
};

export function techIcon(key: string): IconMeta {
  return techIcons[key] ?? { src: "", label: key };
}

export function socialIcon(key: string): IconMeta {
  return socialIcons[key] ?? { src: "", label: key };
}

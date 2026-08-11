import { techIcon } from "../../lib/icons";

export function TechIcon({ skillKey, size = 44 }: { skillKey: string; size?: number }) {
  const { src, label } = techIcon(skillKey);
  if (!src) return null;

  return (
    <abbr
      title={label}
      className="group flex flex-col items-center gap-2 no-underline"
      style={{ width: size + 20 }}
    >
      <span className="flex items-center justify-center rounded-lg border-2 border-ink bg-white p-2 shadow-brutal-sm transition-transform duration-200 group-hover:-translate-y-1 dark:border-white/70 dark:bg-white/95">
        <img src={src} alt={label} width={size} height={size} loading="lazy" className="object-contain" />
      </span>
    </abbr>
  );
}

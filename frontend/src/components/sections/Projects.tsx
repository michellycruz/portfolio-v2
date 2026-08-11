import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "../../types/content";
import { SectionHeading } from "../ui/SectionHeading";
import { techIcon } from "../../lib/icons";

export function Projects({ items }: { items: Project[] }) {
  return (
    <section id="projetos" className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading>Projetos</SectionHeading>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.linkUrl}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group block overflow-hidden rounded-xl border-2 border-ink bg-surface shadow-brutal transition-all duration-300 hover:shadow-none hover:translate-x-1 hover:translate-y-1 dark:border-white/80 dark:bg-surface-dark"
          >
            <div className="flex items-center justify-between border-b-2 border-ink px-4 py-3 dark:border-white/70">
              <span className="font-[var(--font-mono-brand)] text-sm font-semibold text-ink dark:text-white">
                {project.title}
              </span>
              <div className="flex items-center gap-2">
                {project.tech.map((t) => {
                  const icon = techIcon(t);
                  return icon.src ? <img key={t} src={icon.src} alt={icon.label} className="h-5 w-5" /> : null;
                })}
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/60 group-hover:opacity-100">
                <span className="flex items-center gap-2 rounded-full border-2 border-white bg-coral px-4 py-2 font-[var(--font-mono-brand)] text-sm text-white">
                  Ver projeto <ExternalLink size={14} />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

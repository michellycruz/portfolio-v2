import { motion } from "framer-motion";
import type { InfraSkill, SkillCategory } from "../../types/content";
import { Panel, PanelBody, PanelTitle } from "../ui/Panel";
import { SectionHeading } from "../ui/SectionHeading";
import { TechIcon } from "../ui/TechIcon";

interface SkillsProps {
  infraSkills: InfraSkill[];
  infraHighlights: string[];
  categories: SkillCategory[];
}

const infraAccents: Array<"mint" | "sky" | "butter"> = ["mint", "sky", "butter"];

export function Skills({ infraSkills, infraHighlights, categories }: SkillsProps) {
  return (
    <section id="habilidades" className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading>Suporte e infraestrutura</SectionHeading>

      <div className="grid gap-6 md:grid-cols-3">
        {infraSkills.map((skill, i) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Panel className="h-full">
              <PanelTitle accent={infraAccents[i % infraAccents.length]} className="text-base">
                {skill.title}
              </PanelTitle>
              <PanelBody className="text-sm text-ink-soft dark:text-white/80">{skill.description}</PanelBody>
            </Panel>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <Panel noShadowOnHover>
          <PanelTitle accent="none">Atividades principais</PanelTitle>
          <PanelBody>
            <ul className="grid gap-3 sm:grid-cols-2">
              {infraHighlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-soft dark:text-white/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                  {h}
                </li>
              ))}
            </ul>
          </PanelBody>
        </Panel>
      </motion.div>

      <h3 className="mt-20 mb-10 text-center font-[var(--font-mono-brand)] text-2xl text-ink dark:text-white">
        Tecnologias
      </h3>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Panel noShadowOnHover className="h-full">
              <PanelTitle accent="none" className="text-base">
                {cat.title}
              </PanelTitle>
              <PanelBody>
                <div className="flex flex-wrap justify-center gap-4">
                  {cat.skills.map((s) => (
                    <TechIcon key={s} skillKey={s} />
                  ))}
                </div>
              </PanelBody>
            </Panel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

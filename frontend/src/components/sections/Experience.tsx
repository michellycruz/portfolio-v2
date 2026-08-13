import { motion } from "framer-motion";
import type { Experience as ExperienceItem } from "../../types/content";
import { Panel, PanelBody, PanelTitle } from "../ui/Panel";
import { RobotMechanic } from "../ui/RobotMechanic";
import { SectionHeading } from "../ui/SectionHeading";

export function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experiencia" className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading>Experiência profissional</SectionHeading>

      <div className="flex items-start gap-8">
        <Panel noShadowOnHover className="flex-1">
          <PanelTitle accent="mint">Trajetória</PanelTitle>
          <PanelBody>
          <div className="flex flex-col">
            {items.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={i > 0 ? "mt-8 border-t-2 border-dashed border-ink/20 pt-8 dark:border-white/20" : ""}
              >
                <h3 className="font-[var(--font-mono-brand)] text-xl text-ink dark:text-white">{exp.company}</h3>
                <p className="mt-1 font-semibold text-coral">{exp.role}</p>
                <p className="mt-1 text-sm opacity-50">{exp.period}</p>

                <ul className="mt-4 flex flex-col gap-2 pl-1">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-ink-soft dark:text-white/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                      {b}
                    </li>
                  ))}
                </ul>

                {exp.results && (
                  <p className="mt-4 rounded-lg border-2 border-ink bg-butter px-4 py-3 text-sm dark:border-white/50 dark:bg-white/10">
                    <strong>Resultados: </strong>
                    {exp.results}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
          </PanelBody>
        </Panel>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="hidden w-56 shrink-0 animate-float select-none self-center lg:block"
        >
          <RobotMechanic />
        </motion.div>
      </div>
    </section>
  );
}

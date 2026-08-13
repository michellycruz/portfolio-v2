import { motion } from "framer-motion";
import type { Education as EducationItem, Institution } from "../../types/content";
import { FormationChart } from "../ui/FormationChart";
import { InstitutionAccordion } from "../ui/InstitutionAccordion";
import { Panel, PanelBody, PanelTitle } from "../ui/Panel";
import { SectionHeading } from "../ui/SectionHeading";

export function Education({ items, institutions }: { items: EducationItem[]; institutions: Institution[] }) {
  return (
    <section id="formacao" className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading>Formação acadêmica</SectionHeading>

      <div className="flex items-start gap-8">
        <motion.img
          src="/images/robo2.png"
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="hidden w-56 shrink-0 animate-float select-none self-center lg:block"
        />

        <Panel noShadowOnHover className="flex-1">
          <PanelTitle accent="sky">Trilha acadêmica</PanelTitle>
          <PanelBody>
          <div className="flex flex-col">
            {items.map((edu, i) => (
              <motion.div
                key={edu.course}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={i > 0 ? "mt-6 border-t-2 border-dashed border-ink/20 pt-6 dark:border-white/20" : ""}
              >
                <h3 className="font-[var(--font-mono-brand)] text-lg text-ink dark:text-white">{edu.course}</h3>
                <p className="mt-1 text-ink-soft dark:text-white/80">{edu.institution}</p>
                <p className="mt-1 text-sm opacity-50">{edu.period}</p>
              </motion.div>
            ))}
          </div>
          </PanelBody>
        </Panel>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <Panel noShadowOnHover>
          <PanelTitle accent="mint">Cursos e certificações</PanelTitle>
          <PanelBody>
            <InstitutionAccordion institutions={institutions} />
            <div className="mt-5 border-t-2 border-dashed border-ink/15 pt-4 dark:border-white/15">
              <FormationChart institutions={institutions} />
            </div>
          </PanelBody>
        </Panel>
      </motion.div>
    </section>
  );
}

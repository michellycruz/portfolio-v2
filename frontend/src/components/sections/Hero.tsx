import { motion } from "framer-motion";
import { Download } from "lucide-react";
import type { Profile } from "../../types/content";
import { Panel, PanelBody, PanelTitle } from "../ui/Panel";
import { Button } from "../ui/Button";
import { socialIcon } from "../../lib/icons";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="topo" className="mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-8 md:grid-cols-[minmax(0,340px)_1fr] md:items-start md:pt-24">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-6 md:sticky md:top-28"
      >
        <div className="animate-float">
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-64 rounded-full border-2 border-ink object-cover shadow-brutal-lg dark:border-white/80"
          />
        </div>

        <div className="flex gap-4">
          {profile.social.map((s) => {
            const icon = socialIcon(s.icon);
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-white shadow-brutal-sm transition-transform hover:-translate-y-1 dark:border-white/70 dark:bg-white/95"
              >
                {icon.src && <img src={icon.src} alt="" className="h-6 w-6" />}
              </a>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="flex flex-col items-start gap-6"
      >
        <Button as="a" href={profile.resumeUrl} download variant="sky">
          Baixar currículo <Download size={16} />
        </Button>

        <Panel id="resumo" className="w-full">
          <PanelTitle accent="coral" className="text-white">
            Resumo profissional
          </PanelTitle>
          <PanelBody>
            <p className="mb-4">
              <strong>Nome:</strong> {profile.name}
            </p>
            {profile.summary.map((p, i) => (
              <p key={i} className="mb-4 text-ink-soft dark:text-white/80">
                {p}
              </p>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-butter px-4 py-2 font-[var(--font-mono-brand)] text-xs font-semibold text-ink">
              {profile.profileBadge}
            </span>
          </PanelBody>
        </Panel>
      </motion.div>
    </section>
  );
}

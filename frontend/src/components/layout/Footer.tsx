import type { SocialLink } from "../../types/content";
import { socialIcon } from "../../lib/icons";
import { RobotRocket } from "../ui/RobotRocket";

const links = [
  { href: "#resumo", label: "Resumo" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#formacao", label: "Formação" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function Footer({ social, name }: { social: SocialLink[]; name: string }) {
  return (
    <footer className="relative mt-32 border-t-2 border-ink bg-white/60 dark:border-white/70 dark:bg-white/5">
      {/* Sits on top of the footer's border line, so it reads as landed on it.
          The footer can't clip its overflow for this to work. */}
      <RobotRocket className="pointer-events-none absolute right-8 bottom-full hidden w-32 translate-y-[9%] select-none sm:block md:w-44" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:flex-row sm:justify-between">
        <div>
          <p className="mb-4 font-mono-brand text-lg text-ink dark:text-white">
            Minhas redes sociais
          </p>
          <div className="flex flex-col gap-3">
            {social.map((s) => {
              const icon = socialIcon(s.icon);
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 font-mono-brand text-sm font-semibold text-ink transition-colors hover:text-coral dark:text-white"
                >
                  {icon.src && <img src={icon.src} alt="" className="h-8 w-8" />}
                  {s.name}
                </a>
              );
            })}
          </div>
        </div>

        <nav>
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono-brand text-sm text-ink transition-colors hover:text-coral dark:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t-2 border-ink py-6 text-center font-mono-brand text-sm text-ink dark:border-white/70 dark:text-white">
        Feito por {name} 🐦‍⬛
      </div>
    </footer>
  );
}

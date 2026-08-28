import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const links = [
  { href: "#resumo", label: "Resumo" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#formacao", label: "Formação" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 transition-colors duration-300 ${
        scrolled
          ? "border-ink bg-cream/90 backdrop-blur dark:border-white/70 dark:bg-cream-dark/90"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        {/* A logo era um PNG com o nome ja desenhado, entao as letras ficavam
            pretas no tema escuro. Em texto, na mesma Mallory Black do desenho,
            a cor acompanha o tema. */}
        <a href="#topo" className="flex items-center gap-2" aria-label="Michelly Cruz, ir para o topo">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral font-display text-[10px] leading-none text-white"
          >
            MC
          </span>
          <span className="font-display text-xl leading-none tracking-tight text-ink sm:text-2xl dark:text-white">
            Michelly Cruz
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-[var(--font-mono-brand)] text-sm tracking-wide text-ink transition-colors hover:text-coral dark:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream/70 bg-ink text-white shadow-brutal-sm transition-transform hover:-translate-y-0.5 dark:border-white/70 dark:bg-coral"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink text-ink md:hidden dark:border-white/70 dark:text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-full z-40 flex flex-col gap-1 overflow-hidden border-t-2 border-ink bg-cream px-5 pb-4 shadow-brutal md:hidden dark:border-white/70 dark:bg-cream-dark"
          >
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-[var(--font-mono-brand)] text-base text-ink dark:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

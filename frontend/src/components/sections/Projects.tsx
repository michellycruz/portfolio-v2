import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, GitBranch, Lock } from "lucide-react";
import type { Project } from "../../types/content";
import { SectionHeading } from "../ui/SectionHeading";
import { techIcon } from "../../lib/icons";

// Os projetos chegam do mais recente para o mais antigo e a linha do tempo
// mantem essa ordem, igual a secao de experiencia: quem abre a pagina ve
// primeiro o que esta sendo feito agora e rola para tras no tempo.
function groupByYear(items: Project[]) {
  const groups: { year: string; items: Project[] }[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.year === item.year) last.items.push(item);
    else groups.push({ year: item.year, items: [item] });
  }
  return groups;
}

export function Projects({ items }: { items: Project[] }) {
  const groups = groupByYear(items);
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const readEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    readEdges();
    window.addEventListener("resize", readEdges);
    return () => window.removeEventListener("resize", readEdges);
  }, [readEdges]);

  // Uma "pagina" e a largura visivel menos um respiro, para o card que estava
  // na borda continuar aparecendo depois do salto e nao se perder o contexto.
  function nudge(direction: -1 | 1) {
    const el = scroller.current;
    if (el) el.scrollBy({ left: direction * (el.clientWidth - 80), behavior: "smooth" });
  }

  // Sem barra de rolagem, arrastar precisa funcionar de verdade: guarda onde o
  // ponteiro desceu e o quanto a lista ja estava rolada, e move a diferenca.
  const drag = useRef({ down: false, startX: 0, startLeft: 0, dragging: false });

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    // Toque e caneta continuam com a rolagem nativa, que ja e melhor que
    // qualquer coisa reimplementada aqui.
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = scroller.current;
    if (!el) return;
    drag.current = { down: true, startX: event.clientX, startLeft: el.scrollLeft, dragging: false };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = scroller.current;
    if (!el || !drag.current.down) return;

    const dx = event.clientX - drag.current.startX;

    // Cinco pixels de folga: um clique com a mao tremida continua sendo clique,
    // e os atalhos de deploy e repositorio seguem clicaveis.
    if (!drag.current.dragging) {
      if (Math.abs(dx) < 5) return;
      drag.current.dragging = true;
      el.setPointerCapture(event.pointerId);
      el.style.userSelect = "none";
    }

    el.scrollLeft = drag.current.startLeft - dx;
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    const el = scroller.current;
    if (el) {
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
      el.style.userSelect = "";
    }
    drag.current.down = false;
  }

  // Soltar o ponteiro no fim de um arrasto dispara click no cartao que estava
  // embaixo. Este capture engole esse click -- e so ele.
  function onClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (!drag.current.dragging) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.dragging = false;
  }

  return (
    <section id="projetos" className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading>Projetos</SectionHeading>

        <div className="flex items-center gap-3 pb-6">
          <span className="hidden font-[var(--font-mono-brand)] text-xs text-ink/60 sm:block dark:text-white/60">
            arraste para o lado · passe o mouse para ver os detalhes
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={edges.start}
              aria-label="Ver projetos mais recentes"
              className="rounded-full border-2 border-ink bg-surface p-1.5 text-ink shadow-brutal-sm transition disabled:opacity-30 enabled:hover:-translate-y-0.5 dark:border-white/70 dark:bg-surface-dark dark:text-white"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={edges.end}
              aria-label="Ver projetos mais antigos"
              className="rounded-full border-2 border-ink bg-surface p-1.5 text-ink shadow-brutal-sm transition disabled:opacity-30 enabled:hover:-translate-y-0.5 dark:border-white/70 dark:bg-surface-dark dark:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={readEdges}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        tabIndex={0}
        role="group"
        aria-label="Linha do tempo dos projetos: arraste para o lado ou use as setas"
        // snap-proximity, e nao mandatory: com mandatory a lista puxava de volta
        // no meio do arrasto. A barra some porque a navegacao agora e pelas
        // setas e pelo arrasto -- as setas do teclado continuam rolando.
        className="-mx-2 cursor-grab snap-x snap-proximity overflow-x-auto px-2 pb-4 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex min-w-max items-start gap-8">
          {groups.map((group, gi) => (
            <div key={group.year} className="flex flex-col gap-4">
              {/* Marco do ano: o traco segue ate o fim do grupo, e os grupos
                  vizinhos continuam o mesmo eixo. */}
              <div className="flex items-center gap-3">
                <span className="rounded-full border-2 border-ink bg-coral px-3 py-1 font-[var(--font-mono-brand)] text-sm font-bold text-white shadow-brutal-sm dark:border-white/70">
                  {group.year}
                </span>
                <span className="h-0.5 flex-1 bg-ink/25 dark:bg-white/25" />
              </div>

              <div className="flex gap-4">
                {group.items.map((project, i) => (
                  <ProjectCard key={project.title} project={project} delay={(gi * 3 + i) * 0.05} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const hasLinks = Boolean(project.linkUrl || project.repoUrl);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      tabIndex={0}
      // O foco abre o mesmo painel que o hover: em tela sensivel ao toque nao
      // existe "passar o mouse", e sem isso a descricao e os atalhos ficariam
      // inalcancaveis no celular.
      className="group relative w-[256px] shrink-0 snap-start overflow-hidden rounded-lg border-2 border-ink bg-surface shadow-brutal-sm outline-none transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-coral hover:-translate-y-1 dark:border-white/70 dark:bg-surface-dark"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink dark:border-white/70">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`Prévia do projeto ${project.title}`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <NoPreview project={project} />
        )}

        <div className="absolute inset-0 flex flex-col gap-2 bg-ink/95 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 group-focus-visible:opacity-100">
          {/* A descricao rola dentro do cartao; os chips ficam ancorados embaixo
              para nao serem empurrados para fora quando o texto e longo. */}
          <p className="min-h-0 flex-1 overflow-y-auto text-[11px] leading-relaxed text-white/90">{project.description}</p>

          <div className="flex shrink-0 flex-wrap gap-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded border border-white/40 px-1.5 py-0.5 font-[var(--font-mono-brand)] text-[9px] uppercase tracking-wide text-white/80"
              >
                {techIcon(t).label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <h3 className="truncate font-[var(--font-mono-brand)] text-xs font-semibold text-ink dark:text-white">
          {project.title}
        </h3>

        <div className="flex shrink-0 items-center gap-1.5">
          {project.linkUrl && (
            <a
              href={project.linkUrl}
              target="_blank"
              rel="noreferrer"
              title="Abrir o deploy"
              aria-label={`Abrir o deploy de ${project.title}`}
              className="rounded p-1 text-ink/70 transition hover:bg-coral hover:text-white dark:text-white/70"
            >
              <ExternalLink size={14} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              title="Ver o repositório"
              aria-label={`Ver o repositório de ${project.title}`}
              className="rounded p-1 text-ink/70 transition hover:bg-coral hover:text-white dark:text-white/70"
            >
              <GitBranch size={14} />
            </a>
          )}
          {!hasLinks && (
            <span
              title="Projeto interno, sem link público"
              className="flex items-center gap-1 rounded p-1 text-ink/50 dark:text-white/50"
            >
              <Lock size={12} />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// Nem todo projeto tem prévia: os plugins rodam dentro do wp-admin e os
// privados não têm deploy público. No lugar da imagem quebrada, o cartão
// mostra a tecnologia principal.
function NoPreview({ project }: { project: Project }) {
  const main = techIcon(project.tech[0] ?? "");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(0,0,0,0.05)_6px,rgba(0,0,0,0.05)_12px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(255,255,255,0.06)_6px,rgba(255,255,255,0.06)_12px)]">
      {main.src && <img src={main.src} alt={main.label} className="h-9 w-9 object-contain opacity-80" />}
      <span className="flex items-center gap-1 font-[var(--font-mono-brand)] text-[10px] uppercase tracking-wide text-ink/50 dark:text-white/50">
        {project.private && <Lock size={10} />}
        {project.private ? "projeto interno" : "sem prévia"}
      </span>
    </div>
  );
}

import { motion } from "framer-motion";
import type { Institution } from "../../types/content";

// The area whose bar is highlighted; every other bar stays neutral so the eye
// lands here first.
const HIGHLIGHT = "IA e Automação";

function countByArea(institutions: Institution[]): Array<{ area: string; count: number }> {
  const totals = new Map<string, number>();
  for (const inst of institutions) {
    const courses = [...(inst.tracks?.flatMap((t) => t.courses) ?? []), ...(inst.courses ?? [])];
    for (const c of courses) totals.set(c.area, (totals.get(c.area) ?? 0) + 1);
  }
  return [...totals].map(([area, count]) => ({ area, count })).sort((a, b) => b.count - a.count);
}

export function FormationChart({ institutions }: { institutions: Institution[] }) {
  const rows = countByArea(institutions);
  if (rows.length === 0) return null;

  // Bars are scaled to the largest area, not to the total: this counts courses,
  // it does not claim a share of anything.
  const max = Math.max(...rows.map((r) => r.count));

  return (
    <div>
      <h3 className="font-[var(--font-mono-brand)] text-sm text-ink dark:text-white">Formação por área</h3>
      <p className="mt-0.5 mb-3 text-xs opacity-50">Número de cursos concluídos em cada área</p>

      <ul className="flex flex-col gap-2.5">
        {rows.map((row, i) => {
          const highlighted = row.area === HIGHLIGHT;
          // Below sm the bar drops to its own full-width row: a fixed label
          // column would leave it about 60px to draw in.
          return (
            <li
              key={row.area}
              className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 sm:grid-cols-[minmax(0,9.5rem)_1fr_auto]"
            >
              <span
                className={`truncate text-xs ${
                  highlighted ? "font-semibold text-ink dark:text-white" : "text-ink-soft dark:text-white/80"
                }`}
              >
                {row.area}
              </span>

              <span
                className={`shrink-0 text-right text-xs whitespace-nowrap tabular-nums sm:order-3 sm:w-16 ${
                  highlighted ? "font-semibold text-ink dark:text-white" : "text-ink-soft dark:text-white/80"
                }`}
              >
                {row.count} {row.count === 1 ? "curso" : "cursos"}
              </span>

              <div
                className="col-span-2 h-2.5 overflow-hidden rounded-full sm:order-2 sm:col-span-1"
                style={{ backgroundColor: "var(--viz-track)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(row.count / max) * 100}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: highlighted ? "var(--viz-highlight)" : "var(--viz-neutral)" }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

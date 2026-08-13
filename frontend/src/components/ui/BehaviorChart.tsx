import { motion } from "framer-motion";
import type { BehaviorTrait } from "../../types/content";

// Fixed slot order — the colour follows the trait, never its rank, so the bars
// keep their hue regardless of how the list is sorted.
const traitColors: Record<string, string> = {
  Executor: "var(--viz-executor)",
  Comunicador: "var(--viz-comunicador)",
  Planejador: "var(--viz-planejador)",
  Analista: "var(--viz-analista)",
};

export function BehaviorChart({ traits }: { traits: BehaviorTrait[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {traits.map((trait, i) => {
        const color = traitColors[trait.label] ?? "var(--viz-analista)";
        return (
          <li key={trait.label}>
            <div className="mb-1 flex items-baseline gap-1.5 text-xs">
              <span className="font-semibold text-ink dark:text-white">{trait.percent}%</span>
              <span className="text-ink-soft dark:text-white/80">{trait.label}</span>
            </div>

            <div
              className="relative h-2 rounded-full"
              style={{ backgroundColor: "var(--viz-track)" }}
              role="img"
              aria-label={`${trait.label}: ${trait.percent}%`}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${trait.percent}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: color }}
              >
                {/* Marker sits on the data end, ringed in the surface colour so it
                    stays legible where it overlaps the fill. */}
                <span
                  className="absolute top-1/2 right-0 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full border-2 bg-surface dark:bg-surface-dark"
                  style={{ borderColor: color }}
                />
              </motion.div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

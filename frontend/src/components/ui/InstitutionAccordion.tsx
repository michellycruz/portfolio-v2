import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { Course, Institution } from "../../types/content";

function countCourses(inst: Institution): number {
  const inTracks = inst.tracks?.reduce((sum, t) => sum + t.courses.length, 0) ?? 0;
  return inTracks + (inst.courses?.length ?? 0);
}

function CourseRow({ course }: { course: Course }) {
  // Below sm the title and the date stack: side by side they squeeze the title
  // into ~130px of 4-line wrapping and clip the date off the right edge.
  return (
    <li className="py-1 text-sm sm:flex sm:items-baseline sm:gap-2">
      <span className="flex min-w-0 items-baseline gap-2">
        <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-coral" />
        <span className="text-ink-soft dark:text-white/80">{course.title}</span>
      </span>
      <span className="ml-3 block shrink-0 text-xs whitespace-nowrap opacity-50 sm:ml-auto sm:pl-3">
        {course.hours ? `${course.date} · ${course.hours}` : course.date}
      </span>
    </li>
  );
}

function InstitutionRow({ institution }: { institution: Institution }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const total = countCourses(institution);

  return (
    <div className="border-b-2 border-dashed border-ink/15 last:border-b-0 dark:border-white/15">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 py-3 text-left"
      >
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span className="font-[var(--font-mono-brand)] text-ink dark:text-white">{institution.name}</span>
        <span className="ml-auto shrink-0 text-xs opacity-50">
          {total} {total === 1 ? "curso" : "cursos"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-3 sm:pl-7">
              {institution.tracks?.map((track) => (
                <div key={track.name} className="mb-3 last:mb-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h4 className="text-sm font-semibold text-ink dark:text-white">{track.name}</h4>
                    <span
                      className={`shrink-0 rounded-full border border-ink/25 px-2 py-0.5 text-[10px] whitespace-nowrap dark:border-white/25 ${
                        track.status === "Concluída" ? "bg-mint text-ink" : "opacity-60"
                      }`}
                    >
                      {track.status}
                    </span>
                  </div>
                  <ul className="mt-1">
                    {track.courses.map((c) => (
                      <CourseRow key={c.title} course={c} />
                    ))}
                  </ul>
                </div>
              ))}

              {institution.courses && institution.courses.length > 0 && (
                <ul>
                  {institution.courses.map((c) => (
                    <CourseRow key={c.title} course={c} />
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function InstitutionAccordion({ institutions }: { institutions: Institution[] }) {
  return (
    <div>
      {institutions.map((inst) => (
        <InstitutionRow key={inst.name} institution={inst} />
      ))}
    </div>
  );
}

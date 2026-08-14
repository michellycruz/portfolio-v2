import type { Course, Institution } from "../../types/content";

function allCourses(institutions: Institution[]): Course[] {
  return institutions.flatMap((inst) => [
    ...(inst.tracks?.flatMap((t) => t.courses) ?? []),
    ...(inst.courses ?? []),
  ]);
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-36 flex-1 rounded-lg border-2 border-ink px-4 py-3 dark:border-white/80">
      <p className="text-xs text-ink-soft dark:text-white/80">{label}</p>
      <p className="mt-0.5 font-[var(--font-mono-brand)] text-2xl font-semibold text-ink dark:text-white">{value}</p>
    </div>
  );
}

// Totals across every institution, so the reader gets the size of the study
// effort before opening a single accordion.
export function StudySummary({ institutions }: { institutions: Institution[] }) {
  const courses = allCourses(institutions);
  if (courses.length === 0) return null;

  // "30h" -> 30. Courses with no stated workload still count as courses; they
  // are left out of the hours and named in the note, so the total never claims
  // more study time than the certificates back.
  const hours = courses.reduce((sum, c) => sum + (Number.parseInt(c.hours ?? "", 10) || 0), 0);
  const missing = courses.filter((c) => !c.hours).length;

  return (
    <div className="mb-5">
      <div className="flex flex-wrap gap-3">
        <Stat label="Cursos concluídos" value={courses.length.toLocaleString("pt-BR")} />
        <Stat label="Horas de estudo" value={`${hours.toLocaleString("pt-BR")}h`} />
      </div>
      {missing > 0 && (
        <p className="mt-2 text-xs opacity-50">
          {missing === 1
            ? "1 curso sem carga horária declarada não entra no total de horas."
            : `${missing} cursos sem carga horária declarada não entram no total de horas.`}
        </p>
      )}
    </div>
  );
}

import { motion } from "framer-motion";

export function SectionHeading({ children, id }: { children: string; id?: string }) {
  return (
    <motion.h2
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-10 font-mono-brand text-3xl tracking-tight text-ink sm:text-4xl dark:text-white"
    >
      <span className="border-b-4 border-coral pb-1">{children}</span>
    </motion.h2>
  );
}

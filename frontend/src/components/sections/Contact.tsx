import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Panel, PanelBody, PanelTitle } from "../ui/Panel";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { sendContactMessage } from "../../lib/api";

type Status = "idle" | "sending" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border-2 border-ink bg-white px-4 py-3 font-[var(--font-body)] text-ink outline-none transition-shadow focus:shadow-brutal-sm dark:border-white/60 dark:bg-white/95";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setErrorMsg("");

    const result = await sendContactMessage(form);

    if (result.ok) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      return;
    }

    setStatus("error");
    setErrors(result.errors ?? {});
    setErrorMsg(result.error ?? "Não foi possível enviar sua mensagem.");
  }

  function updateField<K extends keyof typeof form>(field: K, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    // A new edit means the previous success/error banner no longer applies.
    if (status === "success" || status === "error") setStatus("idle");
  }

  return (
    <section id="contato" className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeading>Vamos conversar?</SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <Panel noShadowOnHover>
          <PanelTitle accent="mint">Envie uma mensagem</PanelTitle>
          <PanelBody>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                  Nome
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={inputClasses}
                  placeholder="Seu nome"
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-coral">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClasses}
                  placeholder="seu@email.com"
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-coral">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={`${inputClasses} min-h-32 resize-y`}
                  placeholder="Como posso ajudar?"
                  required
                />
                {errors.message && <p className="mt-1 text-sm text-coral">{errors.message}</p>}
              </div>

              <Button type="submit" variant="coral" disabled={status === "sending"} className="self-start">
                {status === "sending" ? (
                  <>
                    Enviando <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Enviar mensagem <Send size={16} />
                  </>
                )}
              </Button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    role="status"
                    className="flex items-start gap-3 rounded-lg border-2 border-ink bg-mint px-4 py-3 text-sm font-medium text-ink shadow-brutal-sm"
                  >
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                    <span>
                      Mensagem enviada com sucesso! Obrigada pelo contato — respondo em breve.
                    </span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border-2 border-ink bg-coral/20 px-4 py-3 text-sm font-medium text-ink shadow-brutal-sm dark:text-white"
                  >
                    <AlertCircle size={20} className="mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </PanelBody>
        </Panel>
      </motion.div>
    </section>
  );
}

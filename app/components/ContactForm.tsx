"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      entreprise: (form.elements.namedItem("entreprise") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      // La clé Web3Forms n'est plus jamais exposée au navigateur : c'est
      // /api/contact (côté serveur) qui la porte et relaie vers Web3Forms.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const base =
    "w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none transition-all duration-300";

  const cls = (name: string) =>
    `${base} ${
      focusedField === name
        ? "border-blue-500/60 shadow-[0_0_18px_rgba(59,130,246,0.15)] bg-white/8"
        : "border-white/10 hover:border-white/20"
    }`;

  return (
    <div className="max-w-2xl">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="glass-card border border-green-500/30 rounded-2xl p-12 text-center flex flex-col items-center gap-5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 18 }}
              className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold">Message envoyé !</h3>
            <p className="text-gray-400 text-sm max-w-sm">
              Merci pour ton message. Je te réponds dans les plus brefs délais.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors mt-2"
            >
              Envoyer un autre message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-widest">Nom *</label>
                <input
                  type="text" name="name" required placeholder="Votre nom"
                  className={cls("name")}
                  onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-widest">Entreprise</label>
                <input
                  type="text" name="entreprise" placeholder="Nom de l'entreprise"
                  className={cls("entreprise")}
                  onFocus={() => setFocusedField("entreprise")} onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase tracking-widest">Email *</label>
              <input
                type="email" name="email" required placeholder="votre@email.com"
                className={cls("email")}
                onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase tracking-widest">Message *</label>
              <textarea
                name="message" required rows={5}
                placeholder="Parlez-moi de votre entreprise ou de votre proposition d'apprentissage…"
                className={`${cls("message")} resize-none`}
                onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
              />
            </div>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm"
                >
                  Une erreur s&apos;est produite. Essaie directement à{" "}
                  <a href="mailto:niko.luquiens@icloud.com" className="underline">niko.luquiens@icloud.com</a>
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit" disabled={status === "loading"}
              whileHover={status !== "loading" ? { scale: 1.015 } : {}}
              whileTap={status !== "loading" ? { scale: 0.98 } : {}}
              className="relative group w-full overflow-hidden bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors duration-300 hover:shadow-lg hover:shadow-blue-500/30 text-sm uppercase tracking-widest"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative flex items-center justify-center gap-2">
                {status === "loading" ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Envoi…
                  </>
                ) : <>Envoyer le message <span>→</span></>}
              </span>
            </motion.button>
            <p className="text-gray-600 text-xs text-center">
              En envoyant, vous acceptez d&apos;être recontacté par email.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';

export default function ChatWidget() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  async function ask() {
    if (!input.trim()) return;
    setLoading(true);
    setLog((l) => l + `\n> ${input}`);
    
    // TODO: Intégrer avec l'API IA de Medusa ou autre
    // Pour l'instant simulation
    setTimeout(() => {
      setLog((l) => l + `\n\n${t('assistant.response')}`);
      setLoading(false);
      setInput("");
      taRef.current?.focus();
    }, 1000);
  }

  useEffect(() => {
    if (!open) return;
    taRef.current?.focus();
  }, [open]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {open ? (
        <div className="w-[340px] rounded-2xl border bg-white shadow-soft">
          <div className="flex items-center justify-between rounded-t-2xl bg-primary px-3 py-2 text-white">
            <div className="font-semibold">{t('assistant.title')}</div>
            <button onClick={() => setOpen(false)} className="rounded bg-white/20 px-2 py-1 text-sm">{t('assistant.close')}</button>
          </div>
          <div className="h-56 overflow-auto p-3 text-sm whitespace-pre-wrap">{log || t('assistant.welcome')}</div>
          <div className="flex items-end gap-2 p-3">
            <textarea ref={taRef} value={input} onChange={e => setInput(e.target.value)} className="min-h-[44px] flex-1 resize-none rounded-xl border p-2 text-sm" placeholder={t('assistant.placeholder')} />
            <button disabled={loading} onClick={ask} className="rounded-xl bg-accent px-3 py-2 text-sm font-medium disabled:opacity-50">{loading ? "..." : t('assistant.send')}</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col items-center group focus:outline-none"
          style={{background:'none', border:'none', padding:0}}
          aria-label="Ouvrir l'assistant Bloby"
        >
          <img
            src="/images/BlobyAssistance.png"
            alt="Bloby Assistance IA"
            className="w-28 h-28 drop-shadow-lg group-hover:scale-105 transition-transform"
            draggable="false"
          />
        </button>
      )}
    </div>
  );
}

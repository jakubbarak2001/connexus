import { useState, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvajaol";
const CONTACT_EMAIL = "jakub@connexus.cz";
const CONTACT_PHONE_DISPLAY = "+420 774 563 739";
const MIN_DESCRIPTION = 20;

const webOptions = [
  "Ano, ale je zastaralý",
  "Ano, ale nefunguje pro byznys",
  "Ne, nemám web",
  "Jiné",
];

const fieldCls =
  "w-full rounded-soft border border-border-strong bg-bg-tertiary px-4 py-3 font-sans text-body text-text-primary placeholder:text-text-muted transition-colors hover:border-text-muted focus:border-accent focus:outline-none";

const labelCls = "mb-2 block font-mono text-small text-text-muted";

type Status = "idle" | "submitting" | "error" | "mailto-opened";

const isMailtoFallback = FORMSPREE_ENDPOINT.includes("PLACEHOLDER");

function buildMailto(data: FormData): string {
  const name = ((data.get("name") as string) || "").trim();
  const email = ((data.get("email") as string) || "").trim();
  const profession = ((data.get("profession") as string) || "").trim();
  const currentWeb = ((data.get("currentWeb") as string) || "").trim();
  const description = ((data.get("description") as string) || "").trim();

  const subject = name ? `Connexus · ${name}` : "Connexus · poptávka";
  const body = [
    `Jméno: ${name}`,
    `E-mail: ${email}`,
    `Profese: ${profession}`,
    `Aktuální web: ${currentWeb}`,
    ``,
    `Popis projektu:`,
    description,
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactFormReact() {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const remaining = Math.max(0, MIN_DESCRIPTION - description.length);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description.length < MIN_DESCRIPTION) return;
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    if (isMailtoFallback) {
      window.location.href = buildMailto(data);
      setStatus("mailto-opened");
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        window.location.href = "/dekujeme";
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div>
        <label htmlFor="name" className={labelCls}>
          Jméno
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldCls}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldCls}
        />
      </div>

      <div>
        <label htmlFor="profession" className={labelCls}>
          Obor podnikání
        </label>
        <input
          id="profession"
          name="profession"
          type="text"
          required
          placeholder="Např. penzion, ordinace, kavárna, advokátní kancelář…"
          className={fieldCls}
        />
      </div>

      <fieldset className="space-y-3">
        <legend className={labelCls}>Máte aktuálně web?</legend>
        {webOptions.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-start gap-3 text-body text-text-primary"
          >
            <input
              type="radio"
              name="currentWeb"
              value={opt}
              required
              className="mt-[5px] h-4 w-4 accent-accent"
            />
            <span>{opt}</span>
          </label>
        ))}
      </fieldset>

      <div>
        <label htmlFor="description" className={labelCls}>
          Popis projektu
        </label>
        <textarea
          id="description"
          name="description"
          required
          minLength={MIN_DESCRIPTION}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className={fieldCls}
        />
        <p className="mt-2 font-mono text-small text-text-muted" aria-live="polite">
          {remaining > 0 ? `Ještě ${remaining} znaků` : `${description.length} znaků`}
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-soft bg-accent px-7 py-3.5 font-sans text-small font-medium tracking-wide text-bg-primary transition-colors duration-200 ease-out hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Odesílám…" : "Odeslat zprávu"}
        </button>
        {status === "error" && (
          <p className="font-mono text-small text-accent" role="alert">
            Odeslání selhalo. Zkuste to prosím znovu, nebo mi napište přímo na{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}
        {status === "mailto-opened" && (
          <p className="font-mono text-small text-text-secondary" role="status">
            Otevírám váš e-mailový klient. Pokud se neotevřel, napište přímo
            na{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
              {CONTACT_EMAIL}
            </a>{" "}
            nebo zavolejte na {CONTACT_PHONE_DISPLAY}.
          </p>
        )}
        <p className="font-mono text-small text-text-muted">
          Odpovídám do 1 pracovního dne.
        </p>
      </div>
    </form>
  );
}

import { useState, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/PLACEHOLDER";
const MIN_DESCRIPTION = 20;

const professions = [
  "Pojišťovací poradce",
  "Hypoteční makléř",
  "Investiční poradce",
  "Bankéř",
  "Jiné",
];

const webOptions = [
  "Ano, ale je zastaralý",
  "Ano, ale nefunguje pro byznys",
  "Ne, nemám web",
  "Jiné",
];

const fieldCls =
  "w-full rounded-soft border border-border-strong bg-bg-primary px-4 py-3 font-sans text-body text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none";

const labelCls = "mb-2 block font-mono text-small text-text-muted";

type Status = "idle" | "submitting" | "error";

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
    <form onSubmit={onSubmit} className="space-y-7" noValidate>
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
          Vaše profese
        </label>
        <select
          id="profession"
          name="profession"
          required
          defaultValue=""
          className={fieldCls}
        >
          <option value="" disabled>
            Vyberte…
          </option>
          {professions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
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
        <p className="mt-2 font-mono text-small text-text-muted">
          {remaining > 0 ? `Ještě ${remaining} znaků` : `${description.length} znaků`}
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-soft bg-accent px-7 py-3.5 font-sans text-small font-medium tracking-wide text-bg-primary transition-colors duration-200 ease-out hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Odesílám…" : "Odeslat zprávu"}
        </button>
        {status === "error" && (
          <p className="font-mono text-small text-accent" role="alert">
            Odeslání selhalo. Zkuste to prosím znovu nebo mi napište na jakub@connexus.cz.
          </p>
        )}
        <p className="font-mono text-small text-text-muted">Odpovídám do 24 hodin.</p>
      </div>
    </form>
  );
}

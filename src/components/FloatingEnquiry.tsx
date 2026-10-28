import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { createEnquiryMailto } from "@/lib/enquiry-email";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FieldName = keyof FormValues;

const emptyValues: FormValues = { name: "", email: "", phone: "", service: "", message: "" };

export function FloatingEnquiry() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const activeService = SERVICES.find((service) => pathname === `/services/${service.slug}`);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [draftMessage, setDraftMessage] = useState("");
  const [draftUrl, setDraftUrl] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [draftPrepared, setDraftPrepared] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const submissionInProgressRef = useRef(false);

  useEffect(() => {
    if (open) nameRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function openPanel() {
    setValues((current) => ({
      ...current,
      service: activeService?.name ?? current.service,
    }));
    setOpen(true);
  }

  function closePanel() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function updateField(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setDraftMessage("");
    setDraftUrl("");
    setDraftBody("");
    setDraftPrepared(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgressRef.current || draftPrepared) return;
    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Enter your full name.";
    if (!values.email.trim()) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.service) nextErrors.service = "Choose a service.";
    if (!values.message.trim()) nextErrors.message = "Write a short message.";
    setErrors(nextErrors);
    setDraftMessage("");

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      dialogRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    submissionInProgressRef.current = true;
    setSubmitting(true);
    try {
      const draft = createEnquiryMailto(values);
      setDraftUrl(draft.url);
      setDraftBody(draft.body);
      setDraftPrepared(true);
      try {
        const link = document.createElement("a");
        link.href = draft.url;
        link.click();
        setDraftMessage(
          "Your email draft is opening. Press Send in your email app to submit your enquiry. If it doesn't open, copy the details below and email sales@antechuae.com manually.",
        );
      } catch {
        setDraftMessage(
          "We couldn't open your email draft. Copy the details below and email sales@antechuae.com manually.",
        );
      }
    } finally {
      submissionInProgressRef.current = false;
      setSubmitting(false);
    }
  }

  const fieldClass = "mt-1.5 w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          id="floating-enquiry-panel"
          ref={dialogRef}
          role="dialog"
          aria-label="Send an enquiry"
          aria-modal="false"
          className="max-h-[min(42rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-border bg-card text-foreground shadow-2xl shadow-black/15 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-start justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-xl font-semibold">Send an Inquiry</h2>
            </div>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close enquiry panel"
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={submit} noValidate className="space-y-3.5 p-5">
            <div>
              <label htmlFor="floating-enquiry-name" className="text-sm font-medium">Full name <span className="text-primary">*</span></label>
              <input ref={nameRef} id="floating-enquiry-name" name="name" autoComplete="name" value={values.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "floating-enquiry-name-error" : undefined} className={fieldClass} />
              {errors.name && <p id="floating-enquiry-name-error" className="mt-1 text-xs text-primary" role="alert">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="floating-enquiry-email" className="text-sm font-medium">Email address <span className="text-primary">*</span></label>
              <input id="floating-enquiry-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "floating-enquiry-email-error" : undefined} className={fieldClass} />
              {errors.email && <p id="floating-enquiry-email-error" className="mt-1 text-xs text-primary" role="alert">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="floating-enquiry-phone" className="text-sm font-medium">Phone number</label>
              <input id="floating-enquiry-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => updateField("phone", event.target.value)} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="floating-enquiry-service" className="text-sm font-medium">Service required <span className="text-primary">*</span></label>
              <select id="floating-enquiry-service" name="service" value={values.service} onChange={(event) => updateField("service", event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "floating-enquiry-service-error" : undefined} className={fieldClass}>
                <option value="">Choose a service</option>
                {SERVICES.map((service) => <option value={service.name} key={service.slug}>{service.name}</option>)}
              </select>
              {errors.service && <p id="floating-enquiry-service-error" className="mt-1 text-xs text-primary" role="alert">{errors.service}</p>}
            </div>
            <div>
              <label htmlFor="floating-enquiry-message" className="text-sm font-medium">Message <span className="text-primary">*</span></label>
              <textarea id="floating-enquiry-message" name="message" rows={3} value={values.message} onChange={(event) => updateField("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "floating-enquiry-message-error" : undefined} className={`${fieldClass} resize-y`} />
              {errors.message && <p id="floating-enquiry-message-error" className="mt-1 text-xs text-primary" role="alert">{errors.message}</p>}
            </div>
            {draftMessage && (
              <div role="status" className="rounded-lg border border-primary/25 bg-primary/5 p-3 text-sm leading-5 text-foreground">
                <p>{draftMessage}</p>
                <a href={draftUrl} className="mt-2 inline-block font-medium text-primary underline underline-offset-2">Open email draft</a>
                <p className="mt-2 font-medium">To: sales@antechuae.com</p>
                <pre className="mt-1 max-h-32 overflow-auto whitespace-pre-wrap break-words rounded bg-white/70 p-2 text-xs">{draftBody}</pre>
              </div>
            )}
            <button type="submit" disabled={submitting || draftPrepared} className="btn-primary w-full justify-center disabled:cursor-wait disabled:opacity-60">{submitting ? "Opening draft…" : draftPrepared ? "Draft prepared" : "Send Inquiry"} {!submitting && !draftPrepared && <ArrowUpRight size={16} aria-hidden="true" />}</button>
          </form>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={open ? closePanel : openPanel}
        aria-expanded={open}
        aria-controls={open ? "floating-enquiry-panel" : undefined}
        aria-label={open ? "Close enquiry form" : "Open enquiry form"}
        title={open ? "Close enquiry form" : "Open enquiry form"}
        className="group inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary p-0 text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <MessageCircle size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

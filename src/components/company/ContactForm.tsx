"use client";

import { CircleAlert, Send } from "lucide-react";
import { useState } from "react";

import { WhatsAppMark } from "@/components/brand/SocialMarks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ContactField } from "@/types";

import type { FormEvent } from "react";

interface ContactFormProps {
  readonly fields: readonly ContactField[];
  readonly copy: {
    readonly title: string;
    readonly description: string;
    readonly submitLabel: string;
  };
  readonly fallback: {
    readonly title: string;
    readonly body: string;
  };
  /** Offered in the fallback panel. Omitted when not configured. */
  readonly whatsappHref: string | null;
}

/**
 * The contact form.
 *
 * There is no endpoint behind it yet, and this is the one decision in the
 * component worth defending: on submit it says so, in a panel, and points at a
 * channel that does work. The alternative — a green tick and "thanks, we'll be
 * in touch" for a message that went nowhere — is a lie the merchant only
 * discovers by waiting a week for a reply.
 *
 * Everything else is built so that wiring it up later is one function. The
 * fields are a record, the inputs are named, labelled and autocompleted, and
 * each carries the input type its content actually is — so the browser checks
 * the email and offers a phone keypad for the number before `handleSubmit` ever
 * runs. When there is somewhere to post to, that handler changes and nothing
 * around it has to.
 *
 * A client component because a form with a state transition needs one — and the
 * only one on either company page, which is why it is this narrow.
 */
export function ContactForm({
  fields,
  copy,
  fallback,
  whatsappHref,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Nothing to post to yet. The browser has already enforced `required` and
    // the field formats by the time this runs, so what is left is telling the
    // truth about where the message went.
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-2xl border border-ink/[0.08] bg-card p-6 shadow-[0_1px_2px_rgba(11,27,54,0.04),0_16px_40px_-24px_rgba(11,27,54,0.3)] sm:p-8">
      <h2 className="text-[1.25rem] leading-snug font-semibold tracking-[-0.02em] text-ink">
        {copy.title}
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-pretty text-ink/55">
        {copy.description}
      </p>

      <form onSubmit={handleSubmit} className="mt-7">
        {/*
          One field per row, not two.

          Paired up, each input got about 170px in this column — enough that
          `yourstore.myshopify.com` and `you@yourstore.com` were both clipped in
          their own placeholders, which is a form telling the merchant it does
          not have room for the answer it is asking for. Four fields is short
          enough that a single column costs nothing in scanning, and it gives
          the card the height it needs to sit level with the column beside it.
        */}
        <div className="grid gap-4">
          {fields.map((field) => (
            <Field key={field.name} field={field} />
          ))}
        </div>

        <Button
          type="submit"
          size="lg"
          block
          className="mt-6 h-12 gap-2 text-[15px] font-semibold"
        >
          <Send aria-hidden className="size-4" />
          {copy.submitLabel}
        </Button>

        <p className="mt-3 text-center text-[12px] leading-snug text-ink/40">
          We reply seven days a week.
        </p>

        {/*
          `role="status"` rather than an alert: this is the result of something
          the merchant did, not an error condition, and an assertive region
          would interrupt whatever a screen reader was mid-sentence on.
        */}
        <div role="status" aria-live="polite">
          {submitted ? (
            <div className="mt-6 flex animate-in gap-3 rounded-xl border border-ink/[0.08] bg-sky-50 px-4 py-3.5 duration-300 ease-[var(--ease-emphasized)] fade-in-0 slide-in-from-bottom-1">
              <CircleAlert
                aria-hidden
                className="mt-px size-4 shrink-0 text-ink/40"
                strokeWidth={1.8}
              />
              <div className="min-w-0">
                <p className="text-[13.5px] leading-snug font-semibold text-ink/80">
                  {fallback.title}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-pretty text-ink/55">
                  {fallback.body}
                </p>

                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-[13px] font-medium text-brand transition-colors duration-200 hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
                  >
                    <WhatsAppMark className="size-3.5" />
                    Message us on WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

const controlClass = cn(
  "w-full rounded-lg border border-ink/[0.1] bg-white px-3.5 py-2.5",
  "text-[14px] leading-normal text-ink placeholder:text-ink/35",
  "transition-[border-color,box-shadow] duration-200 ease-[var(--ease-emphasized)]",
  "hover:border-ink/20",
  "focus:border-brand/45 focus:ring-2 focus:ring-ring/25 focus:outline-none",
);

function Field({ field }: { readonly field: ContactField }) {
  const id = `contact-${field.name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-2 text-[12.5px] font-medium text-ink/65"
      >
        {field.label}
        {/*
          The optional one is marked, not the three required ones. Three
          asterisks and one bare label reads as "most of this is compulsory";
          one "Optional" reads as "you can skip this" — which is the thing the
          merchant filling it in actually wants to know.
        */}
        {field.required ? null : (
          <span className="text-[11px] font-normal text-ink/35">Optional</span>
        )}
      </label>

      <input
        id={id}
        name={field.name}
        type={field.type}
        required={field.required}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        className={cn(controlClass, "mt-2")}
      />
    </div>
  );
}

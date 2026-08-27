"use client";

import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useRef, useState } from "react";

import { WhatsAppMark } from "@/components/brand/SocialMarks";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { parseContactSubmission } from "@/lib/contact/submission";
import { cn } from "@/lib/utils";

import type {
  ContactField,
  ContactFieldErrors,
  ContactResponse,
} from "@/types";

import type { FormEvent, ReactNode } from "react";

interface ContactFormProps {
  readonly fields: readonly ContactField[];
  readonly copy: {
    readonly title: string;
    readonly description: string;
    readonly submitLabel: string;
  };
  readonly states: {
    readonly success: { readonly title: string; readonly body: string };
    readonly error: { readonly title: string; readonly body: string };
  };
  /** Offered when a send fails. Omitted when not configured. */
  readonly whatsappHref: string | null;
}

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The contact form.
 *
 * It posts to `/api/contact`, which validates the submission again and mails it
 * to the support mailbox. The panel that used to admit there was no endpoint
 * behind it is gone; what replaces it is two panels in the same place — sent,
 * or not sent — because those are now the only two things that can be true.
 *
 * The state machine is four values and one of them does the important work.
 * `sending` disables the fieldset and the button *and* returns early from the
 * handler, which is belt and braces on purpose: the disabled attribute stops
 * the click, and the guard stops the Enter key that beat React to the
 * re-render. A contact form that sends twice puts two threads in a support
 * inbox for one merchant, and the merchant is the one who gets asked the same
 * question twice.
 *
 * Validation runs here as well as on the server, from the same module, so a
 * missing store URL is caught without a round trip and reads the same either
 * way. `noValidate` turns off the browser's own bubbles — not because they are
 * wrong, but because a native tooltip on one field and an inline message on
 * another is two error languages on one form. The inputs keep `required` and
 * their real types regardless: that is what a screen reader announces and what
 * decides the keyboard a phone shows.
 *
 * A client component because a form with a state transition needs one — and the
 * only one on either company page, which is why it is this narrow.
 *
 * Two things are reported: that someone started filling it in, and that a
 * message was delivered. Neither carries a word the merchant typed. The name,
 * the email, the store URL and the note go to the support mailbox and nowhere
 * else — what analytics receives is `form_name: "contact"`, which is enough to
 * answer "how many people who start this finish it" and cannot answer anything
 * about who they were.
 */
export function ContactForm({
  fields,
  copy,
  states,
  whatsappHref,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  /**
   * Set only when the server sends a sentence better than the generic one — a
   * rate limit, say. Otherwise the panel keeps the copy from the content layer,
   * which is where the site's voice lives.
   */
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sending = useRef(false);
  /**
   * Whether `contact_form_start` has been reported for this form.
   *
   * A ref rather than state, because nothing on screen changes when it flips —
   * and it is reported once per mount rather than once per field, since the
   * useful number is how many people began, not how many boxes they visited.
   */
  const started = useRef(false);

  /** Fires on the first focus in the form, and never again. */
  function handleStart() {
    if (started.current) return;
    started.current = true;

    trackEvent("contact_form_start", { form_name: "contact" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // The ref, not the state: two submits in the same tick both read the same
    // stale `status`, and only one of them can be allowed through.
    if (sending.current) return;

    const form = event.currentTarget;
    const entries = Object.fromEntries(new FormData(form));
    const { data, errors: found, isValid } = parseContactSubmission(entries);

    if (!isValid) {
      setErrors(found);
      setStatus("idle");
      setErrorMessage(null);
      focusFirstInvalid(form, found);
      return;
    }

    sending.current = true;
    setStatus("sending");
    setErrors({});
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response
        .json()
        .catch(() => null)) as ContactResponse | null;

      if (response.ok && result?.ok) {
        // Reported here and nowhere else in the handler: this is the one
        // branch where the mailbox actually has the message. A rejected
        // submission, a 422, a rate limit and an offline browser all fall
        // through to the panels below, and none of them is a submission.
        trackEvent("contact_form_submit", { form_name: "contact" });

        // Cleared rather than left filled. The message is gone, and a form
        // still holding it invites the merchant to press send again.
        form.reset();
        setStatus("sent");
        return;
      }

      // A 422 means the server disagreed with the check above — a rule this
      // build has and the browser's copy of it did not. Its field map wins.
      if (result && !result.ok && result.fields) {
        setErrors(result.fields);
        setStatus("idle");
        focusFirstInvalid(form, result.fields);
        return;
      }

      setErrorMessage(result && !result.ok ? result.message : null);
      setStatus("error");
    } catch {
      // Offline, or the request never landed. Same panel: from where the
      // merchant is sitting, the message did not send.
      setErrorMessage(null);
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  /** Clears a field's error as soon as it is edited, not on the next submit. */
  function clearError(name: string) {
    setErrors((current) =>
      name in current
        ? omit(current, name as keyof ContactFieldErrors)
        : current,
    );
  }

  return (
    <div className="rounded-2xl border border-ink/[0.08] bg-card p-6 shadow-[0_1px_2px_rgba(11,27,54,0.04),0_16px_40px_-24px_rgba(11,27,54,0.3)] sm:p-8">
      <h2 className="text-[1.25rem] leading-snug font-semibold tracking-[-0.02em] text-ink">
        {copy.title}
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-pretty text-ink/55">
        {copy.description}
      </p>

      {/*
        `onFocus` on the form rather than a handler on each of the five fields:
        focus bubbles through React's synthetic events, so one listener sees the
        first interaction wherever it happens, and `Field` stays a presentational
        component with nothing to say about analytics.
      */}
      <form
        onSubmit={handleSubmit}
        onFocus={handleStart}
        noValidate
        className="mt-7"
      >
        {/*
          One field per row, not two.

          Paired up, each input got about 170px in this column — enough that
          `yourstore.myshopify.com` and `you@yourstore.com` were both clipped in
          their own placeholders, which is a form telling the merchant it does
          not have room for the answer it is asking for. Four fields is short
          enough that a single column costs nothing in scanning, and it gives
          the card the height it needs to sit level with the column beside it.

          A `fieldset` rather than a `div` so that one `disabled` covers every
          input while the message is in flight — otherwise the merchant can edit
          the values that are already on their way to the mailbox.
        */}
        <fieldset
          disabled={status === "sending"}
          className="grid gap-4 border-0 p-0"
        >
          {fields.map((field) => (
            <Field
              key={field.name}
              field={field}
              error={errors[field.name as keyof ContactFieldErrors]}
              onInput={() => clearError(field.name)}
            />
          ))}
        </fieldset>

        <Button
          type="submit"
          size="lg"
          block
          disabled={status === "sending"}
          className="mt-6 h-12 gap-2 text-[15px] font-semibold"
        >
          {status === "sending" ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden className="size-4" />
              {copy.submitLabel}
            </>
          )}
        </Button>

        <p className="mt-3 text-center text-[12px] leading-snug text-ink/40">
          We reply seven days a week.
        </p>

        {/*
          `role="status"` rather than an alert: this is the result of something
          the merchant did, not an error condition, and an assertive region
          would interrupt whatever a screen reader was mid-sentence on. The
          failed send is announced here too — it is still the answer to a thing
          they just did, and it stays on screen until they act on it either way.
        */}
        <div role="status" aria-live="polite">
          {status === "sent" ? (
            <ResultPanel
              tone="success"
              title={states.success.title}
              body={states.success.body}
            />
          ) : null}

          {status === "error" ? (
            <ResultPanel
              tone="error"
              title={states.error.title}
              body={errorMessage ?? states.error.body}
            >
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-event="whatsapp_click"
                  data-ga-name="Message us on WhatsApp"
                  data-ga-location="contact-form-error"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-[13px] font-medium text-brand transition-colors duration-200 hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
                >
                  <WhatsAppMark className="size-3.5" />
                  Message us on WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </ResultPanel>
          ) : null}
        </div>
      </form>
    </div>
  );
}

/**
 * The panel under the button, in the two shapes it takes.
 *
 * Deliberately the same object in both: same radius, same border, same inset,
 * same icon size and position — which is also the panel this page already had,
 * so the sent state lands exactly where the old notice did. Only the tint and
 * the glyph differ, because the merchant is reading the sentence, not decoding
 * a colour.
 */
function ResultPanel({
  tone,
  title,
  body,
  children,
}: {
  readonly tone: "success" | "error";
  readonly title: string;
  readonly body: string;
  readonly children?: ReactNode;
}) {
  const Icon = tone === "success" ? CircleCheck : CircleAlert;

  return (
    <div
      className={cn(
        "mt-6 flex animate-in gap-3 rounded-xl border px-4 py-3.5",
        "duration-300 ease-[var(--ease-emphasized)] fade-in-0 slide-in-from-bottom-1",
        tone === "success"
          ? "border-emerald-600/15 bg-emerald-50"
          : "border-ink/[0.08] bg-sky-50",
      )}
    >
      <Icon
        aria-hidden
        className={cn(
          "mt-px size-4 shrink-0",
          tone === "success" ? "text-emerald-600" : "text-ink/40",
        )}
        strokeWidth={1.8}
      />
      <div className="min-w-0">
        <p className="text-[13.5px] leading-snug font-semibold text-ink/80">
          {title}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-pretty text-ink/55">
          {body}
        </p>
        {children}
      </div>
    </div>
  );
}

const controlClass = cn(
  "w-full rounded-lg border border-ink/[0.1] bg-white px-3.5 py-2.5",
  "text-[14px] leading-normal text-ink placeholder:text-ink/35",
  "transition-[border-color,box-shadow] duration-200 ease-[var(--ease-emphasized)]",
  "hover:border-ink/20",
  "focus:border-brand/45 focus:ring-2 focus:ring-ring/25 focus:outline-none",
  "disabled:cursor-not-allowed disabled:bg-ink/[0.02] disabled:text-ink/50",
);

function Field({
  field,
  error,
  onInput,
}: {
  readonly field: ContactField;
  readonly error?: string;
  readonly onInput: () => void;
}) {
  const id = `contact-${field.name}`;
  const errorId = `${id}-error`;

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

      {/*
        A `textarea` where the answer is prose and an `input` everywhere else.
        Both take the same `controlClass`, so the note sits in the column
        looking like the four fields above it rather than like something bolted
        on afterwards.

        `resize-y` and nothing else: a box the merchant can make taller is
        useful, and one they can make wider is one that can be dragged out of
        the card and past the edge of the page.
      */}
      {field.multiline ? (
        <textarea
          id={id}
          name={field.name}
          rows={4}
          required={field.required}
          placeholder={field.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onInput={onInput}
          className={cn(
            controlClass,
            "mt-2 min-h-24 resize-y",
            error && "border-red-500/50 hover:border-red-500/60",
          )}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onInput={onInput}
          className={cn(
            controlClass,
            "mt-2",
            error && "border-red-500/50 hover:border-red-500/60",
          )}
        />
      )}

      {/*
        The message sits under the input it belongs to and is wired to it with
        `aria-describedby`, so it is read out on focus rather than only seen — a
        red border alone tells a sighted merchant something is wrong and tells
        everyone else nothing at all.
      */}
      {error ? (
        <p
          id={errorId}
          className="mt-1.5 text-[12px] leading-snug text-red-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Puts the caret in the first field that needs fixing.
 *
 * The browser does this for its own validation and it is the part worth
 * keeping: on a phone, the field with the problem can be off screen, and a form
 * that reports an error nobody can see reads as a button that does nothing.
 */
function focusFirstInvalid(
  form: HTMLFormElement,
  errors: ContactFieldErrors,
): void {
  const first = Object.keys(errors)[0];
  if (!first) return;

  const control = form.elements.namedItem(first);
  if (
    control instanceof HTMLInputElement ||
    control instanceof HTMLTextAreaElement
  ) {
    control.focus();
  }
}

function omit(
  errors: ContactFieldErrors,
  key: keyof ContactFieldErrors,
): ContactFieldErrors {
  const { [key]: _removed, ...rest } = errors;
  return rest;
}

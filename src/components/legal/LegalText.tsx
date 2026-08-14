import type { ReactNode } from "react";

/**
 * `**like this**`, and nothing else.
 *
 * Deliberately not Markdown and deliberately not `dangerouslySetInnerHTML`. The
 * only formatting a legal clause needs inside a sentence is emphasis on the part
 * a merchant is bound by — the age limit, the payment window, the words "does
 * not issue refunds" — and every other Markdown feature in a legal document is a
 * way for the rendered text to stop matching the published text. One rule, no
 * HTML parsing, no dependency, no way for a stray character in a policy to
 * become markup.
 */
const EMPHASIS = /\*\*([^*]+)\*\*/g;

/**
 * A legal string, with its emphasised phrases marked up.
 *
 * The emphasis is a `<strong>` rather than a colour or a weight class on the
 * paragraph, so the meaning survives being read aloud, printed, or copied into
 * an email — which is what happens to legal text.
 */
export function LegalText({ children }: { readonly children: string }) {
  if (!children.includes("**")) return <>{children}</>;

  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of children.matchAll(EMPHASIS)) {
    const start = match.index;

    if (start > cursor) nodes.push(children.slice(cursor, start));

    nodes.push(
      <strong key={start} className="font-semibold text-ink">
        {match[1]}
      </strong>,
    );

    cursor = start + match[0].length;
  }

  if (cursor < children.length) nodes.push(children.slice(cursor));

  return <>{nodes}</>;
}

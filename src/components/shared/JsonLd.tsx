interface JsonLdProps {
  /**
   * Identifies the block in the rendered HTML. Worth setting when a page grows
   * a second one, so a validator's complaint names the schema it came from.
   */
  readonly id?: string;
  /** A schema.org node, already built. Serialised as-is. */
  readonly schema: object;
}

/**
 * One block of JSON-LD, rendered into the server response.
 *
 * A plain `<script>` rather than `next/script`, and that is the requirement
 * rather than a preference: structured data has to be in the initial HTML.
 * `next/script` with any strategy other than `beforeInteractive` injects the
 * tag from the client after hydration, which is exactly late enough for a
 * crawler that reads the raw response to see nothing at all.
 *
 * `<` is escaped because it is the only character that can end the script
 * element early. None of the values this site passes contain one today, but the
 * schema is assembled from a content repository that marketing is meant to be
 * able to edit, and "no content contains a `<`" is not an invariant a repository
 * of prose can promise. `JSON.stringify` escapes quotes and backslashes; this
 * closes the remaining hole.
 */
export function JsonLd({ id, schema }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * Rewriting React's streaming payload without breaking it.
 *
 * A documentation page arrives with its content twice: once as HTML, and once
 * as the React payload the page hydrates from and the client router navigates
 * by. Both have to be translated into this site's addresses — the HTML so the
 * page renders correct links, the payload so a *click* on one of them goes to
 * the right place instead of leaving `/documentation`.
 *
 * The payload cannot be treated as text and search-replaced. It is a stream of
 * rows, and some rows declare their own length:
 *
 *     46:T6a1,{"@context":"https://schema.org", … }
 *     ↑  ↑ ↑
 *     │  │ └── 0x6a1 bytes of content follow, with no delimiter after them
 *     │  └──── row type: T, a length-prefixed text blob
 *     └─────── row id
 *
 * The next row begins at exactly that offset. So making a string inside one of
 * those rows longer — which `https://docs.codking.tech` →
 * `https://codking.tech/documentation` does, by nine bytes each time — moves
 * every subsequent row out from under its own header. React then reads a row as
 * the wrong type and the page dies during hydration with a message about the
 * payload rather than about the URL that caused it. That is not a hypothetical:
 * it is what the first version of this proxy did.
 *
 * This module therefore walks the stream a row at a time, hands each row's
 * content to the caller's transform, and re-emits length-prefixed rows with
 * their length recomputed. Callers cannot corrupt the stream by changing the
 * size of what they return, which is the whole point.
 *
 * ── On byte offsets ───────────────────────────────────────────────────────
 * The declared length counts *bytes*, not characters, so every string here is
 * the body's Latin-1 view: one character per byte, whatever the real encoding
 * is. Non-ASCII text passes through untouched and is written back out byte for
 * byte, and the offsets stay honest. `proxy.ts` is what establishes that view.
 */

/** `<row id>:T<hex byte length>,` — the header of a length-prefixed row. */
const LENGTH_PREFIXED_ROW = /^([0-9a-f]+):T([0-9a-f]+),/;

/**
 * Apply `transform` to every row of a React payload stream.
 *
 * Ordinary rows are newline-delimited and may change length freely. A
 * length-prefixed row is read by its declared byte count — its content can
 * itself contain newlines, which is exactly why it carries a length — and is
 * re-emitted with the length its transformed content actually has.
 */
export function rewriteFlightStream(
  stream: string,
  transform: (row: string) => string,
): string {
  let output = "";
  let cursor = 0;

  while (cursor < stream.length) {
    const lineEnd = stream.indexOf("\n", cursor);
    const rowEnd = lineEnd === -1 ? stream.length : lineEnd;
    const header = LENGTH_PREFIXED_ROW.exec(stream.slice(cursor, rowEnd));

    if (header) {
      const [prefix, id, declaredLength] = header;
      const contentStart = cursor + prefix.length;
      const contentEnd = contentStart + parseInt(declaredLength, 16);
      const content = transform(stream.slice(contentStart, contentEnd));

      output += `${id}:T${content.length.toString(16)},${content}`;
      cursor = contentEnd;
      continue;
    }

    output += transform(stream.slice(cursor, rowEnd));
    if (lineEnd === -1) break;
    output += "\n";
    cursor = lineEnd + 1;
  }

  return output;
}

/**
 * The payload as it is embedded in a server-rendered page.
 *
 * React ships the stream inside the document as several dozen calls to
 * `self.__next_f.push([1, "…"])`, each holding one slice of it as a JavaScript
 * string. The slices are cut wherever the stream happened to flush, so a single
 * row — header in one call, content in the next — regularly straddles them.
 */
export const FLIGHT_PUSH = /self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g;

/** The slice of stream one `__next_f.push` call carries. */
export function decodeFlightPush(call: string): string {
  const literal = /\[1,("(?:[^"\\]|\\.)*")\]/.exec(call);
  return literal ? (JSON.parse(literal[1]) as string) : "";
}

/**
 * A whole stream, as a single `__next_f.push` call.
 *
 * Returning everything in one call is safe because `__next_f` is concatenated
 * before it is parsed: where the boundaries fall carries no meaning, only their
 * order does. The remaining calls become `emptyFlightPush()` so the document's
 * script structure is unchanged.
 *
 * `<` is escaped on the way in. `JSON.stringify` has no reason to, and a
 * `</script>` sequence inside a script tag ends the script — which would turn a
 * documentation page into a blank one.
 */
export function encodeFlightPush(stream: string): string {
  const encoded = JSON.stringify(stream).replaceAll("<", "\\u003c");
  return `self.__next_f.push([1,${encoded}])`;
}

/** A call that contributes nothing, holding a slot the document already had. */
export function emptyFlightPush(): string {
  return 'self.__next_f.push([1,""])';
}

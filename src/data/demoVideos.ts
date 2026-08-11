import type { DemoVideoRegistry } from "@/types";

/**
 * Every demo recording on the site, in one place (§11).
 *
 * One registry rather than an id inside each page's copy object. "Which video
 * plays where" is a question about the set, not about any one page, and the
 * answer has to be visible at a glance — otherwise a page quietly showing the
 * wrong recording is a bug nobody can see without opening four files.
 *
 * ── Ids, not URLs ─────────────────────────────────────────────────────────
 * Taken from the share link's path (`youtu.be/<id>`). The `?si=` parameter
 * YouTube appends is share tracking and is deliberately not carried over. The
 * embed address and the "watch full demo" link are both built from the id, so
 * they cannot point at two different videos.
 * ──────────────────────────────────────────────────────────────────────────
 */

/**
 * The site's general product demo — COD King as a whole rather than one
 * control.
 *
 * This is what plays on a surface that has not named a recording of its own.
 * A fallback rather than a placeholder: an empty frame teaches a visitor
 * nothing, and the general demo is a true, if unspecific, answer to "show me
 * how this works".
 */
export const generalDemoVideoId = "gq2C3A0pbXY";

/**
 * What each surface plays instead of the general demo.
 *
 * A surface is absent from this map until its own recording exists — that
 * absence is the record, and it is why the type is partial. Adding a video to
 * a page is one line here and nothing else.
 *
 * ── Not yet recorded ──────────────────────────────────────────────────────
 * TODO(content): `cod-to-prepaid` has no demo of its own yet and shows the
 * general one. The remaining feature pages join this map as their recordings
 * are made.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * ── One recording, two surfaces ───────────────────────────────────────────
 * `cod-fees` and `cod-show-hide` are both assigned `m9-7seS1Yg8`, which is the
 * recording the COD Fees page brief names explicitly. Two surfaces sharing an
 * id is legal and this map is exactly where such a thing should be visible;
 * when a COD Fees recording of its own exists, this is the one line to change.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const demoVideos: DemoVideoRegistry = {
  home: "I22U3fj6vKo",
  "otp-verification": "yCPBjrO2tFA",
  "partial-cod-payment": "gq2C3A0pbXY",
  "abandoned-cart-recovery": "XoTkeO4d2KU",
  "cod-show-hide": "m9-7seS1Yg8",
  "cod-fees": "m9-7seS1Yg8",
};

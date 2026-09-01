import { cn } from "@/lib/utils";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface IphoneProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Rendered inside the screen.
   *
   * The registry component took an image or video URL. This project renders
   * the screen as markup instead, so the hero shows a real product screen
   * rather than a flat screenshot: sharp at any density, themed by the same
   * tokens as the rest of the site, no image bytes on the page's largest
   * element, and text that is genuinely text.
   */
  children?: ReactNode;
  /**
   * Dims and cools the hardware for a device that is meant to sit behind
   * another one. Depth in a two-device scene comes from light falling off,
   * not only from scale — a rear phone lit identically to the front one reads
   * as a duplicate rather than as further away.
   */
  readonly depth?: "front" | "rear";
  /**
   * The logical width the screen inside is designed against, in pixels.
   *
   * The screens are laid out in real pixels — an 11px price, a 9px caption —
   * because that is how you control a dense interface. But the device is
   * sized as a percentage of its column, so on a phone the same markup used
   * to be asked to fit a screen two-thirds the width it was drawn for, and
   * the bottom of the checkout simply fell off.
   *
   * So the screen is rendered at its design size and scaled to whatever width
   * the device actually gets. The layout is then identical at every viewport
   * instead of merely similar, and no screen can outgrow its glass. Each
   * screen declares its own design width, because the rear device is drawn at
   * a smaller scale on purpose and must not be blown up to match the front.
   */
  readonly screenWidth?: number;
}

/**
 * Screen height per unit of screen width.
 *
 * Derived from the device geometry rather than guessed: the glass is inset
 * from the frame by the rail and inner-wall padding, both of which resolve
 * against the device *width*, so the screen's own aspect is not the device's.
 *
 *     screen aspect = (device aspect - 2 x (rail + wall)) / (1 - 2 x (rail + wall))
 *                   = (789/433 - 0.058) / 0.942
 *
 * It has to be recomputed whenever the root aspect moves, and it is the one
 * number here that fails silently if it is not: the screen box is sized from
 * it, so a screen aspect taller than its glass is scaled past the bottom of
 * the phone and the last row of whatever is on it is simply not drawn.
 */
const SCREEN_ASPECT = 1.873;

/**
 * A device that reads as an object rather than an outline.
 *
 * Built from nested rounded boxes rather than a single SVG path, because
 * everything that makes a phone look real is an edge treatment and an SVG
 * silhouette cannot carry them:
 *
 * - a machined titanium rail, drawn as a conic gradient so the highlight
 *   travels round the frame the way light does across a chamfered edge, with
 *   a second inset conic laid over it for the polished chamfer itself
 * - a black inner wall between rail and glass, which gives the frame real
 *   thickness instead of looking printed on
 * - two specular passes on the glass: a broad diagonal sheen and a tight
 *   corner glint, so the surface reads as glass rather than as a tint
 * - side buttons and the antenna bands catching the same light as the rail
 * - a three-part shadow — contact, mid, and a wide ambient one — because a
 *   single blurred drop shadow is the clearest tell that a mockup is flat
 *
 * The screen radius is set on the inner element and the content simply fills
 * it, so a screen can never spill past the corner.
 *
 * The device is 433:789 rather than a real handset's 433:882, and that is the
 * only place this drawing knowingly departs from the object it is drawing.
 *
 * What it buys is the hero fitting on a screen. The checkout on the glass is
 * cut to about 1:1.62 and a real phone's glass is 1:2.1, so a phone holding it
 * at a legible width ran a fifth taller than the composition around it had room
 * for — the foot of the device fell past the fold, and the difference was spent
 * on an empty band above the trust strip rather than on anything a merchant
 * reads. Shortening the frame takes that band back and costs the checkout
 * nothing: the screen keeps its width, so every size on it is rendered at
 * exactly the scale it was before.
 *
 * Every vertical percentage below is scaled by 882/789 to match, so the corner
 * radii, the island, the bands and the buttons keep the pixel geometry they had
 * — the phone is shorter, not squashed. They are percentages of a height that
 * moved, which is why they cannot be left alone: a radius left at 7.6% would
 * quietly round the corners less on the shorter box.
 *
 * Deliberately renders no 3D rotation of its own. A rotated device is
 * rasterised at its pre-transform size and then resampled, which softens
 * every glyph on the screen — and the screen is the entire point. Perspective
 * here is bought with light and shadow, which cost nothing in sharpness.
 */
export function Iphone({
  children,
  className,
  style,
  depth = "front",
  screenWidth = 320,
  ...props
}: IphoneProps) {
  const rear = depth === "rear";

  return (
    <div
      className={cn("relative aspect-[433/789] w-full", className)}
      style={style}
      {...props}
    >
      {/* Titanium rail. */}
      <div
        className="absolute inset-0 rounded-[15.5%/8.5%] p-[1.7%]"
        style={{
          backgroundImage:
            "conic-gradient(from 132deg at 50% 50%, #f4f2f9 0deg, #c3bed2 42deg, #8d8899 92deg, #b6b1c3 128deg, #efedf5 168deg, #d6d2e2 210deg, #97929f 262deg, #cbc7d8 306deg, #f4f2f9 360deg)",
          boxShadow: rear
            ? "0 2px 4px rgba(20,16,58,0.14), 0 14px 24px -12px rgba(20,16,58,0.28), 0 40px 60px -28px rgba(20,16,58,0.3)"
            : "0 2px 4px rgba(20,16,58,0.2), 0 20px 34px -14px rgba(20,16,58,0.34), 0 54px 90px -34px rgba(20,16,58,0.42), 0 90px 120px -60px rgba(115,77,255,0.35)",
        }}
      >
        {/* Polished chamfer — a second, brighter pass just inside the rail. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[0.6%] rounded-[15%/8.27%] opacity-70"
          style={{
            backgroundImage:
              "conic-gradient(from 300deg at 50% 50%, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.85) 40deg, rgba(255,255,255,0) 100deg, rgba(255,255,255,0) 220deg, rgba(255,255,255,0.6) 258deg, rgba(255,255,255,0) 320deg)",
          }}
        />

        {/* Inner wall — gives the rail thickness. */}
        <div className="relative size-full rounded-[14.1%/7.84%] bg-[#0d0a1c] p-[1.2%]">
          {/* Glass. */}
          <div className="@container relative size-full overflow-hidden rounded-[13%/7.18%] bg-white">
            {/*
              The screen, drawn at its design size and scaled to fit the glass.
              See the `screen-fit` utility for why, and for what happens on a
              browser that cannot do the arithmetic.
            */}
            <div
              className="screen-fit"
              style={
                {
                  "--screen-w": `${screenWidth}px`,
                  "--screen-h": `${Math.round(screenWidth * SCREEN_ASPECT)}px`,
                } as CSSProperties
              }
            >
              {children}
            </div>

            {/* Dynamic Island, drawn over the screen like the real one. */}
            <div
              aria-hidden
              className="absolute top-[1.57%] left-1/2 h-[3.59%] w-[29%] -translate-x-1/2 rounded-full bg-[#0d0a1c]"
            >
              <span className="absolute top-1/2 right-[14%] size-[26%] -translate-y-1/2 rounded-full bg-[#1d1836]" />
            </div>

            {/* Broad diagonal sheen. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(112deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 16%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 66%, rgba(255,255,255,0.1) 82%, rgba(255,255,255,0.03) 100%)",
              }}
            />

            {/* Tight corner glint — the thing that says "glass", not "tint". */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(38% 22% at 12% 4%, rgba(255,255,255,0.55), transparent 70%)",
              }}
            />

            {rear ? (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-ink/8"
              />
            ) : null}

            {/* Edge darkening, so the glass meets the frame rather than floats. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[13%/7.18%] shadow-[inset_0_0_2px_rgba(20,16,58,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* Antenna bands. */}
      <span
        aria-hidden
        className="absolute top-[9.5%] -left-[0.2%] h-[0.56%] w-[2.4%] rounded-full bg-[#6f6a80]/70"
      />
      <span
        aria-hidden
        className="absolute bottom-[9.5%] -left-[0.2%] h-[0.56%] w-[2.4%] rounded-full bg-[#6f6a80]/70"
      />

      {/* Side buttons, lit by the same source as the rail. */}
      <div
        aria-hidden
        className="absolute top-[18.45%] -left-[0.9%] h-[4.02%] w-[1.1%] rounded-l-[2px] bg-gradient-to-r from-[#7f7a8e] via-[#cbc7d8] to-[#a29daf]"
      />
      <div
        aria-hidden
        className="absolute top-[26.27%] -left-[0.9%] h-[7.6%] w-[1.1%] rounded-l-[2px] bg-gradient-to-r from-[#7f7a8e] via-[#cbc7d8] to-[#a29daf]"
      />
      <div
        aria-hidden
        className="absolute top-[36.33%] -left-[0.9%] h-[7.6%] w-[1.1%] rounded-l-[2px] bg-gradient-to-r from-[#7f7a8e] via-[#cbc7d8] to-[#a29daf]"
      />
      <div
        aria-hidden
        className="absolute top-[27.95%] -right-[0.9%] h-[11.74%] w-[1.1%] rounded-r-[2px] bg-gradient-to-l from-[#7f7a8e] via-[#cbc7d8] to-[#a29daf]"
      />
    </div>
  );
}

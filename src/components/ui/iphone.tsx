import { cn } from "@/lib/utils";

import type { HTMLAttributes, ReactNode } from "react";

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
}

/**
 * A device that reads as an object rather than an outline.
 *
 * Built from nested rounded boxes rather than a single SVG path, because the
 * things that make a phone look real are all edge treatments and an SVG
 * silhouette cannot carry them:
 *
 * - a brushed titanium rail, drawn as a conic gradient so the highlight
 *   travels round the frame the way light does on a chamfered edge
 * - a darker inner wall between the rail and the glass, which is what gives
 *   the frame thickness instead of looking printed on
 * - a diagonal specular sheen across the glass, clipped to the screen
 * - two side buttons catching the same light as the rail
 * - a layered shadow: a tight contact shadow plus a wide soft one
 *
 * The screen radius is set on the inner element and the content simply fills
 * it, so a screen can never spill past the corner.
 */
export function Iphone({ children, className, style, ...props }: IphoneProps) {
  return (
    <div
      className={cn("relative aspect-[433/882] w-full", className)}
      style={style}
      {...props}
    >
      {/* Titanium rail. */}
      <div
        className="absolute inset-0 rounded-[15.5%/7.6%] p-[1.6%]"
        style={{
          backgroundImage:
            "conic-gradient(from 135deg at 50% 50%, #e9e6f2 0deg, #b7b2c6 55deg, #8e8a9e 100deg, #d9d5e4 150deg, #f2f0f7 200deg, #a9a4b8 260deg, #cfcbdb 310deg, #e9e6f2 360deg)",
          boxShadow:
            "0 2px 4px rgba(20,16,58,0.18), 0 18px 30px -12px rgba(20,16,58,0.35), 0 50px 80px -30px rgba(20,16,58,0.4)",
        }}
      >
        {/* Inner wall — gives the rail thickness. */}
        <div className="size-full rounded-[14.2%/7%] bg-[#141026] p-[1.1%]">
          {/* Glass. */}
          <div className="relative size-full overflow-hidden rounded-[13%/6.4%] bg-white">
            {children}

            {/* Notch island, drawn over the screen like the real one. */}
            <div
              aria-hidden
              className="absolute top-[1.5%] left-1/2 h-[3.1%] w-[30%] -translate-x-1/2 rounded-full bg-[#141026]"
            />

            {/* Specular sheen across the glass. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(112deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.16) 18%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.14) 78%, rgba(255,255,255,0.04) 100%)",
              }}
            />

            {/* Edge darkening, so the glass meets the frame rather than floats. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[13%/6.4%] shadow-[inset_0_0_2px_rgba(20,16,58,0.35)]"
            />
          </div>
        </div>
      </div>

      {/* Side buttons, lit by the same source as the rail. */}
      <div
        aria-hidden
        className="absolute top-[17%] -left-[0.7%] h-[4%] w-[1%] rounded-l-sm bg-gradient-to-r from-[#8e8a9e] to-[#d2cee0]"
      />
      <div
        aria-hidden
        className="absolute top-[24%] -left-[0.7%] h-[7%] w-[1%] rounded-l-sm bg-gradient-to-r from-[#8e8a9e] to-[#d2cee0]"
      />
      <div
        aria-hidden
        className="absolute top-[33%] -left-[0.7%] h-[7%] w-[1%] rounded-l-sm bg-gradient-to-r from-[#8e8a9e] to-[#d2cee0]"
      />
      <div
        aria-hidden
        className="absolute top-[25%] -right-[0.7%] h-[11%] w-[1%] rounded-r-sm bg-gradient-to-l from-[#8e8a9e] to-[#d2cee0]"
      />
    </div>
  );
}

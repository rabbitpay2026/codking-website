import { cn } from "@/lib/utils";

import type { WithClassName } from "@/types";

/**
 * The status bar every phone screen opens with.
 *
 * Small, but its absence is what makes a device mockup read as a drawing
 * rather than a screen. Drawn rather than iconified so it costs nothing.
 */
export function StatusBar({ className }: WithClassName) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center justify-between px-5 pt-3 text-[10px] font-semibold",
        className,
      )}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span className="flex items-end gap-px">
          {[3, 5, 7, 9].map((height) => (
            <span
              key={height}
              style={{ height }}
              className="w-[3px] rounded-full bg-current"
            />
          ))}
        </span>
        <span className="ml-0.5 h-2.5 w-5 rounded-[3px] border border-current/60 p-px">
          <span className="block h-full w-2/3 rounded-[1px] bg-current" />
        </span>
      </div>
    </div>
  );
}

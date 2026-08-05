import { cn } from "@/lib/utils";

import type { CSSProperties } from "react";

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

/**
 * Deterministic scatter — a hash of the index, kept in [0, 1).
 *
 * The registry version randomises inside an effect, so the meteors do not
 * exist until after hydration, cost an extra render of the whole set, and
 * reshuffle on any re-render. Deriving positions from the index instead lets
 * them render on the server, keeps them stable, and removes the client
 * boundary entirely: the component is now pure CSS animation over
 * server-rendered markup.
 */
function scatter(index: number, salt: number) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function Meteors({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) {
  const meteors = Array.from({ length: number }, (_, index) => {
    const style = {
      "--angle": `${-angle}deg`,
      top: "-5%",
      // A percentage rather than window.innerWidth, so the spread is correct
      // on the server and at every viewport size.
      left: `${(scatter(index, 1) * 100).toFixed(2)}%`,
      animationDelay: `${(scatter(index, 2) * (maxDelay - minDelay) + minDelay).toFixed(2)}s`,
      animationDuration: `${Math.floor(scatter(index, 3) * (maxDuration - minDuration) + minDuration)}s`,
    } as CSSProperties;

    return { index, style };
  });

  return (
    <>
      {meteors.map(({ index, style }) => (
        <span
          key={index}
          aria-hidden
          style={style}
          className={cn(
            "pointer-events-none absolute size-0.5 rotate-(--angle) animate-meteor rounded-full bg-white shadow-[0_0_0_1px_#ffffff20]",
            className,
          )}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-white to-transparent" />
        </span>
      ))}
    </>
  );
}

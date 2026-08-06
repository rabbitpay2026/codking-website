import { cn } from "@/lib/utils";

import type { Country } from "@/components/sections/worldwide/data";

interface GlobeProps {
  readonly countries: readonly Country[];
  readonly activeCountryId: Country["id"] | null;
  readonly className?: string;
}

const SIZE = 360;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RADIUS = 128;

function project(country: Country) {
  const lat = (country.lat * Math.PI) / 180;
  const lng = ((country.lng + 20) * Math.PI) / 180;

  return {
    x: CX + Math.cos(lat) * Math.sin(lng) * RADIUS * 0.94,
    y: CY - Math.sin(lat) * RADIUS * 0.92,
  };
}

export function Globe({ countries, activeCountryId, className }: GlobeProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[25rem] rounded-full",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.95),rgba(239,246,255,0.9)_42%,rgba(214,229,255,0.88)_63%,rgba(191,219,254,0.92)_100%)] shadow-[0_18px_60px_-24px_rgba(37,99,235,0.38)]"
      />

      <div
        aria-hidden
        className="absolute inset-[4%] rounded-full border border-white/80 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.16),transparent_40%,rgba(37,99,235,0.08)_72%,rgba(30,64,175,0.12)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
      />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden
        className="absolute inset-0 h-full w-full overflow-visible rounded-full"
      >
        <defs>
          <clipPath id="worldwide-globe-clip">
            <circle cx={CX} cy={CY} r={RADIUS} />
          </clipPath>
          <radialGradient id="worldwide-globe-glow" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="58%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(37,99,235,0.10)" />
          </radialGradient>
        </defs>

        <g clipPath="url(#worldwide-globe-clip)">
          <circle cx={CX} cy={CY} r={RADIUS} fill="url(#worldwide-globe-glow)" />

          <g
            className="origin-center animate-spin"
            style={{ animationDuration: "42s", animationTimingFunction: "linear" }}
          >
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              stroke="rgba(191,219,254,0.72)"
              strokeWidth="1.1"
            />

            <ellipse
              cx={CX}
              cy={CY}
              rx={RADIUS * 0.98}
              ry={RADIUS * 0.32}
              fill="none"
              stroke="rgba(96,165,250,0.26)"
              strokeWidth="1.1"
            />
            <ellipse
              cx={CX}
              cy={CY}
              rx={RADIUS * 0.98}
              ry={RADIUS * 0.63}
              fill="none"
              stroke="rgba(96,165,250,0.18)"
              strokeWidth="1"
              strokeDasharray="2.2 6"
            />
            <ellipse
              cx={CX}
              cy={CY}
              rx={RADIUS * 0.56}
              ry={RADIUS * 0.97}
              fill="none"
              stroke="rgba(96,165,250,0.20)"
              strokeWidth="1"
            />
            <ellipse
              cx={CX}
              cy={CY}
              rx={RADIUS * 0.34}
              ry={RADIUS * 0.97}
              fill="none"
              stroke="rgba(96,165,250,0.10)"
              strokeWidth="1"
              strokeDasharray="3 8"
            />

            <path
              d={`M ${CX - RADIUS} ${CY} C ${CX - RADIUS * 0.55} ${CY - RADIUS * 0.06}, ${CX + RADIUS * 0.55} ${CY - RADIUS * 0.06}, ${CX + RADIUS} ${CY}`}
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1"
            />
            <path
              d={`M ${CX - RADIUS * 0.86} ${CY - RADIUS * 0.32} C ${CX - RADIUS * 0.34} ${CY - RADIUS * 0.43}, ${CX + RADIUS * 0.34} ${CY - RADIUS * 0.43}, ${CX + RADIUS * 0.86} ${CY - RADIUS * 0.32}`}
              fill="none"
              stroke="rgba(96,165,250,0.18)"
              strokeWidth="1"
              strokeDasharray="4 7"
            />

            {countries.map((country) => {
              const { x, y } = project(country);
              const active = activeCountryId === country.id;
              const dimmed = activeCountryId && !active;

              return (
                <g key={country.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r={active ? 7.5 : 5}
                    fill={active ? "rgba(255,255,255,0.32)" : "rgba(37,99,235,0.18)"}
                    className={cn(
                      "transition-all duration-300",
                      dimmed && "opacity-45",
                    )}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={active ? 3.4 : 2.5}
                    fill={active ? "#2563EB" : "#60A5FA"}
                    className={cn(
                      "transition-all duration-300",
                      dimmed && "opacity-55",
                    )}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={active ? 10.5 : 0}
                    fill="none"
                    stroke="rgba(37,99,235,0.22)"
                    strokeWidth="1"
                    className={cn(
                      "transition-all duration-300",
                      active && "animate-pulse",
                    )}
                    style={{ animationDuration: "4s" }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={active ? 16 : 0}
                    fill="none"
                    stroke="rgba(96,165,250,0.16)"
                    strokeWidth="1"
                    className={cn("transition-all duration-300", active && "animate-pulse")}
                    style={{ animationDuration: "5.5s" }}
                  />
                  {!active ? null : (
                    <circle
                      cx={x}
                      cy={y}
                      r={1.4}
                      fill="#FFFFFF"
                      className="opacity-90"
                    />
                  )}
                  <title>{country.name}</title>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_26%,rgba(255,255,255,0.88),transparent_28%,transparent_55%,rgba(37,99,235,0.16)_82%,rgba(37,99,235,0.2)_100%)] mix-blend-screen"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.55),transparent_38%,rgba(37,99,235,0.1)_80%,rgba(255,255,255,0.22))]"
      />
    </div>
  );
}

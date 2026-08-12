import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FlagProps {
  readonly className?: string;
}

function FlagFrame({
  children,
  className,
}: FlagProps & { readonly children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 24"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "block h-4.5 w-6 overflow-hidden rounded-[0.35rem] border border-black/10 bg-white shadow-sm",
        className,
      )}
    >
      {children}
    </svg>
  );
}

export function IndiaFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="32" height="8" fill="#FF9933" />
      <rect y="8" width="32" height="8" fill="#FFFFFF" />
      <rect y="16" width="32" height="8" fill="#138808" />
      <circle
        cx="16"
        cy="12"
        r="3"
        fill="none"
        stroke="#1D4ED8"
        strokeWidth="0.8"
      />
      <g stroke="#1D4ED8" strokeWidth="0.45" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index * 30 * Math.PI) / 180;
          const x = 16 + Math.cos(angle) * 3;
          const y = 12 + Math.sin(angle) * 3;
          return <line key={index} x1="16" y1="12" x2={x} y2={y} />;
        })}
      </g>
    </FlagFrame>
  );
}

export function PhilippinesFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="32" height="12" fill="#0038A8" />
      <rect y="12" width="32" height="12" fill="#CE1126" />
      <polygon points="0,0 13,12 0,24" fill="#FFFFFF" />
      <circle cx="4.2" cy="12" r="2.2" fill="#FCD116" />
      <g fill="#FCD116">
        <polygon
          points="1.8,4.5 2.3,5.8 3.7,5.8 2.6,6.6 3.0,7.9 1.8,7.1 0.6,7.9 1.0,6.6 -0.1,5.8 1.3,5.8"
          transform="translate(0.8 1.2)"
        />
        <polygon
          points="1.8,4.5 2.3,5.8 3.7,5.8 2.6,6.6 3.0,7.9 1.8,7.1 0.6,7.9 1.0,6.6 -0.1,5.8 1.3,5.8"
          transform="translate(4 0.2)"
        />
        <polygon
          points="1.8,4.5 2.3,5.8 3.7,5.8 2.6,6.6 3.0,7.9 1.8,7.1 0.6,7.9 1.0,6.6 -0.1,5.8 1.3,5.8"
          transform="translate(3.9 4.5)"
        />
      </g>
    </FlagFrame>
  );
}

export function UaeFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="32" height="8" fill="#00732F" />
      <rect y="8" width="32" height="8" fill="#FFFFFF" />
      <rect y="16" width="32" height="8" fill="#000000" />
      <rect width="8" height="24" fill="#CE1126" />
    </FlagFrame>
  );
}

export function SaudiArabiaFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="32" height="24" fill="#006C35" />
      <rect x="9" y="16.2" width="14" height="1.3" rx="0.65" fill="#FFFFFF" />
      <rect x="10" y="15.8" width="1.4" height="2.1" rx="0.7" fill="#FFFFFF" />
    </FlagFrame>
  );
}

export function PakistanFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="32" height="24" fill="#01411C" />
      <rect width="7" height="24" fill="#FFFFFF" />
      <path
        d="M18 7.2a4.6 4.6 0 1 0 0 9.2 4.1 4.1 0 1 1 0-9.2z"
        fill="#FFFFFF"
      />
      <circle cx="20.8" cy="9.6" r="0.95" fill="#FFFFFF" />
    </FlagFrame>
  );
}

export function BangladeshFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="32" height="24" fill="#006A4E" />
      <circle cx="14.5" cy="12" r="5.1" fill="#F42A41" />
    </FlagFrame>
  );
}

export function EgyptFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="32" height="8" fill="#CE1126" />
      <rect y="8" width="32" height="8" fill="#FFFFFF" />
      <rect y="16" width="32" height="8" fill="#000000" />
      <circle cx="16" cy="12" r="2.2" fill="#C8A94A" />
    </FlagFrame>
  );
}

export function ItalyFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="10.66" height="24" fill="#009246" />
      <rect x="10.66" width="10.68" height="24" fill="#FFFFFF" />
      <rect x="21.34" width="10.66" height="24" fill="#CE2B37" />
    </FlagFrame>
  );
}

export function SpainFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="32" height="24" fill="#AA151B" />
      <rect y="6" width="32" height="12" fill="#F1BF00" />
      <rect x="6" y="8.5" width="2.2" height="7" rx="1.1" fill="#AA151B" />
      <rect x="9" y="8.5" width="2.2" height="7" rx="1.1" fill="#AA151B" />
    </FlagFrame>
  );
}

export function UnitedStatesFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      {Array.from({ length: 7 }, (_, index) => (
        <rect
          key={index}
          y={index * 3.428}
          width="32"
          height="1.714"
          fill="#B22234"
        />
      ))}
      <rect width="13.5" height="10.5" fill="#3C3B6E" />
      <g fill="#FFFFFF">
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 5 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={2 + col * 2.1 + (row % 2 ? 1.05 : 0)}
              cy={1.2 + row * 1.55}
              r="0.16"
            />
          )),
        )}
      </g>
    </FlagFrame>
  );
}

export function CountryFlag({
  country,
  className,
}: {
  readonly country: string;
  readonly className?: string;
}) {
  switch (country) {
    case "India":
      return <IndiaFlag className={className} />;
    case "Philippines":
      return <PhilippinesFlag className={className} />;
    case "United Arab Emirates":
      return <UaeFlag className={className} />;
    case "Saudi Arabia":
      return <SaudiArabiaFlag className={className} />;
    case "Pakistan":
      return <PakistanFlag className={className} />;
    case "Bangladesh":
      return <BangladeshFlag className={className} />;
    case "Egypt":
      return <EgyptFlag className={className} />;
    case "Italy":
      return <ItalyFlag className={className} />;
    case "Spain":
      return <SpainFlag className={className} />;
    case "United States":
      return <UnitedStatesFlag className={className} />;
    default:
      return null;
  }
}

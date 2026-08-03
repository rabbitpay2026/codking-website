/**
 * Semantic colour tokens resolved to their CSS custom properties.
 *
 * Tailwind utilities (`bg-primary`, `text-muted-foreground`, ...) remain the
 * default way to apply colour. This map exists for the cases where a raw value
 * is required instead of a class name — Framer Motion animations, canvas or
 * chart libraries, and inline SVG attributes.
 *
 * The values themselves live in `src/app/globals.css`.
 */
export const colorTokens = {
  background: "var(--color-background)",
  foreground: "var(--color-foreground)",
  card: "var(--color-card)",
  cardForeground: "var(--color-card-foreground)",
  popover: "var(--color-popover)",
  popoverForeground: "var(--color-popover-foreground)",
  primary: "var(--color-primary)",
  primaryForeground: "var(--color-primary-foreground)",
  secondary: "var(--color-secondary)",
  secondaryForeground: "var(--color-secondary-foreground)",
  muted: "var(--color-muted)",
  mutedForeground: "var(--color-muted-foreground)",
  accent: "var(--color-accent)",
  accentForeground: "var(--color-accent-foreground)",
  destructive: "var(--color-destructive)",
  destructiveForeground: "var(--color-destructive-foreground)",
  border: "var(--color-border)",
  input: "var(--color-input)",
  ring: "var(--color-ring)",
} as const;

export type ColorToken = keyof typeof colorTokens;

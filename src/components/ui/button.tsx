import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

/**
 * The button primitive.
 *
 * Variants map onto the action hierarchy the architecture fixes in §4.2
 * rather than onto an abstract palette: `primary` is Install Free and is the
 * only filled action on any screen, and `secondary` is Book a Demo.
 *
 * `quiet` was the weight Log in carried, and that action was removed at a
 * review's instruction. The variant stays here because it is a primitive
 * rather than a role — the pricing preview's "compare all plans" link uses it
 * — but nothing in the utility bar holds it any more.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full",
    "font-medium whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,transform]",
    "duration-200 ease-[var(--ease-emphasized)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "shadow-[0_1px_2px_rgba(20,16,58,0.16)]",
          "hover:bg-brand-deep hover:shadow-[0_6px_18px_-6px_var(--brand)]",
          "active:translate-y-px active:shadow-none",
        ],
        secondary: [
          "border border-border bg-background text-foreground",
          "hover:border-brand/35 hover:bg-accent hover:text-accent-foreground",
          "active:translate-y-px",
        ],
        quiet: "text-muted-foreground hover:text-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "size-10",
      },
      /** Fills the available width — used by the mobile drawer and action bar. */
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render the child element instead of a `<button>` — e.g. a `<Link>`. */
    readonly asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Root : "button";

  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
export type { ButtonProps };

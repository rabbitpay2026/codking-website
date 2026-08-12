import { ArrowUpRight, BookOpen, Headset, MessageCircle } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { cardHoverClass } from "@/constants/theme";
import { getContactChannels } from "@/lib/content";
import { cn } from "@/lib/utils";

import type { ContactChannel, WithClassName } from "@/types";

import type { LucideIcon } from "lucide-react";

const channelIcons: Record<string, LucideIcon> = {
  whatsapp: MessageCircle,
  "in-app": Headset,
  docs: BookOpen,
};

const fallbackChannelIcon: LucideIcon = Headset;

/**
 * The ways to reach us, beside the form.
 *
 * A card is a link only where a link exists. Live chat opens inside the app and
 * has no URL on this website, so that card is a statement — a card that looks
 * clickable and is not is worse than one that plainly is not.
 *
 * That distinction is why the two shapes are separated below rather than
 * handled with a conditional `href`: an anchor and a div want different
 * elements, different hover behaviour and different focus treatment, and
 * collapsing them into one component with three ternaries in the class list is
 * how a card ends up focusable but inert.
 */
export function ContactChannels({ className }: WithClassName) {
  const channels = getContactChannels();

  return (
    <ul className={cn("grid gap-3", className)}>
      {channels.map((channel, index) => (
        <li key={channel.id}>
          <BlurFade delay={index * 0.05} className="h-full">
            <ChannelCard channel={channel} />
          </BlurFade>
        </li>
      ))}
    </ul>
  );
}

const cardClass = cn(
  "flex h-full gap-4 rounded-xl border border-ink/[0.08] bg-card p-5",
  cardHoverClass,
);

function ChannelCard({ channel }: { readonly channel: ContactChannel }) {
  const Icon = channelIcons[channel.id] ?? fallbackChannelIcon;

  const inner = (
    <>
      <span
        aria-hidden
        className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-sky-50 text-ink/45 transition-colors duration-300 ease-emphasized group-hover:border-brand/25 group-hover:text-brand"
      >
        <Icon className="size-[18px]" strokeWidth={1.7} />
      </span>

      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[15px] leading-snug font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 ease-emphasized group-hover:text-brand">
          {channel.title}
          {channel.href ? (
            <ArrowUpRight
              aria-hidden
              className="size-3.5 shrink-0 text-ink/35 transition-[transform,color] duration-300 ease-emphasized group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-brand"
            />
          ) : null}
        </span>

        <span className="mt-2 block text-[13.5px] leading-relaxed text-pretty text-ink/55">
          {channel.body}
        </span>

        {channel.actionLabel && channel.href ? (
          <span className="mt-3 inline-block text-[12.5px] font-medium text-brand">
            {channel.actionLabel}
          </span>
        ) : null}
      </span>
    </>
  );

  if (!channel.href) {
    return <div className={cn(cardClass, "group")}>{inner}</div>;
  }

  return (
    <a
      href={channel.href}
      {...(channel.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        cardClass,
        "group outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
      )}
    >
      {inner}
      {channel.external ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  );
}

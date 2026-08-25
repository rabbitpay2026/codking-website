import {
  Ban,
  Clock,
  Flag,
  MapPinHouse,
  MessageSquareMore,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Timer,
} from "lucide-react";

import { FeatureCapabilityGrid } from "@/components/features/sections";
import { getOtpCapabilities, getOtpPageCopy } from "@/lib/content";

import type { LucideIcon } from "lucide-react";

/**
 * Icons are presentation, not content, so they are mapped from the record's id
 * rather than stored on it — changing a line of copy should never mean picking
 * art.
 *
 * Each one is the literal object the setting is about: a flag for the country
 * list, a bar for the numbers that are blocked, a message bubble for the
 * channel that carries the code, a shield for what the store chooses to
 * verify, a pin for the address that arrives already written, a timer for the
 * wait before an order is cancelled, a scan for the pass a verified buyer
 * carries between tabs, a phone for where it renders. A grid of abstract marks
 * would need its own legend, which is the opposite of what a specification is
 * for.
 */
const iconFor: Record<string, LucideIcon> = {
  countries: Flag,
  blocklist: Ban,
  channels: MessageSquareMore,
  branding: MessageSquareMore,
  trigger: ShieldCheck,
  address: MapPinHouse,
  autocancel: Timer,
  onepass: ScanLine,
  devices: Smartphone,
  realtime: Clock,
};

/**
 * The specification, at the end of the argument.
 *
 * Everything above this point is trying to convince someone; this is for the
 * merchant who is already convinced and wants to know whether the thing does
 * the specific things they need. That is a different reading mode, and the
 * review asked it to say considerably more — country targeting and blocked
 * numbers by name, and the rest of what the product documents beside them.
 *
 * Which is why it is now the site's shared `FeatureCapabilityGrid` rather than
 * the five-column hairline strip it used to be. That strip was drawn for
 * exactly five one-line entries and had a column rule between each of them; at
 * nine it would either wrap into rows with a rule hanging off the start of
 * each one, or force the section to say less than the reviewer asked for. The
 * shared grid is what every other feature page on the site uses to answer this
 * same question, it takes any number of entries, and a merchant moving between
 * feature pages now meets one treatment instead of two.
 *
 * The entries themselves are the repository's (§11) — this file picks the art
 * and nothing else.
 */
export function OtpVerificationCapabilities() {
  const copy = getOtpPageCopy();

  return (
    <FeatureCapabilityGrid
      title={copy.capabilitiesTitle}
      description={copy.capabilitiesDescription}
      capabilities={getOtpCapabilities()}
      iconFor={iconFor}
      fallbackIcon={ShieldCheck}
    />
  );
}

"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/types";

import type { AnalyticsEventName, AnalyticsEventParams } from "@/types";

/**
 * Click tracking for the whole site, from one listener.
 *
 * Every call-to-action on this site is rendered on the server — the install
 * button, the demo booking, the WhatsApp cards, the footer. Attaching an
 * `onClick` to any of them would mean turning that component, and the tree
 * above it that passes its props, into client components; done across a dozen
 * CTAs it would ship most of the marketing site to the browser to measure
 * button presses.
 *
 * So nothing is attached to the buttons. A single delegated listener sits on
 * the document, and a server component opts one of its elements in by
 * declaring three data attributes:
 *
 *     data-ga-event="install_free_click"   the event name
 *     data-ga-name="Install Free"          becomes `button_name`
 *     data-ga-location="hero"              becomes `location`
 *
 * `closest` is what makes this work through the markup CTAs actually have —
 * the target of a click on the install button is usually the Shopify mark
 * inside it, or the span holding the label, not the anchor that carries the
 * attributes.
 *
 * Nothing is prevented, delayed or wrapped: the listener observes and returns,
 * so the link navigates exactly as it did before. A click that leaves the site
 * is still recorded, because `gtag` posts the event over the Beacon API, which
 * survives the page being torn down.
 *
 * A middle-click is `auxclick` rather than `click`, so a link opened with the
 * scroll wheel is not counted. A modifier-click is a real `click` and is, which
 * is the right way round: the second is a merchant deliberately opening the App
 * Store in a new tab, and the first is usually a scroll gesture that landed on
 * a button.
 */
function isAnalyticsEvent(value: string): value is AnalyticsEventName {
  return (ANALYTICS_EVENTS as readonly string[]).includes(value);
}

export function ClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest<HTMLElement>("[data-ga-event]");
      if (!element) return;

      const name = element.dataset.gaEvent;
      // A name outside the union is a typo rather than an event: reporting it
      // would create a second, near-identical row nobody is looking for.
      if (!name || !isAnalyticsEvent(name)) return;

      const params: AnalyticsEventParams = {
        button_name: element.dataset.gaName,
        location: element.dataset.gaLocation,
      };

      trackEvent(name, params);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

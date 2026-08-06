"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface StepCycle<T extends HTMLElement> {
  /** Attach to the element whose visibility drives the cycle. */
  readonly ref: React.RefObject<T | null>;
  /** The current step, `0` through `count - 1`. */
  readonly step: number;
  /** False when the cycle is parked — off-screen, or motion is reduced. */
  readonly running: boolean;
}

/**
 * Advances through a fixed number of steps while the element is on screen.
 *
 * The product demonstrations on this page are loops rather than videos, and a
 * loop has two obligations a video does not. It must not run where nobody is
 * looking — an off-screen `setInterval` re-renders a React tree several times
 * a second for no one — and it must have an answer for a visitor who has asked
 * their operating system to stop things moving.
 *
 * Both are handled here rather than in each demo, so a new demonstration
 * cannot ship without them. Under reduced motion the cycle is parked on its
 * **last** step: that is the resolved state, the one where the order is
 * verified and the rule has fired, so the still frame is the frame that
 * actually makes the argument.
 *
 * Step `0` renders on the server, so it has to be a legible state in its own
 * right — never an empty one.
 */
export function useStepCycle<T extends HTMLElement = HTMLDivElement>(
  count: number,
  intervalMs: number,
): StepCycle<T> {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);

  const running = inView && !prefersReduced;

  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [count, intervalMs, running]);

  return { ref, step: prefersReduced ? count - 1 : step, running };
}

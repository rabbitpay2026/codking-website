"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface StepTimeline<T extends HTMLElement> {
  /** Attach to the element whose visibility drives the timeline. */
  readonly ref: React.RefObject<T | null>;
  /** The current step, `0` through `durations.length - 1`. */
  readonly step: number;
  /** False when the timeline is parked — off-screen, or motion is reduced. */
  readonly running: boolean;
}

/**
 * `useStepCycle`, with a duration per step instead of one for all of them.
 *
 * The existing cycle is the right tool for a demonstration whose beats are
 * evenly weighted. A code field filling itself is not one: six digits landing
 * at the pace a state chip should hold for takes ten seconds to reach a result
 * nobody waited for, and holding the result only as long as a keystroke throws
 * away the one frame the whole sequence exists to show.
 *
 * So the timeline is data. Typing beats are short, the states around them are
 * long, and the sequence reads as someone entering a code rather than as a
 * slideshow of a code being entered.
 *
 * It keeps every obligation the cycle has. Nothing runs while the element is
 * off screen — a chain of timers re-rendering a React tree several times a
 * second for nobody is the same waste as an interval. Under reduced motion it
 * parks on the **last** step, which is the resolved frame where the number is
 * verified and the order is through, so the still makes the argument anyway.
 *
 * Step `0` is what renders on the server and on a browser that never runs the
 * script, so it has to be a legible state in its own right — never an empty
 * form waiting to be populated.
 *
 * `durations` is read on every tick, so pass a module-scope constant rather
 * than an array built during render: a fresh array each render would restart
 * the pending timer and the sequence would never advance.
 */
export function useStepTimeline<T extends HTMLElement = HTMLDivElement>(
  durations: readonly number[],
): StepTimeline<T> {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState(0);

  const count = durations.length;
  const running = inView && !prefersReduced && count > 1;

  useEffect(() => {
    if (!running) return;

    const id = window.setTimeout(
      () => setStep((current) => (current + 1) % count),
      durations[step % count] ?? 1000,
    );

    return () => window.clearTimeout(id);
  }, [count, durations, running, step]);

  return {
    ref,
    step: prefersReduced ? Math.max(count - 1, 0) : step,
    running,
  };
}

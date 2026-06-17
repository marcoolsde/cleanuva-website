import type { Transition, Variants } from "framer-motion";

/**
 * Centralized motion tokens (design-system §10.3).
 * Every animation in the app should pull `ease`/`dur` from here so timing stays
 * consistent and a reduced-motion pass can be reasoned about in one place.
 * No bounce/spring on brand motion; springs are reserved for tiny UI only.
 */
export const ease = {
  current: [0.2, 0.6, 0.2, 1], // standard
  entrance: [0.16, 1, 0.3, 1], // reveals (easeOutExpo-like)
  exit: [0.4, 0, 1, 1],
} as const;

export const dur = {
  micro: 0.12,
  base: 0.24,
  reveal: 0.48,
  cinematic: 0.8,
} as const;

// Loop cadence: ambient cycle 9–12s; one demonstration cycle on inView at 6s.
export const loop = {
  ambient: 10,
  demo: 6,
} as const;

/** Standard scroll-reveal: opacity 0→1, y 8px→0. Pair with viewport once+margin. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export const revealTransition: Transition = {
  duration: dur.reveal,
  ease: ease.entrance,
};

export const revealViewport = { once: true, margin: "-15%" } as const;

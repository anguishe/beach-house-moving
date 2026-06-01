import type { Transition, TargetAndTransition } from 'framer-motion'

type FadeUpOptions = {
  delay?: number
  duration?: number
  y?: number
}

type FadeUpMotionProps = {
  initial: TargetAndTransition
  animate: TargetAndTransition
  transition: Transition
}

type InViewMotionProps = {
  initial: TargetAndTransition
  whileInView: TargetAndTransition
  transition: Transition
  viewport: { once: boolean }
}

/** Fade-up entrance; instant when the user prefers reduced motion. */
export function fadeUpVariants(
  prefersReducedMotion: boolean | null,
  { delay = 0, duration = 0.65, y = 28 }: FadeUpOptions = {},
): FadeUpMotionProps {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    }
  }

  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, ease: [0.22, 1, 0.36, 1], delay },
  }
}

/** whileInView fade-up; no motion when reduced motion is preferred. */
export function inViewFadeUp(
  prefersReducedMotion: boolean | null,
  index = 0,
): InViewMotionProps {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0 },
      viewport: { once: true },
    }
  }

  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: index * 0.1 },
    viewport: { once: true },
  }
}

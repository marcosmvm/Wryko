export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export const defaultTransition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1],
}

export const fastTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
}

export const slowTransition = {
  duration: 0.7,
  ease: [0.4, 0, 0.2, 1],
}

export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

export const getStaggerDelay = (index: number, baseDelay = 0) => ({
  delay: baseDelay + index * 0.1,
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1],
})

export const getIndexedAnimation = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: getStaggerDelay(index),
})

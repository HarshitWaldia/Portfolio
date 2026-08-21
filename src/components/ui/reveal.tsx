"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Apple's signature deceleration curve — fast start, long soft landing.
export const EASE_APPLE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** stagger index — each step adds a small delay so groups cascade in */
  index?: number;
  /** base delay in seconds, added on top of index * stagger */
  delay?: number;
  /** seconds between staggered children */
  stagger?: number;
  /** px the content travels while fading in */
  y?: number;
  /** also scale in slightly, nice for cards */
  scale?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section";
  /** how far into the viewport before it triggers (0 = edge, 1 = center) */
  amount?: number;
};

export function Reveal({
  children,
  index = 0,
  delay = 0,
  stagger = 0.08,
  y = 28,
  scale = 1,
  duration = 0.8,
  className,
  as = "div",
  amount = 0.2,
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y, scale },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay: delay + index * stagger,
        ease: EASE_APPLE,
      },
    },
  };

  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Wraps a list and staggers its direct children automatically —
 * use with <RevealGroup><Reveal index={0}/><Reveal index={1}/>...</RevealGroup>
 * or just spread `custom` indices yourself. Kept simple on purpose.
 */
export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_APPLE },
  },
};

"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  dur,
  ease,
  revealVariants,
  revealViewport,
} from "@/lib/motion";

type MotionTag = "div" | "section" | "span" | "li" | "ul" | "p";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger offset in seconds for sequenced reveals. */
  delay?: number;
  className?: string;
  as?: MotionTag;
}

/**
 * Scroll reveal: opacity 0→1, y 8px→0, once. Under reduced motion it renders
 * statically (no transform), per design-system §1.6 / §10.3.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Motion = motion[as];

  return (
    <Motion
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ duration: dur.reveal, ease: ease.entrance, delay }}
    >
      {children}
    </Motion>
  );
}

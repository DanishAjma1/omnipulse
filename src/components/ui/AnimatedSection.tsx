"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  className?: string;
  spacing?: "py-24" | "py-32" | "none";
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  spacing = "py-24",
  delay = 0,
  ...props
}: AnimatedSectionProps) {
  const spacingClass =
    spacing === "py-24" ? "py-24" : spacing === "py-32" ? "py-32" : "";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      className={cn("w-full relative", spacingClass, className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}

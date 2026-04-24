"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type Props = HTMLMotionProps<"div"> & {
  children: ReactNode;
  interactive?: boolean;
};

const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  { children, interactive = false, className = "", ...rest },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      className={`glass halo rounded-2xl p-6 ${
        interactive ? "transition-transform duration-500 hover:-translate-y-1" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

export default GlassCard;

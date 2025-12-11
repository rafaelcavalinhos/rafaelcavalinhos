import { ReactNode, HTMLAttributes } from "react";
import { motion } from "framer-motion";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
}

export function SlideUp({ children, delay }: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.span>
  );
}

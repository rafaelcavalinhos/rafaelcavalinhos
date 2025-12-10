import { ReactNode, HTMLAttributes } from "react";
import { motion } from "framer-motion";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
}

export function SlideUp({ children, delay }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

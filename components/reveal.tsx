import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h1" | "h2" | "section";
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Component = "div",
}: RevealProps) {
  const RevealElement = Component === "div" ? motion.div :
    Component === "p" ? motion.p :
    Component === "h1" ? motion.h1 :
    Component === "h2" ? motion.h2 :
    Component === "section" ? motion.section :
    motion.div;

  return (
    <RevealElement
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </RevealElement>
  );
}
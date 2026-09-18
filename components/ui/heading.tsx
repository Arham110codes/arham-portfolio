import { motion } from "framer-motion";

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2;
  className?: string;
}

export default function Heading({
  children,
  level = 1,
  className = "",
}: HeadingProps) {
  const isH1 = level === 1;

  return isH1 ? (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.1 }}
      className={`max-w-4xl text-[clamp(3.5rem,8vw,8.5rem)] font-semibold leading-[0.86] tracking-[-0.08em] ${className}`}
    >
      {children}
    </motion.h1>
  ) : (
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={`text-5xl tracking-[-0.06em] md:text-7xl ${className}`}
    >
      {children}
    </motion.h2>
  );
}

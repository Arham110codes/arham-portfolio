import { motion } from "framer-motion";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <motion.p
      className={`eyebrow ${className}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.p>
  );
}

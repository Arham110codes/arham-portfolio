import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      className={`group relative overflow-hidden bg-[#0b0b0b] p-6 md:p-10 ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

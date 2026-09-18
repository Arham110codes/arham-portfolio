import { motion } from "framer-motion";

interface PanelProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export default function Panel({ children, title, className = "" }: PanelProps) {
  return (
    <motion.div
      className={`border border-white/10 bg-white/[0.02] p-6 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="eyebrow">{title}</h3>
      <div className="mt-4 text-sm leading-7 text-white/55">{children}</div>
    </motion.div>
  );
}

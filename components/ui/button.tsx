import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a623]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]";
  const variants = {
    primary:
      "bg-[#f5a623] text-black hover:bg-[#ffc15c]",
    secondary:
      "border border-white/20 text-white/70 hover:border-white/60 hover:text-white",
  };

  return (
    <motion.a
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.a>
  );
}

import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    type: string;
    description: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link
        href={`/work/${project.id}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden bg-[#0b0b0b] p-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a623]/60 md:p-10"
        aria-label={`View ${project.title} case study`}
      >
        <div>
          <div className="flex justify-between text-[10px] text-white/35">
            <span className="mono">{project.id}</span>
            <span className="uppercase tracking-[0.18em]">{project.type}</span>
          </div>

          <h3 className="mt-16 max-w-md text-3xl tracking-[-0.05em] text-white transition group-hover:text-[#f5a623] md:text-4xl">
            {project.title}
          </h3>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/45">
            {project.description}
          </p>
        </div>

        <div className="mono mt-12 flex items-center text-[10px] uppercase tracking-[0.18em] text-[#f5a623]">
          <span>Explore case study</span>
          <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

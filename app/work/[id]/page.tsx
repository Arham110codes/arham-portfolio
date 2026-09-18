import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Esp32CinematicStory from "@/components/sections/esp32-cinematic-story";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Flagship scroll-driven cinematic technical experience for ESP32
  if (id === "01") {
    return (
      <main className="min-h-screen bg-[#07090b]">
        <Esp32CinematicStory />
      </main>
    );
  }

  return (
    <main className="site-grid min-h-screen flex flex-col justify-between">
      {/* Top Navigation */}
      <nav className="section-line flex items-center justify-between border-b px-6 py-5 md:px-12">
        <Link href="/" className="mono text-xs tracking-[0.22em]" aria-label="Home">
          ARHAM<span className="text-[#f5a623]">{"//"}</span>SYSTEM
        </Link>

        <Link
          href="/#work"
          className="mono text-[10px] uppercase tracking-[0.24em] text-white/50 transition hover:text-white"
        >
          ← Back to work
        </Link>

        <span className="mono text-[10px] text-[#f5a623]">SYSTEM ONLINE</span>
      </nav>

      {/* Case Study Content Body */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 w-full">
        <div>
          <div className="mono mb-4 text-[10px] uppercase tracking-[0.28em] text-[#f5a623]">
            PROJECT {project.id}
          </div>

          <h1 className="text-5xl tracking-[-0.06em] md:text-7xl">
            {project.title}
          </h1>

          <div className="mono mt-4 text-[10px] uppercase tracking-[0.18em] text-white/40">
            {project.type}
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-base leading-7 text-white/55 md:text-lg">
                {project.description}
              </p>

              <div className="mono mt-6 border-l-2 border-[#f5a623]/60 bg-[#f5a623]/5 p-4 text-[11px] leading-6 text-white/60">
                <span className="font-semibold text-[#f5a623]">
                  [VERIFICATION STATUS]
                </span>{" "}
                Full technical case study documentation is currently being compiled
                from verified project archives. No speculative performance claims
                or unverified metrics are published.
              </div>
            </div>

            <div className="space-y-8">
              <div className="border border-white/10 bg-white/[0.02] p-5">
                <h3 className="eyebrow">Technical Approach</h3>
                <p className="mt-3 mono text-xs text-white/40">
                  [Pending documentation audit]
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-5">
                <h3 className="eyebrow">Results & Artifacts</h3>
                <p className="mt-3 mono text-xs text-white/40">
                  [Pending documentation audit]
                </p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-5">
                <h3 className="eyebrow">System Role</h3>
                <p className="mt-3 mono text-xs text-white/40">
                  [Pending documentation audit]
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-8">
            <Link
              href="/#work"
              className="mono text-xs uppercase tracking-[0.18em] text-[#f5a623] hover:underline"
            >
              ← Return to selected work
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="section-line border-t px-6 py-6 md:px-12 mt-auto">
        <div className="mono flex flex-wrap justify-between gap-4 text-[10px] uppercase tracking-[0.15em] text-white/30">
          <span>ARHAM{"//"}SYSTEM</span>
          <span>Built with Next.js / TypeScript</span>
          <span>© 2026</span>
        </div>
      </footer>
    </main>
  );
}

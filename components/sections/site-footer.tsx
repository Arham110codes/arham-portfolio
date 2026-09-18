export default function SiteFooter() {
  return (
    <footer className="section-line border-t border-white/10 bg-[#07090b] px-6 py-8 md:px-12">
      <div className="mx-auto max-w-7xl flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>ARHAM<span className="text-[#f5a623]">{"//"}</span>SYSTEM</span>
          <span className="mx-3 text-white/20">•</span>
          <span>Security & Software Architecture</span>
        </div>

        <div className="flex flex-wrap gap-6 mono text-[10px] uppercase tracking-[0.18em] text-white/50">
          <a
            href="mailto:arhamoberoi@gmail.com"
            className="transition hover:text-[#f5a623]"
          >
            Email ↗
          </a>
          <a
            href="https://github.com/Arham110codes"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#f5a623]"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/arham-oberoi-512aa5286/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#f5a623]"
          >
            LinkedIn ↗
          </a>
        </div>

        <div className="mono text-[10px] text-white/30">
          © 2026 ARHAM OBEROI
        </div>
      </div>
    </footer>
  );
}

interface SiteNavProps {
  active?: string;
}

export default function SiteNav({ active }: SiteNavProps) {
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="section-line sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#07090b]/85 px-6 py-4 backdrop-blur-md md:px-12">
      <a href="#home" className="mono text-xs tracking-[0.22em] text-white transition hover:text-white/80" aria-label="ARHAM//SYSTEM home">
        ARHAM<span className="text-[#f5a623]">{"//"}</span>SYSTEM
      </a>

      <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.24em] text-white/50 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={active === link.href.slice(1) ? "page" : undefined}
            className="transition hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mono flex items-center gap-2 text-[10px] text-[#f5a623]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f5a623] animate-pulse" />
        <span>SYSTEM ACTIVE</span>
      </div>
    </nav>
  );
}

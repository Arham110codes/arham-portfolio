"use client";

import { useState, useEffect } from "react";
import SiteNav from "@/components/sections/site-nav";
import SiteFooter from "@/components/sections/site-footer";
import HeroSection from "@/components/hero/hero-section";
import AboutSection from "@/components/about/about-section";
import ProjectCard from "@/components/project-card";
import Eyebrow from "@/components/ui/eyebrow";
import Heading from "@/components/ui/heading";
import { projects } from "@/data/projects";

export default function Home() {
  const [showStickyNav, setShowStickyNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky nav when scrolling past the first full viewport
      setShowStickyNav(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#07090b] text-[#f2efe8]">
      {/* Dynamic Sticky Header Navigation (reveals when scrolling down into content) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showStickyNav
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <SiteNav active="home" />
      </div>

      {/* 1. Cinematic Hero Section (Open-world / Vice City blueprint with Arham sunset supercar portrait) */}
      <HeroSection />

      {/* 2. Cinematic About Section (Coastal seawall blueprint + verified experience & skills dossier) */}
      <AboutSection />

      {/* 3. Selected Work Section */}
      <section id="work" className="section-line relative border-t border-white/10 bg-[#07090b] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>02 / Selected work</Eyebrow>

          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Heading level={2} className="mt-0">
              Built,
              <br />
              tested,
              <br />
              explored.
            </Heading>

            <p className="max-w-xs text-sm leading-7 text-white/45">
              A selection of projects across software engineering,
              cybersecurity, embedded systems, and machine learning.
            </p>
          </div>

          <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact Section */}
      <section id="contact" className="section-line relative border-t border-white/10 bg-[#090b0e] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>03 / Contact</Eyebrow>

          <Heading level={2} className="mt-6 max-w-5xl">
            Let&rsquo;s make
            <br />
            something
            <br />
            meaningful.
          </Heading>

          <div className="mt-12 flex flex-wrap gap-6 text-xs uppercase tracking-[0.16em] text-white/50">
            <a
              className="border border-white/15 bg-white/[0.02] px-5 py-3 transition hover:border-[#f5a623] hover:text-white"
              href="mailto:arhamoberoi@gmail.com"
            >
              Email ↗
            </a>
            <a
              className="border border-white/15 bg-white/[0.02] px-5 py-3 transition hover:border-[#f5a623] hover:text-white"
              href="https://github.com/Arham110codes"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a
              className="border border-white/15 bg-white/[0.02] px-5 py-3 transition hover:border-[#f5a623] hover:text-white"
              href="https://www.linkedin.com/in/arham-oberoi-512aa5286/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      {/* 5. Site Footer */}
      <SiteFooter />
    </main>
  );
}
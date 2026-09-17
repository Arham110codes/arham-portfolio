"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "Secure Socket Communications",
    type: "Java / Networking",
    description:
      "A Java project exploring client-server communication and secure socket concepts.",
  },
  {
    id: "02",
    title: "ESP32 Security System",
    type: "Embedded / Cybersecurity",
    description:
      "An embedded cybersecurity project exploring wireless and hardware-focused security concepts.",
  },
  {
    id: "03",
    title: "Emotion Analysis",
    type: "Python / Machine Learning",
    description:
      "A text analysis project using Python and machine-learning fundamentals.",
  },
  {
    id: "04",
    title: "Advanced Banking System",
    type: "Java Swing / Applications",
    description:
      "A desktop banking application exploring application structure and user interaction.",
  },
];

export default function Home() {
  return (
    <main className="site-grid min-h-screen overflow-hidden">
      <nav className="section-line flex items-center justify-between border-b px-6 py-5 md:px-12">
        <a href="#" className="mono text-xs tracking-[0.22em]">
          ARHAM<span className="text-[#f5a623]">//</span>SYSTEM
        </a>

        <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.24em] text-white/50 md:flex">
          <a href="#about" className="transition hover:text-white">
            About
          </a>
          <a href="#work" className="transition hover:text-white">
            Work
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </div>

        <span className="mono text-[10px] text-[#f5a623]">
          SYSTEM ONLINE
        </span>
      </nav>

      <section className="relative flex min-h-[calc(100vh-73px)] items-center px-6 py-24 md:px-12">
        <div className="absolute right-[-14rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full border border-[#f5a623]/10" />
        <div className="absolute right-[-9rem] top-[-5rem] h-[24rem] w-[24rem] rounded-full border border-[#f5a623]/10" />

        <div className="relative z-10 w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-8"
          >
            Software Engineering / Cybersecurity
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="max-w-6xl text-[clamp(3.5rem,10vw,9.5rem)] font-semibold leading-[0.86] tracking-[-0.08em]"
          >
            Security-minded
            <br />
            <span className="text-white/35">software engineer.</span>
          </motion.h1>

          <div className="mt-14 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-md text-sm leading-7 text-white/55 md:text-base"
            >
              I build software with a focus on engineering fundamentals,
              cybersecurity, and purposeful digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mono text-[10px] leading-6 text-white/40"
            >
              <div>LOCATION: DEHRADUN, INDIA</div>
              <div>STATUS: OPEN TO OPPORTUNITIES</div>
              <div>VERSION: 2026.01</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="bg-[#f5a623] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-[#ffc15c]"
            >
              Explore work
            </a>

            <a
              href="mailto:arhamoberoi@gmail.com"
              className="border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.14em] text-white/70 transition hover:border-white/60 hover:text-white"
            >
              Start a conversation
            </a>
          </motion.div>
        </div>

        <div className="mono absolute bottom-8 left-6 text-[10px] text-white/30 md:left-12">
          SCROLL TO EXPLORE ↓
        </div>
      </section>

      <section id="about" className="section-line border-t px-6 py-24 md:px-12">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="eyebrow">01 / About</div>
            <h2 className="mt-6 max-w-lg text-5xl tracking-[-0.06em] md:text-7xl">
              Engineering with intent.
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-base leading-8 text-white/55">
              I am Arham Oberoi, a final-year B.Tech Computer Science student
              specialising in Cyber Security and Privacy. I work across
              software development, security concepts, and technical
              experimentation.
            </p>

            <div className="mono mt-10 grid grid-cols-2 gap-6 text-[10px] uppercase tracking-[0.15em] text-white/40">
              <div>
                <span className="text-[#f5a623]">01</span>
                <br />
                Software systems
              </div>
              <div>
                <span className="text-[#f5a623]">02</span>
                <br />
                Security thinking
              </div>
              <div>
                <span className="text-[#f5a623]">03</span>
                <br />
                Technical curiosity
              </div>
              <div>
                <span className="text-[#f5a623]">04</span>
                <br />
                Continuous learning
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section-line border-t px-6 py-24 md:px-12">
        <div className="eyebrow">02 / Selected work</div>

        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="text-5xl tracking-[-0.06em] md:text-7xl">
            Built,
            <br />
            tested,
            <br />
            explored.
          </h2>

          <p className="max-w-xs text-sm leading-7 text-white/45">
            A selection of projects across software engineering,
            cybersecurity, embedded systems, and machine learning.
          </p>
        </div>

        <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-2">
          {projects.map((project) => (
            <motion.article
              key={project.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="group bg-[#0b0b0b] p-6 md:p-10"
            >
              <div className="flex justify-between text-[10px] text-white/35">
                <span className="mono">{project.id}</span>
                <span className="uppercase tracking-[0.18em]">
                  {project.type}
                </span>
              </div>

              <h3 className="mt-20 max-w-md text-3xl tracking-[-0.05em] transition group-hover:text-[#f5a623] md:text-4xl">
                {project.title}
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/45">
                {project.description}
              </p>

              <div className="mono mt-12 text-[10px] uppercase tracking-[0.18em] text-[#f5a623]">
                Case study in progress →
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-line border-t px-6 py-24 md:px-12">
        <div className="eyebrow">03 / Contact</div>

        <h2 className="mt-6 max-w-5xl text-5xl tracking-[-0.07em] md:text-8xl">
          Let’s make
          <br />
          something
          <br />
          meaningful.
        </h2>

        <div className="mt-12 flex flex-wrap gap-6 text-xs uppercase tracking-[0.16em] text-white/50">
          <a className="transition hover:text-white" href="mailto:arhamoberoi@gmail.com">
            Email ↗
          </a>
          <a
            className="transition hover:text-white"
            href="https://github.com/Arham110codes"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            className="transition hover:text-white"
            href="https://www.linkedin.com/in/arham-oberoi-512aa5286/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>

      <footer className="section-line border-t px-6 py-6 md:px-12">
        <div className="mono flex flex-wrap justify-between gap-4 text-[10px] uppercase tracking-[0.15em] text-white/30">
          <span>ARHAM//SYSTEM</span>
          <span>Built with Next.js / TypeScript</span>
          <span>© 2026</span>
        </div>
      </footer>
    </main>
  );
}
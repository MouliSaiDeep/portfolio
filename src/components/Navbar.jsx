import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "../data/portfolio";

export default function Navbar({ activeSection }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(activeSection || "home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-80px 0px -20% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="glass-nav fixed left-0 top-0 z-[100] w-full"
    >
      <div className="page-container flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-3" data-cursor-hover>
          <span
            className="inline-flex items-center rounded-md px-2 py-1 text-sm font-bold"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "var(--accent)",
              border: "1px solid var(--border-hover)",
            }}
          >
            MSD
          </span>
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace("#", "");

            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-1 py-2 text-xs uppercase tracking-[0.1em] transition-colors duration-200 ${
                  isActive ? "nav-link-active" : ""
                }`}
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                }}
                data-cursor-hover
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:moulisaideep.get@gmail.com"
            className="hidden rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors duration-200 md:inline-flex"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--accent)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.color = "#060a07";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--accent)";
            }}
            data-cursor-hover
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white md:hidden"
            style={{ border: "1px solid var(--border)" }}
            aria-label="Toggle menu"
            aria-expanded={open}
            data-cursor-hover
          >
            <span className="flex flex-col gap-1.5">
              <span
                className="h-0.5 w-4 rounded-full"
                style={{ background: "var(--text-primary)" }}
              />
              <span
                className="h-0.5 w-4 rounded-full"
                style={{ background: "var(--text-primary)" }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden"
          >
            <div className="page-container pb-4">
              <div
                className="overflow-hidden rounded-xl p-3 backdrop-blur-xl"
                style={{
                  background: "rgba(6,10,7,0.9)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = active === link.href.replace("#", "");

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={closeMenu}
                        className={`rounded-lg px-4 py-3 text-sm transition-colors ${
                          isActive ? "nav-link-active" : ""
                        }`}
                        style={{
                          color: isActive
                            ? "var(--accent)"
                            : "var(--text-muted)",
                          background: isActive
                            ? "rgba(16,185,129,0.1)"
                            : "transparent",
                        }}
                        data-cursor-hover
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { contactLinks, footerCopy } from "../data/portfolio";

const iconMap = {
  email: HiOutlineEnvelope,
  github: FaGithub,
  linkedin: FaLinkedinIn,
};

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="section-shell pb-16">
      <div className="page-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl"
        >
          <p className="section-label">Contact</p>
          <h2
            className="mt-4 text-5xl font-bold sm:text-6xl"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "var(--text-primary)",
            }}
          >
            Let&apos;s Build Something
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3"
        >
          {contactLinks.map((contact, index) => {
            const Icon = iconMap[contact.icon];

            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className="group flex h-full items-center gap-4 rounded-xl px-7 py-6 text-left"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  transition:
                    "border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease",
                  boxShadow: "0 8px 30px rgba(16,185,129,0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(16,185,129,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(16,185,129,0)";
                }}
                data-cursor-hover
              >
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    color: "var(--accent-light)",
                  }}
                  whileHover={reduceMotion ? undefined : { rotate: 8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </motion.div>

                <div className="min-w-0">
                  <p
                    className="text-xs uppercase tracking-[0.2em]"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: "var(--text-dim)",
                    }}
                  >
                    {contact.label}
                  </p>
                  <p
                    className="mt-2 break-all text-base sm:text-lg"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        <p
          className="mt-14 text-xs"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: "var(--text-dim)",
          }}
        >
          {footerCopy}
        </p>
      </div>
    </section>
  );
}

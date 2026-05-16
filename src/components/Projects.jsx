import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/portfolio";
import ConversationFeedPanel from "./animations/ConversationFeedPanel";
import QueueDepthPanel from "./animations/QueueDepthPanel";

export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="section-shell">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <h2
            className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "var(--text-primary)",
            }}
          >
            Selected Work
          </h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -4, boxShadow: "0 8px 40px rgba(16,185,129,0.1)" }
              }
              className="surface-card overflow-hidden rounded-2xl p-5 sm:p-6"
            >
              <div className="grid gap-5 lg:grid-cols-[1.15fr_0.95fr] lg:items-stretch">
                <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-5 sm:p-7">
                  <p
                    className="pointer-events-none absolute -left-2 -top-1 select-none"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: "8rem",
                      lineHeight: 1,
                      fontWeight: 800,
                      color: "rgba(255,255,255,0.05)",
                    }}
                  >
                    {project.id}
                  </p>

                  <div className="relative z-[1] max-w-3xl">
                    <h3
                      className="text-[2.2rem] font-bold leading-none sm:text-[2.4rem]"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="mt-3 text-xs uppercase tracking-[0.18em]"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        color: "var(--accent)",
                      }}
                    >
                      {project.tagline}
                    </p>
                    <p
                      className="mt-6 text-base leading-8 sm:text-[1.02rem]"
                      style={{ color: "var(--text-primary)", fontWeight: 300 }}
                    >
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full px-3 py-1 text-[0.65rem] uppercase transition-colors duration-200 hover:border-[var(--border-hover)]"
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            letterSpacing: "0.08em",
                            border: "1px solid var(--border)",
                            background: "var(--surface)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-colors duration-200"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--surface)",
                          color: "var(--text-primary)",
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                        data-cursor-hover
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "var(--border-hover)";
                          e.currentTarget.style.color = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.color = "var(--text-primary)";
                        }}
                      >
                        <FaGithub className="h-4 w-4" aria-hidden="true" />
                        <span>View Repo</span>
                      </a>
                    ) : null}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    borderRadius: "16px",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    overflow: "hidden",
                    padding: 20,
                    height: "100%",
                  }}
                >
                  {project.id === "01" ? (
                    <div
                      style={{
                        height: "360px",
                        minHeight: "360px",
                        maxHeight: "360px",
                        borderRadius: "16px",
                        border: "1px solid var(--border)",
                        background: "var(--surface)",
                        padding: "20px",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <ConversationFeedPanel />
                    </div>
                  ) : (
                    <QueueDepthPanel />
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

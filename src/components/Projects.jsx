import { motion, useReducedMotion } from "framer-motion";
import { AiOutlineAudio } from "react-icons/ai";
import { projects } from "../data/portfolio";

function VoiceWaveAnimation() {
  const rings = [0, 1, 2, 3];
  const bars = [8, 18, 12, 28, 16, 34, 20, 40, 18, 30, 14, 24];

  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-[16px] bg-[var(--surface)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_55%)]" />
      <div className="relative flex flex-col items-center justify-center gap-5">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border-hover)] bg-[rgba(6,10,7,0.95)]">
          <AiOutlineAudio className="h-12 w-12 text-[var(--accent)]" />
          {rings.map((ring) => (
            <motion.span
              key={ring}
              className="absolute rounded-full border border-[rgba(16,185,129,0.45)]"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: ring * 0.6,
              }}
              style={{ width: 80, height: 80 }}
            />
          ))}
        </div>

        <div className="flex h-14 items-end gap-1.5">
          {bars.map((bar, index) => (
            <motion.span
              key={index}
              className="w-2 rounded-full bg-[var(--accent)]"
              animate={{ height: [8, bar, 8] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.08,
              }}
            />
          ))}
        </div>

        <p className="mono text-xs text-[var(--text-muted)]">
          AI Voice Interview
        </p>
      </div>
    </div>
  );
}

function MessageFlowAnimation() {
  const status = ["202 Accepted", "Queued", "Persisted"];

  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-[16px] bg-[var(--surface)] px-4 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_60%)]" />
      <div className="relative w-full max-w-[420px]">
        <div className="flex items-start justify-between gap-3">
          {[
            { label: "API", x: 0 },
            { label: "RabbitMQ", x: 0 },
            { label: "MySQL", x: 0 },
          ].map((node, index) => (
            <div key={node.label} className="flex flex-col items-center gap-3">
              <div
                className="rounded-lg px-4 py-2 text-xs"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  border: "1px solid var(--border-hover)",
                  background: "rgba(6,10,7,0.9)",
                  color: "var(--text-primary)",
                }}
              >
                {node.label}
              </div>
              <div
                className="flex items-center gap-2 text-[0.65rem]"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: "var(--text-muted)",
                }}
              >
                <motion.span
                  className="h-2 w-2 rounded-full bg-[var(--accent)]"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
                <span>{status[index]}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-10 h-24">
          <div className="absolute left-[18%] right-[18%] top-1/2 h-px -translate-y-1/2 bg-[rgba(255,255,255,0.12)]" />
          <motion.span
            className="absolute top-1/2 h-1.5 w-1.5 rounded-sm bg-[var(--accent)]"
            animate={{ x: [0, 112, 112, 284], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "easeInOut",
            }}
            style={{ left: "18%", marginTop: "-3px" }}
          />
          <motion.span
            className="absolute top-1/2 h-1.5 w-1.5 rounded-sm bg-[var(--accent)]"
            animate={{ x: [0, 112, 112, 284], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "easeInOut",
              delay: 0.8,
            }}
            style={{ left: "18%", marginTop: "-3px" }}
          />
          <motion.span
            className="absolute top-1/2 h-1.5 w-1.5 rounded-sm bg-[var(--accent)]"
            animate={{ x: [0, 112, 112, 284], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "easeInOut",
              delay: 1.6,
            }}
            style={{ left: "18%", marginTop: "-3px" }}
          />
        </div>

        <p className="mono text-center text-xs text-[var(--text-muted)]">
          Event-Driven Architecture
        </p>
      </div>
    </div>
  );
}

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
          <p className="section-label">(03)</p>
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
              viewport={{ once: true }}
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

                    <ul className="mt-6 space-y-3">
                      {project.detail.slice(0, 4).map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-7 sm:text-[0.96rem]"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <span style={{ color: "var(--accent)" }}>▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

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
                  </div>
                </div>

                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  {project.animationType === "voice-wave" ? (
                    <VoiceWaveAnimation />
                  ) : (
                    <MessageFlowAnimation />
                  )}
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

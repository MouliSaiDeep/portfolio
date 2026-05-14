import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { techStack } from "../data/portfolio";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const rowSizes = [6, 6, 5, 4, 3, 2];

function splitRows(items, sizes) {
  let cursor = 0;
  return sizes.map((size) => {
    const row = items.slice(cursor, cursor + size);
    cursor += size;
    return row;
  });
}

export default function TechStack() {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState("");
  const rows = splitRows(techStack, rowSizes);

  return (
    <section id="skills" className="section-shell">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="section-label">Skills</p>
          <h2
            className="mt-3 text-6xl font-extrabold leading-[0.95] sm:text-7xl lg:text-8xl"
            style={{
              fontFamily: "Syne, sans-serif",
              color: "var(--text-primary)",
            }}
          >
            TECH STACK
          </h2>
        </motion.div>

        <div className="hidden space-y-3 md:block">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={`row-${rowIndex}`}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="flex justify-center gap-3"
            >
              {row.map((tech) => {
                const Icon = tech.icon;
                const isHover = hovered === tech.name;

                return (
                  <motion.article
                    key={tech.name}
                    variants={cardVariants}
                    whileHover={reduceMotion ? undefined : { y: -5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onMouseEnter={() => setHovered(tech.name)}
                    onMouseLeave={() => setHovered("")}
                    className="relative flex h-[150px] w-[130px] select-none flex-col items-center justify-center gap-3 rounded-xl"
                    style={{
                      background: "var(--surface)",
                      border: `1px solid ${isHover ? "var(--border-hover)" : "var(--border)"}`,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={
                        isHover ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }
                      }
                      transition={{ duration: 0.15 }}
                      className="pointer-events-none absolute"
                      style={{
                        bottom: "calc(100% + 8px)",
                        background: "rgba(12,17,13,0.9)",
                        border: "1px solid var(--border-hover)",
                        backdropFilter: "blur(8px)",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.65rem",
                        color: "var(--text-primary)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tech.name}
                    </motion.div>

                    <Icon
                      className="h-11 w-11"
                      style={{
                        color: isHover ? tech.color : "#ffffff",
                        filter: isHover ? "none" : "grayscale(1) brightness(2)",
                        transition: "filter 250ms ease, color 250ms ease",
                      }}
                    />
                    <p
                      className="text-center text-[0.6rem] uppercase"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        letterSpacing: "0.12em",
                        color: "var(--text-muted)",
                      }}
                    >
                      {tech.name}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-3 md:hidden"
        >
          {techStack.map((tech) => {
            const Icon = tech.icon;
            const isHover = hovered === tech.name;

            return (
              <motion.article
                key={`${tech.name}-mobile`}
                variants={cardVariants}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onMouseEnter={() => setHovered(tech.name)}
                onMouseLeave={() => setHovered("")}
                className="relative flex h-[150px] items-center justify-center rounded-xl"
                style={{
                  background: "var(--surface)",
                  border: `1px solid ${isHover ? "var(--border-hover)" : "var(--border)"}`,
                }}
              >
                <div className="flex flex-col items-center gap-3">
                  <Icon
                    className="h-11 w-11"
                    style={{
                      color: isHover ? tech.color : "#ffffff",
                      filter: isHover ? "none" : "grayscale(1) brightness(2)",
                      transition: "filter 250ms ease, color 250ms ease",
                    }}
                  />
                  <p
                    className="text-center text-[0.6rem] uppercase"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                    }}
                  >
                    {tech.name}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

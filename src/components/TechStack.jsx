import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { techStackGroups } from "../data/portfolio";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function TechCard({ tech }) {
  const [hovered, setHovered] = useState("");
  const reduceMotion = useReducedMotion();
  const Icon = tech.icon;
  const isHover = hovered === tech.name;

  return (
    <motion.article
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
        animate={isHover ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
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
}

export default function TechStack() {
  return (
    <section id="skills" className="section-shell">
      <style>{`
        .category-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
          padding-left: 2px;
          position: relative;
        }

        .category-label::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1px;
          background: var(--accent);
          margin-right: 10px;
          vertical-align: middle;
          opacity: 0.6;
        }

        .category-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 36px;
        }

        .tech-category-block {
          margin-bottom: 8px;
        }

        .tech-category-block:last-child {
          margin-bottom: 0;
        }

        .tech-grid-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }
      `}</style>

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

        <div className="tech-grid-container">
          {techStackGroups.map((group, groupIndex) => (
            <motion.div
              key={`${group.category}-${groupIndex}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="tech-category-block"
            >
              <div className="category-label">{group.category}</div>

              <motion.div
                className="category-grid"
                variants={{
                  hidden: { transition: { staggerChildren: 0 } },
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {group.items.map((tech) => (
                  <motion.div key={tech.name} variants={cardVariants}>
                    <TechCard tech={tech} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

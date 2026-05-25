import { motion } from 'framer-motion';
import { useState } from 'react';
import { techStackGroups } from '../data/portfolio';

// ── Single icon card ──────────────────────────────────────────────────────
function TechCard({ tech, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="tech-card"
      style={{
        borderColor: hovered ? 'rgba(16,185,129,0.35)' : 'rgba(255,255,255,0.07)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Icon */}
      <Icon
        style={{
          filter: hovered ? 'none' : 'grayscale(1) brightness(2)',
          color: hovered ? tech.color : '#ffffff',
          transition: 'filter 250ms ease, color 250ms ease',
          flexShrink: 0,
        }}
        className="tech-icon"
      />

      {/* Label */}
      <span className="tech-label">
        {tech.name}
      </span>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(12,17,13,0.95)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '20px',
            padding: '3px 10px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        >
          {tech.name}
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Tile wrapper ──────────────────────────────────────────────────────────
function Tile({ group, delay = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={`tech-tile ${className || ''}`}
    >
      {/* Category label */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '9px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          display: 'inline-block',
          width: '16px',
          height: '1px',
          background: 'var(--accent)',
          opacity: 0.5,
          flexShrink: 0,
        }} />
        {group.category}
      </div>

      {/* Card grid — wrapping, centered, balanced, no orphans */}
      <div className="tech-tile-cards">
        {group.items.map((tech, i) => (
          <TechCard key={tech.name} tech={tech} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────
export default function TechStack() {
  const languages  = techStackGroups.find(g => g.category === 'Languages');
  const frameworks = techStackGroups.find(g => g.category === 'Frameworks & Runtimes');
  const databases  = techStackGroups.find(g => g.category === 'Databases');
  const brokers    = techStackGroups.find(g => g.category === 'Message Brokers');
  const devops     = techStackGroups.find(g => g.category === 'DevOps & Tools');

  return (
    <section id="skills" style={{ padding: '80px 0' }}>
      <style>{`
        /* Skills Container - Constrains width and aligns cleanly on wide screens */
        .skills-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          width: 100%;
          box-sizing: border-box;
        }

        /* Bento row grid layouts */
        .tech-row-1 {
          margin-bottom: 10px;
          width: 100%;
        }

        .tech-row-2,
        .tech-row-3 {
          display: grid;
          gap: 10px;
          margin-bottom: 10px;
          width: 100%;
        }

        .tech-row-2 {
          grid-template-columns: 3fr 2fr;
        }

        .tech-row-3 {
          grid-template-columns: 1fr 3fr;
          margin-bottom: 0;
        }

        /* Symmetrical stretches and paddings */
        .tech-tile {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          background: var(--surface);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          height: 100%;
          box-sizing: border-box;
        }

        .tech-tile-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, 90px);
          gap: 12px;
          justify-content: center;
          width: 100%;
          margin-top: auto;
          margin-bottom: auto;
        }

        /* Strict grid lock for Databases tile - 3 columns on desktop (3 on top, 2 on bottom) */
        .tile-databases {
          grid-area: auto !important;
        }

        .tile-databases .tech-tile-cards {
          grid-template-columns: repeat(3, 90px) !important;
        }

        /* Dynamic icon card sizing and styling */
        .tech-card {
          width: 90px;
          height: 90px;
          border-radius: 12px;
          background: var(--surface-2);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: transform 200ms ease, border-color 200ms ease;
          position: relative;
          overflow: visible;
          box-sizing: border-box;
        }

        .tech-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tech-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-align: center;
          line-height: 1.1;
          padding: 0 4px;
        }

        /* Tablet responsiveness adjustments (<= 1024px) */
        @media (max-width: 1024px) {
          .skills-container {
            padding: 0 24px;
          }
        }

        /* Mobile responsiveness adjustments (<= 768px) */
        @media (max-width: 768px) {
          .tech-row-2,
          .tech-row-3 {
            grid-template-columns: 1fr !important;
          }

          .skills-container {
            padding: 0 16px;
          }

          .tech-card {
            width: 76px !important;
            height: 76px !important;
            border-radius: 10px !important;
            gap: 4px !important;
          }

          .tech-label {
            font-size: 7px !important;
          }

          .tech-icon {
            width: 26px !important;
            height: 26px !important;
          }

          .tech-tile-cards {
            grid-template-columns: repeat(auto-fit, 76px) !important;
            gap: 10px !important;
          }
        }
      `}</style>

      <div className="skills-container">
        {/* Section label */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '8px',
        }}>
          Skills
        </p>

        {/* Big heading */}
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          marginBottom: '48px',
        }}>
          Tech Stack
        </h2>

        {/* ── ROW 1: Languages — full width ── */}
        <div className="tech-row-1">
          <Tile group={languages} delay={0} />
        </div>

        {/* ── ROW 2: Frameworks (60%) + Databases (40%) ── */}
        <div className="tech-row-2">
          <Tile group={frameworks} delay={0.05} />
          <Tile group={databases} delay={0.1} className="tile-databases" />
        </div>

        {/* ── ROW 3: Message Brokers (25%) + DevOps (75%) ── */}
        <div className="tech-row-3">
          <Tile group={brokers} delay={0.1} />
          <Tile group={devops} delay={0.15} />
        </div>
      </div>
    </section>
  );
}

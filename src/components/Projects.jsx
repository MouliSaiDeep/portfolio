import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { featuredProjects, projects } from "../data/portfolio";
import VoiceWavePanel from "./animations/VoiceWavePanel";
import QueueDepthPanel from "./animations/QueueDepthPanel";

const tabs = [
  { id: "all", label: "All Projects" },
  { id: "spring-boot", label: "Spring Boot" },
  { id: "nodejs", label: "Node.js" },
  { id: "python-data", label: "Python & Data" },
  { id: "blockchain", label: "Blockchain" },
];

const tabHeadingMap = {
  all: "All Projects",
  "spring-boot": "Spring Boot",
  nodejs: "Node.js",
  "python-data": "Python & Data",
  blockchain: "Blockchain",
};

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("all");
  const tabRefs = useRef({});

  // Sync tab with URL hash on mount and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (tabs.some((t) => t.id === hash)) {
        setActiveTab(hash);
      } else if (!hash) {
        setActiveTab("all");
      }
    };

    // Initial mount check
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Silent state update in history or full hash update
    if (tabId === "all") {
      window.history.pushState(null, "", window.location.pathname + window.location.search);
    } else {
      window.history.pushState(null, "", `#${tabId}`);
    }
  };

  const handleKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const nextTabId = tabs[nextIndex].id;
    handleTabChange(nextTabId);
    
    // Focus the newly active tab button
    const nextEl = tabRefs.current[nextTabId];
    if (nextEl) nextEl.focus();
  };

  // Filter projects depending on the active tab
  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="section-shell">
      <div className="page-container">
        {/* =========================================================================
            FEATURED SHOWCASE: Selected Work (Static Stacked Cards)
            ========================================================================= */}
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
            Featured Showcase
          </h2>
        </motion.div>

        {/* Vertically stacked Featured Cards */}
        <div className="space-y-12">
          {featuredProjects.map((project) => (
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
                {/* Featured Project Left Panel */}
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
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-colors duration-200"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--surface)",
                          color: "var(--text-primary)",
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                        data-cursor-hover
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--border-hover)";
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

                {/* Featured Project Visual Feedback Panel */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    border: "1px solid var(--border)",
                    background: "var(--surface-2)",
                    overflow: "hidden",
                    padding: "36px 28px",
                    height: "100%",
                    minHeight: "440px",
                  }}
                >
                  {project.id === "01" ? (
                    <VoiceWavePanel />
                  ) : (
                    <QueueDepthPanel />
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* =========================================================================
            PROJECTS GALLERY: Filterable Tabbed Cards Section
            ========================================================================= */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[var(--border)] pb-4">
            <div>
              <p
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "8px",
                }}
              >
                Projects Gallery
              </p>
              <h3
                className="text-4xl font-bold tracking-tight sm:text-5xl"
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                {tabHeadingMap[activeTab]}
              </h3>
            </div>

            {/* Accessible horizontal-scrollable tabbar list */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth max-w-full pb-1 focus:outline-none"
            >
              {tabs.map((tab, idx) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    id={`tab-btn-${tab.id}`}
                    ref={(el) => (tabRefs.current[tab.id] = el)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`tabpanel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleTabChange(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="relative pb-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: isActive ? "var(--accent)" : "var(--text-muted)",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--text-muted)";
                    }}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--accent)]"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animating grid list container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              role="tabpanel"
              id={`tabpanel-${activeTab}`}
              aria-labelledby={`tab-btn-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                exit: { duration: 0.2, ease: "easeIn" },
                enter: { duration: 0.3, ease: "easeOut" },
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layout="position"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -4, boxShadow: "0 8px 40px rgba(16,185,129,0.06)" }
                  }
                  className="surface-card flex flex-col justify-between rounded-[16px] px-6 py-8 sm:px-10 sm:py-9"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div>
                    <p
                      className="text-xs uppercase tracking-[0.18em]"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        color: "var(--accent)",
                      }}
                    >
                      {project.tagline}
                    </p>
                    <h4
                      className="mt-2 text-2xl font-bold leading-tight sm:text-[1.8rem]"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      {project.name}
                    </h4>
                    <p
                      className="mt-4 text-[0.95rem] leading-7 font-light max-w-[85ch]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full px-3 py-1 text-[0.62rem] uppercase tracking-wider font-semibold border border-[var(--border)] bg-[var(--surface-2)]"
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            color: "var(--text-primary)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-colors duration-200"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--surface)",
                          color: "var(--text-primary)",
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                        data-cursor-hover
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--border-hover)";
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
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

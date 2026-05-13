import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Introduction() {
  return (
    <section
      id="home"
      className="section-shell min-h-screen overflow-hidden pt-28 md:pt-32"
      style={{ maxWidth: "100vw" }}
    >
      <div className="page-container relative z-[1]">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:grid-cols-[32%_38%_30%]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 md:order-2 lg:order-1"
          >
            <p
              className="mb-3 text-sm uppercase tracking-[0.14em]"
              style={{
                color: "var(--text-muted)",
                fontFamily: "Inter, sans-serif",
                fontWeight: 300,
              }}
            >
              Hello, I&apos;m
            </p>
            <h1
              className="leading-[0.9]"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem,8vw,5rem)",
                color: "var(--text-primary)",
              }}
            >
              Mouli
              <br />
              Sai Deep
            </h1>

            <div className="mt-7 flex items-center gap-3">
              <span
                className="h-[2px] w-10"
                style={{ background: "var(--accent)" }}
              />
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)", fontWeight: 300 }}
              >
                Full Stack Developer &amp; Backend Engineer
              </p>
            </div>

            <div className="mt-7 flex items-center gap-5 text-sm">
              <a
                href="https://github.com/MouliSaiDeep"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                data-cursor-hover
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/moulisaideep"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                data-cursor-hover
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <FaLinkedinIn />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="order-2 flex justify-center md:order-1 md:col-span-2 lg:order-2 lg:col-span-1"
          >
            <div className="relative">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.04) 45%, transparent 75%)",
                  filter: "blur(80px)",
                }}
              />
              <img
                src="/profile.png"
                alt="Mouli Sai Deep"
                className="h-[54vh] w-[min(80vw,420px)] object-cover object-top md:h-[70vh] md:w-[420px] lg:h-[85vh]"
                style={{ boxShadow: "0 40px 120px rgba(16,185,129,0.2)" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="order-3 pr-[clamp(1rem,3vw,2rem)]"
          >
            <div
              className="intro-stack-title leading-[0.95]"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                wordBreak: "keep-all",
                hyphens: "none",
                color: "var(--text-primary)",
              }}
            >
              <p>Full Stack</p>
              <p>Developer</p>
            </div>

            <div
              className="my-7 h-px w-36"
              style={{ background: "var(--accent)", opacity: 0.3 }}
            />

            <div
              className="intro-stack-title leading-[0.95]"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                wordBreak: "keep-all",
                hyphens: "none",
                color: "var(--text-primary)",
              }}
            >
              <p>Backend</p>
              <p>Engineer</p>
            </div>

            <p
              className="mt-8 text-xs"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: "0.06em",
                color: "var(--text-muted)",
              }}
            >
              — Currently available for opportunities
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

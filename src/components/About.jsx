import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="page-container grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p className="section-label" style={{ color: "var(--accent)" }}>
            ABOUT ME
          </p>
          <div
            className="mt-6 space-y-5 text-[1.02rem] leading-[1.8]"
            style={{ color: "var(--text-muted)" }}
          >
            <p>
              I&apos;m a Computer Science undergraduate building systems that
              are meant to last. My work sits at the intersection of backend
              architecture and cross-platform product development — where the
              engineering decisions made early determine everything that
              follows.
            </p>
            <p>
              My primary tools are Java and Dart. On the backend, I design
              event-driven microservices using Spring Boot and message brokers
              like RabbitMQ — systems built around reliability and clean
              separation of concerns. On the frontend, I build cross-platform
              mobile applications with Flutter that close the gap between good
              engineering and good product.
            </p>
            <p>
              I&apos;m methodical about system design, opinionated about code
              quality, and serious about building things that work correctly
              under real-world conditions.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {["B.Tech CSE", "2023 – 2027", "Open to Work"].map((item) => (
              <span
                key={item}
                className="rounded-lg border px-4 py-2 text-xs transition-colors duration-200 hover:border-[var(--border-hover)]"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  background: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="surface-card relative overflow-hidden rounded-2xl p-6"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(52,211,153,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.08) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <div
            className="relative h-full min-h-[360px] rounded-xl border p-5"
            style={{ borderColor: "var(--border)" }}
          >
            <p
              className="text-xs"
              style={{
                color: "var(--text-dim)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              ARCHITECTURE / RUNTIME
            </p>
            <div
              className="mt-8 space-y-5 text-sm"
              style={{
                color: "var(--text-primary)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              <p>$ java -jar tracking-service.jar</p>
              <p>[BOOT] Spring Boot 3.3.1 ready in 2.4s</p>
              <p>[MQ] RabbitMQ channel established</p>
              <p>[DLQ] Dead-letter exchange bound</p>
              <p>[HEALTH] /actuator/health = UP</p>
              <p
                className="pt-5 text-lg heading-display"
                style={{ color: "var(--text-muted)", fontStyle: "italic" }}
              >
                "Systems designed to survive real usage."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function QueueDepthPanel() {
  const reduceMotion = useReducedMotion();
  const [ingested, setIngested] = useState(1024);
  const [processed, setProcessed] = useState(1018);
  const [failed, setFailed] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  const [sparkData, setSparkData] = useState(() =>
    Array.from({ length: 20 }, () => Math.floor(Math.random() * 80) + 40),
  );

  const intervalsRef = useRef([]);
  const timeoutsRef = useRef([]);

  // Blinking animation for the status indicator
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.2; }
      }
      .status-indicator {
        animation: blink 1.5s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Ingested oscillates randomly
  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setIngested(Math.floor(Math.random() * 600) + 800);
    }, 1800);

    intervalsRef.current.push(interval);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  // Processed lags ingested by 600ms
  useEffect(() => {
    if (reduceMotion) return;

    const timeout = setTimeout(() => {
      setProcessed(Math.floor(ingested * 0.95 + Math.random() * 20));
    }, 600);

    timeoutsRef.current.push(timeout);
    return () => clearTimeout(timeout);
  }, [ingested, reduceMotion]);

  // Failed spikes randomly
  useEffect(() => {
    if (reduceMotion) return;

    const scheduleFailure = () => {
      const delay = Math.random() * 3000 + 6000; // 6-9 seconds
      const timeout = setTimeout(() => {
        setFailed(Math.floor(Math.random() * 3) + 2);
        setShowRetry(true);

        const resetTimeout = setTimeout(() => {
          setFailed(0);
        }, 2000);
        timeoutsRef.current.push(resetTimeout);

        const hideRetryTimeout = setTimeout(() => {
          setShowRetry(false);
        }, 1500);
        timeoutsRef.current.push(hideRetryTimeout);

        scheduleFailure();
      }, delay);
      timeoutsRef.current.push(timeout);
    };

    scheduleFailure();
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [reduceMotion]);

  // Sparkline updates
  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setSparkData((prev) => {
        const newData = [...prev.slice(1)];
        newData.push(Math.floor(Math.random() * 80) + 40);
        return newData;
      });
    }, 2000);

    intervalsRef.current.push(interval);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  // Calculate bar widths (0-1500 maps to 0-100%)
  const ingestedPercent = Math.min((ingested / 1500) * 100, 100);
  const processedPercent = Math.min((processed / 1500) * 100, 100);
  const failedPercent = Math.min((failed / 1500) * 100, 100);

  // Sparkline SVG
  const sparklineWidth = 280;
  const sparklineHeight = 40;
  const points = sparkData
    .map((val, idx) => {
      const x = (idx / (sparkData.length - 1)) * sparklineWidth;
      const y = sparklineHeight - (val / 120) * (sparklineHeight - 2);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints =
    points + ` ${sparklineWidth},${sparklineHeight} 0,${sparklineHeight}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        height: "100%",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          className="status-indicator"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--accent)",
          }}
        />
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          RabbitMQ Monitor
        </div>
      </div>

      {/* Metric rows */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
      >
        {/* Ingested */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div
            style={{
              width: 80,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "var(--text-muted)",
              textAlign: "left",
            }}
          >
            INGESTED
          </div>
          <div
            style={{
              flex: 1,
              height: 6,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ width: `${ingestedPercent}%` }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{
                height: "100%",
                borderRadius: 3,
                background: "var(--accent)",
                boxShadow: "0 0 8px rgba(16,185,129,0.5)",
                willChange: "width",
              }}
            />
          </div>
          <motion.div
            animate={{ children: ingested }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{
              width: 48,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "var(--accent)",
              textAlign: "right",
            }}
          >
            {reduceMotion ? ingested : <AnimatedNumber value={ingested} />}
          </motion.div>
        </motion.div>

        {/* Processed */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div
            style={{
              width: 80,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "var(--text-muted)",
              textAlign: "left",
            }}
          >
            PROCESSED
          </div>
          <div
            style={{
              flex: 1,
              height: 6,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ width: `${processedPercent}%` }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              style={{
                height: "100%",
                borderRadius: 3,
                background: "rgba(16,185,129,0.6)",
                willChange: "width",
              }}
            />
          </div>
          <motion.div
            animate={{ children: processed }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{
              width: 48,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "var(--accent)",
              textAlign: "right",
            }}
          >
            {reduceMotion ? processed : <AnimatedNumber value={processed} />}
          </motion.div>
        </motion.div>

        {/* Failed */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 80,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "var(--text-muted)",
              textAlign: "left",
            }}
          >
            FAILED
          </div>
          <div
            style={{
              flex: 1,
              height: 6,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ width: `${failedPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                height: "100%",
                borderRadius: 3,
                background: "#f59e0b",
                boxShadow: "0 0 6px rgba(245,158,11,0.4)",
                willChange: "width",
              }}
            />
          </div>
          <div
            style={{
              width: 48,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "#f59e0b",
              textAlign: "right",
            }}
          >
            {failed}
          </div>
          {showRetry && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                right: 48,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 9,
                color: "#f59e0b",
                marginRight: 8,
              }}
            >
              retry ↻
            </motion.span>
          )}
        </div>
      </div>

      {/* Separator */}
      <div style={{ height: 1, background: "var(--border)" }} />

      {/* Consumer Status */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { label: "● CONSUMER HEALTHY", accent: true },
          { label: "202 avg response" },
          { label: "retry 3× exp backoff" },
        ].map((pill, idx) => (
          <div
            key={idx}
            style={{
              padding: "4px 10px",
              borderRadius: 4,
              fontSize: 8,
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: "0.08em",
              background: pill.accent
                ? "rgba(16,185,129,0.1)"
                : "var(--surface-2)",
              border: pill.accent
                ? "1px solid rgba(16,185,129,0.2)"
                : "1px solid var(--border)",
              color: pill.accent ? "var(--accent)" : "var(--text-muted)",
            }}
          >
            {pill.label}
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 8,
            color: "var(--text-dim)",
            width: 48,
            textAlign: "right",
          }}
        >
          events/sec
        </div>
        <svg
          width={sparklineWidth}
          height={sparklineHeight}
          style={{ flex: 1 }}
          viewBox={`0 0 ${sparklineWidth} ${sparklineHeight}`}
          preserveAspectRatio="none"
        >
          <polyline
            points={areaPoints}
            fill="rgba(16,185,129,0.06)"
            stroke="none"
          />
          <polyline
            points={points}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Bottom label */}
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          textAlign: "center",
          borderTop: "1px solid var(--border)",
          paddingTop: 12,
        }}
      >
        Event-Driven Architecture
      </div>
    </div>
  );
}

// Helper component for animating numbers
function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(Math.floor(value));

  useEffect(() => {
    setDisplayValue(Math.floor(value));
  }, [value]);

  return <>{displayValue}</>;
}

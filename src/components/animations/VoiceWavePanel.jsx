import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AiOutlineAudio } from "react-icons/ai";

const ringVariants = {
  animate: {
    scale: [0.8, 2.2],
    opacity: [0.5, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeOut" },
  },
};

const dotVariants = {
  animate: {
    opacity: [0.4, 1, 0.4],
    translateY: [0, -4, 0],
    transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function VoiceWavePanel() {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState("AI SPEAKING");
  const [waveScale, setWaveScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) =>
        prev === "AI SPEAKING" ? "YOUR TURN" : "AI SPEAKING",
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setWaveScale(state === "AI SPEAKING" ? 1 : 0.08);
  }, [state]);

  // Render 20 waveform bars with staggered animations
  const bars = Array.from({ length: 20 }, (_, i) => {
    const baseDuration = 0.6 + (i % 8) * 0.07;
    const delay = (i % 5) * 0.1;
    return { id: i, duration: baseDuration, delay };
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 20,
        padding: 0,
      }}
    >
      {/* Mic + Pulse Rings */}
      <div style={{ position: "relative", width: 72, height: 72 }}>
        <div
          style={{
            position: "absolute",
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <AiOutlineAudio
            style={{
              width: 44,
              height: 44,
              color: "var(--accent)",
            }}
          />
        </div>

        {/* Pulse rings */}
        {!reduceMotion &&
          [0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              variants={ringVariants}
              animate="animate"
              initial={{ scale: 0.8, opacity: 0.5 }}
              style={{
                position: "absolute",
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: "1px solid var(--accent)",
                top: 0,
                left: 0,
              }}
              transition={{
                delay: ring * 0.65,
              }}
            />
          ))}
      </div>

      {/* State indicator pill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 20,
            border: "1px solid var(--border)",
            background:
              state === "AI SPEAKING"
                ? "rgba(16,185,129,0.1)"
                : "rgba(255,255,255,0.06)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: state === "AI SPEAKING" ? "var(--accent)" : "#f0faf4",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: state === "AI SPEAKING" ? "var(--accent)" : "#f0faf4",
            }}
          />
          {state}
        </motion.div>
      </AnimatePresence>

      {/* Waveform bars */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 4,
          height: 32,
        }}
      >
        {bars.map((bar) => (
          <div
            key={bar.id}
            style={{
              width: 3,
              height: 32,
              borderRadius: 2,
              background: "var(--accent)",
              transformOrigin: "center",
              animation:
                state === "AI SPEAKING" && !reduceMotion
                  ? `waveBar ${bar.duration}s ease-in-out infinite`
                  : "none",
              animationDelay: bar.delay,
              transform:
                state === "YOUR TURN" ? "scaleY(0.08)" : "scaleY(0.15)",
              transition: "transform 400ms ease",
            }}
          />
        ))}
        <style>{`
          @keyframes waveBar {
            0%, 100% { transform: scaleY(0.15); }
            50% { transform: scaleY(1); }
          }
        `}</style>
      </div>

      {/* Bottom label */}
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        AI Voice Interview
      </div>
    </div>
  );
}

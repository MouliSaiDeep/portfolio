import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaRobot, FaMicrophone, FaMicrochip } from "react-icons/fa";

const CONVERSATION_STEPS = [
  {
    question: "Walk me through your most complex backend system.",
    category: "SYSTEM DESIGN INTERVIEW",
    durationAi: 5000,
    durationProcessing: 1500,
    durationUser: 4500,
  },
  {
    question: "How do you handle transactional consistency across decoupled microservices?",
    category: "TECHNICAL DEEP-DIVE",
    durationAi: 5500,
    durationProcessing: 1500,
    durationUser: 4000,
  },
  {
    question: "Tell me about a time you optimized database query performance under heavy concurrent load.",
    category: "BEHAVIORAL ROUND",
    durationAi: 5000,
    durationProcessing: 1500,
    durationUser: 4000,
  }
];

export default function VoiceWavePanel() {
  const reduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState("AI_SPEAKING"); // "AI_SPEAKING" | "PROCESSING" | "LISTENING"

  const currentStep = CONVERSATION_STEPS[stepIndex];

  useEffect(() => {
    let timer;
    if (phase === "AI_SPEAKING") {
      timer = setTimeout(() => {
        setPhase("PROCESSING");
      }, currentStep.durationAi);
    } else if (phase === "PROCESSING") {
      timer = setTimeout(() => {
        setPhase("LISTENING");
      }, currentStep.durationProcessing);
    } else if (phase === "LISTENING") {
      timer = setTimeout(() => {
        setPhase("AI_SPEAKING");
        setStepIndex((prev) => (prev + 1) % CONVERSATION_STEPS.length);
      }, currentStep.durationUser);
    }
    return () => clearTimeout(timer);
  }, [phase, stepIndex]);

  // Staggered equalizer bars (15 for each track)
  const generateBars = (isActive, baseColor) => {
    return Array.from({ length: 16 }, (_, i) => {
      // Create chaotic natural speech patterns
      const duration = 0.5 + (i % 6) * 0.08;
      const delay = (i % 4) * 0.08;
      const heightScale = 0.2 + (i % 5) * 0.16;

      return (
        <div
          key={i}
          className="w-[3px] rounded-full transition-all duration-300"
          style={{
            height: "24px",
            background: isActive ? baseColor : "rgba(255, 255, 255, 0.08)",
            transformOrigin: "center",
            animation: isActive && !reduceMotion ? `speechBar ${duration}s ease-in-out infinite` : "none",
            animationDelay: `${delay}s`,
            transform: isActive ? `scaleY(${heightScale})` : "scaleY(0.12)",
          }}
        />
      );
    });
  };

  return (
    <div
      className="flex flex-col justify-between items-center h-full w-full py-4 text-center select-none"
      aria-label="Animated voice interview simulation preview"
    >
      <style>{`
        @keyframes speechBar {
          0%, 100% { transform: scaleY(0.12); }
          50% { transform: scaleY(1); }
        }
        @keyframes soundRipple {
          0% { transform: scale(0.85); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      {/* --- TOP BAR: Active Pill & Category --- */}
      <div className="w-full flex items-center justify-between px-2">
        <span
          className="text-[9px] font-semibold tracking-wider transition-all duration-300"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: "var(--accent)",
          }}
        >
          {currentStep.category}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-semibold tracking-wide"
            style={{
              borderColor: "var(--border)",
              fontFamily: "JetBrains Mono, monospace",
              background:
                phase === "AI_SPEAKING"
                  ? "rgba(16, 185, 129, 0.08)"
                  : phase === "PROCESSING"
                  ? "rgba(245, 158, 11, 0.08)"
                  : "rgba(6, 182, 212, 0.08)",
              color:
                phase === "AI_SPEAKING"
                  ? "var(--accent)"
                  : phase === "PROCESSING"
                  ? "#f59e0b"
                  : "#06b6d4",
            }}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                phase === "AI_SPEAKING"
                  ? "bg-[var(--accent)] animate-pulse"
                  : phase === "PROCESSING"
                  ? "bg-amber-500 animate-spin"
                  : "bg-cyan-400 animate-ping"
              }`}
            />
            {phase === "AI_SPEAKING"
              ? "INTERVIEWER SPEAKING"
              : phase === "PROCESSING"
              ? "AI THINKING..."
              : "● REC (CANDIDATE)"}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- MIDDLE: Concentric Rings Sound Orb --- */}
      <div className="relative flex items-center justify-center my-6" style={{ width: 80, height: 80 }}>
        {/* Ripple Rings when AI is active */}
        {!reduceMotion && phase === "AI_SPEAKING" && (
          [0, 1, 2].map((ring) => (
            <div
              key={ring}
              className="absolute w-20 h-20 rounded-full border border-[var(--accent)] pointer-events-none"
              style={{
                animation: "soundRipple 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
                animationDelay: `${ring * 0.7}s`,
              }}
            />
          ))
        )}

        {/* Ripple Rings when User is active */}
        {!reduceMotion && phase === "LISTENING" && (
          [0, 1, 2].map((ring) => (
            <div
              key={ring}
              className="absolute w-20 h-20 rounded-full border border-cyan-400 pointer-events-none"
              style={{
                animation: "soundRipple 2.0s cubic-bezier(0.16, 1, 0.3, 1) infinite",
                animationDelay: `${ring * 0.6}s`,
              }}
            />
          ))
        )}

        {/* Central Glowing Icon Button */}
        <div
          className="absolute w-20 h-20 rounded-full border flex items-center justify-center z-10 transition-all duration-500"
          style={{
            background:
              phase === "AI_SPEAKING"
                ? "rgba(16, 185, 129, 0.12)"
                : phase === "PROCESSING"
                ? "rgba(245, 158, 11, 0.12)"
                : "rgba(6, 182, 212, 0.12)",
            borderColor:
              phase === "AI_SPEAKING"
                ? "rgba(16, 185, 129, 0.35)"
                : phase === "PROCESSING"
                ? "rgba(245, 158, 11, 0.35)"
                : "rgba(6, 182, 212, 0.35)",
            boxShadow:
              phase === "AI_SPEAKING"
                ? "0 0 30px rgba(16, 185, 129, 0.15)"
                : phase === "PROCESSING"
                ? "0 0 30px rgba(245, 158, 11, 0.15)"
                : "0 0 30px rgba(6, 182, 212, 0.15)",
          }}
        >
          <AnimatePresence mode="wait">
            {phase === "AI_SPEAKING" ? (
              <motion.div
                key="ai"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaRobot className="w-8 h-8 text-[var(--accent)]" />
              </motion.div>
            ) : phase === "PROCESSING" ? (
              <motion.div
                key="proc"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaMicrochip className="w-8 h-8 text-amber-500" />
              </motion.div>
            ) : (
              <motion.div
                key="mic"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaMicrophone className="w-8 h-8 text-cyan-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- DUAL VOICE TIMELINE SPECTROGRAMS (OPTION C) --- */}
      <div className="w-full flex flex-col gap-3.5 px-4 mb-4">
        {/* Interviewer AI Track */}
        <div className="flex items-center justify-between gap-4 border border-[rgba(255,255,255,0.03)] bg-[rgba(255,255,255,0.01)] rounded-xl px-4 py-2.5">
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[8px] font-bold tracking-widest text-[var(--text-muted)] font-mono">AI TRACK</span>
            <span className={`text-[9px] font-medium font-mono ${phase === "AI_SPEAKING" ? "text-[var(--accent)]" : "text-[var(--text-dim)]"}`}>INTERVIEWER</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 h-6">
            {generateBars(phase === "AI_SPEAKING", "var(--accent)")}
          </div>
        </div>

        {/* Candidate Track */}
        <div className="flex items-center justify-between gap-4 border border-[rgba(255,255,255,0.03)] bg-[rgba(255,255,255,0.01)] rounded-xl px-4 py-2.5">
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[8px] font-bold tracking-widest text-[var(--text-muted)] font-mono">USER TRACK</span>
            <span className={`text-[9px] font-medium font-mono ${phase === "LISTENING" ? "text-cyan-400" : "text-[var(--text-dim)]"}`}>CANDIDATE</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 h-6">
            {generateBars(phase === "LISTENING", "#22d3ee")}
          </div>
        </div>
      </div>

      {/* --- LIVE SUB-CAPTION: Transcript / Evaluation Text --- */}
      <div className="w-full h-12 flex items-center justify-center px-4 mb-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${stepIndex}-${phase}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-[12px] leading-relaxed max-w-sm tracking-wide font-light"
            style={{
              fontFamily: "Inter, sans-serif",
              color:
                phase === "AI_SPEAKING"
                  ? "var(--text-primary)"
                  : "var(--text-muted)",
            }}
          >
            {phase === "AI_SPEAKING" && `“${currentStep.question}”`}
            {phase === "PROCESSING" && "Evaluating latency, keyword alignment, and speech cadence..."}
            {phase === "LISTENING" && "Transcribing candidate’s verbal system architecture answer..."}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* --- BOTTOM PORTFOLIO LABEL --- */}
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
        }}
      >
        LIVE SESSION PREVIEW
      </div>
    </div>
  );
}

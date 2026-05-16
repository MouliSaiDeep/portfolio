import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const conversation = [
  {
    role: "ai",
    text: '"Walk me through your most complex backend system."',
  },
  {
    role: "user",
    text: '"Built an event-driven microservice with RabbitMQ — producer publishes, consumer persists asynchronously."',
  },
  {
    role: "ai",
    text: '"Strong answer. Technical Depth: 4.8 / 5."',
  },
];

const TypingIndicator = () => {
  const dotVariants = {
    animate: {
      opacity: [0.4, 1, 0.4],
      translateY: [0, -4, 0],
      transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        padding: "8px 12px",
        background: "rgba(16,185,129,0.08)",
        border: "1px solid rgba(16,185,129,0.2)",
        borderRadius: "4px 12px 12px 12px",
        width: "fit-content",
      }}
    >
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          variants={dotVariants}
          animate="animate"
          initial={{ opacity: 0.4 }}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--accent)",
          }}
          transition={{ delay: dot * 0.15 }}
        />
      ))}
    </div>
  );
};

export default function ConversationFeedPanel() {
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const timeoutsRef = useRef([]);
  const scrollEndRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleCount(conversation.length);
      return;
    }

    const resetSequence = () => {
      setVisibleCount(0);
      setShowTyping(false);

      // Schedule each bubble with timing
      const timings = [0, 1400, 2700];
      const typingShows = [1200];

      timings.forEach((time, index) => {
        const timeout = setTimeout(() => {
          if (index > 0 && conversation[index].role === "ai") {
            setShowTyping(false);
          }
          setVisibleCount(index + 1);
        }, time);
        timeoutsRef.current.push(timeout);

        if (
          index < timings.length - 1 &&
          conversation[index + 1].role === "ai"
        ) {
          const typingTimeout = setTimeout(
            () => setShowTyping(true),
            typingShows[index],
          );
          timeoutsRef.current.push(typingTimeout);
        }
      });

      const resetTimeout = setTimeout(() => {
        resetSequence();
      }, 4800);
      timeoutsRef.current.push(resetTimeout);
    };

    resetSequence();

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [reduceMotion]);

  useEffect(() => {
    // Scroll within the panel's internal container, not the page
    if (panelRef.current) {
      panelRef.current.scrollTop = panelRef.current.scrollHeight;
    }
  }, [visibleCount]);

  const bubbleVariants = {
    initial: { opacity: 0, y: 8, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.35, ease: "easeOut" },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 0,
      }}
    >
      {/* Bubbles container */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingBottom: 12,
        }}
      >
        <div
          ref={panelRef}
          className="conversation-scroll"
          style={{
            height: "260px",
            minHeight: "260px",
            maxHeight: "260px",
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <AnimatePresence>
            {conversation.slice(0, visibleCount).map((msg, idx) => {
              const isAI = msg.role === "ai";
              const isLastAndScore = idx === conversation.length - 1 && isAI;

              return (
                <div key={idx}>
                  <div
                    style={{
                      fontSize: 8,
                      fontFamily: "JetBrains Mono, monospace",
                      letterSpacing: "0.1em",
                      marginBottom: 3,
                      color: isAI ? "var(--accent)" : "var(--text-muted)",
                      textAlign: isAI ? "left" : "right",
                      textTransform: "uppercase",
                    }}
                  >
                    {isAI ? "INTERVIEWER AI" : "YOU"}
                  </div>

                  <motion.div
                    initial={bubbleVariants.initial}
                    animate={bubbleVariants.animate}
                    transition={bubbleVariants.transition}
                    style={{
                      width: "88%",
                      alignSelf: isAI ? "flex-start" : "flex-end",
                      padding: "8px 12px",
                      borderRadius: isAI
                        ? "4px 12px 12px 12px"
                        : "12px 4px 12px 12px",
                      background: isAI
                        ? "rgba(16,185,129,0.08)"
                        : "rgba(240,250,244,0.05)",
                      border: isAI
                        ? "1px solid rgba(16,185,129,0.2)"
                        : "1px solid rgba(255,255,255,0.08)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: "var(--text-primary)",
                      fontWeight: 300,
                      boxShadow: isLastAndScore
                        ? "0 0 16px rgba(16,185,129,0.12)"
                        : "none",
                    }}
                  >
                    {isLastAndScore ? (
                      <>
                        {msg.text.replace("4.8 / 5", "")}
                        <span
                          style={{ color: "var(--accent)", fontWeight: 500 }}
                        >
                          4.8 / 5
                        </span>
                        <span>.&quot;</span>
                      </>
                    ) : (
                      msg.text
                    )}
                  </motion.div>
                </div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          {showTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                style={{
                  fontSize: 8,
                  fontFamily: "JetBrains Mono, monospace",
                  letterSpacing: "0.1em",
                  marginBottom: 3,
                  color: "var(--accent)",
                  textTransform: "uppercase",
                }}
              >
                INTERVIEWER AI
              </div>
              <TypingIndicator />
            </motion.div>
          )}

          <div ref={scrollEndRef} />
        </div>
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
          paddingTop: 12,
          borderTop: "1px solid var(--border)",
        }}
      >
        Live Session Preview
      </div>
    </div>
  );
}

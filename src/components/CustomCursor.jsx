import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 350, damping: 30, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const isHovering = useRef(false);
  const sizeMotion = useMotionValue(40);
  const size = useSpring(sizeMotion, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };

    const handleEnter = () => {
      sizeMotion.set(70);
      isHovering.current = true;
    };

    const handleLeave = () => {
      sizeMotion.set(40);
      isHovering.current = false;
    };

    const attachInteractiveHandlers = () => {
      const interactives = document.querySelectorAll(
        "a, button, [data-cursor-hover]",
      );

      interactives.forEach((el) => {
        if (el.dataset.cursorBound === "true") return;
        el.dataset.cursorBound = "true";
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    window.addEventListener("mousemove", moveCursor);
    attachInteractiveHandlers();

    const observer = new MutationObserver(() => {
      attachInteractiveHandlers();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();

      const interactives = document.querySelectorAll(
        "a, button, [data-cursor-hover]",
      );

      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
        delete el.dataset.cursorBound;
      });
    };
  }, [cursorX, cursorY, sizeMotion]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "white",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

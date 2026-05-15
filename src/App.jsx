import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";

const sections = ["home", "about", "projects", "skills", "contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.15, 0.3, 0.45, 0.6],
      },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="app-shell"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <CustomCursor />
      <div className="bg-glow-left" />
      <div className="bg-glow-right" />
      <div className="bg-glow-bottom" />
      <Navbar activeSection={activeSection} />

      <main className="relative z-10">
        <Introduction />
        <About />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}

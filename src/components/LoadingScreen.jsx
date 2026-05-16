import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STAR_COUNT = 400;
const ACCENT = "#10b981";
const BG = "#060a07";
const PERSPECTIVE = 300;

const passingPlanets = [
  {
    spawnAt: 0.8,
    x: 0.6,
    y: -0.3,
    size: 38,
    colors: ["#0d1f0e", "#0a1a0b"],
    ringColor: "rgba(16,185,129,0.25)",
  },
  {
    spawnAt: 1.9,
    x: -0.5,
    y: 0.2,
    size: 55,
    colors: ["#111f12", "#060a07"],
    ringColor: null,
  },
  {
    spawnAt: 3.1,
    x: 0.3,
    y: 0.4,
    size: 44,
    colors: ["#0c1f0d", "#080f09"],
    ringColor: "rgba(16,185,129,0.18)",
  },
];

const lockStages = [
  { at: 4.8, text: "SIGNAL DETECTED" },
  { at: 5.3, text: "TRIANGULATING..." },
  { at: 5.8, text: "SOURCE CONFIRMED" },
  { at: 6.2, text: "LOCKING TARGET" },
  { at: 6.7, text: "TARGET LOCKED +" },
];

const smoothstep = (edge0, edge1, value) => {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const lerp = (a, b, t) => a + (b - a) * t;
const cubicIn = (t) => t ** 3;
const cubicOut = (t) => 1 - (1 - t) ** 3;

const createStar = () => {
  const z = Math.random();
  return {
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z,
    pz: z,
  };
};

const createStars = () => Array.from({ length: STAR_COUNT }, createStar);

const getSpeed = (timeSeconds) => {
  if (timeSeconds < 0.3) {
    return lerp(0.002, 0.028, cubicIn(timeSeconds / 0.3));
  }
  if (timeSeconds < 4) {
    return 0.028;
  }
  if (timeSeconds < 5.5) {
    return lerp(0.028, 0.003, cubicOut((timeSeconds - 4) / 1.5));
  }
  return 0.003;
};

const getLockLabel = (timeSeconds) => {
  let label = lockStages[0].text;
  for (const stage of lockStages) {
    if (timeSeconds >= stage.at) {
      label = stage.text;
    }
  }
  return label;
};

export default function LoadingScreen({ onComplete = () => {} }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const resizeObserverRef = useRef(null);
  const completeOnceRef = useRef(false);
  const startTimeRef = useRef(0);
  const prevTimeRef = useRef(0);
  const reticleRotationRef = useRef(0);
  const starsRef = useRef(createStars());
  const sizeRef = useRef({ width: 0, height: 0 });
  const phaseRef = useRef({ overlay: false, exiting: false });
  const nebulaRef = useRef([
    { x: 0.38, y: 0.6, radius: 320, driftX: 0.05, driftY: -0.02 },
    { x: 0.78, y: 0.24, radius: 280, driftX: -0.04, driftY: 0.03 },
    { x: 0.2, y: 0.82, radius: 340, driftX: 0.03, driftY: -0.04 },
  ]);
  const planetsRef = useRef(
    passingPlanets.map((planet, index) => ({
      ...planet,
      active: false,
      done: false,
      z: 1,
      sideBias: (index % 2 === 0 ? 1 : -1) * (0.8 + Math.random() * 0.7),
    })),
  );

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (prefersReducedMotion) {
      onComplete();
      return undefined;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      onComplete();
      return undefined;
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { width: rect.width, height: rect.height };
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    resizeObserverRef.current = new ResizeObserver(resize);
    resizeObserverRef.current.observe(canvas);

    const drawNebula = (speed, frameScale, timeSeconds) => {
      const { width, height } = sizeRef.current;
      const warpPresence = Math.min(speed / 0.028, 1);
      const pulse = 0.9 + Math.sin(timeSeconds * 1.6) * 0.1;
      const opacity = warpPresence * 0.08 * pulse;

      for (const patch of nebulaRef.current) {
        patch.x += (patch.driftX * frameScale) / width;
        patch.y += (patch.driftY * frameScale) / height;

        if (patch.x < -0.2) patch.x = 1.2;
        if (patch.x > 1.2) patch.x = -0.2;
        if (patch.y < -0.2) patch.y = 1.2;
        if (patch.y > 1.2) patch.y = -0.2;

        const px = patch.x * width;
        const py = patch.y * height;
        const gradient = ctx.createRadialGradient(
          px,
          py,
          0,
          px,
          py,
          patch.radius,
        );
        gradient.addColorStop(0, `rgba(16,185,129,${opacity})`);
        gradient.addColorStop(1, "rgba(16,185,129,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const drawStars = (speed, timeSeconds, frameScale) => {
      const { width, height } = sizeRef.current;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const inFullWarp = timeSeconds >= 0.3 && timeSeconds <= 4;
      const speedNorm = Math.min(speed / 0.028, 1);
      const edgeBoost =
        1 + smoothstep(0.55, 1, Math.abs(Math.sin(timeSeconds * 0.9))) * 0.25;

      for (const star of starsRef.current) {
        star.pz = Math.max(star.z, 0.0001);
        star.z -= speed * frameScale;

        if (star.z <= 0.001) {
          star.x = Math.random() * 2 - 1;
          star.y = Math.random() * 2 - 1;
          star.z = 1;
          star.pz = 1;
          continue;
        }

        const z = Math.max(star.z, 0.001);
        const pz = Math.max(star.pz, 0.001);

        const sx = (star.x / z) * PERSPECTIVE + cx;
        const sy = (star.y / z) * PERSPECTIVE + cy;
        const psx = (star.x / pz) * PERSPECTIVE + cx;
        const psy = (star.y / pz) * PERSPECTIVE + cy;

        if (
          (sx < -width || sx > width * 2 || sy < -height || sy > height * 2) &&
          (psx < -width || psx > width * 2 || psy < -height || psy > height * 2)
        ) {
          continue;
        }

        let ex = sx;
        let ey = sy;
        if (inFullWarp) {
          const warpRamp = smoothstep(0.3, 0.7, timeSeconds);
          const warpFactor = 3.2 + warpRamp * 1.25;
          ex = sx + (sx - psx) * warpFactor;
          ey = sy + (sy - psy) * warpFactor;
        }

        const size = (1 - z) * 2.5;
        const brightness = (1 - z) * 0.9 + 0.1;
        const streakLength = Math.hypot(ex - psx, ey - psy);
        const alpha =
          brightness *
          Math.min(streakLength / 10, 1) *
          (0.72 + speedNorm * 0.5);

        ctx.strokeStyle = `rgba(240,250,244,${alpha})`;
        ctx.lineWidth =
          Math.max(0.25, size * (0.46 + speedNorm * 0.32)) * edgeBoost;
        ctx.beginPath();
        ctx.moveTo(psx, psy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
    };

    const drawPassingPlanet = (planet, speed, frameScale) => {
      if (!planet.active || planet.done) return;

      const { width, height } = sizeRef.current;
      const cx = width * 0.5;
      const cy = height * 0.5;

      planet.z -= speed * frameScale * (2.6 + (speed / 0.028) * 0.7);
      if (planet.z <= 0.01) {
        planet.done = true;
        return;
      }

      const z = Math.max(planet.z, 0.02);
      const sx = (planet.x / z) * PERSPECTIVE + cx;
      const sy = (planet.y / z) * PERSPECTIVE + cy;
      const passDrift = (1 - z) ** 1.85 * width * 0.95 * planet.sideBias;
      const px = sx + passDrift;
      const py = sy;
      const radius = planet.size / z;

      const trail = ctx.createRadialGradient(
        px,
        py,
        radius * 0.3,
        px,
        py,
        radius * 2.2,
      );
      trail.addColorStop(0, "rgba(16,185,129,0.06)");
      trail.addColorStop(1, "rgba(16,185,129,0)");
      ctx.beginPath();
      ctx.arc(px, py, radius * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = trail;
      ctx.fill();

      const gradient = ctx.createRadialGradient(
        px - radius * 0.3,
        py - radius * 0.3,
        0,
        px,
        py,
        radius,
      );
      gradient.addColorStop(0, "#1a2e1e");
      gradient.addColorStop(0.6, planet.colors[0]);
      gradient.addColorStop(1, planet.colors[1]);

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(16,185,129,0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (planet.ringColor) {
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(1, 0.28);
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.7, 0, Math.PI * 2);
        ctx.strokeStyle = planet.ringColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    };

    const drawDestinationPlanet = (timeSeconds) => {
      if (timeSeconds < 4) return { radius: 8, cx: 0, cy: 0 };

      const { width, height } = sizeRef.current;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const growth = clamp01((timeSeconds - 4) / 4);
      const approachCurve = growth ** 3.4;
      const radius = lerp(8, 280, approachCurve);

      const gradient = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        0,
        cx,
        cy,
        radius,
      );
      gradient.addColorStop(0, "#1f3a22");
      gradient.addColorStop(0.4, "#132b16");
      gradient.addColorStop(0.75, "#0a1a0c");
      gradient.addColorStop(1, "#060a07");

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      const halo = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.9,
        cx,
        cy,
        radius * 1.4,
      );
      halo.addColorStop(0, "rgba(16,185,129,0.18)");
      halo.addColorStop(1, "rgba(16,185,129,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      if (radius > 60) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.strokeStyle = "rgba(16,185,129,0.06)";
        ctx.lineWidth = 1.2;

        for (let i = 0; i < 4; i += 1) {
          const offset = (-1.2 + i * 0.8) * (radius * 0.35);
          ctx.beginPath();
          ctx.ellipse(
            cx + offset * 0.3,
            cy + offset,
            radius * 0.8,
            radius * 0.22,
            -0.3 + i * 0.16,
            0,
            Math.PI * 2,
          );
          ctx.stroke();
        }

        ctx.restore();
      }

      return { radius, cx, cy };
    };

    const drawReticleAndHud = (timeSeconds, destination) => {
      if (timeSeconds < 4) return;

      const { radius, cx, cy } = destination;

      const scanAlpha = clamp01((timeSeconds - 4) / 0.55);
      ctx.fillStyle = `rgba(16,185,129,${scanAlpha})`;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = "left";
      ctx.fillText("SECTOR SCAN COMPLETE", 32, 50);
      ctx.fillText("ANOMALY DETECTED", 32, 66);
      ctx.fillText("COORDINATES: 14h 29m 43s +02 deg 03' 09\"", 32, 82);

      if (timeSeconds >= 4.5) {
        const reticleAlpha = clamp01((timeSeconds - 4.5) / 0.3);
        const r = radius + 18;
        const len = 16;
        const gap = 4;
        ctx.strokeStyle = `rgba(16,185,129,${reticleAlpha})`;
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.moveTo(cx - r, cy - r + gap + len);
        ctx.lineTo(cx - r, cy - r + gap);
        ctx.lineTo(cx - r + gap + len, cy - r + gap);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx + r - gap - len, cy - r + gap);
        ctx.lineTo(cx + r - gap, cy - r + gap);
        ctx.lineTo(cx + r - gap, cy - r + gap + len);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - r, cy + r - gap - len);
        ctx.lineTo(cx - r, cy + r - gap);
        ctx.lineTo(cx - r + gap + len, cy + r - gap);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx + r - gap - len, cy + r - gap);
        ctx.lineTo(cx + r - gap, cy + r - gap);
        ctx.lineTo(cx + r - gap, cy + r - gap - len);
        ctx.stroke();

        if (timeSeconds >= 5) {
          if (timeSeconds < 6.7) {
            const spinBoost = 0.007 + smoothstep(5, 5.8, timeSeconds) * 0.004;
            reticleRotationRef.current += spinBoost;
          }
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(reticleRotationRef.current);
          ctx.setLineDash([6, 10]);
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(16,185,129,${reticleAlpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }
      }

      if (timeSeconds >= 4.8) {
        const lockAlpha = clamp01((timeSeconds - 4.8) / 0.35);
        const lockPulse = 0.86 + Math.sin(timeSeconds * 7.2) * 0.14;
        ctx.fillStyle = `rgba(16,185,129,${lockAlpha})`;
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = "left";
        ctx.globalAlpha = lockPulse;
        ctx.fillText(getLockLabel(timeSeconds), cx + radius + 28, cy - 8);
        ctx.globalAlpha = 1;
      }

      if (timeSeconds >= 5) {
        const progress = cubicOut(clamp01((timeSeconds - 5) / 3));
        const au = lerp(1.4, 0, progress);
        ctx.fillStyle = "rgba(107,124,114,0.6)";
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.fillText(`${au.toFixed(1)} AU`, cx, cy + radius + 28);
      }
    };

    const drawFlash = (timeSeconds) => {
      if (timeSeconds < 7.8) return;

      let flashAlpha = 0;
      if (timeSeconds <= 7.92) {
        flashAlpha = lerp(0, 0.85, (timeSeconds - 7.8) / 0.12);
      } else if (timeSeconds <= 8.22) {
        flashAlpha = lerp(0.85, 0, (timeSeconds - 7.92) / 0.3);
      }

      if (flashAlpha > 0) {
        const { width, height } = sizeRef.current;
        ctx.fillStyle = `rgba(240,250,244,${flashAlpha})`;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const frame = (now) => {
      if (!startTimeRef.current) {
        startTimeRef.current = now;
        prevTimeRef.current = now;
      }

      const elapsedMs = now - startTimeRef.current;
      let deltaMs = now - prevTimeRef.current;
      prevTimeRef.current = now;
      if (deltaMs > 50) deltaMs = 16;
      const frameScale = deltaMs / 16;
      const timeSeconds = elapsedMs / 1000;
      const speed = getSpeed(timeSeconds);

      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      drawNebula(speed, frameScale, timeSeconds);
      drawStars(speed, timeSeconds, frameScale);

      if (timeSeconds <= 4.2) {
        for (const planet of planetsRef.current) {
          if (!planet.active && timeSeconds >= planet.spawnAt) {
            planet.active = true;
            planet.z = 0.9;
          }
          drawPassingPlanet(planet, speed, frameScale);
        }
      }

      const destination = drawDestinationPlanet(timeSeconds);
      drawReticleAndHud(timeSeconds, destination);
      drawFlash(timeSeconds);

      if (timeSeconds >= 7 && !phaseRef.current.overlay) {
        phaseRef.current.overlay = true;
        setOverlayVisible(true);
      }

      if (timeSeconds >= 7.8 && !phaseRef.current.exiting) {
        phaseRef.current.exiting = true;
        setExiting(true);
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserverRef.current?.disconnect();
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={exiting ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      onAnimationComplete={() => {
        if (exiting && !completeOnceRef.current) {
          completeOnceRef.current = true;
          onComplete();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        background: BG,
        willChange: "transform, opacity",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          opacity: overlayVisible ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 40,
            height: 1,
            background: ACCENT,
            opacity: 0.85,
          }}
        />
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 13,
            letterSpacing: "0.35em",
            color: "rgba(240,250,244,0.9)",
            textTransform: "uppercase",
          }}
        >
          PORTFOLIO FOUND.
        </div>
        <div
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "#f0faf4",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          Mouli Sai Deep
        </div>
      </div>
    </motion.div>
  );
}

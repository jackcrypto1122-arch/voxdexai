import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ ["--mx" as never]: "50vw", ["--my" as never]: "30vh" }}
    >
      {/* Moving grid */}
      <div className="absolute inset-0 grid-bg opacity-40 animate-grid-drift" />
      {/* Ambient radial glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[720px] w-[1200px] rounded-full bg-[radial-gradient(closest-side,oklch(0.92_0.22_125/_0.18),transparent_70%)] blur-3xl" />
      {/* Slow pulsing lime blob */}
      <div className="absolute bottom-0 right-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,oklch(0.92_0.22_125/_0.12),transparent_70%)] blur-3xl animate-pulse-slow" />
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-lime/60 shadow-[0_0_8px_2px_oklch(0.92_0.22_125/_0.6)] animate-float"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 10) * 0.6}s`,
              animationDuration: `${8 + (i % 6) * 2}s`,
              opacity: 0.35 + ((i % 5) / 10),
            }}
          />
        ))}
      </div>
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
      {/* Mouse-follow glow */}
      <div
        className="absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,oklch(0.92_0.22_125/_0.14),transparent_70%)] blur-2xl transition-transform duration-300 ease-out"
        style={{ transform: "translate3d(calc(var(--mx) - 210px), calc(var(--my) - 210px), 0)" }}
      />
    </div>
  );
}

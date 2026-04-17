"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── Config ─────────────────────────────── */
const TOTAL_FRAMES = 80;
const IMG_BASE = "/hero/smooth_cinematic_transition_202604171436_";
const src = (i: number) => `${IMG_BASE}${String(i).padStart(3, "0")}.jpg`;

/* ─────────────────────────────────────────────────────────────
   Helper: walk the offsetParent chain to get the element's
   TRUE top distance from the document top — regardless of
   which ancestor has position:relative / position:sticky.
───────────────────────────────────────────────────────────── */
function getDocumentTop(el: HTMLElement): number {
  let top = 0;
  let cur: HTMLElement | null = el;
  while (cur) {
    top += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement | null;
  }
  return top;
}

export default function HeroSection() {
  /* ── Refs ────────────────────────────── */
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  const imgs   = useRef<HTMLImageElement[]>([]);
  const loaded = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const currIdx = useRef(0);
  const loopId  = useRef<number | null>(null);

  /* ── Cover-fit draw ─────────────────── */
  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img    = imgs.current[idx];
    if (!canvas || !img || !loaded.current[idx]) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width,  ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    if (!iw || !ih) return;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale, sh = ih * scale;
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
  }, []);

  /* ── Canvas resize ──────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.fillStyle = "#09090B";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      draw(currIdx.current);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  /* ── Preload all 80 images ──────────── */
  useEffect(() => {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = src(i);
      const n = i;
      img.onload  = () => {
        loaded.current[n] = true;
        if (n === 0) draw(0);
      };
      img.onerror = () => console.warn("[ClaimCheck] missing frame", n);
      imgs.current[i] = img;
    }
  }, [draw]);

  /* ─────────────────────────────────────────────────────────
     RAF polling loop — reads scroll state every animation
     frame regardless of which element is scrolling.
     This is the most browser-compatible approach and avoids
     the window.scrollY=0 bug caused by overflow-x on body.
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      const section = canvasRef.current && sectionRef.current;
      if (sectionRef.current) {
        // window.pageYOffset is the most compatible scroll position source
        const scrollY    = window.pageYOffset;
        const docTop     = getDocumentTop(sectionRef.current);
        const scrolled   = scrollY - docTop;
        const scrollable = sectionRef.current.offsetHeight - window.innerHeight;

        if (scrollable > 0) {
          const progress = Math.min(1, Math.max(0, scrolled / scrollable));
          const idx      = Math.round(progress * (TOTAL_FRAMES - 1));

          if (idx !== currIdx.current) {
            currIdx.current = idx;
            draw(idx);
          }
        }
      }
      loopId.current = requestAnimationFrame(tick);
    };

    loopId.current = requestAnimationFrame(tick);
    return () => {
      if (loopId.current !== null) cancelAnimationFrame(loopId.current);
    };
  }, [draw]);

  /* ── Framer Motion scroll for text overlays ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ALL useTransform calls at top level
  const s1Op = useTransform(scrollYProgress, [0, 0.04, 0.12, 0.18], [0, 1, 1, 0]);
  const s1Y  = useTransform(scrollYProgress, [0, 0.04, 0.12, 0.18], [44, 0, 0, -44]);
  const s2Op = useTransform(scrollYProgress, [0.23, 0.28, 0.37, 0.43], [0, 1, 1, 0]);
  const s2Y  = useTransform(scrollYProgress, [0.23, 0.28, 0.37, 0.43], [44, 0, 0, -44]);
  const s3Op = useTransform(scrollYProgress, [0.48, 0.53, 0.62, 0.68], [0, 1, 1, 0]);
  const s3Y  = useTransform(scrollYProgress, [0.48, 0.53, 0.62, 0.68], [44, 0, 0, -44]);
  const s4Op = useTransform(scrollYProgress, [0.73, 0.78, 0.87, 0.93], [0, 1, 1, 0]);
  const s4Y  = useTransform(scrollYProgress, [0.73, 0.78, 0.87, 0.93], [44, 0, 0, -44]);
  const indOp = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  /* ── Render ──────────────────────────── */
  return (
    <div ref={sectionRef} style={{ height: "500vh" }}>
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          aria-label="ClaimCheck cinematic sequence"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "block" }}
        />

        {/* Radial vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(9,9,11,0.65) 100%)",
        }} />

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 180,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent, #09090B)",
        }} />

        {/* ═══ S1 — ClaimCheck ═══ */}
        <motion.div style={{ opacity: s1Op, y: s1Y, position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", zIndex: 10, pointerEvents: "none", padding: "0 24px" }}>
          <span className="tag-pill" style={{ marginBottom: 20 }}>🏆 Hackathon Winner</span>
          <h1 style={{ fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            background: "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.55) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Claim
            <span style={{ background: "linear-gradient(135deg,#7dd3fc,#0ea5e9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Check</span>
            <span style={{ WebkitTextFillColor: "#0ea5e9" }}>.</span>
          </h1>
          <p style={{ marginTop: 24, fontWeight: 500, letterSpacing: "0.24em",
            fontSize: "clamp(0.6rem,1.4vw,.82rem)", color: "rgba(255,255,255,.4)", textTransform: "uppercase" }}>
            AI-Powered Post-Purchase Claim Integrity
          </p>
        </motion.div>

        {/* ═══ S2 — 4.2 stars ═══ */}
        <motion.div style={{ opacity: s2Op, y: s2Y, position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center",
          zIndex: 10, pointerEvents: "none", padding: "0 clamp(32px,8vw,128px)" }}>
          <h2 style={{ fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em",
            fontSize: "clamp(2rem,5.5vw,5.5rem)",
            background: "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.55) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            4.2 stars<br />
            <span style={{ WebkitTextFillColor: "#38bdf8" }}>hides </span>
            <span style={{ WebkitTextFillColor: "rgba(255,255,255,.7)" }}>the truth.</span>
          </h2>
          <div style={{ marginTop: 20, height: 1, width: 80, background: "linear-gradient(90deg,#0ea5e9,transparent)" }} />
          <p style={{ marginTop: 20, fontWeight: 300, lineHeight: 1.7, maxWidth: "38ch",
            fontSize: "clamp(.85rem,1.5vw,1rem)", color: "rgba(255,255,255,.42)" }}>
            We don&apos;t just aggregate noise. We find the exact feature failing before it destroys your brand.
          </p>
        </motion.div>

        {/* ═══ S3 — CIS ═══ */}
        <motion.div style={{ opacity: s3Op, y: s3Y, position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center",
          textAlign: "right", zIndex: 10, pointerEvents: "none", padding: "0 clamp(32px,8vw,128px)" }}>
          <h2 style={{ fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.03em",
            fontSize: "clamp(1.8rem,5vw,5rem)",
            background: "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.55) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            The Claim<br />
            <span style={{ background: "linear-gradient(135deg,#7dd3fc,#0ea5e9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Integrity Score</span><br />
            <span style={{ WebkitTextFillColor: "rgba(255,255,255,.3)", fontSize: ".55em" }}>(CIS).</span>
          </h2>
          <div style={{ marginTop: 20, height: 1, width: 80, background: "linear-gradient(90deg,transparent,#0ea5e9)" }} />
          <p style={{ marginTop: 20, fontWeight: 300, lineHeight: 1.7, maxWidth: "38ch",
            fontSize: "clamp(.85rem,1.5vw,1rem)", color: "rgba(255,255,255,.42)" }}>
            Real-time tracking of noise, power, and durability.{" "}
            <span style={{ color: "#38bdf8" }}>Reality vs. Promise.</span>
          </p>
        </motion.div>

        {/* ═══ S4 — Stop flying blind ═══ */}
        <motion.div style={{ opacity: s4Op, y: s4Y, position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", zIndex: 10, pointerEvents: "none", padding: "0 24px" }}>
          <h2 style={{ fontWeight: 900, lineHeight: 0.93, letterSpacing: "-0.04em",
            fontSize: "clamp(3rem,8vw,8rem)",
            background: "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.55) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Stop flying<br />blind.
          </h2>
          <div style={{ marginTop: 28, height: 1, width: 128, background: "linear-gradient(90deg,transparent,#0ea5e9,transparent)" }} />
          <p style={{ marginTop: 24, fontWeight: 300,
            fontSize: "clamp(.9rem,1.8vw,1.1rem)", color: "rgba(255,255,255,.42)" }}>
            Catch manufacturing defects on{" "}
            <span style={{ color: "#7dd3fc", fontWeight: 600 }}>Day 2</span>, not Day 20.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div style={{ opacity: indOp, position: "absolute", bottom: 32,
          left: "50%", x: "-50%", display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, zIndex: 10, pointerEvents: "none" }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,.28)",
            letterSpacing: "0.22em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, overflow: "hidden",
            background: "rgba(255,255,255,.08)", position: "relative" }}>
            <motion.div
              style={{ width: "100%", height: "100%",
                background: "linear-gradient(to bottom,transparent,#0ea5e9)" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}

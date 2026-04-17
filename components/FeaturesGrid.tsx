"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  accent?: string;
  span?: "normal" | "wide" | "tall";
}

function BentoCard({
  children,
  className = "",
  delay = 0,
  accent = "rgba(14,165,233,0.15)",
  span = "normal",
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const spanClass =
    span === "wide"
      ? "md:col-span-2"
      : span === "tall"
      ? "md:row-span-2"
      : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl p-6 ${spanClass} ${className}`}
      style={{
        background: "rgba(255,255,255,0.018)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      whileHover={{
        borderColor: "rgba(14,165,233,0.2)",
        boxShadow: `0 0 60px ${accent}, 0 0 120px rgba(14,165,233,0.04)`,
        y: -3,
        transition: { duration: 0.25 },
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${accent}, transparent 70%)`,
          opacity: 0.5,
        }}
      />
      {children}
    </motion.div>
  );
}

interface TagProps {
  children: React.ReactNode;
  color?: string;
}

function Tag({ children, color = "#0ea5e9" }: TagProps) {
  return (
    <span
      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono font-medium"
      style={{
        background: `${color}18`,
        border: `1px solid ${color}35`,
        color: color,
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </span>
  );
}

function LayerItem({ label, sub }: { label: string; sub?: string }) {
  return (
    <div
      className="flex items-start gap-3 py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
        style={{ background: "#0ea5e9", boxShadow: "0 0 6px #0ea5e9" }}
      />
      <div>
        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
          {label}
        </p>
        {sub && (
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

function MetricBadge({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-xl"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <span
        className="text-2xl font-black gradient-text-brand"
        style={{ letterSpacing: "-0.02em" }}
      >
        {value}
      </span>
      <span className="text-xs mt-1 font-medium" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>
        {label}
      </span>
    </div>
  );
}

export default function FeaturesGrid() {
  return (
    <section className="relative w-full px-4 md:px-8 lg:px-16 py-24 md:py-36">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="tag-pill">System Architecture</span>
          <h2
            className="mt-4 font-black gradient-text"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            Built for signal,
            <br />
            <span className="gradient-text-brand">not noise.</span>
          </h2>
          <p
            className="mt-4 max-w-lg"
            style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", lineHeight: 1.7 }}
          >
            Every layer of ClaimCheck&apos;s stack is precision-engineered to
            surface the truth buried inside star ratings.
          </p>
        </motion.div>
      </div>

      {/* Bento grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

        {/* Card 1: Pipeline Layer — wide */}
        <BentoCard delay={0.0} span="wide" accent="rgba(14,165,233,0.12)">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(14,165,233,0.7)" }}>
                Layer 01
              </p>
              <h3
                className="mt-1 text-xl font-bold gradient-text"
                style={{ letterSpacing: "-0.02em" }}
              >
                Pipeline Layer
              </h3>
            </div>
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[
              { name: "Preprocessor", desc: "Cleans & normalises raw review text at ingestion" },
              { name: "Bot Detector", desc: "ML-based anomaly scoring on reviewer patterns" },
              { name: "Cohort Assigner", desc: "Groups reviews by verified purchaser segments" },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Tag>{item.name}</Tag>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Card 2: NLP Engine */}
        <BentoCard delay={0.1} accent="rgba(139,92,246,0.15)">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(139,92,246,0.7)" }}>
              Layer 02
            </p>
            <h3
              className="mt-1 text-xl font-bold gradient-text"
              style={{ letterSpacing: "-0.02em" }}
            >
              NLP Engine
            </h3>
          </div>

          <LayerItem
            label="Multilingual BERT"
            sub="Fine-tuned on 18 product categories across 8 languages"
          />
          <LayerItem
            label="Sarcasm Detection"
            sub="Transformer + rule-hybrid to catch inverted sentiment"
          />

          <div className="mt-5 flex gap-2 flex-wrap">
            <Tag color="#8b5cf6">BERT-base</Tag>
            <Tag color="#8b5cf6">Multilingual</Tag>
            <Tag color="#8b5cf6">Sarcasm Aware</Tag>
          </div>
        </BentoCard>

        {/* Card 3: Analysis Engine */}
        <BentoCard delay={0.15} accent="rgba(245,158,11,0.12)">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(245,158,11,0.7)" }}>
              Layer 03
            </p>
            <h3
              className="mt-1 text-xl font-bold gradient-text"
              style={{ letterSpacing: "-0.02em" }}
            >
              Analysis Engine
            </h3>
          </div>

          <LayerItem
            label="ARIMA Decay Engine"
            sub="Detects temporal CIS degradation before it trends publicly"
          />
          <LayerItem
            label="DBSCAN Complaint Clustering"
            sub="Unsupervised grouping of defect complaints by feature axis"
          />

          <div className="mt-5 flex gap-2 flex-wrap">
            <Tag color="#f59e0b">ARIMA</Tag>
            <Tag color="#f59e0b">DBSCAN</Tag>
            <Tag color="#f59e0b">Time-Series</Tag>
          </div>
        </BentoCard>

        {/* Card 4: The Dashboard — wide */}
        <BentoCard delay={0.2} span="wide" accent="rgba(16,185,129,0.12)">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(16,185,129,0.7)" }}>
                Layer 04
              </p>
              <h3
                className="mt-1 text-xl font-bold gradient-text"
                style={{ letterSpacing: "-0.02em" }}
              >
                The Dashboard
              </h3>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                Time-series decay detection — live CIS monitoring
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <MetricBadge value="3.8→2.1" label="CIS Decay" />
            <MetricBadge value="Day 2" label="Alert Trigger" />
            <MetricBadge value="94%" label="Accuracy" />
            <MetricBadge value="18 langs" label="Coverage" />
          </div>

          {/* Fake sparkline chart */}
          <div
            className="w-full h-20 rounded-xl overflow-hidden relative"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <svg
              viewBox="0 0 400 80"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d="M0 20 C50 18, 100 15, 150 14 C200 13, 220 16, 250 28 C280 40, 300 55, 340 65 C360 68, 390 70, 400 72 L400 80 L0 80 Z"
                fill="url(#areaGrad)"
              />
              {/* Line */}
              <path
                d="M0 20 C50 18, 100 15, 150 14 C200 13, 220 16, 250 28 C280 40, 300 55, 340 65 C360 68, 390 70, 400 72"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2"
              />
              {/* Alert dot */}
              <circle cx="250" cy="28" r="4" fill="#ef4444" />
              <circle cx="250" cy="28" r="8" fill="#ef4444" fillOpacity="0.2" />
            </svg>
            <div
              className="absolute top-2 right-3 text-xs font-mono"
              style={{ color: "rgba(239,68,68,0.8)" }}
            >
              ⚠ DECAY DETECTED
            </div>
          </div>
        </BentoCard>

        {/* Stat card */}
        <BentoCard delay={0.25} accent="rgba(14,165,233,0.1)">
          <div className="h-full flex flex-col justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              Claim Integrity Score
            </p>
            <div className="flex flex-col items-center justify-center flex-1 py-6">
              <div
                className="text-7xl font-black gradient-text-brand"
                style={{ letterSpacing: "-0.04em", lineHeight: 1 }}
              >
                CIS
              </div>
              <p className="mt-3 text-xs text-center" style={{ color: "rgba(255,255,255,0.3)", maxWidth: "24ch", lineHeight: 1.6 }}>
                A composite score quantifying the gap between product claims and verified reality.
              </p>
            </div>
            <div className="glow-line w-full" />
          </div>
        </BentoCard>
      </div>

      {/* ── Workflow Card — full width ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto mt-4"
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.018)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 0 0 1px rgba(14,165,233,0.06), 0 0 80px rgba(14,165,233,0.05), 0 32px 80px rgba(0,0,0,0.4)",
          }}
        >
          {/* Top-right cyan glow accent */}
          <div
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(14,165,233,0.12), transparent 70%)",
            }}
          />
          {/* Bottom-left subtle glow */}
          <div
            className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at bottom left, rgba(14,165,233,0.06), transparent 70%)",
            }}
          />

          {/* Card header */}
          <div className="px-8 pt-8 pb-6 flex items-start justify-between gap-6">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(14,165,233,0.7)" }}
              >
                End-to-End
              </p>
              <h3
                className="mt-1 font-bold gradient-text"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                System Workflow
              </h3>
              <p
                className="mt-2 text-sm"
                style={{ color: "rgba(255,255,255,0.35)", maxWidth: "52ch", lineHeight: 1.6 }}
              >
                From raw review ingestion through the NLP pipeline to the live
                Claim Integrity Score dashboard — every stage visualised.
              </p>
            </div>
            <div className="flex-shrink-0">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(14,165,233,0.08)",
                  border: "1px solid rgba(14,165,233,0.2)",
                  color: "#7dd3fc",
                  letterSpacing: "0.04em",
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "#10b981", boxShadow: "0 0 5px #10b981" }}
                />
                Live Pipeline
              </span>
            </div>
          </div>

          {/* Separator line */}
          <div
            className="mx-8"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(14,165,233,0.3), rgba(255,255,255,0.06), transparent)",
            }}
          />

          {/* Workflow image */}
          <div className="p-4 md:p-6">
            <div
              className="relative w-full overflow-hidden rounded-xl"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(0,0,0,0.25)",
              }}
            >
              <Image
                src="/workflow.jpeg"
                alt="ClaimCheck system workflow diagram"
                width={1600}
                height={900}
                className="w-full h-auto"
                style={{ display: "block" }}
                priority
              />
            </div>
          </div>

        </div>
      </motion.div>

    </section>
  );
}

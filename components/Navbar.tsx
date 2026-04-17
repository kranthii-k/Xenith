"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.92]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop — fades in as user scrolls */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: bgOpacity,
          background: "rgba(9,9,11,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      />

      <nav className="relative max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #38bdf8, #0284c7)",
              boxShadow: "0 0 14px rgba(14,165,233,0.5)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6L4.8 9L10 3"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="font-bold text-sm"
            style={{ letterSpacing: "-0.025em", color: "rgba(255,255,255,0.92)" }}
          >
            Xenon<span style={{ color: "#38bdf8" }}> AI</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-7">
          {["Architecture", "CIS Score", "Dashboard", "Research"].map((item) => (
            <button
              key={item}
              className="text-xs font-medium transition-colors duration-200 hover:text-white/85"
              style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.01em", background: "none", border: "none", cursor: "pointer" }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* CTA button */}
        <motion.button
          className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold"
          style={{
            background: "rgba(14,165,233,0.1)",
            border: "1px solid rgba(14,165,233,0.25)",
            color: "#7dd3fc",
            cursor: "pointer",
          }}
          whileHover={{
            background: "rgba(14,165,233,0.18)",
            borderColor: "rgba(14,165,233,0.5)",
            boxShadow: "0 0 24px rgba(14,165,233,0.22)",
          }}
          whileTap={{ scale: 0.96 }}
        >
          Request Access
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </nav>
    </header>
  );
}

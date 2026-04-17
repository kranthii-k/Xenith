"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      {/* Glow top border */}
      <div className="glow-line absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  boxShadow: "0 0 12px rgba(14,165,233,0.35)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-bold" style={{ letterSpacing: "-0.02em" }}>
                Xenon<span style={{ color: "#0ea5e9" }}> AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.3)", maxWidth: "28ch" }}>
              AI-powered post-purchase claim integrity monitoring. Built at the intersection of NLP and trust.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.2)" }}>
                Product
              </p>
              {["CIS Score", "Dashboard", "Integrations", "Pricing"].map((l) => (
                <p key={l} className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{l}</p>
              ))}
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.2)" }}>
                Company
              </p>
              {["Research", "Team", "Blog", "Contact"].map((l) => (
                <p key={l} className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{l}</p>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.2)" }}>
              Stay Updated
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 px-3 py-2 rounded-lg text-sm bg-transparent outline-none"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                  background: "rgba(255,255,255,0.03)",
                }}
              />
              <motion.button
                className="px-3 py-2 rounded-lg text-xs font-semibold"
                style={{
                  background: "rgba(14,165,233,0.15)",
                  border: "1px solid rgba(14,165,233,0.3)",
                  color: "#7dd3fc",
                }}
                whileHover={{ background: "rgba(14,165,233,0.25)" }}
                whileTap={{ scale: 0.97 }}
              >
                →
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" }}
        >
          <p>© 2025 Xenon AI. All rights reserved.</p>
          <div className="flex gap-1 items-center">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "#10b981", boxShadow: "0 0 4px #10b981" }}
            />
            <span>Systems operational</span>
          </div>
          <p>Built with precision. Shipped with purpose.</p>
        </div>
      </div>
    </footer>
  );
}

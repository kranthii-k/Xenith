import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xenon AI — AI-Powered Post-Purchase Claim Integrity Monitor",
  description:
    "Xenon AI's Claim Integrity Score (CIS) tracks real-time noise, power, and durability metrics — catching manufacturing defects before they destroy your brand.",
  keywords: ["Xenon AI", "AI", "claim integrity", "post-purchase", "review monitoring", "NLP", "BERT"],
  openGraph: {
    title: "Xenon AI — Stop Flying Blind on Product Claims",
    description: "Real-time AI monitoring of post-purchase claim integrity. Catch defects on Day 2, not Day 20.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

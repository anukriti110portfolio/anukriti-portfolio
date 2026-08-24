import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About — Anukriti Tripathi",
  description: "About Anukriti Tripathi, designer working across digital and physical products.",
};

export default function AboutPage() {
  return (
    <main className="wrap page">
      <SectionHeader id="about-title" kicker="Arrives in Phase 12" title="About" />
      <p>An editorial introduction, philosophy, education, and interests.</p>
    </main>
  );
}

import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Work — Anukriti Tripathi",
  description: "Selected case studies across digital and physical product design.",
};

export default function WorkPage() {
  return (
    <main className="wrap page">
      <SectionHeader
        id="work-title"
        kicker="Arrives in Phases 07–08"
        title="Work"
      />
      <p>
        Selected case studies across UX, digital product design, physical
        product design, and research.
      </p>
    </main>
  );
}

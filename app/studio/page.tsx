import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Studio — Anukriti Tripathi",
  description: "A visual archive of experiments, process, and explorations.",
};

export default function StudioPage() {
  return (
    <main className="wrap page">
      <SectionHeader
        id="studio-title"
        kicker="Arrives in Phase 11"
        title="Studio"
      />
      <p>
        A visual archive — branding experiments, visual studies, and process
        work.
      </p>
    </main>
  );
}

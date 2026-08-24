import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Field Notes — Anukriti Tripathi",
  description: "Notes on design, human behaviour, research, and visual culture.",
};

export default function FieldNotesPage() {
  return (
    <main className="wrap page">
      <SectionHeader
        id="field-notes-title"
        kicker="Arrives in Phase 10"
        title="Field Notes"
      />
      <p>
        Writing on design, human behaviour, research, technology, and visual
        culture.
      </p>
    </main>
  );
}

import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Playground — Anukriti Tripathi",
  description: "A living archive of design experiments and skills in action.",
};

export default function PlaygroundPage() {
  return (
    <main className="wrap page">
      <SectionHeader
        id="playground-title"
        kicker="Arrives in Phase 09"
        title="Playground"
      />
      <p>
        A living proof-of-skills archive — interaction, motion, typography,
        code, and physical experiments.
      </p>
    </main>
  );
}

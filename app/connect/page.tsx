import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Connect — Anukriti Tripathi",
  description: "Start a conversation with Anukriti Tripathi.",
};

export default function ConnectPage() {
  return (
    <main className="wrap page">
      <SectionHeader
        id="connect-title"
        kicker="Arrives in Phase 13"
        title="Connect"
      />
      <p>An invitation to start a conversation.</p>
    </main>
  );
}

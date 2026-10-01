import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssessmentEngine from "@/components/AssessmentEngine";
import { projectMeta } from "@/data/saptanga";

export const metadata = {
  title: `Cybersecurity Assessment — ${projectMeta.title}`,
  description: "Evaluate your organization's security posture across Kautilya's 7 Saptanga limbs.",
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-main">
      <Navbar />

      <main className="flex-grow py-8 sm:py-12 subtle-grid relative">
        <AssessmentEngine />
      </main>

      <Footer />
    </div>
  );
}

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

      <main className="flex-grow py-6 sm:py-10 subtle-grid relative w-full">
        <div className="max-w-7xl lg:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <AssessmentEngine />
        </div>
      </main>

      <Footer />
    </div>
  );
}

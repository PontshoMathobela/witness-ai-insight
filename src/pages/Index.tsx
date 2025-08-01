import { useState } from "react";
import Navigation from "@/components/Navigation";
import JusticeHero from "@/components/JusticeHero";
import LiveTranscriptionPanel from "@/components/LiveTranscriptionPanel";
import ProfessionalAnalysisResults from "@/components/ProfessionalAnalysisResults";
import CaseHistory from "@/components/CaseHistory";

const Index = () => {
  const [analysisData, setAnalysisData] = useState<{
    statement: string;
    caseId: string;
    duration: number;
  } | null>(null);

  const handleAnalysis = (
    transcription: string,
    duration: number,
    statementId: string
  ) => {
    setAnalysisData({
      statement: transcription,
      caseId: statementId,
      duration,
    });

    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.querySelector("[data-analysis-results]");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <JusticeHero />
      <LiveTranscriptionPanel onAnalysis={handleAnalysis} />

      {analysisData && (
        <div data-analysis-results>
          <ProfessionalAnalysisResults
            statement={analysisData.statement}
            caseId={analysisData.caseId}
            duration={analysisData.duration}
          />
        </div>
      )}

      <CaseHistory />
    </div>
  );
};

export default Index;

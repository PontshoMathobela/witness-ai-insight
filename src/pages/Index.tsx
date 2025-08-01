import { useState } from "react";
import Hero from "@/components/Hero";
import RecordingSession from "@/components/RecordingSession";
import LiveAnalysis from "@/components/LiveAnalysis";
import AnalysisResults from "@/components/AnalysisResults";
import SDGSection from "@/components/SDGSection";

const Index = () => {
  const [liveAnalysisData, setLiveAnalysisData] = useState<{
    transcription: string;
    duration: number;
  } | null>(null);
  const [finalAnalysisData, setFinalAnalysisData] = useState<{
    statement: string;
    caseId: string;
  } | null>(null);

  const handleLiveAnalysis = (
    transcription: string,
    duration: number,
    statementId: string
  ) => {
    setLiveAnalysisData({ transcription, duration });

    // Set final analysis data for completed recording
    setFinalAnalysisData({
      statement: transcription,
      caseId: statementId,
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
    <div className="min-h-screen">
      <Hero />
      <RecordingSession onAnalysis={handleLiveAnalysis} />

      {liveAnalysisData && (
        <LiveAnalysis
          transcription={liveAnalysisData.transcription}
          duration={liveAnalysisData.duration}
          isLive={false}
        />
      )}

      {finalAnalysisData && (
        <div data-analysis-results>
          <AnalysisResults
            statement={finalAnalysisData.statement}
            caseId={finalAnalysisData.caseId}
          />
        </div>
      )}

      <SDGSection />
    </div>
  );
};

export default Index;

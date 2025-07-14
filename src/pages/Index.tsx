import { useState } from "react";
import Hero from "@/components/Hero";
import AnalysisForm from "@/components/AnalysisForm";
import AnalysisResults from "@/components/AnalysisResults";
import SDGSection from "@/components/SDGSection";

const Index = () => {
  const [analysisData, setAnalysisData] = useState<{
    statement: string;
    caseId: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (statement: string, caseId: string) => {
    setIsAnalyzing(true);
    
    // Simulate analysis processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalysisData({ statement, caseId });
    setIsAnalyzing(false);
    
    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.querySelector('[data-results]');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <AnalysisForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      {analysisData && (
        <div data-results>
          <AnalysisResults 
            statement={analysisData.statement} 
            caseId={analysisData.caseId} 
          />
        </div>
      )}
      <SDGSection />
    </div>
  );
};

export default Index;

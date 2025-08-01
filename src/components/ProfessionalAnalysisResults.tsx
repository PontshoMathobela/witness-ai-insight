import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  Flag,
  BarChart3,
  Eye
} from "lucide-react";

interface ProfessionalAnalysisResultsProps {
  statement: string;
  caseId: string;
  duration: number;
}

const ProfessionalAnalysisResults = ({ statement, caseId, duration }: ProfessionalAnalysisResultsProps) => {
  // Mock analysis data - in real app this would come from AI analysis
  const analysisData = {
    confidence: 87,
    reliability: 92,
    consistency: 89,
    biasLevel: 15,
    flaggedTerms: ["approximately", "I think", "maybe"],
    insights: [
      "High coherence in timeline presentation",
      "Consistent emotional tone throughout",
      "Minimal hedging language detected",
    ],
    risks: [
      "Some uncertainty indicators present",
      "Temporal specificity could be improved"
    ]
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getConfidenceLabel = (score: number) => {
    if (score >= 85) return "High Confidence";
    if (score >= 70) return "Moderate Confidence";
    if (score >= 50) return "Low Confidence";
    return "Very Low Confidence";
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Analysis Results</h2>
            <p className="text-muted-foreground">Professional statement credibility assessment</p>
          </div>

          {/* Summary Card */}
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Case Analysis Summary</CardTitle>
                  <CardDescription className="flex items-center space-x-4 mt-2">
                    <span>Case ID: <span className="font-mono font-medium text-foreground">{caseId}</span></span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      Duration: {formatDuration(duration)}
                    </span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getConfidenceColor(analysisData.confidence)}`}>
                    {analysisData.confidence}%
                  </div>
                  <Badge 
                    variant={analysisData.confidence >= 80 ? "default" : analysisData.confidence >= 60 ? "secondary" : "destructive"}
                    className="mt-1"
                  >
                    {getConfidenceLabel(analysisData.confidence)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Metrics */}
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    <span>Credibility Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Reliability</span>
                      <span className={`text-sm font-bold ${getConfidenceColor(analysisData.reliability)}`}>
                        {analysisData.reliability}%
                      </span>
                    </div>
                    <Progress value={analysisData.reliability} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Statement Consistency</span>
                      <span className={`text-sm font-bold ${getConfidenceColor(analysisData.consistency)}`}>
                        {analysisData.consistency}%
                      </span>
                    </div>
                    <Progress value={analysisData.consistency} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Bias Indicators</span>
                      <span className={`text-sm font-bold ${analysisData.biasLevel < 20 ? 'text-success' : 'text-warning'}`}>
                        {analysisData.biasLevel}%
                      </span>
                    </div>
                    <Progress value={100 - analysisData.biasLevel} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Flag className="w-5 h-5 text-warning" />
                    <span>Flagged Terms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisData.flaggedTerms.map((term, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                        <span className="font-medium text-warning">"{term}"</span>
                        <Badge variant="outline" className="text-xs">Uncertainty</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights & Statement */}
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-accent" />
                    <span>Key Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisData.insights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-success-foreground">{insight}</span>
                      </div>
                    ))}
                    
                    {analysisData.risks.map((risk, index) => (
                      <div key={`risk-${index}`} className="flex items-start space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                        <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-warning-foreground">{risk}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-accent" />
                      <span>Full Statement</span>
                    </CardTitle>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="max-h-64 overflow-y-auto p-4 bg-muted/30 rounded-lg border">
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {statement}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalAnalysisResults;
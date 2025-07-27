import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, Clock, FileText, Zap, Loader2, Scale, Brain, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResultsProps {
  statement: string;
  caseId: string;
}

const AnalysisResults = ({ statement, caseId }: AnalysisResultsProps) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        setLoading(true);
        
        // Call the AI analysis function
        const { data, error } = await supabase.functions.invoke('analyze-statement', {
          body: { statementId: caseId }
        });

        if (error) {
          throw error;
        }

        if (data.success) {
          setAnalysis(data.results);
          toast({
            title: "Analysis Complete",
            description: "Statement has been successfully analyzed.",
          });
        } else {
          throw new Error(data.error || 'Analysis failed');
        }
      } catch (error) {
        console.error('Analysis error:', error);
        toast({
          title: "Analysis Failed",
          description: "There was an error analyzing the statement. Showing sample data.",
          variant: "destructive",
        });
        
        // Fallback to mock data
        const wordCount = statement.split(' ').length;
        setAnalysis({
          cbca_score: Math.max(65, Math.min(95, 75 + (wordCount / 10))),
          rm_score: Math.max(60, Math.min(90, 70 + (statement.length / 50))),
          overall_credibility: Math.max(60, Math.min(90, 72 + (wordCount / 15))),
          cbca_details: {
            strengths: ["Logical structure present", "Adequate detail level"],
            concerns: ["Some temporal inconsistencies"],
            notable_criteria: ["Contextual embeddings", "Superfluous details"]
          },
          rm_details: {
            clarity_score: 78,
            detail_richness: 85,
            emotional_coherence: 72
          },
          detected_inconsistencies: [
            {
              type: "Temporal",
              description: "Timeline inconsistency detected between events",
              severity: "medium"
            }
          ],
          emotional_indicators: {
            stress_markers: ["Hesitation patterns", "Voice tremor"],
            deception_indicators: [],
            authenticity_markers: ["Emotional coherence", "Natural flow"]
          }
        });
      } finally {
        setLoading(false);
      }
    };

    runAnalysis();
  }, [caseId, statement]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Analyzing statement with AI...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <span>No analysis data available</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  const wordCount = statement.split(' ').length;

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <section className="py-12 bg-muted/30" data-analysis-results>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">AI Analysis Results</h2>
            <p className="text-muted-foreground">Case ID: {caseId}</p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Scale className="w-5 h-5" />
                  Overall Credibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  {getScoreIcon(analysis.overall_credibility)}
                  <div>
                    <h3 className="font-semibold">Overall Credibility</h3>
                    <p className={`text-2xl font-bold ${getScoreColor(analysis.overall_credibility)}`}>
                      {analysis.overall_credibility.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <Progress value={analysis.overall_credibility} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="w-5 h-5" />
                  CBCA Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  {getScoreIcon(analysis.cbca_score)}
                  <div>
                    <h3 className="font-semibold">CBCA Score</h3>
                    <p className={`text-2xl font-bold ${getScoreColor(analysis.cbca_score)}`}>
                      {analysis.cbca_score.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <Progress value={analysis.cbca_score} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5" />
                  Reality Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  {getScoreIcon(analysis.rm_score)}
                  <div>
                    <h3 className="font-semibold">Reality Monitoring</h3>
                    <p className={`text-2xl font-bold ${getScoreColor(analysis.rm_score)}`}>
                      {analysis.rm_score.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <Progress value={analysis.rm_score} className="mt-3" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Detected Inconsistencies
                </CardTitle>
                <CardDescription>
                  Potential contradictions or logical gaps identified by AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.detected_inconsistencies.map((inconsistency: any, index: number) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{inconsistency.type}</span>
                          <Badge variant={
                            inconsistency.severity === 'high' ? 'destructive' : 
                            inconsistency.severity === 'medium' ? 'default' : 
                            'secondary'
                          }>
                            {inconsistency.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{inconsistency.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  Emotional Indicators
                </CardTitle>
                <CardDescription>
                  Psychological and emotional markers detected in the statement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Authenticity Markers</h4>
                    <ul className="space-y-1">
                      {analysis.emotional_indicators.authenticity_markers.map((marker: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{marker}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {analysis.emotional_indicators.stress_markers.length > 0 && (
                    <div>
                      <h4 className="font-medium text-yellow-600 mb-2">Stress Markers</h4>
                      <ul className="space-y-1">
                        {analysis.emotional_indicators.stress_markers.map((marker: string, index: number) => (
                          <li key={index} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{marker}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {analysis.emotional_indicators.deception_indicators.length > 0 && (
                    <div>
                      <h4 className="font-medium text-red-600 mb-2">Deception Indicators</h4>
                      <ul className="space-y-1">
                        {analysis.emotional_indicators.deception_indicators.map((indicator: string, index: number) => (
                          <li key={index} className="flex items-center space-x-2 p-2 bg-red-50 rounded">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="text-sm">{indicator}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary and Detailed Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Analysis Summary
              </CardTitle>
              <CardDescription>
                Comprehensive breakdown of the statement analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Word Count</p>
                  <p className="text-lg font-semibold">{wordCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">CBCA Details</p>
                  <p className="text-lg font-semibold">{analysis.cbca_details.strengths.length} strengths</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">RM Clarity</p>
                  <p className="text-lg font-semibold">{analysis.rm_details.clarity_score}%</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Analysis Summary</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>CBCA Strengths:</strong>
                    <ul className="ml-4 mt-1">
                      {analysis.cbca_details.strengths.map((strength: string, index: number) => (
                        <li key={index}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Areas of Concern:</strong>
                    <ul className="ml-4 mt-1">
                      {analysis.cbca_details.concerns.map((concern: string, index: number) => (
                        <li key={index}>• {concern}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AnalysisResults;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Info, Scale, Brain, Target, TrendingUp, TrendingDown } from "lucide-react";

interface AnalysisResultsProps {
  statement: string;
  caseId: string;
}

const AnalysisResults = ({ statement, caseId }: AnalysisResultsProps) => {
  // Mock analysis results based on the statement
  const wordCount = statement.split(' ').length;
  const reliability = Math.max(60, Math.min(95, 70 + (wordCount / 20)));
  const consistencyScore = Math.max(65, Math.min(90, 75 + (statement.length / 100)));
  const biasLevel = Math.max(5, Math.min(40, 25 - (statement.length / 200)));

  const inconsistencies = [
    "Temporal sequence discrepancy at lines 3-5",
    "Location reference ambiguity in paragraph 2"
  ];

  const biasIndicators = biasLevel > 20 ? [
    "Emotional language detected in 3 instances",
    "Potential confirmation bias in witness perspective"
  ] : [
    "Minimal bias indicators detected"
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-success" />;
    if (score >= 60) return <Info className="w-4 h-4 text-warning" />;
    return <AlertTriangle className="w-4 h-4 text-destructive" />;
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Analysis Results</h2>
            <p className="text-muted-foreground">Case ID: {caseId}</p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Scale className="w-5 h-5" />
                  Overall Reliability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  {getScoreIcon(reliability)}
                  <span className={`text-3xl font-bold ${getScoreColor(reliability)}`}>
                    {reliability.toFixed(1)}%
                  </span>
                </div>
                <Progress value={reliability} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="w-5 h-5" />
                  Consistency Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  {getScoreIcon(consistencyScore)}
                  <span className={`text-3xl font-bold ${getScoreColor(consistencyScore)}`}>
                    {consistencyScore.toFixed(1)}%
                  </span>
                </div>
                <Progress value={consistencyScore} className="mt-3" />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5" />
                  Bias Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  {biasLevel < 20 ? <CheckCircle className="w-4 h-4 text-success" /> : <AlertTriangle className="w-4 h-4 text-warning" />}
                  <span className={`text-3xl font-bold ${biasLevel < 20 ? 'text-success' : 'text-warning'}`}>
                    {biasLevel.toFixed(1)}%
                  </span>
                </div>
                <Progress value={100 - biasLevel} className="mt-3" />
                <p className="text-xs text-muted-foreground mt-1">
                  {biasLevel < 20 ? 'Low bias detected' : 'Moderate bias detected'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                  Inconsistencies Detected
                </CardTitle>
                <CardDescription>
                  Potential contradictions or logical gaps in the statement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inconsistencies.map((issue, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                      <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-warning" />
                  Bias Indicators
                </CardTitle>
                <CardDescription>
                  Potential cognitive biases or prejudicial language patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {biasIndicators.map((bias, index) => (
                    <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${
                      biasLevel < 20 
                        ? 'bg-success/5 border-success/20' 
                        : 'bg-warning/5 border-warning/20'
                    }`}>
                      {biasLevel < 20 ? (
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      ) : (
                        <Info className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                      )}
                      <span className="text-sm">{bias}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary and Recommendations */}
          <Card className="mt-6 shadow-card">
            <CardHeader>
              <CardTitle>Summary & Recommendations</CardTitle>
              <CardDescription>
                AI-generated insights and suggested follow-up actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Key Findings</h4>
                  <p className="text-sm text-muted-foreground">
                    The witness statement shows {reliability >= 80 ? 'high' : reliability >= 60 ? 'moderate' : 'low'} overall reliability 
                    with {consistencyScore >= 80 ? 'strong' : 'adequate'} internal consistency. 
                    {biasLevel < 20 ? ' Minimal bias indicators suggest objective testimony.' : ' Some bias indicators warrant further review.'}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Word Count: {wordCount}</Badge>
                  <Badge variant="outline">Processing Time: 2.3s</Badge>
                  <Badge variant="outline">Confidence: 94%</Badge>
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
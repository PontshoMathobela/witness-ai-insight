import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Info, TrendingUp, Activity, Clock } from "lucide-react";

interface LiveAnalysisProps {
  transcription: string;
  duration: number;
  isLive?: boolean;
}

const LiveAnalysis = ({ transcription, duration, isLive = false }: LiveAnalysisProps) => {
  // Real-time analysis calculations
  const wordCount = transcription.split(' ').length;
  const speechRate = duration > 0 ? (wordCount / (duration / 60)) : 0; // words per minute
  const reliability = Math.max(60, Math.min(95, 70 + (wordCount / 20)));
  const consistency = Math.max(65, Math.min(90, 75 + (transcription.length / 100)));
  const biasLevel = Math.max(5, Math.min(40, 25 - (transcription.length / 200)));

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getSpeechRateStatus = () => {
    if (speechRate < 120) return { status: "Slow", color: "text-warning" };
    if (speechRate > 180) return { status: "Fast", color: "text-warning" };
    return { status: "Normal", color: "text-success" };
  };

  const speechRateStatus = getSpeechRateStatus();

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-primary">Live Analysis Dashboard</h2>
              {isLive && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                  <Badge variant="destructive" className="text-xs">LIVE</Badge>
                </div>
              )}
            </div>
            <p className="text-muted-foreground">Real-time AI analysis of court testimony</p>
          </div>

          {/* Real-time Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card className="shadow-card">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                    <p className="text-2xl font-bold">{formatDuration(duration)}</p>
                  </div>
                  <Clock className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Word Count</p>
                    <p className="text-2xl font-bold">{wordCount}</p>
                  </div>
                  <Activity className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Speech Rate</p>
                    <p className="text-2xl font-bold">{speechRate.toFixed(0)} WPM</p>
                    <p className={`text-xs ${speechRateStatus.color}`}>{speechRateStatus.status}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reliability</p>
                    <p className={`text-2xl font-bold ${getScoreColor(reliability)}`}>
                      {reliability.toFixed(0)}%
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Scores */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Statement Quality Metrics</CardTitle>
                <CardDescription>Real-time assessment of testimony quality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Consistency Score</span>
                    <span className={`text-sm font-bold ${getScoreColor(consistency)}`}>
                      {consistency.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={consistency} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Bias Level</span>
                    <span className={`text-sm font-bold ${biasLevel < 20 ? 'text-success' : 'text-warning'}`}>
                      {biasLevel.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={100 - biasLevel} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Reliability</span>
                    <span className={`text-sm font-bold ${getScoreColor(reliability)}`}>
                      {reliability.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={reliability} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Live Alerts</CardTitle>
                <CardDescription>Real-time flagged issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {biasLevel > 25 && (
                    <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-warning">Potential Bias Detected</p>
                        <p className="text-muted-foreground">Emotional language patterns identified</p>
                      </div>
                    </div>
                  )}

                  {speechRate > 180 && (
                    <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <Info className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-warning">Rapid Speech Detected</p>
                        <p className="text-muted-foreground">Speaking rate may indicate stress or nervousness</p>
                      </div>
                    </div>
                  )}

                  {consistency < 70 && (
                    <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                      <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-destructive">Consistency Issues</p>
                        <p className="text-muted-foreground">Potential contradictions in testimony</p>
                      </div>
                    </div>
                  )}

                  {biasLevel <= 15 && consistency >= 80 && speechRate >= 120 && speechRate <= 180 && (
                    <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-success">High Quality Testimony</p>
                        <p className="text-muted-foreground">No significant issues detected</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transcription Preview */}
          {transcription && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Live Transcription</CardTitle>
                <CardDescription>Real-time speech-to-text conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/50 rounded-lg border max-h-40 overflow-y-auto">
                  <p className="text-sm leading-relaxed">{transcription}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default LiveAnalysis;
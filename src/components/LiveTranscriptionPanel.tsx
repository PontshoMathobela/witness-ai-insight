import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Download, 
  FileText, 
  Clock,
  Volume2
} from "lucide-react";

interface LiveTranscriptionPanelProps {
  onAnalysis: (transcription: string, duration: number, statementId: string) => void;
}

const LiveTranscriptionPanel = ({ onAnalysis }: LiveTranscriptionPanelProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [caseId] = useState(`CASE-${Math.floor(Math.random() * 9000) + 1000}`);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Simulated transcription effect
  useEffect(() => {
    if (isRecording && !isPaused) {
      const sampleTexts = [
        "I was walking down the street when I noticed...",
        "The defendant appeared to be nervous and...",
        "At approximately 3:15 PM on Tuesday...",
        "I can clearly remember seeing the suspect...",
        "The witness statement indicates that...",
        "During the incident, I observed the following...",
        "The sequence of events unfolded as follows...",
      ];

      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
          setTranscription(prev => prev + (prev ? " " : "") + randomText);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRecording, isPaused]);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setDuration(0);
    setTranscription("");
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    
    // Trigger analysis
    if (transcription) {
      onAnalysis(transcription, duration, caseId);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([transcription], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${caseId}-transcript.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section data-recording-section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Live Transcription</h2>
            <p className="text-muted-foreground">Professional-grade court recording system</p>
          </div>

          {/* Session Info */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Recording Session</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Case ID: <span className="font-mono font-medium text-foreground">{caseId}</span></span>
                    <span>•</span>
                    <span>Witness: John Smith</span>
                  </div>
                </div>
                {isRecording && (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                    <Badge variant="destructive" className="text-xs font-medium">
                      {isPaused ? "PAUSED" : "RECORDING"}
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                {!isRecording ? (
                  <Button
                    onClick={handleStartRecording}
                    size="lg"
                    className="bg-accent hover:bg-accent-light text-accent-foreground px-8 py-4 rounded-2xl shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    <Mic className="mr-2 w-5 h-5" />
                    Start Recording
                  </Button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={handlePauseResume}
                      variant="outline"
                      size="lg"
                      className="rounded-2xl px-6"
                    >
                      {isPaused ? <Play className="mr-2 w-5 h-5" /> : <Pause className="mr-2 w-5 h-5" />}
                      {isPaused ? "Resume" : "Pause"}
                    </Button>
                    <Button
                      onClick={handleStopRecording}
                      variant="destructive"
                      size="lg"
                      className="rounded-2xl px-6"
                    >
                      <Square className="mr-2 w-5 h-5" />
                      Stop
                    </Button>
                  </div>
                )}
              </div>

              {/* Duration & Status */}
              {isRecording && (
                <div className="flex items-center justify-center space-x-6 mb-6 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono text-lg font-medium text-foreground">
                      {formatDuration(duration)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Volume2 className="w-4 h-4" />
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-4 rounded-full ${
                            !isPaused && Math.random() > 0.5 ? 'bg-accent' : 'bg-muted'
                          } transition-colors duration-150`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Transcription Display */}
              <Card className="bg-background border-2 border-dashed border-border/60">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">Live Transcription</span>
                    </div>
                    {transcription && (
                      <Button
                        onClick={handleDownload}
                        variant="ghost"
                        size="sm"
                        className="rounded-lg"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                  <div className="min-h-32 max-h-64 overflow-y-auto">
                    {transcription ? (
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {transcription}
                        {isRecording && !isPaused && (
                          <span className="inline-block w-2 h-5 bg-accent ml-1 animate-pulse" />
                        )}
                      </p>
                    ) : (
                      <p className="text-muted-foreground text-sm italic">
                        Transcription will appear here when recording starts...
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-4">
              <p className="text-xs text-center text-muted-foreground">
                🔒 All recordings are encrypted and processed securely. Your data is protected under legal confidentiality standards.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LiveTranscriptionPanel;
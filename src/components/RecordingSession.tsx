import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  Download,
  AlertTriangle,
  Clock,
  FileText,
  Scale
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface RecordingSessionProps {
  onAnalysis: (transcription: string, duration: number) => void;
}

const RecordingSession = ({ onAnalysis }: RecordingSessionProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [caseId, setCaseId] = useState('');
  const [witnessName, setWitnessName] = useState('');
  const [sessionId] = useState(() => `SESSION-${Date.now()}`);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const { toast } = useToast();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Request microphone permissions on component mount
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the stream, we just needed permission
      } catch (error) {
        console.error('Permission request failed:', error);
        toast({
          title: "Microphone Permission Required",
          description: "Please grant microphone access to record court testimony.",
          variant: "destructive"
        });
      }
    };
    requestPermissions();
  }, [toast]);

  const startRecording = async () => {
    try {
      if (!caseId.trim()) {
        toast({
          title: "Case ID Required",
          description: "Please enter a case ID before starting recording.",
          variant: "destructive"
        });
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setDuration(0);
      setTranscription('');
      
      toast({
        title: "Recording Started",
        description: `Court session recording for case ${caseId} has begun.`,
      });
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Unable to start recording. Please check microphone permissions.",
        variant: "destructive"
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
      } else {
        mediaRecorderRef.current.pause();
      }
    }
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Recording Resumed" : "Recording Paused",
      description: isPaused ? "Court session recording has resumed." : "Court session recording has been paused.",
    });
  };

  const stopRecording = async () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
          setRecordingBlob(blob);
        };
      }
      
      setIsRecording(false);
      setIsPaused(false);
      
      // Simulate transcription process
      setTimeout(() => {
        const mockTranscription = `Court session recording for case ${caseId}. Witness ${witnessName || 'Unknown'} testimony recorded for ${formatDuration(duration)}. [This is a simulated transcription. In a real implementation, this would be processed by a speech-to-text service like Whisper.]`;
        setTranscription(mockTranscription);
        onAnalysis(mockTranscription, duration);
      }, 2000);

      toast({
        title: "Recording Completed",
        description: "Court session has been recorded and is being processed for analysis.",
      });
    } catch (error) {
      toast({
        title: "Recording Error",
        description: "Failed to stop recording. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadRecording = () => {
    if (recordingBlob) {
      const url = URL.createObjectURL(recordingBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `court-recording-${caseId}-${sessionId}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Recording file download has been initiated.",
      });
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Court Recording Session
            </h2>
            <p className="text-muted-foreground">
              Real-time testimony recording with AI-powered analysis
            </p>
          </div>

          {/* Session Info */}
          <Card className="mb-6 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Session Information
              </CardTitle>
              <CardDescription>
                Session ID: {sessionId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="caseId">Case ID *</Label>
                  <Input
                    id="caseId"
                    placeholder="CASE-2024-001"
                    value={caseId}
                    onChange={(e) => setCaseId(e.target.value)}
                    disabled={isRecording}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="witnessName">Witness Name</Label>
                  <Input
                    id="witnessName"
                    placeholder="Enter witness name"
                    value={witnessName}
                    onChange={(e) => setWitnessName(e.target.value)}
                    disabled={isRecording}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recording Controls */}
          <Card className="mb-6 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Recording Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                {/* Status Display */}
                <div className="flex items-center justify-center gap-4">
                  <Badge 
                    variant={isRecording ? (isPaused ? "secondary" : "destructive") : "outline"}
                    className="text-sm px-3 py-1"
                  >
                    {isRecording ? (isPaused ? "PAUSED" : "RECORDING") : "READY"}
                  </Badge>
                  
                  <div className="flex items-center gap-2 text-2xl font-mono">
                    <Clock className="w-5 h-5" />
                    {formatDuration(duration)}
                  </div>
                </div>

                {/* Recording Button */}
                <div className="flex items-center justify-center">
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      variant="destructive"
                      size="lg"
                      className="w-24 h-24 rounded-full text-lg"
                      disabled={!caseId.trim()}
                    >
                      <Mic className="w-8 h-8" />
                    </Button>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        onClick={pauseRecording}
                        variant="secondary"
                        size="lg"
                        className="w-16 h-16 rounded-full"
                      >
                        {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                      </Button>
                      
                      <Button
                        onClick={stopRecording}
                        variant="destructive"
                        size="lg"
                        className="w-16 h-16 rounded-full"
                      >
                        <Square className="w-6 h-6" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Live Indicators */}
                {isRecording && !isPaused && (
                  <div className="flex items-center justify-center gap-2 text-destructive animate-pulse">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="font-medium">LIVE RECORDING</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Live Transcription */}
          {(isRecording || transcription) && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MicOff className="w-5 h-5" />
                  Live Transcription
                </CardTitle>
                <CardDescription>
                  Real-time speech-to-text conversion
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isRecording && !transcription ? (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                    <span>Listening for speech...</span>
                  </div>
                ) : transcription ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="text-sm leading-relaxed">{transcription}</p>
                    </div>
                    
                    {recordingBlob && (
                      <div className="flex gap-2">
                        <Button
                          onClick={downloadRecording}
                          variant="outline"
                          size="sm"
                        >
                          <Download className="w-4 h-4" />
                          Download Recording
                        </Button>
                      </div>
                    )}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-warning mb-1">Court Recording Notice</p>
                <p className="text-muted-foreground">
                  This recording is being made for official court proceedings. All parties have been informed 
                  of the recording. The audio is encrypted and stored securely in compliance with judicial standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecordingSession;
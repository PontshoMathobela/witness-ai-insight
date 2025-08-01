import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FolderOpen, 
  Calendar, 
  Clock, 
  FileText, 
  TrendingUp,
  Eye,
  Download
} from "lucide-react";

const CaseHistory = () => {
  // Mock data for case history
  const caseHistory = [
    {
      id: "CASE-2234",
      date: "2024-01-15",
      duration: "23:45",
      witness: "Sarah Johnson",
      preview: "I was present at the scene around 2:30 PM when I observed the defendant approaching the victim...",
      confidence: 92,
      status: "High Confidence"
    },
    {
      id: "CASE-2233",
      date: "2024-01-14",
      duration: "18:32",
      witness: "Michael Chen",
      preview: "The incident occurred during my lunch break. I clearly remember seeing the suspect near the building...",
      confidence: 87,
      status: "High Confidence"
    },
    {
      id: "CASE-2232",
      date: "2024-01-12",
      duration: "31:12",
      witness: "Amanda Rodriguez",
      preview: "I was walking my dog when I noticed unusual activity across the street. The defendant seemed agitated...",
      confidence: 74,
      status: "Moderate Confidence"
    },
    {
      id: "CASE-2231",
      date: "2024-01-10",
      duration: "12:58",
      witness: "David Thompson",
      preview: "My testimony relates to events that transpired on the evening of January 8th around 7 PM...",
      confidence: 68,
      status: "Moderate Confidence"
    },
    {
      id: "CASE-2230",
      date: "2024-01-08",
      duration: "27:43",
      witness: "Lisa Martinez",
      preview: "I observed the defendant and victim having what appeared to be a heated discussion near the parking area...",
      confidence: 89,
      status: "High Confidence"
    }
  ];

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 85) return { variant: "default" as const, color: "text-success" };
    if (confidence >= 70) return { variant: "secondary" as const, color: "text-warning" };
    return { variant: "destructive" as const, color: "text-destructive" };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Case History</h2>
            <p className="text-muted-foreground">Complete timeline of witness statement analyses</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            <div className="space-y-8">
              {caseHistory.map((case_, index) => {
                const badgeProps = getConfidenceBadge(case_.confidence);
                
                return (
                  <div key={case_.id} className="relative flex items-start space-x-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-background border-4 border-primary rounded-full shadow-card">
                      <FolderOpen className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <Card className="shadow-card hover:shadow-elegant transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <CardTitle className="text-lg font-bold text-primary">
                                {case_.id}
                              </CardTitle>
                              <CardDescription className="flex items-center space-x-4">
                                <span className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(case_.date)}
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  {case_.duration}
                                </span>
                                <span>Witness: {case_.witness}</span>
                              </CardDescription>
                            </div>
                            <div className="text-right space-y-2">
                              <div className={`text-2xl font-bold ${badgeProps.color}`}>
                                {case_.confidence}%
                              </div>
                              <Badge variant={badgeProps.variant} className="text-xs">
                                {case_.status}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Preview */}
                            <div className="p-4 bg-muted/50 rounded-lg border">
                              <div className="flex items-center space-x-2 mb-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">Statement Preview</span>
                              </div>
                              <p className="text-sm text-foreground/80 leading-relaxed">
                                {case_.preview}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-3">
                              <Button variant="outline" size="sm" className="rounded-lg">
                                <Eye className="w-4 h-4 mr-2" />
                                View Full Statement
                              </Button>
                              <Button variant="ghost" size="sm" className="rounded-lg">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                View Analysis
                              </Button>
                              <Button variant="ghost" size="sm" className="rounded-lg">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" size="lg" className="rounded-2xl px-8">
              Load More Cases
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseHistory;
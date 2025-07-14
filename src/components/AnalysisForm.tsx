import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Loader2 } from "lucide-react";

interface AnalysisFormProps {
  onAnalyze: (statement: string, caseId: string) => void;
  isAnalyzing: boolean;
}

const AnalysisForm = ({ onAnalyze, isAnalyzing }: AnalysisFormProps) => {
  const [statement, setStatement] = useState("");
  const [caseId, setCaseId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (statement.trim() && caseId.trim()) {
      onAnalyze(statement, caseId);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Submit Witness Statement for Analysis
            </h2>
            <p className="text-xl text-muted-foreground">
              Enter the witness statement text below to receive comprehensive AI-powered analysis
            </p>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Statement Analysis Request
              </CardTitle>
              <CardDescription>
                Provide the witness statement and case details for comprehensive analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="caseId">Case ID</Label>
                    <Input
                      id="caseId"
                      placeholder="e.g., CASE-2024-001"
                      value={caseId}
                      onChange={(e) => setCaseId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="witnessId">Witness ID (Optional)</Label>
                    <Input
                      id="witnessId"
                      placeholder="e.g., WITNESS-001"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="statement">Witness Statement</Label>
                  <Textarea
                    id="statement"
                    placeholder="Enter the complete witness statement here..."
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    rows={12}
                    className="resize-none"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    {statement.length} characters • Minimum 50 characters recommended for accurate analysis
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    variant="professional"
                    size="lg"
                    disabled={isAnalyzing || statement.length < 10 || !caseId.trim()}
                    className="flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing Statement...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        Analyze Statement
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="sm:w-auto"
                  >
                    <Upload className="w-4 h-4" />
                    Upload File
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Privacy Notice:</strong> All statements are processed securely and confidentially. 
              No data is stored permanently without explicit consent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisForm;
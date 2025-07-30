import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const WitnessPage = () => {
  const [statement, setStatement] = useState("");
  const [caseId, setCaseId] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // TODO: replace with actual API logic
    console.log("Case ID:", caseId);
    console.log("Statement:", statement);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Analyze Witness Statement</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter Case ID"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
          />
          <Textarea
            placeholder="Enter witness statement here..."
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
          />
          <Button onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WitnessPage;

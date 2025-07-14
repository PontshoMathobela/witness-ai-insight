import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, Brain, Shield, Target } from "lucide-react";
import heroImage from "@/assets/hero-justice.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-muted-foreground mb-6">
              <Shield className="w-4 h-4" />
              Supporting SDG 16: Peace, Justice & Strong Institutions
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              AI-Powered Witness
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Statement Analysis
              </span>
            </h1>
            
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced natural language processing to detect inconsistencies, identify potential biases, 
              and enhance the reliability of witness statements for fairer judicial outcomes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Start Analysis
                <Target className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-card/20 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-card/30">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary-foreground/10">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Consistency Analysis</h3>
              <p className="text-muted-foreground">
                Advanced NLP algorithms detect inconsistencies and contradictions within witness statements.
              </p>
            </Card>
            
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary-foreground/10">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bias Detection</h3>
              <p className="text-muted-foreground">
                Identify potential cognitive biases and prejudicial language to ensure fair proceedings.
              </p>
            </Card>
            
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary-foreground/10">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability Score</h3>
              <p className="text-muted-foreground">
                Generate comprehensive reliability scores based on multiple linguistic and contextual factors.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
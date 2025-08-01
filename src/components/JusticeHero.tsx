import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Shield, Eye } from "lucide-react";

const JusticeHero = () => {
  const handleStartTranscription = () => {
    // Scroll to recording section
    const recordingSection = document.querySelector("[data-recording-section]");
    if (recordingSection) {
      recordingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight">
                Justice<span className="text-accent-light">Lens</span>
              </h1>
              <p className="text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                Analyzing witness statements with intelligence and integrity
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleStartTranscription}
                className="bg-accent hover:bg-accent-light text-accent-foreground px-8 py-4 text-lg font-semibold rounded-2xl shadow-glow transition-all duration-300 hover:scale-105"
              >
                Start Transcription
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Secure & Confidential</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-foreground/80">
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">Real-time Analysis</span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative lg:pl-12">
            <div className="relative">
              {/* Main illustration placeholder */}
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-12 shadow-elegant">
                <div className="flex justify-center items-center h-64 lg:h-80">
                  <div className="relative">
                    <Scale className="w-32 h-32 text-primary-foreground/60" />
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent-light rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <Shield className="w-10 h-10 text-primary-foreground/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JusticeHero;
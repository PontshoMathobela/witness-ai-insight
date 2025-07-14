import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Users, Globe, Target, CheckCircle, TrendingUp } from "lucide-react";

const SDGSection = () => {
  const sdgGoals = [
    {
      number: "16.3",
      title: "Promote the rule of law",
      description: "Ensure equal access to justice for all"
    },
    {
      number: "16.6",
      title: "Develop effective institutions",
      description: "Build accountable and transparent institutions"
    },
    {
      number: "16.7",
      title: "Responsive decision-making",
      description: "Ensure inclusive and participatory decision-making"
    }
  ];

  const impacts = [
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Enhanced Justice",
      description: "More accurate witness assessment leads to fairer trials and reduced wrongful convictions"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Reduced Bias",
      description: "AI-powered analysis helps identify and mitigate human cognitive biases in legal proceedings"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Access",
      description: "Scalable technology enables justice improvements in resource-constrained settings"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Institutional Strength",
      description: "Evidence-based tools strengthen legal institutions and public trust in justice systems"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground">
              United Nations SDG 16
            </Badge>
            <h2 className="text-4xl font-bold text-primary mb-4">
              Supporting Peace, Justice & Strong Institutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered witness statement analysis directly contributes to building more just, 
              peaceful, and inclusive societies through improved judicial processes.
            </p>
          </div>

          {/* SDG Targets */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {sdgGoals.map((goal, index) => (
              <Card key={index} className="shadow-card hover:shadow-glow transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">{goal.number}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {goal.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Impact Areas */}
          <div className="bg-gradient-to-br from-muted/50 to-background rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-primary mb-8">
              How We're Making a Difference
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {impacts.map((impact, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-card">
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    {impact.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{impact.title}</h4>
                    <p className="text-muted-foreground">{impact.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ethical Considerations */}
          <Card className="mt-12 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Ethical AI & Sustainability Commitments
              </CardTitle>
              <CardDescription>
                Our approach to responsible AI development and deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    Bias Mitigation
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Continuous auditing of training data for fairness</li>
                    <li>• Regular bias testing across demographic groups</li>
                    <li>• Transparent algorithmic decision-making</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4 text-accent" />
                    Environmental Impact
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Optimized models for energy efficiency</li>
                    <li>• Lightweight deployment for low-resource settings</li>
                    <li>• Carbon-conscious infrastructure choices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SDGSection;
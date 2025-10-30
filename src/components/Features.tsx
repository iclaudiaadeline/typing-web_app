import { FileText, Zap, TrendingUp, Mic } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    icon: FileText,
    title: "Varied Typing Texts",
    description: "Engage with a wide range of texts to keep your practice diverse and interesting."
  },
  {
    icon: Zap,
    title: "Real-Time Feedback",
    description: "Receive instant feedback on your typing to improve your speed and accuracy."
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your progress over time and stay motivated with detailed stats."
  },
  {
    icon: Mic,
    title: "Voice Typing Feature",
    description: "Practice pronunciation with real-time feedback and improvement suggestions."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose Our Typing App?
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience the difference with our innovative features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

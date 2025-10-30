import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import keyboardHero from "@/assets/keyboard-hero.png";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up">
          Master Typing with Fun and Engaging Lessons
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Improve your typing skills with tailored practices, voice typing, and more.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Button size="lg" className="w-full sm:w-auto">
            Start Typing <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Learn More
          </Button>
        </div>

        <div className="max-w-4xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <img 
            src={keyboardHero} 
            alt="Colorful keyboard visualization" 
            className="w-full h-auto rounded-lg"
          />
        </div>

        <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.4s" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus congue neque. Proin et tristique ligula. Morbi convallis.
        </p>
      </div>
    </section>
  );
};

export default Hero;

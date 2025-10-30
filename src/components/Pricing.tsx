import { Button } from "./ui/button";
import { Check } from "lucide-react";

const features = [
  { name: "Varied Typing Texts", free: true, paid: true },
  { name: "Free Typing Mode", free: true, paid: false },
  { name: "Practice Typing Mode", free: false, paid: true },
  { name: "Progress Tracking", free: true, paid: true },
  { name: "Organization Account Management", free: true, paid: true },
  { name: "Certifications", free: true, paid: true },
  { name: "Voice Practice Feature", free: false, paid: true },
  { name: "Email Support", free: false, paid: true },
  { name: "Analytics and reporting", free: true, paid: true },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Pricing Plans
          </h2>
          <p className="text-lg text-muted-foreground">
            Become A Typing Master with Us
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-6 text-foreground font-semibold">Compare plans</th>
                  <th className="p-6 text-center">
                    <div className="text-2xl font-bold text-foreground mb-4">Free</div>
                    <Button variant="outline" className="w-full max-w-[200px]">
                      Choose This Plan
                    </Button>
                  </th>
                  <th className="p-6 text-center bg-primary/5">
                    <div className="text-2xl font-bold text-foreground mb-4">$8</div>
                    <Button className="w-full max-w-[200px]">
                      Choose This Plan
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-foreground">{feature.name}</td>
                    <td className="p-4 text-center">
                      {feature.free && (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center bg-primary/5">
                      {feature.paid && (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

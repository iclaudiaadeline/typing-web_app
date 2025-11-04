import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const testimonials = [
  { name: "Hirwa Ivan", initials: "HI" },
  { name: "Iradukunda Sedrick", initials: "IS" },
  { name: "Adeline Iradukunda", initials: "AI" },
  { name: "Mugisha Patrick", initials: "MP" },
  { name: "Uwase Grace", initials: "UG" },
  { name: "Niyonzima Eric", initials: "NE" },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Users Say?
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from satisfied users who have improved their typing skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:border-primary/50 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "This best typing app I've ever used! My speed and accuracy have improved significantly."
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Students = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const students = [
    { name: "Hirwa Ivan", class: "Grade 9", wpm: 45, accuracy: 92 },
    { name: "Iradukunda Sedrick", class: "Grade 10", wpm: 52, accuracy: 88 },
    { name: "Adeline Iradukunda", class: "Grade 11", wpm: 48, accuracy: 95 },
    { name: "Mugisha Patrick", class: "Grade 9", wpm: 41, accuracy: 90 },
    { name: "Uwase Grace", class: "Grade 12", wpm: 55, accuracy: 93 },
    { name: "Niyonzima Eric", class: "Grade 10", wpm: 50, accuracy: 89 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground mt-1">
            View student progress and performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student, index) => {
            const initials = student.name
              .split(" ")
              .map(n => n[0])
              .join("")
              .toUpperCase();

            return (
              <Card key={index} className="hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.class}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{student.wpm}</p>
                      <p className="text-xs text-muted-foreground">WPM</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{student.accuracy}%</p>
                      <p className="text-xs text-muted-foreground">Accuracy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Students;


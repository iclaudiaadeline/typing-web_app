import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const Classes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const classes = [
    { name: "Grade 9", students: 25, assignments: 12 },
    { name: "Grade 10", students: 28, assignments: 15 },
    { name: "Grade 11", students: 22, assignments: 10 },
    { name: "Grade 12", students: 30, assignments: 18 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Classes</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your classes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((classItem, index) => (
            <Card key={index} className="hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{classItem.name}</CardTitle>
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>
                  {classItem.students} students enrolled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {classItem.assignments} assignments
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Classes;


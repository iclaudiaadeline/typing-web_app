import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Award, Clock } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const stats = [
    {
      title: "Typing Speed",
      value: "45 WPM",
      description: "Average words per minute",
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      title: "Accuracy",
      value: "92%",
      description: "Overall accuracy rate",
      icon: Target,
      color: "text-green-500",
    },
    {
      title: "Assignments",
      value: "12/20",
      description: "Completed assignments",
      icon: Award,
      color: "text-yellow-500",
    },
    {
      title: "Practice Time",
      value: "24h",
      description: "Total practice time",
      icon: Clock,
      color: "text-purple-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {localStorage.getItem("userName")}!
          </h1>
          <p className="text-muted-foreground">
            Here's your typing progress overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:border-primary/50 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Start practicing or view your assignments
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1"
              onClick={() => navigate("/dashboard/practice")}
            >
              Start Typing Practice
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/dashboard/assignments")}
            >
              View Assignments
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest typing sessions and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { text: "Completed 'Advanced Typing' assignment", time: "2 hours ago", status: "PASS" },
                { text: "Practiced for 30 minutes", time: "5 hours ago", status: "PASS" },
                { text: "Achieved 50 WPM milestone", time: "1 day ago", status: "PASS" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{activity.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;


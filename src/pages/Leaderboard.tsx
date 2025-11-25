import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import { Trophy, TrendingUp, Medal, Crown } from "lucide-react";

const Leaderboard = () => {
  const leaderboardData = {
    wpm: [
      { rank: 1, name: "Hirwa Ivan", wpm: 95, accuracy: 98, school: "Green Hills Academy", avatar: "HI" },
      { rank: 2, name: "Iradukunda Sedrick", wpm: 92, accuracy: 96, school: "Lycée de Kigali", avatar: "IS" },
      { rank: 3, name: "Adeline Iradukunda", wpm: 88, accuracy: 97, school: "Green Hills Academy", avatar: "AI" },
      { rank: 4, name: "Mugisha Patrick", wpm: 85, accuracy: 95, school: "FAWE Girls School", avatar: "MP" },
      { rank: 5, name: "Uwase Grace", wpm: 82, accuracy: 94, school: "Lycée de Kigali", avatar: "UG" },
      { rank: 6, name: "Niyonzima Eric", wpm: 78, accuracy: 93, school: "Green Hills Academy", avatar: "NE" },
      { rank: 7, name: "Mutoni Sarah", wpm: 75, accuracy: 96, school: "FAWE Girls School", avatar: "MS" },
      { rank: 8, name: "Habimana Jean", wpm: 72, accuracy: 92, school: "Lycée de Kigali", avatar: "HJ" },
      { rank: 9, name: "Ishimwe Divine", wpm: 70, accuracy: 94, school: "Green Hills Academy", avatar: "ID" },
      { rank: 10, name: "Kamanzi Fred", wpm: 68, accuracy: 91, school: "FAWE Girls School", avatar: "KF" }
    ],
    accuracy: [
      { rank: 1, name: "Adeline Iradukunda", wpm: 88, accuracy: 99, school: "Green Hills Academy", avatar: "AI" },
      { rank: 2, name: "Hirwa Ivan", wpm: 95, accuracy: 98, school: "Green Hills Academy", avatar: "HI" },
      { rank: 3, name: "Uwase Grace", wpm: 82, accuracy: 97, school: "Lycée de Kigali", avatar: "UG" },
      { rank: 4, name: "Iradukunda Sedrick", wpm: 92, accuracy: 96, school: "Lycée de Kigali", avatar: "IS" },
      { rank: 5, name: "Mutoni Sarah", wpm: 75, accuracy: 96, school: "FAWE Girls School", avatar: "MS" }
    ]
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/10 border-yellow-500";
    if (rank === 2) return "bg-gray-400/10 border-gray-400";
    if (rank === 3) return "bg-orange-600/10 border-orange-600";
    return "bg-background";
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other typists</p>
        </div>

        {/* Your Rank */}
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Your Current Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">YO</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg">Your Name</div>
                  <div className="text-sm text-muted-foreground">Green Hills Academy</div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-3xl font-bold">#12</div>
                <div className="text-sm text-muted-foreground">WPM Ranking</div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-2xl font-bold">65 WPM</div>
                <div className="text-sm text-muted-foreground">94% Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="wpm" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="wpm">
              <TrendingUp className="w-4 h-4 mr-2" />
              WPM
            </TabsTrigger>
            <TabsTrigger value="accuracy">
              <Trophy className="w-4 h-4 mr-2" />
              Accuracy
            </TabsTrigger>
            <TabsTrigger value="school">
              <Medal className="w-4 h-4 mr-2" />
              School
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wpm" className="space-y-3">
            {leaderboardData.wpm.map((user) => (
              <Card key={user.rank} className={`${getRankColor(user.rank)} transition-all hover:shadow-lg`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 flex justify-center">
                      {getRankBadge(user.rank)}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.school}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{user.wpm} WPM</div>
                      <div className="text-sm text-muted-foreground">{user.accuracy}% accuracy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="accuracy" className="space-y-3">
            {leaderboardData.accuracy.map((user) => (
              <Card key={user.rank} className={`${getRankColor(user.rank)} transition-all hover:shadow-lg`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 flex justify-center">
                      {getRankBadge(user.rank)}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.school}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{user.accuracy}%</div>
                      <div className="text-sm text-muted-foreground">{user.wpm} WPM</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="school" className="space-y-3">
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>School leaderboard coming soon!</p>
                  <p className="text-sm mt-2">Compete with students from your school</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Top Speed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95 WPM</div>
              <p className="text-sm text-muted-foreground">Hirwa Ivan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Best Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99%</div>
              <p className="text-sm text-muted-foreground">Adeline Iradukunda</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-sm text-muted-foreground">Active this week</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;

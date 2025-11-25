import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import { Trophy, Medal, Star, Award, Lock } from "lucide-react";

const Achievements = () => {
  const userAchievements = [
    {
      id: 1,
      name: "Speed Demon",
      description: "Reach 60 WPM",
      icon: "🚀",
      category: "speed",
      earned: true,
      earnedDate: "2025-11-15",
      rarity: "rare",
      points: 50
    },
    {
      id: 2,
      name: "Perfect Accuracy",
      description: "Complete a session with 100% accuracy",
      icon: "🎯",
      category: "accuracy",
      earned: true,
      earnedDate: "2025-11-10",
      rarity: "epic",
      points: 75
    },
    {
      id: 3,
      name: "Consistent Typist",
      description: "Practice for 7 consecutive days",
      icon: "📅",
      category: "consistency",
      earned: false,
      progress: "5/7 days",
      rarity: "common",
      points: 25
    },
    {
      id: 4,
      name: "Century Club",
      description: "Reach 100 WPM",
      icon: "💯",
      category: "speed",
      earned: false,
      progress: "82/100 WPM",
      rarity: "legendary",
      points: 200
    },
    {
      id: 5,
      name: "Practice Makes Perfect",
      description: "Complete 100 practice sessions",
      icon: "⭐",
      category: "milestone",
      earned: false,
      progress: "67/100 sessions",
      rarity: "rare",
      points: 100
    },
    {
      id: 6,
      name: "Voice Master",
      description: "Complete 50 voice typing sessions",
      icon: "🎤",
      category: "special",
      earned: false,
      isPremium: true,
      rarity: "epic",
      points: 150
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const totalPoints = userAchievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Achievements</h1>
            <p className="text-muted-foreground">Track your accomplishments and earn rewards</p>
          </div>
          <Card className="w-48">
            <CardContent className="pt-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">
                {userAchievements.filter(a => a.earned).length}
              </div>
              <div className="text-sm text-muted-foreground">Earned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{userAchievements.length}</div>
              <div className="text-sm text-muted-foreground">Total Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Medal className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">
                {userAchievements.filter(a => a.earned && a.rarity === 'epic').length}
              </div>
              <div className="text-sm text-muted-foreground">Epic+</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">
                {Math.round((userAchievements.filter(a => a.earned).length / userAchievements.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Completion</div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="earned">Earned</TabsTrigger>
            <TabsTrigger value="locked">Locked</TabsTrigger>
            <TabsTrigger value="speed">Speed</TabsTrigger>
            <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userAchievements.map((achievement) => (
                <Card key={achievement.id} className={achievement.earned ? 'border-2 border-primary' : 'opacity-75'}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {achievement.name}
                            {achievement.isPremium && <Lock className="w-4 h-4 text-yellow-500" />}
                          </CardTitle>
                          <div className="flex gap-2 mt-1">
                            <Badge className={getRarityColor(achievement.rarity)}>
                              {achievement.rarity}
                            </Badge>
                            <Badge variant="outline">{achievement.points} pts</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    {achievement.earned ? (
                      <div className="flex items-center justify-between">
                        <Badge variant="default" className="bg-green-500">
                          ✓ Earned
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {achievement.earnedDate}
                        </span>
                      </div>
                    ) : achievement.progress ? (
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Progress: {achievement.progress}</div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: achievement.progress.includes('/') 
                              ? `${(parseInt(achievement.progress.split('/')[0]) / parseInt(achievement.progress.split('/')[1])) * 100}%` 
                              : '0%' 
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <Badge variant="secondary">Locked</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earned">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userAchievements.filter(a => a.earned).map((achievement) => (
                <Card key={achievement.id} className="border-2 border-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{achievement.name}</CardTitle>
                          <div className="flex gap-2 mt-1">
                            <Badge className={getRarityColor(achievement.rarity)}>
                              {achievement.rarity}
                            </Badge>
                            <Badge variant="outline">{achievement.points} pts</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="default" className="bg-green-500">
                        ✓ Earned
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {achievement.earnedDate}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locked">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userAchievements.filter(a => !a.earned).map((achievement) => (
                <Card key={achievement.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="text-4xl grayscale">{achievement.icon}</div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {achievement.name}
                            {achievement.isPremium && <Lock className="w-4 h-4 text-yellow-500" />}
                          </CardTitle>
                          <div className="flex gap-2 mt-1">
                            <Badge className={getRarityColor(achievement.rarity)}>
                              {achievement.rarity}
                            </Badge>
                            <Badge variant="outline">{achievement.points} pts</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    {achievement.progress ? (
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Progress: {achievement.progress}</div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: achievement.progress.includes('/') 
                              ? `${(parseInt(achievement.progress.split('/')[0]) / parseInt(achievement.progress.split('/')[1])) * 100}%` 
                              : '0%' 
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <Badge variant="secondary">Locked</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Achievements;

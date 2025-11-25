import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import { Award, Download, Share2, CheckCircle, Calendar } from "lucide-react";

const Certificates = () => {
  const certificates = [
    {
      id: "JFFT-2025-001",
      type: "intermediate",
      title: "Intermediate Typing Certificate",
      description: "Successfully achieved intermediate level typing proficiency",
      issuedDate: "2025-11-15",
      avgWPM: 65,
      avgAccuracy: 94,
      totalHours: 25,
      totalSessions: 145,
      verified: true
    },
    {
      id: "JFFT-2025-002",
      type: "beginner",
      title: "Beginner Typing Certificate",
      description: "Successfully completed beginner level typing course",
      issuedDate: "2025-10-20",
      avgWPM: 45,
      avgAccuracy: 90,
      totalHours: 15,
      totalSessions: 80,
      verified: true
    }
  ];

  const availableCertificates = [
    {
      type: "advanced",
      title: "Advanced Typing Certificate",
      requirements: "75+ WPM, 95%+ Accuracy, 50+ Hours",
      progress: 78,
      locked: false
    },
    {
      type: "expert",
      title: "Expert Typing Certificate",
      requirements: "90+ WPM, 97%+ Accuracy, 100+ Hours",
      progress: 45,
      locked: false
    },
    {
      type: "master",
      title: "Master Typing Certificate",
      requirements: "100+ WPM, 98%+ Accuracy, 200+ Hours",
      progress: 25,
      locked: true
    }
  ];

  const getCertificateColor = (type: string) => {
    switch (type) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-blue-500';
      case 'advanced': return 'bg-purple-500';
      case 'expert': return 'bg-orange-500';
      case 'master': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground">View and download your typing achievements</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="w-10 h-10 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold">{certificates.length}</div>
              <div className="text-sm text-muted-foreground">Earned Certificates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle className="w-10 h-10 mx-auto mb-2 text-green-500" />
              <div className="text-3xl font-bold">{certificates.filter(c => c.verified).length}</div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Calendar className="w-10 h-10 mx-auto mb-2 text-blue-500" />
              <div className="text-3xl font-bold">{availableCertificates.length}</div>
              <div className="text-sm text-muted-foreground">Available to Earn</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="earned" className="w-full">
          <TabsList>
            <TabsTrigger value="earned">Earned Certificates</TabsTrigger>
            <TabsTrigger value="available">Available Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="earned" className="space-y-4">
            {certificates.map((cert) => (
              <Card key={cert.id} className="border-2 border-primary">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${getCertificateColor(cert.type)}`}>
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1">{cert.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className={getCertificateColor(cert.type)}>
                            {cert.type.toUpperCase()}
                          </Badge>
                          {cert.verified && (
                            <Badge variant="outline" className="border-green-500 text-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Certificate ID</div>
                      <div className="font-mono text-sm">{cert.id}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Average WPM</div>
                      <div className="text-xl font-bold">{cert.avgWPM}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                      <div className="text-xl font-bold">{cert.avgAccuracy}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Practice Hours</div>
                      <div className="text-xl font-bold">{cert.totalHours}h</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Issued Date</div>
                      <div className="text-sm font-semibold">{cert.issuedDate}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="default">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            {availableCertificates.map((cert, index) => (
              <Card key={index} className={cert.locked ? 'opacity-60' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${getCertificateColor(cert.type)} ${cert.locked ? 'grayscale' : ''}`}>
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{cert.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">Requirements: {cert.requirements}</p>
                        <Badge className={`mt-2 ${getCertificateColor(cert.type)}`}>
                          {cert.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to unlock</span>
                      <span className="font-semibold">{cert.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-3 ${getCertificateColor(cert.type)} transition-all`}
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                    {cert.progress >= 100 ? (
                      <Button className="w-full mt-4">
                        <Award className="w-4 h-4 mr-2" />
                        Claim Certificate
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full mt-4" disabled={cert.locked}>
                        {cert.locked ? 'Locked' : 'Keep Practicing'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Certificate Preview */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Share Your Achievements</h3>
            <p className="text-muted-foreground mb-4">
              All certificates are digitally verified and can be shared on social media or added to your professional profile.
            </p>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share on LinkedIn
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Certificates;

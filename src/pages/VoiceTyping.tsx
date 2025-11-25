import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import { Mic, Square, Play, Lock, TrendingUp, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VoiceTyping = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPremium] = useState(true); // Set to true to test premium features
  const [transcription, setTranscription] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  const mockText = "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type efficiently.";

  const sessions = [
    {
      id: 1,
      date: "2025-11-17",
      text: "The quick brown fox...",
      scores: {
        pronunciation: 92,
        accuracy: 88,
        fluency: 90,
        overall: 90
      }
    },
    {
      id: 2,
      date: "2025-11-16",
      text: "Practice makes perfect...",
      scores: {
        pronunciation: 85,
        accuracy: 87,
        fluency: 86,
        overall: 86
      }
    }
  ];

  const handleStartRecording = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Voice typing is only available for premium subscribers.",
        variant: "destructive"
      });
      return;
    }

    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser. Try Chrome or Edge.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onstart = () => {
      setIsRecording(true);
      setTranscription("");
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone."
      });
    };

    recognitionInstance.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscription(finalTranscript || interimTranscript);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      toast({
        title: "Recognition Error",
        description: `Error: ${event.error}`,
        variant: "destructive"
      });
      setIsRecording(false);
    };

    recognitionInstance.onend = () => {
      setIsRecording(false);
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
  };

  const handleStopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false);
    
    if (transcription) {
      // Calculate accuracy compared to mock text
      const accuracy = calculateAccuracy(transcription, mockText);
      
      toast({
        title: "Recording Stopped",
        description: `Accuracy: ${accuracy}% - Great job!`
      });
    }
  };

  const calculateAccuracy = (spoken: string, expected: string): number => {
    const spokenWords = spoken.toLowerCase().trim().split(/\s+/);
    const expectedWords = expected.toLowerCase().trim().split(/\s+/);
    
    let correctWords = 0;
    const maxLength = Math.max(spokenWords.length, expectedWords.length);
    
    for (let i = 0; i < Math.min(spokenWords.length, expectedWords.length); i++) {
      if (spokenWords[i] === expectedWords[i]) {
        correctWords++;
      }
    }
    
    return Math.round((correctWords / maxLength) * 100);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Voice Typing & Speech Analysis
              <Badge variant="secondary" className="bg-green-500 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </h1>
            <p className="text-muted-foreground">Practice pronunciation with real-time speech-to-text</p>
          </div>
        </div>

        {!isPremium && (
          <Card className="border-2 border-yellow-500 bg-yellow-500/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Lock className="w-12 h-12 text-yellow-500" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Upgrade to Premium</h3>
                  <p className="text-sm text-muted-foreground">
                    Voice typing with pronunciation analysis is a premium feature. Upgrade now to unlock advanced speech-to-text practice.
                  </p>
                </div>
                <Button className="bg-yellow-500 hover:bg-yellow-600">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Practice Area */}
        <Card className={!isPremium ? 'opacity-50 pointer-events-none' : ''}>
          <CardHeader>
            <CardTitle>Voice Practice Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Text to Read */}
            <div className="bg-secondary p-6 rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">Read this text aloud:</div>
              <p className="text-lg leading-relaxed">{mockText}</p>
            </div>

            {/* Recording Controls */}
            <div className="flex justify-center gap-4">
              {!isRecording ? (
                <Button 
                  size="lg" 
                  className="w-32 h-32 rounded-full"
                  onClick={handleStartRecording}
                >
                  <Mic className="w-12 h-12" />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  variant="destructive"
                  className="w-32 h-32 rounded-full animate-pulse"
                  onClick={handleStopRecording}
                >
                  <Square className="w-12 h-12" />
                </Button>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isRecording ? "Recording... Click to stop" : "Click the microphone to start recording"}
              </p>
            </div>

            {/* Live Transcription */}
            {(isRecording || transcription) && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    {isRecording ? "🎤 Live Transcription:" : "📝 Your Recording:"}
                  </div>
                  <p className="text-lg min-h-[60px]">
                    {transcription || "Start speaking..."}
                  </p>
                  {transcription && !isRecording && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <div className="font-semibold">Analysis Complete</div>
                          <div className="text-sm text-muted-foreground">
                            Accuracy: {calculateAccuracy(transcription, mockText)}% | 
                            Pronunciation: Good | Fluency: Excellent
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Tabs for History */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList>
            <TabsTrigger value="history">Session History</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Session {session.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">{session.date}</p>
                      </div>
                      <Badge variant="outline">Overall: {session.scores.overall}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground italic">"{session.text}"</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Pronunciation</div>
                          <div className="text-xl font-bold">{session.scores.pronunciation}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Accuracy</div>
                          <div className="text-xl font-bold">{session.scores.accuracy}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Fluency</div>
                          <div className="text-xl font-bold">{session.scores.fluency}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Overall</div>
                          <div className="text-xl font-bold text-primary">{session.scores.overall}%</div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Replay Audio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Mic className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No voice typing sessions yet</p>
                  <p className="text-sm text-muted-foreground mt-2">Start your first session above</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{sessions.length}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +2 this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Avg Pronunciation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {Math.round(sessions.reduce((sum, s) => sum + s.scores.pronunciation, 0) / sessions.length)}%
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Good progress
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Best Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {Math.max(...sessions.map(s => s.scores.overall))}%
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Personal best
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Features Info */}
            <Card className="bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Voice Typing Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Real-time speech-to-text transcription
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Pronunciation accuracy analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Fluency and completeness scoring
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Detailed error tracking and feedback
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Session history and progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default VoiceTyping;

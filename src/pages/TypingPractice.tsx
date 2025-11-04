import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import TypingKeyboard from "@/components/TypingKeyboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer, Target, Zap, RotateCcw } from "lucide-react";

const TypingPractice = () => {
  const navigate = useNavigate();
  const [text] = useState(
    "The quick brown fox jumps over the lazy dog. Practice makes perfect. Keep typing to improve your speed and accuracy."
  );
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Auto-focus on the input
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (userInput.length > 0 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput.length > 0) {
      // Calculate WPM
      const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
      const wordsTyped = userInput.trim().split(" ").length;
      const calculatedWpm = Math.round(wordsTyped / timeElapsed) || 0;
      setWpm(calculatedWpm);

      // Calculate accuracy
      let correctChars = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === text[i]) {
          correctChars++;
        }
      }
      const calculatedAccuracy = Math.round((correctChars / userInput.length) * 100) || 100;
      setAccuracy(calculatedAccuracy);
      setErrors(userInput.length - correctChars);

      // Update current index
      setCurrentIndex(userInput.length);

      // Check if complete
      if (userInput === text) {
        setIsComplete(true);
      }
    }
  }, [userInput, startTime, text]);

  const handleReset = () => {
    setUserInput("");
    setCurrentIndex(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setIsComplete(false);
    inputRef.current?.focus();
  };

  const getCharClass = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === text[index]
        ? "text-primary"
        : "text-destructive bg-destructive/20";
    }
    if (index === currentIndex) {
      return "bg-primary/20 border-b-2 border-primary";
    }
    return "text-muted-foreground";
  };

  const progress = (currentIndex / text.length) * 100;
  const currentKey = text[currentIndex] || "";

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Typing Practice</h1>
            <p className="text-muted-foreground mt-1">
              Improve your typing speed and accuracy
            </p>
          </div>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Speed</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wpm} WPM</div>
              <p className="text-xs text-muted-foreground">Words per minute</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accuracy}%</div>
              <p className="text-xs text-muted-foreground">{errors} errors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <Timer className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(progress)}%</div>
              <p className="text-xs text-muted-foreground">
                {currentIndex}/{text.length} characters
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2" />

        {/* Text Display */}
        <Card>
          <CardHeader>
            <CardTitle>Practice Text</CardTitle>
            <CardDescription>
              Type the text below as accurately and quickly as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-muted/30 rounded-lg mb-4">
              <p className="text-lg leading-relaxed font-mono">
                {text.split("").map((char, index) => (
                  <span key={index} className={getCharClass(index)}>
                    {char}
                  </span>
                ))}
              </p>
            </div>

            <textarea
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-4 bg-background border border-border rounded-lg font-mono text-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="Start typing here..."
              disabled={isComplete}
            />

            {isComplete && (
              <div className="mt-4 p-4 bg-primary/10 border border-primary rounded-lg text-center">
                <h3 className="text-xl font-bold text-primary mb-2">
                  🎉 Congratulations!
                </h3>
                <p className="text-muted-foreground">
                  You completed the exercise with {wpm} WPM and {accuracy}% accuracy!
                </p>
                <Button onClick={handleReset} className="mt-4">
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Keyboard */}
        <Card>
          <CardHeader>
            <CardTitle>Virtual Keyboard</CardTitle>
            <CardDescription>
              Follow the highlighted keys to improve your typing technique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TypingKeyboard currentKey={currentKey} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TypingPractice;


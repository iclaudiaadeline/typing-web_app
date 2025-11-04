import { useState, useEffect } from "react";

interface TypingKeyboardProps {
  currentKey?: string;
}

const TypingKeyboard = ({ currentKey = "" }: TypingKeyboardProps) => {
  const [pressedKey, setPressedKey] = useState<string>("");

  useEffect(() => {
    setPressedKey(currentKey.toLowerCase());
  }, [currentKey]);

  const keyboardLayout = [
    ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
    ["Ctrl", "Win", "Alt", "Space", "Alt", "Fn", "Ctrl"],
  ];

  const getKeyClass = (key: string) => {
    const baseClass = "rounded border border-border bg-card text-foreground font-medium transition-all duration-150 flex items-center justify-center";
    const isPressed = pressedKey === key.toLowerCase() || 
                     (key === "Space" && pressedKey === " ");
    
    let sizeClass = "h-12 px-3 text-sm";
    
    // Special key sizes
    if (key === "Backspace") sizeClass = "h-12 px-6 text-xs";
    if (key === "Tab") sizeClass = "h-12 px-5 text-xs";
    if (key === "Caps") sizeClass = "h-12 px-5 text-xs";
    if (key === "Enter") sizeClass = "h-12 px-6 text-xs";
    if (key === "Shift") sizeClass = "h-12 px-8 text-xs";
    if (key === "Space") sizeClass = "h-12 flex-1 text-xs";
    if (key === "Ctrl" || key === "Alt" || key === "Win" || key === "Fn") sizeClass = "h-12 px-4 text-xs";

    const highlightClass = isPressed 
      ? "bg-primary text-primary-foreground shadow-lg scale-95 border-primary" 
      : "hover:bg-muted";

    return `${baseClass} ${sizeClass} ${highlightClass}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-muted/30 rounded-lg">
      <div className="space-y-2">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((key, keyIndex) => (
              <div
                key={`${rowIndex}-${keyIndex}`}
                className={getKeyClass(key)}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Finger position guide */}
      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>Keep your fingers on the home row: A S D F - J K L ;</p>
      </div>
    </div>
  );
};

export default TypingKeyboard;


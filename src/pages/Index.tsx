
import React, { useState, useEffect, useCallback, useRef } from 'react';
import TypingText from '@/components/TypingText';
import KeyboardLayout from '@/components/KeyboardLayout';
import Timer from '@/components/Timer';
import ResultsModal from '@/components/ResultsModal';
import { getRandomParagraph, calculateStats, playKeySound } from '@/utils/typingData';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [correctKeys, setCorrectKeys] = useState<Set<string>>(new Set());
  const [incorrectKeys, setIncorrectKeys] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, time: 0, wordsTyped: 0 });
  const [resetTimer, setResetTimer] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Initialize with a random paragraph
  useEffect(() => {
    const newText = getRandomParagraph();
    setCurrentText(newText);
  }, []);

  // Handle key press events for the visual keyboard
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setPressedKeys(prev => new Set([...prev, e.key.toLowerCase()]));
    
    // Play keystroke sound
    playKeySound();
    
    // Vibration API if supported
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    setPressedKeys(prev => {
      const updated = new Set([...prev]);
      updated.delete(e.key.toLowerCase());
      return updated;
    });
  }, []);

  // Track keys for visual feedback
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Start timer if this is the first character
    if (value.length === 1 && userInput.length === 0) {
      setIsTimerRunning(true);
    }
    
    // Update user input
    setUserInput(value);
    setCurrentIndex(value.length);
    
    // Track correct and incorrect keys for visual feedback
    if (value.length > 0) {
      const lastCharIndex = value.length - 1;
      const lastChar = value[lastCharIndex].toLowerCase();
      const expectedChar = currentText[lastCharIndex]?.toLowerCase();
      
      if (lastChar === expectedChar) {
        setCorrectKeys(prev => new Set([...prev, lastChar]));
        setIncorrectKeys(prev => {
          const updated = new Set([...prev]);
          updated.delete(lastChar);
          return updated;
        });
      } else {
        setIncorrectKeys(prev => new Set([...prev, lastChar]));
        setCorrectKeys(prev => {
          const updated = new Set([...prev]);
          updated.delete(lastChar);
          return updated;
        });
        setHasErrors(true);
      }
    }
    
    // Check if typing is completed and all characters are correct
    if (value.length === currentText.length) {
      // Check if the entire input matches the expected text
      const isCompleteMatch = value === currentText;
      
      if (isCompleteMatch) {
        setIsTimerRunning(false);
        const typingStats = calculateStats(currentText, value, time);
        setStats(typingStats);
        setShowResults(true);
      }
    }
  };

  // Reset and start a new paragraph
  const resetTyping = () => {
    const newText = getRandomParagraph();
    setCurrentText(newText);
    setUserInput('');
    setCurrentIndex(0);
    setIsTimerRunning(false);
    setTime(0);
    setCorrectKeys(new Set());
    setIncorrectKeys(new Set());
    setPressedKeys(new Set());
    setHasErrors(false);
    
    // Reset timer 
    setResetTimer(prev => !prev);
    
    // Focus on input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    toast({
      title: "New challenge",
      description: "Ready to improve your typing skills?",
      duration: 2000,
    });
  };

  // Update time from timer component
  const handleTimeUpdate = (seconds: number) => {
    setTime(seconds);
  };

  // Focus the input field when clicking anywhere on the page
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // On component mount
  useEffect(() => {
    focusInput();
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center py-8 px-4 gap-6 cursor-text"
      onClick={focusInput}
    >
      {/* Hidden input field to capture typing */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="opacity-0 absolute top-0 left-0 h-1 w-1"
        autoFocus
      />
      
      {/* Header with logo and timer */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          TypeTastic
        </h1>
        <Timer isRunning={isTimerRunning} onTimeUpdate={handleTimeUpdate} resetTimer={resetTimer} />
      </div>
      
      {/* Typing text area */}
      <div className="w-full max-w-4xl">
        <TypingText 
          text={currentText} 
          userInput={userInput}
          currentIndex={currentIndex} 
        />
      </div>
      
      {/* Visual keyboard */}
      <KeyboardLayout 
        pressedKeys={pressedKeys}
        currentKey={currentText[currentIndex]}
        correctKeys={correctKeys}
        incorrectKeys={incorrectKeys}
      />
      
      {/* Restart button */}
      <button 
        onClick={resetTyping}
        className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/90 transition-colors"
      >
        New Paragraph
      </button>
      
      {/* Results modal */}
      <ResultsModal 
        isOpen={showResults}
        onClose={() => {
          setShowResults(false);
          resetTyping();
        }}
        stats={stats}
      />
      
      {/* Instructions */}
      <div className="text-center mt-4 text-muted-foreground text-sm max-w-md">
        <p>Click anywhere or press any key to start typing.</p>
        <p>Complete the text to see your results.</p>
      </div>
    </div>
  );
};

export default Index;

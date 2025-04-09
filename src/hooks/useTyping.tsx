
import { useState, useEffect, useCallback } from 'react';
import { getRandomParagraph, calculateStats, playKeySound } from '@/utils/typingData';
import { useToast } from '@/components/ui/use-toast';

export const useTyping = () => {
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

  return {
    currentText,
    userInput,
    currentIndex,
    isTimerRunning,
    time,
    pressedKeys,
    correctKeys,
    incorrectKeys,
    showResults,
    stats,
    resetTimer,
    hasErrors,
    handleInputChange,
    resetTyping,
    handleTimeUpdate,
    setShowResults
  };
};


import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  userInput: string;
  currentIndex: number;
}

const TypingText: React.FC<TypingTextProps> = ({ text, userInput, currentIndex }) => {
  const [shakeClass, setShakeClass] = useState('');
  const [recentlyCorrectIndex, setRecentlyCorrectIndex] = useState<number | null>(null);

  // Effect to handle the shiny animation on correct key press
  useEffect(() => {
    if (userInput.length > 0 && userInput.length <= text.length) {
      const lastIndex = userInput.length - 1;
      if (userInput[lastIndex] === text[lastIndex]) {
        setRecentlyCorrectIndex(lastIndex);
        // Remove the animation class after animation completes
        const timer = setTimeout(() => {
          setRecentlyCorrectIndex(null);
        }, 500);
        return () => clearTimeout(timer);
      } else {
        // Add shake class when a wrong character is typed
        setShakeClass('shake-animation');
        // Remove the shake class after animation completes
        const timer = setTimeout(() => {
          setShakeClass('');
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [userInput, text]);

  return (
    <div className={`typing-text text-lg md:text-xl leading-relaxed rounded-lg p-6 bg-card shadow-sm mb-8 animate-fade-in ${shakeClass}`}>
      {text.split('').map((char, index) => {
        let className = "text-untyped";
        
        if (index < userInput.length) {
          className = userInput[index] === char ? "text-correct" : "text-incorrect";
        } else if (index === currentIndex) {
          className = "text-current border-b-2 border-typing-current";
        }
        
        // Add shiny animation class if this character was just correctly typed
        if (index === recentlyCorrectIndex) {
          className += " shiny-animation";
        }
        
        return (
          <span 
            key={index} 
            className={className}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default TypingText;


import React from 'react';

interface TypingTextProps {
  text: string;
  userInput: string;
  currentIndex: number;
}

const TypingText: React.FC<TypingTextProps> = ({ text, userInput, currentIndex }) => {
  return (
    <div className="typing-text text-lg md:text-xl leading-relaxed rounded-lg p-6 bg-card shadow-sm mb-8 animate-fade-in">
      {text.split('').map((char, index) => {
        let className = "text-untyped";
        
        if (index < userInput.length) {
          className = userInput[index] === char ? "text-correct" : "text-incorrect";
        } else if (index === currentIndex) {
          className = "text-current border-b-2 border-typing-current";
        }
        
        // Add space for better visibility
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

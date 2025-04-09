
import React from 'react';
import TypingText from './TypingText';

interface TypingAreaProps {
  currentText: string;
  userInput: string;
  currentIndex: number;
}

const TypingArea: React.FC<TypingAreaProps> = ({ 
  currentText, 
  userInput, 
  currentIndex 
}) => {
  return (
    <div className="w-full max-w-4xl p-6 bg-card/50 backdrop-blur-sm rounded-lg shadow-lg border border-border/30">
      <TypingText 
        text={currentText} 
        userInput={userInput}
        currentIndex={currentIndex} 
      />
    </div>
  );
};

export default TypingArea;

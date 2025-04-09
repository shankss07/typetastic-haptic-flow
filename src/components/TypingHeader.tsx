
import React from 'react';
import Timer from './Timer';

interface TypingHeaderProps {
  isTimerRunning: boolean;
  onTimeUpdate: (seconds: number) => void;
  resetTimer: boolean;
}

const TypingHeader: React.FC<TypingHeaderProps> = ({ 
  isTimerRunning, 
  onTimeUpdate, 
  resetTimer 
}) => {
  return (
    <div className="w-full max-w-4xl flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-violet-400 text-transparent bg-clip-text">
        Typewist
      </h1>
      <Timer 
        isRunning={isTimerRunning} 
        onTimeUpdate={onTimeUpdate} 
        resetTimer={resetTimer} 
      />
    </div>
  );
};

export default TypingHeader;

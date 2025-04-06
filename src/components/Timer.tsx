
import React, { useEffect, useState } from 'react';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate: (seconds: number) => void;
  resetTimer?: boolean;
}

const Timer: React.FC<TimerProps> = ({ isRunning, onTimeUpdate, resetTimer = false }) => {
  const [seconds, setSeconds] = useState(0);
  
  // Effect to handle timer reset
  useEffect(() => {
    if (resetTimer) {
      setSeconds(0);
    }
  }, [resetTimer]);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newTime = prev + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, onTimeUpdate]);
  
  // Format time as MM:SS
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="timer text-xl font-medium p-2 rounded-md bg-secondary inline-flex items-center gap-2">
      <span className="text-muted-foreground">Time:</span>
      <span className="font-mono">{formatTime(seconds)}</span>
    </div>
  );
};

export default Timer;

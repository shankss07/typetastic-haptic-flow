
import React from 'react';
import Timer from './Timer';

interface TypingHeaderProps {
  isTimerRunning: boolean;
  onTimeUpdate: (seconds: number) => void;
  resetTimer: boolean;
}
const styles = `
.btn-shine {

  transform: translate(-50%, -50%);
  padding: 12px 48px;
  color: #fff;
  background: linear-gradient(to right, #4d4d4d 0, #fff 10%, #4d4d4d 20%);
  background-position: 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s infinite linear;
  animation-fill-mode: forwards;
  -webkit-text-size-adjust: none;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}
@-moz-keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 180px;
  }
  100% {
    background-position: 180px;
  }
}
@-webkit-keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 180px;
  }
  100% {
    background-position: 180px;
  }
}
@-o-keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 180px;
  }
  100% {
    background-position: 180px;
  }
}
@keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 180px;
  }
  100% {
    background-position: 180px;
  }
}

`
const TypingHeader: React.FC<TypingHeaderProps> = ({ 
  isTimerRunning, 
  onTimeUpdate, 
  resetTimer 
}) => {
  return (
    <>
    <div className="w-full max-w-4xl flex justify-between items-center mb-6">
      <h1 className="text-3xl btn-shine">
    <style>{styles}</style>
        Typewist
      </h1>
      <Timer 
        isRunning={isTimerRunning} 
        onTimeUpdate={onTimeUpdate} 
        resetTimer={resetTimer} 
        />
    </div>
        </>
  );
};

export default TypingHeader;


import React from 'react';
import KeyboardLayout from '@/components/KeyboardLayout';
import ResultsModal from '@/components/ResultsModal';
import TypingInput from '@/components/TypingInput';
import TypingHeader from '@/components/TypingHeader';
import TypingArea from '@/components/TypingArea';
import TypingControls from '@/components/TypingControls';
import { useTyping } from '@/hooks/useTyping';

const Index = () => {
  const {
    currentText,
    userInput,
    currentIndex,
    isTimerRunning,
    pressedKeys,
    correctKeys,
    incorrectKeys,
    showResults,
    stats,
    resetTimer,
    handleInputChange,
    resetTyping,
    handleTimeUpdate,
    setShowResults
  } = useTyping();

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 gap-6 bg-gradient-to-b from-background to-secondary/40">
      {/* Hidden input field to capture typing */}
      <TypingInput 
        userInput={userInput}
        onInputChange={handleInputChange}
      />
      
      {/* Header with logo and timer */}
      <TypingHeader
        isTimerRunning={isTimerRunning}
        onTimeUpdate={handleTimeUpdate}
        resetTimer={resetTimer}
      />
      
      {/* Typing text area */}
      <TypingArea
        currentText={currentText}
        userInput={userInput}
        currentIndex={currentIndex}
      />
      
      {/* Visual keyboard */}
      <div className="w-full max-w-4xl mt-4">
        <KeyboardLayout 
          pressedKeys={pressedKeys}
          currentKey={currentText[currentIndex]}
          correctKeys={correctKeys}
          incorrectKeys={incorrectKeys}
        />
      </div>
      
      {/* Controls */}
      <TypingControls onRestart={resetTyping} />
      
      {/* Results modal */}
      <ResultsModal 
        isOpen={showResults}
        onClose={() => {
          setShowResults(false);
          resetTyping();
        }}
        stats={stats}
      />
    </div>
  );
};

export default Index;

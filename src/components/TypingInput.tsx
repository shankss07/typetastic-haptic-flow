
import React, { useRef, useEffect } from 'react';

interface TypingInputProps {
  userInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TypingInput: React.FC<TypingInputProps> = ({ userInput, onInputChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input field when component mounts
  useEffect(() => {
    focusInput();
  }, []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={onInputChange}
        className="opacity-0 absolute top-0 left-0 h-1 w-1"
        autoFocus
      />
      <div 
        className="absolute inset-0 cursor-text z-10"
        onClick={focusInput}
      />
    </>
  );
};

export default TypingInput;


import React, { useEffect, useState } from 'react';

interface KeyboardProps {
  pressedKeys: Set<string>;
  currentKey?: string;
  correctKeys: Set<string>;
  incorrectKeys: Set<string>;
}

const KeyboardLayout: React.FC<KeyboardProps> = ({ 
  pressedKeys, 
  currentKey,
  correctKeys,
  incorrectKeys
}) => {
  const keyboardRows = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Space']
  ];

  const getKeyClass = (key: string) => {
    let className = "key";
    
    // Adjust width for special keys
    if (key === 'Backspace') className += " w-16";
    else if (key === 'Tab') className += " w-14";
    else if (key === 'CapsLock') className += " w-16";
    else if (key === 'Enter') className += " w-16";
    else if (key === 'Shift') className += " w-20";
    else if (key === 'Space') className += " w-64";
    
    // Show pressed state
    if (pressedKeys.has(key.toLowerCase())) {
      className += " active";
    }

    // Show current key to press
    if (currentKey && key.toLowerCase() === currentKey.toLowerCase()) {
      className += " ring-2 ring-primary";
    }

    // Show correct/incorrect keys
    if (correctKeys.has(key.toLowerCase())) {
      className += " correct";
    } else if (incorrectKeys.has(key.toLowerCase())) {
      className += " incorrect";
    }
    
    return className;
  };

  return (
    <div className="keyboard-container flex flex-col items-center gap-1 w-full max-w-4xl mx-auto p-4 rounded-lg bg-card shadow-sm animate-slide-in">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 w-full justify-center">
          {row.map((key) => (
            <div key={key} className={getKeyClass(key)}>
              {key === 'Space' ? '' : key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KeyboardLayout;

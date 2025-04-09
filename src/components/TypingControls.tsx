
import React from 'react';

interface TypingControlsProps {
  onRestart: () => void;
}

const TypingControls: React.FC<TypingControlsProps> = ({ onRestart }) => {
  return (
    <>
      <button 
        onClick={onRestart}
        className="mt-8 px-8 py-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/80 transition-colors"
      >
        New Paragraph
      </button>
      
      <div className="text-center mt-4 text-muted-foreground text-sm max-w-md">
        <p>Click anywhere or press any key to start typing.</p>
        <p>Complete the text to see your results.</p>
      </div>
    </>
  );
};

export default TypingControls;

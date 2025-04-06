
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Trophy } from "lucide-react";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    wpm: number;
    accuracy: number;
    time: number;
    wordsTyped: number;
  };
}

const ResultsModal: React.FC<ResultsModalProps> = ({ isOpen, onClose, stats }) => {
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-primary" /> Results
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-6">
          <div className="bg-secondary rounded-lg p-4 text-center">
            <p className="text-muted-foreground text-sm">WPM</p>
            <p className="text-3xl font-bold text-primary">{Math.round(stats.wpm)}</p>
          </div>
          
          <div className="bg-secondary rounded-lg p-4 text-center">
            <p className="text-muted-foreground text-sm">Accuracy</p>
            <p className="text-3xl font-bold text-primary">{Math.round(stats.accuracy)}%</p>
          </div>
          
          <div className="bg-secondary rounded-lg p-4 text-center">
            <p className="text-muted-foreground text-sm">Time</p>
            <p className="text-2xl font-bold">{formatTime(stats.time)}</p>
          </div>
          
          <div className="bg-secondary rounded-lg p-4 text-center">
            <p className="text-muted-foreground text-sm">Words Typed</p>
            <p className="text-2xl font-bold">{stats.wordsTyped}</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            <Check className="mr-2 h-4 w-4" /> Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal;

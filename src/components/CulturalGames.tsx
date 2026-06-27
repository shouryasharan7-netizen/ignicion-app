"use client";

import React, { useState } from 'react';
// ... rest of imports
import React from 'react';
// Instead of import { Badge } from './ui/badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Target, 
  HelpCircle, 
  Palette, 
  Star, 
  Zap,
  CheckCircle2,
  RotateCcw,
  X,
  Play
} from 'lucide-react';

interface CraftMatchProps {
  selectedCraftItem: number | null;
  setSelectedCraftItem: (index: number | null) => void;
  matchedPairs: {craft: number, region: number}[];
  setMatchedPairs: (pairs: {craft: number, region: number}[]) => void;
  gameScore: number;
  setGameScore: (score: number) => void;
  onComplete: () => void;
}

export const CraftMatchGame: React.FC<CraftMatchProps> = ({
  selectedCraftItem,
  setSelectedCraftItem,
  matchedPairs,
  setMatchedPairs,
  gameScore,
  setGameScore,
  onComplete
}) => {
  const crafts = [
    { name: 'Dabu Printing', id: 0 },
    { name: 'Warli Art', id: 1 },
    { name: 'Chhau Masks', id: 2 },
    { name: 'Pattachitra', id: 3 }
  ];

  const regions = [
    { name: 'Rajasthan', id: 0 },
    { name: 'Maharashtra', id: 1 },
    { name: 'Odisha', id: 2 },
    { name: 'Odisha', id: 3 }
  ];

  const isCraftMatched = (id: number) => matchedPairs.some(p => p.craft === id);
  const isRegionMatched = (id: number) => matchedPairs.some(p => p.region === id);

  const handleCraftClick = (id: number) => {
    if (isCraftMatched(id)) return;
    setSelectedCraftItem(id);
  };

  const handleRegionClick = (id: number) => {
    if (isRegionMatched(id) || selectedCraftItem === null) return;
    
    // Check if match is correct
    if (selectedCraftItem === id) {
      setMatchedPairs([...matchedPairs, { craft: selectedCraftItem, region: id }]);
      setGameScore(gameScore + 25);
      setSelectedCraftItem(null);
    } else {
      // Wrong match, deselect after a moment
      setTimeout(() => setSelectedCraftItem(null), 500);
    }
  };

  const allMatched = matchedPairs.length === crafts.length;

  return (
    <div className="space-y-4">
      <p className="text-slate-900">Match each craft with its region of origin:</p>
      <div className="text-center text-sm text-purple-600">Select a craft, then select its region</div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <h4 className="text-slate-900 text-sm">Crafts</h4>
          {crafts.map((craft) => (
            <Card
              key={craft.id}
              onClick={() => handleCraftClick(craft.id)}
              className={`p-4 cursor-pointer transform hover:scale-105 transition-all shadow-lg border-2 ${
                isCraftMatched(craft.id)
                  ? 'bg-green-100 border-green-500'
                  : selectedCraftItem === craft.id
                  ? 'bg-purple-100 border-purple-500'
                  : 'bg-white border-amber-200 hover:bg-amber-50'
              }`}
            >
              <p className="text-amber-900 flex items-center justify-between">
                {craft.name}
                {isCraftMatched(craft.id) && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              </p>
            </Card>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="text-amber-900 text-sm">Regions</h4>
          {regions.map((region) => (
            <Card
              key={region.id}
              onClick={() => handleRegionClick(region.id)}
              className={`p-4 cursor-pointer transform hover:scale-105 transition-all shadow-lg border-2 ${
                isRegionMatched(region.id)
                  ? 'bg-green-100 border-green-500'
                  : 'bg-white border-amber-200 hover:bg-amber-50'
              }`}
            >
              <p className="text-amber-900 flex items-center justify-between">
                {region.name}
                {isRegionMatched(region.id) && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md">
          Score: {gameScore} / 100
        </Badge>
      </div>

      <Button
        onClick={onComplete}
        disabled={!allMatched}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
      >
        <CheckCircle2 className="w-5 h-5 mr-2" />
        {allMatched ? 'Complete & Earn 50 Points' : `Match All to Continue (${matchedPairs.length}/4)`}
      </Button>
    </div>
  );
};

interface PatternGameProps {
  targetPattern: number[];
  patternSelected: number[];
  setPatternSelected: (pattern: number[]) => void;
  onComplete: () => void;
  onReset: () => void;
}

export const PatternGame: React.FC<PatternGameProps> = ({
  targetPattern,
  patternSelected,
  setPatternSelected,
  onComplete,
  onReset
}) => {
  const handleCellClick = (index: number) => {
    if (patternSelected.includes(index)) {
      setPatternSelected(patternSelected.filter(p => p !== index));
    } else {
      setPatternSelected([...patternSelected, index]);
    }
  };

  const isCorrect = patternSelected.length === targetPattern.length &&
    patternSelected.every(p => targetPattern.includes(p));

  return (
    <div className="space-y-4">
      <p className="text-amber-900">Recreate the traditional pattern below:</p>
      
      {/* Target Pattern */}
      <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-lg">
        <h4 className="text-amber-900 text-sm mb-3 text-center">Target Pattern</h4>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square ${
                targetPattern.includes(i)
                  ? 'bg-gradient-to-br from-amber-600 to-orange-600 shadow-xl'
                  : 'bg-gradient-to-br from-gray-200 to-gray-300'
              } rounded-lg`}
            />
          ))}
        </div>
      </div>

      {/* User Pattern */}
      <div className="bg-white border-2 border-green-200 rounded-2xl p-6 shadow-lg">
        <h4 className="text-green-900 text-sm mb-3 text-center">Your Pattern (Click to toggle)</h4>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              onClick={() => handleCellClick(i)}
              className={`aspect-square ${
                patternSelected.includes(i)
                  ? 'bg-gradient-to-br from-green-600 to-emerald-600 scale-110 shadow-xl'
                  : 'bg-gradient-to-br from-green-100 to-emerald-100'
              } rounded-lg cursor-pointer hover:scale-110 transition-all`}
            />
          ))}
        </div>
      </div>

      <div className="text-center">
        <Badge className={`shadow-md ${isCorrect ? 'bg-green-600' : 'bg-amber-600'} text-white`}>
          {isCorrect ? '✓ Pattern Matched!' : `Selected: ${patternSelected.length}/${targetPattern.length}`}
        </Badge>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 border-2 border-amber-300"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button
          onClick={onComplete}
          disabled={!isCorrect}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Complete & Earn 100 Points
        </Button>
      </div>
    </div>
  );
};

interface MemoryGameProps {
  memoryCards: number[];
  memoryFlipped: number[];
  setMemoryFlipped: (cards: number[]) => void;
  memoryMatched: number[];
  setMemoryMatched: (cards: number[]) => void;
  memoryFirstCard: number | null;
  setMemoryFirstCard: (card: number | null) => void;
  gameScore: number;
  setGameScore: (score: number) => void;
  onComplete: () => void;
  onReset: () => void;
}

const craftEmojis = ['🎨', '🪡', '🏺', '🎭', '🪔', '🧵', '🎪', '🪕'];

export const MemoryGame: React.FC<MemoryGameProps> = ({
  memoryCards,
  memoryFlipped,
  setMemoryFlipped,
  memoryMatched,
  setMemoryMatched,
  memoryFirstCard,
  setMemoryFirstCard,
  gameScore,
  setGameScore,
  onComplete,
  onReset
}) => {
  const handleCardClick = (index: number) => {
    if (memoryFlipped.includes(index) || memoryMatched.includes(index)) return;
    if (memoryFlipped.length >= 2) return;

    const newFlipped = [...memoryFlipped, index];
    setMemoryFlipped(newFlipped);

    if (memoryFirstCard === null) {
      setMemoryFirstCard(index);
    } else {
      // Check for match
      if (memoryCards[memoryFirstCard] === memoryCards[index]) {
        // Match found!
        setTimeout(() => {
          setMemoryMatched([...memoryMatched, memoryFirstCard, index]);
          setMemoryFlipped([]);
          setMemoryFirstCard(null);
          setGameScore(gameScore + 10);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setMemoryFlipped([]);
          setMemoryFirstCard(null);
        }, 1000);
      }
    }
  };

  const allMatched = memoryMatched.length === memoryCards.length;

  return (
    <div className="space-y-4">
      <p className="text-amber-900">Find all the matching pairs of cultural symbols!</p>
      
      <div className="grid grid-cols-4 gap-3">
        {memoryCards.map((cardValue, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square cursor-pointer hover:scale-110 transition-all transform flex items-center justify-center shadow-lg text-4xl ${
              memoryFlipped.includes(index) || memoryMatched.includes(index)
                ? 'bg-gradient-to-br from-amber-600 to-orange-600'
                : 'bg-gradient-to-br from-gray-400 to-gray-500'
            }`}
          >
            {(memoryFlipped.includes(index) || memoryMatched.includes(index)) && (
              <span>{craftEmojis[cardValue]}</span>
            )}
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-amber-600 text-sm flex items-center justify-center gap-2">
          <Star className="w-4 h-4" />
          Matches: {memoryMatched.length / 2}/8 | Score: {gameScore}
        </p>
        <div className="flex gap-3">
          <Button
            onClick={onReset}
            variant="outline"
            className="flex-1 border-2 border-amber-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
          <Button
            onClick={onComplete}
            disabled={!allMatched}
            className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            {allMatched ? 'Complete & Earn 60 Points' : `Find All Pairs (${memoryMatched.length / 2}/8)`}
          </Button>
        </div>
      </div>
    </div>
  );
};

interface RunnerGameProps {
  runnerPosition: number;
  setRunnerPosition: (pos: number) => void;
  runnerJumping: boolean;
  setRunnerJumping: (jumping: boolean) => void;
  runnerObstacles: number[];
  setRunnerObstacles: (obstacles: number[]) => void;
  runnerGameOver: boolean;
  setRunnerGameOver: (gameOver: boolean) => void;
  runnerScore: number;
  setRunnerScore: (score: number) => void;
  onComplete: () => void;
  onRestart: () => void;
}

export const RunnerGame: React.FC<RunnerGameProps> = ({
  runnerPosition,
  setRunnerPosition,
  runnerJumping,
  setRunnerJumping,
  runnerObstacles,
  setRunnerObstacles,
  runnerGameOver,
  setRunnerGameOver,
  runnerScore,
  setRunnerScore,
  onComplete,
  onRestart
}) => {
  const [gameStarted, setGameStarted] = React.useState(false);

  React.useEffect(() => {
    if (!gameStarted || runnerGameOver) return;

    // Game loop
    const gameInterval = setInterval(() => {
      // Move obstacles
      setRunnerObstacles(prev => {
        const newObstacles = prev.map(pos => pos - 5).filter(pos => pos > -50);
        
        // Add new obstacle randomly
        if (Math.random() < 0.02 && (newObstacles.length === 0 || newObstacles[newObstacles.length - 1] < 450)) {
          newObstacles.push(500);
        }
        
        return newObstacles;
      });

      // Check collision
      runnerObstacles.forEach(obstaclePos => {
        if (obstaclePos < 80 && obstaclePos > 20 && !runnerJumping) {
          setRunnerGameOver(true);
          setGameStarted(false);
        }
      });

      // Increase score
      setRunnerScore(prev => prev + 1);
    }, 50);

    return () => clearInterval(gameInterval);
  }, [gameStarted, runnerGameOver, runnerJumping, runnerObstacles]);

  // Handle jump
  React.useEffect(() => {
    if (!runnerJumping) return;

    const jumpTimeout = setTimeout(() => {
      setRunnerJumping(false);
    }, 500);

    return () => clearTimeout(jumpTimeout);
  }, [runnerJumping]);

  const handleJump = () => {
    if (!runnerGameOver && !runnerJumping) {
      setRunnerJumping(true);
    }
  };

  const handleStart = () => {
    setGameStarted(true);
    setRunnerGameOver(false);
    setRunnerScore(0);
    setRunnerObstacles([]);
  };

  const handleRestartClick = () => {
    onRestart();
    setGameStarted(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-amber-900 text-center">Jump over obstacles in your heritage journey!</p>
      
      {/* Game Canvas */}
      <div 
        className="relative h-64 bg-gradient-to-b from-amber-100 to-orange-200 rounded-2xl border-2 border-amber-300 overflow-hidden cursor-pointer"
        onClick={handleJump}
        onKeyDown={(e) => e.key === ' ' && handleJump()}
        tabIndex={0}
      >
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-800"></div>
        
        {/* Runner */}
        <div 
          className={`absolute left-12 w-12 h-12 bg-gradient-to-br from-red-600 to-rose-600 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
            runnerJumping ? 'bottom-32' : 'bottom-6'
          }`}
        >
          🏃
        </div>

        {/* Obstacles */}
        {runnerObstacles.map((pos, index) => (
          <div
            key={index}
            className="absolute bottom-6 w-8 h-12 bg-gradient-to-b from-gray-700 to-gray-900 rounded text-center flex items-center justify-center text-2xl"
            style={{ left: `${pos}px` }}
          >
            🏛️
          </div>
        ))}

        {/* Score */}
        <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-lg shadow-lg">
          <p className="text-amber-900">Score: {runnerScore}</p>
        </div>

        {/* Game Over / Start Screen */}
        {(!gameStarted || runnerGameOver) && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              {runnerGameOver && (
                <>
                  <h3 className="text-3xl">Game Over!</h3>
                  <p className="text-xl">Score: {runnerScore}</p>
                </>
              )}
              {!gameStarted && !runnerGameOver && (
                <h3 className="text-2xl">Click or press Space to jump!</h3>
              )}
              <Button
                onClick={gameStarted ? handleRestartClick : handleStart}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                {gameStarted ? 'Play Again' : 'Start Game'}
              </Button>
            </div>
          </div>
        )}
      </div>

      <p className="text-amber-600 text-sm text-center">Click anywhere or press Space to jump over heritage monuments!</p>

      {runnerScore >= 500 && !runnerGameOver && (
        <Button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg transform hover:scale-105 transition-all"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Complete & Earn 80 Points (Score: {runnerScore})
        </Button>
      )}
    </div>
  );
};

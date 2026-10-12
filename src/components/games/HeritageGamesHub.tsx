"use client";

import React, { useState, useEffect } from 'react';
import { Language, Quest } from '@/types/heritage';
import { initialQuests, triviaQuestions, sacredMotifs } from '@/data/heritageData';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { 
  Trophy, 
  Target, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Zap, 
  Star, 
  Sparkles, 
  Award, 
  Timer,
  ChevronRight,
  Flame,
  Brain
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface HeritageGamesHubProps {
  currentLanguage: Language;
  onEarnPoints: (points: number, reason: string) => void;
}

export const HeritageGamesHub: React.FC<HeritageGamesHubProps> = ({
  currentLanguage,
  onEarnPoints
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'match' | 'memory' | 'quiz' | 'quests'>('match');
  const [quests, setQuests] = useState<Quest[]>(initialQuests);

  // ----------------------------------------------------
  // GAME 1: CRAFT-TO-REGION MATCHER
  // ----------------------------------------------------
  const craftPairs = [
    { craftId: 1, craftName: 'Dabu Mud-Resist', region: 'Rajasthan' },
    { craftId: 2, craftName: 'Warli Sacred Art', region: 'Maharashtra' },
    { craftId: 3, craftName: 'Purulia Chhau Mask', region: 'West Bengal' },
    { craftId: 4, craftName: 'Pattachitra Scroll', region: 'Odisha' },
    { craftId: 5, craftName: 'Kalamkari Reed Pen', region: 'Andhra Pradesh' },
    { craftId: 6, craftName: 'Tanjore 22K Gold Foil', region: 'Tamil Nadu' }
  ];

  const [selectedCraftId, setSelectedCraftId] = useState<number | null>(null);
  const [matchedCraftIds, setMatchedCraftIds] = useState<number[]>([]);
  const [matchStreak, setMatchStreak] = useState<number>(0);

  const handleSelectCraft = (id: number) => {
    if (matchedCraftIds.includes(id)) return;
    soundManager.playClick();
    setSelectedCraftId(id);
  };

  const handleSelectRegion = (regionName: string) => {
    if (selectedCraftId === null) {
      toast.info('First select a craft on the left!');
      return;
    }

    const targetPair = craftPairs.find((p) => p.craftId === selectedCraftId);
    if (targetPair && targetPair.region === regionName) {
      // Correct Match!
      soundManager.playMatch();
      const updated = [...matchedCraftIds, selectedCraftId];
      setMatchedCraftIds(updated);
      setSelectedCraftId(null);
      setMatchStreak(matchStreak + 1);

      toast.success(`Correct Match: ${targetPair.craftName} originates from ${regionName}! +20 XP`);
      onEarnPoints(20, `Matched ${targetPair.craftName}`);

      if (updated.length === craftPairs.length) {
        soundManager.playSuccess();
        toast.success('🎉 Magnificent! All 6 heritage crafts matched! Bonus +100 XP awarded!');
        onEarnPoints(100, 'Mastered Craft-Origin Geography');
      }
    } else {
      // Incorrect Match
      soundManager.playError();
      setMatchStreak(0);
      toast.error('Not quite! Try another state or revisit the craft archives.');
      setTimeout(() => setSelectedCraftId(null), 400);
    }
  };

  const resetMatchGame = () => {
    soundManager.playClick();
    setSelectedCraftId(null);
    setMatchedCraftIds([]);
    setMatchStreak(0);
  };

  // ----------------------------------------------------
  // GAME 2: SACRED MOTIF MEMORY CHALLENGE
  // ----------------------------------------------------
  interface MemoryCard {
    uid: number;
    motifId: number;
    name: string;
    symbol: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [firstFlippedIndex, setFirstFlippedIndex] = useState<number | null>(null);
  const [secondFlippedIndex, setSecondFlippedIndex] = useState<number | null>(null);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const initMemoryGame = () => {
    // 6 pairs = 12 cards
    const selectedMotifs = sacredMotifs.slice(0, 6);
    const deck: MemoryCard[] = [];
    let counter = 0;

    selectedMotifs.forEach((m) => {
      deck.push({ uid: counter++, motifId: m.id, name: m.name, symbol: m.symbol, isFlipped: false, isMatched: false });
      deck.push({ uid: counter++, motifId: m.id, name: m.name, symbol: m.symbol, isFlipped: false, isMatched: false });
    });

    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setMemoryCards(deck);
    setFirstFlippedIndex(null);
    setSecondFlippedIndex(null);
    setMovesCount(0);
    setIsEvaluating(false);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (isEvaluating) return;
    const card = memoryCards[index];
    if (card.isFlipped || card.isMatched) return;

    soundManager.playClick();

    if (firstFlippedIndex === null) {
      // First card flipped
      const updated = [...memoryCards];
      updated[index].isFlipped = true;
      setMemoryCards(updated);
      setFirstFlippedIndex(index);
    } else if (secondFlippedIndex === null && index !== firstFlippedIndex) {
      // Second card flipped
      const updated = [...memoryCards];
      updated[index].isFlipped = true;
      setMemoryCards(updated);
      setSecondFlippedIndex(index);
      setMovesCount((prev) => prev + 1);
      setIsEvaluating(true);

      const firstCard = updated[firstFlippedIndex];
      const secondCard = updated[index];

      if (firstCard.motifId === secondCard.motifId) {
        // Matched!
        setTimeout(() => {
          soundManager.playCoin();
          const matchDeck = [...memoryCards];
          matchDeck[firstFlippedIndex].isMatched = true;
          matchDeck[index].isMatched = true;
          setMemoryCards(matchDeck);
          setFirstFlippedIndex(null);
          setSecondFlippedIndex(null);
          setIsEvaluating(false);

          toast.success(`Matched ${firstCard.name}! +15 XP`);
          onEarnPoints(15, `Matched ${firstCard.name} motif`);

          const allDone = matchDeck.every((c) => c.isMatched);
          if (allDone) {
            soundManager.playSuccess();
            toast.success('🎉 Sacred Memory Challenge completed in ' + (movesCount + 1) + ' moves! +80 XP awarded!');
            onEarnPoints(80, 'Completed Sacred Motif Memory Challenge');
          }
        }, 500);
      } else {
        // Did not match
        setTimeout(() => {
          soundManager.playError();
          const revertDeck = [...memoryCards];
          revertDeck[firstFlippedIndex].isFlipped = false;
          revertDeck[index].isFlipped = false;
          setMemoryCards(revertDeck);
          setFirstFlippedIndex(null);
          setSecondFlippedIndex(null);
          setIsEvaluating(false);
        }, 900);
      }
    }
  };

  // ----------------------------------------------------
  // GAME 3: HERITAGE SCHOLAR TRIVIA
  // ----------------------------------------------------
  const [currentTriviaIdx, setCurrentTriviaIdx] = useState<number>(0);
  const [selectedTriviaOpt, setSelectedTriviaOpt] = useState<number | null>(null);
  const [hasAnsweredTrivia, setHasAnsweredTrivia] = useState<boolean>(false);
  const [triviaScore, setTriviaScore] = useState<number>(0);

  const currentTrivia = triviaQuestions[currentTriviaIdx];

  const handleSelectTriviaOption = (optIdx: number) => {
    if (hasAnsweredTrivia) return;
    soundManager.playClick();
    setSelectedTriviaOpt(optIdx);
    setHasAnsweredTrivia(true);

    if (optIdx === currentTrivia.correctIndex) {
      soundManager.playSuccess();
      setTriviaScore((prev) => prev + 25);
      toast.success('Brilliant! Correct answer +25 XP');
      onEarnPoints(25, `Answered trivia correctly`);
    } else {
      soundManager.playError();
      toast.error('Incorrect. Read the scholarly explanation below!');
    }
  };

  const handleNextTrivia = () => {
    soundManager.playClick();
    setSelectedTriviaOpt(null);
    setHasAnsweredTrivia(false);
    if (currentTriviaIdx < triviaQuestions.length - 1) {
      setCurrentTriviaIdx(currentTriviaIdx + 1);
    } else {
      soundManager.playSuccess();
      toast.success(`Trivia arena concluded with score: ${triviaScore} / ${triviaQuestions.length * 25}!`);
    }
  };

  const resetTrivia = () => {
    soundManager.playClick();
    setCurrentTriviaIdx(0);
    setSelectedTriviaOpt(null);
    setHasAnsweredTrivia(false);
    setTriviaScore(0);
  };

  // ----------------------------------------------------
  // QUESTS COMPLETION HANDLER
  // ----------------------------------------------------
  const handleClaimQuest = (questId: number) => {
    soundManager.playSuccess();
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          onEarnPoints(q.rewardPoints, `Completed Quest: ${q.title}`);
          toast.success(`Badge Unlocked: [${q.badgeReward}]! +${q.rewardPoints} XP`);
          return { ...q, progress: 100, completed: true };
        }
        return q;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Games Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-amber-950 text-white shadow-xl border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">
              {getTranslation('gamesHubTitle', currentLanguage)}
            </h2>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Test your knowledge, unlock soulbound cultural badges, and climb the Heritage Scholar leaderboard.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          {[
            { id: 'match', label: 'Craft Matcher', icon: Target },
            { id: 'memory', label: 'Motif Memory', icon: Brain },
            { id: 'quiz', label: 'Scholar Quiz', icon: HelpCircle },
            { id: 'quests', label: 'Active Quests', icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveSubTab(tab.id as typeof activeSubTab);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E65100] to-[#FF8A00] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB 1: CRAFT-TO-REGION MATCHER */}
      {activeSubTab === 'match' && (
        <Card className="p-6 rounded-2xl bg-white border-amber-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#E65100]" />
                {getTranslation('matchGameTitle', currentLanguage)}
              </h3>
              <p className="text-xs text-slate-500">
                Click a traditional craft on the left, then click its authentic region on the right.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                <Flame className="w-4 h-4 text-[#E65100]" />
                <span>Streak: {matchStreak}</span>
              </div>
              <Button size="sm" variant="outline" onClick={resetMatchGame} className="text-xs border-slate-300">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Crafts */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Select Craft:
              </span>
              {craftPairs.map((pair) => {
                const isMatched = matchedCraftIds.includes(pair.craftId);
                const isSelected = selectedCraftId === pair.craftId;

                return (
                  <button
                    key={pair.craftId}
                    disabled={isMatched}
                    onClick={() => handleSelectCraft(pair.craftId)}
                    className={`w-full p-4 rounded-xl text-left font-medium text-sm transition-all border-2 flex items-center justify-between shadow-2xs ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 opacity-80 cursor-default'
                        : isSelected
                        ? 'bg-amber-100 border-[#E65100] text-amber-950 scale-102 ring-2 ring-orange-200'
                        : 'bg-white hover:bg-amber-50/60 border-slate-200 hover:border-amber-300 text-slate-800'
                    }`}
                  >
                    <span>{pair.craftName}</span>
                    {isMatched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isSelected ? (
                      <span className="w-2 h-2 rounded-full bg-[#E65100] animate-ping" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Right: Regions */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Match with Heritage Region:
              </span>
              {[
                'Maharashtra',
                'Rajasthan',
                'West Bengal',
                'Odisha',
                'Tamil Nadu',
                'Andhra Pradesh'
              ].map((regionName, idx) => {
                const isAlreadyMatched = craftPairs.some(
                  (p) => p.region === regionName && matchedCraftIds.includes(p.craftId)
                );

                return (
                  <button
                    key={idx}
                    disabled={isAlreadyMatched}
                    onClick={() => handleSelectRegion(regionName)}
                    className={`w-full p-4 rounded-xl text-left font-medium text-sm transition-all border-2 flex items-center justify-between shadow-2xs ${
                      isAlreadyMatched
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 opacity-80 cursor-default'
                        : 'bg-white hover:bg-indigo-50/60 border-slate-200 hover:border-indigo-300 text-slate-800'
                    }`}
                  >
                    <span>{regionName}</span>
                    {isAlreadyMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* SUB-TAB 2: SACRED MOTIF MEMORY CHALLENGE */}
      {activeSubTab === 'memory' && (
        <Card className="p-6 rounded-2xl bg-white border-amber-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                {getTranslation('memoryGameTitle', currentLanguage)}
              </h3>
              <p className="text-xs text-slate-500">
                Flip the cards to pair identical sacred symbols (Kalash, Peacock, Warli, Lotus, Paisley, Elephant).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                Moves: {movesCount}
              </span>
              <Button size="sm" variant="outline" onClick={initMemoryGame} className="text-xs border-slate-300">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Shuffle Deck
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {memoryCards.map((card, idx) => {
              const showFace = card.isFlipped || card.isMatched;

              return (
                <div
                  key={card.uid}
                  role="button"
                  tabIndex={card.isMatched ? -1 : 0}
                  aria-label={card.isMatched ? `${card.name} already matched` : card.isFlipped ? `${card.name} revealed` : `Sacred symbol card ${idx + 1}`}
                  onClick={() => handleCardClick(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(idx);
                    }
                  }}
                  className={`aspect-square rounded-xl cursor-pointer perspective-1000 transition-all transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-amber-500 outline-none duration-200 ${
                    card.isMatched ? 'opacity-85 pointer-events-none' : ''
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-xl flex flex-col items-center justify-center p-2 border-2 shadow-sm transition-all duration-300 ${
                      showFace
                        ? 'bg-gradient-to-tr from-amber-50 to-orange-50 border-amber-400 rotate-0'
                        : 'bg-gradient-to-tr from-indigo-900 to-slate-900 border-indigo-400/40 text-amber-300'
                    }`}
                  >
                    {showFace ? (
                      <>
                        <span className="text-3xl mb-1">{card.symbol}</span>
                        <span className="text-[10px] text-center font-bold text-amber-950 line-clamp-1">
                          {card.name.split(' ')[0]}
                        </span>
                      </>
                    ) : (
                      <span className="font-serif text-xl font-bold opacity-40">ॐ</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* SUB-TAB 3: HERITAGE SCHOLAR TRIVIA */}
      {activeSubTab === 'quiz' && (
        <Card className="p-6 rounded-2xl bg-white border-amber-200 shadow-md space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                Tier: {currentTrivia.tier}
              </span>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-1">
                Question {currentTriviaIdx + 1} of {triviaQuestions.length}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500">Current Score</span>
              <p className="font-mono text-base font-bold text-[#E65100]">{triviaScore} pts</p>
            </div>
          </div>

          <p className="text-slate-900 font-medium text-base leading-relaxed">
            {currentTrivia.question}
          </p>

          <div className="space-y-2.5">
            {currentTrivia.options.map((opt, optIdx) => {
              let btnStyle = 'bg-white hover:bg-amber-50/70 border-slate-200 text-slate-800';
              if (hasAnsweredTrivia) {
                if (optIdx === currentTrivia.correctIndex) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-semibold';
                } else if (selectedTriviaOpt === optIdx) {
                  btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 line-through';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={hasAnsweredTrivia}
                  onClick={() => handleSelectTriviaOption(optIdx)}
                  className={`w-full p-4 rounded-xl text-left text-sm transition-all border-2 flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {hasAnsweredTrivia && optIdx === currentTrivia.correctIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {hasAnsweredTrivia && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 animate-fade-in">
              <span className="font-bold flex items-center gap-1.5 text-amber-950">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Scholarly Lore:
              </span>
              <p className="leading-relaxed">{currentTrivia.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {hasAnsweredTrivia && (
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleNextTrivia}
                className="bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white shadow-md text-xs"
              >
                {currentTriviaIdx < triviaQuestions.length - 1 ? 'Next Question' : 'Complete Arena'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </Card>
      )}

      {/* SUB-TAB 4: ACTIVE QUESTS */}
      {activeSubTab === 'quests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quests.map((quest) => (
            <Card key={quest.id} className="p-5 rounded-2xl bg-white border-amber-200/80 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-2xl shadow-2xs">
                    {quest.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                      {quest.category}
                    </span>
                    <h4 className="font-serif font-bold text-slate-900 text-base">
                      {quest.title}
                    </h4>
                  </div>
                </div>

                <Badge variant="outline" className="border-amber-300 text-amber-800 bg-amber-50 text-xs font-semibold">
                  +{quest.rewardPoints} XP
                </Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {quest.description}
              </p>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium">Progress</span>
                  <span className="font-mono font-bold text-slate-800">{quest.progress}%</span>
                </div>
                <Progress value={quest.progress} className="h-2 bg-slate-100" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 text-amber-900 font-medium">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Unlocks: {quest.badgeReward}</span>
                </div>

                <Button
                  size="sm"
                  disabled={quest.completed}
                  onClick={() => handleClaimQuest(quest.id)}
                  className={`text-xs ${
                    quest.completed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                      : 'bg-gradient-to-r from-[#E65100] to-[#FF8A00] text-white shadow-xs'
                  }`}
                >
                  {quest.completed ? 'Claimed ✓' : 'Complete & Claim'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

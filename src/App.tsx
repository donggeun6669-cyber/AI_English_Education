import React, { useState, useEffect } from 'react';
import { GameLevel, GameHistoryItem, Sentence } from './types';
import { getQuestionsForLevel } from './data/sentences';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { AnimalSanctuaryModal } from './components/AnimalSanctuaryModal';
import { sound } from './utils/audio';

type Screen = 'start' | 'game' | 'result';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [selectedLevel, setSelectedLevel] = useState<GameLevel>(1);
  const [activeQuestions, setActiveQuestions] = useState<Sentence[]>([]);
  const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([]);
  const [finalScore, setFinalScore] = useState<number>(0);

  // Sound Mute State
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // Sanctuary Modal
  const [isSanctuaryOpen, setIsSanctuaryOpen] = useState<boolean>(false);

  // Persistent Stats
  const [highScore, setHighScore] = useState<number>(0);
  const [rescuedAnimalIds, setRescuedAnimalIds] = useState<string[]>([]);

  // Load persistent stats on mount
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('help_animals_home_high_score') || localStorage.getItem('save_animals_high_score');
      if (savedScore) setHighScore(parseInt(savedScore, 10));

      const savedRescued = localStorage.getItem('help_animals_home_rescued_ids') || localStorage.getItem('save_animals_rescued_ids');
      if (savedRescued) setRescuedAnimalIds(JSON.parse(savedRescued));
    } catch {}
  }, []);

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  // Start game handler
  const handleStartGame = (lvl: GameLevel = selectedLevel) => {
    const questions = getQuestionsForLevel(lvl);
    setActiveQuestions(questions);
    setSelectedLevel(lvl);
    setCurrentScreen('game');
  };

  // Game complete handler
  const handleFinishGame = (history: GameHistoryItem[], score: number) => {
    setGameHistory(history);
    setFinalScore(score);
    setCurrentScreen('result');

    // Update high score
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('help_animals_home_high_score', String(score));
      } catch {}
    }

    // Collect newly rescued animal IDs
    const newlyRescued = history
      .filter((h) => h.isCorrect)
      .map((h) => h.animal.id);

    if (newlyRescued.length > 0) {
      setRescuedAnimalIds((prev) => {
        const set = new Set([...prev, ...newlyRescued]);
        const updated = Array.from(set);
        try {
          localStorage.setItem('help_animals_home_rescued_ids', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }
  };

  const handleRestart = () => {
    handleStartGame(selectedLevel);
  };

  const handleNextLevel = () => {
    if (selectedLevel < 3) {
      const nextLvl = (selectedLevel + 1) as GameLevel;
      setSelectedLevel(nextLvl);
      handleStartGame(nextLvl);
    }
  };

  const handleGoHome = () => {
    setCurrentScreen('start');
  };

  return (
    <div className="min-h-screen w-full bg-stone-900/5 flex items-center justify-center p-0 sm:py-6">
      {/* Smartphone frame container */}
      <main className="w-full max-w-md min-h-screen sm:min-h-[640px] sm:h-[820px] bg-amber-50/50 sm:rounded-3xl shadow-xl border-x sm:border border-amber-200/60 overflow-hidden flex flex-col justify-between relative backdrop-blur-sm">
        {currentScreen === 'start' && (
          <StartScreen
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onStartGame={() => handleStartGame(selectedLevel)}
            onOpenSanctuary={() => setIsSanctuaryOpen(true)}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            totalRescuedCount={rescuedAnimalIds.length}
            highScore={highScore}
          />
        )}

        {currentScreen === 'game' && (
          <GameScreen
            level={selectedLevel}
            questions={activeQuestions}
            onFinishGame={handleFinishGame}
            onQuitToMenu={handleGoHome}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            level={selectedLevel}
            finalScore={finalScore}
            history={gameHistory}
            onRestart={handleRestart}
            onGoHome={handleGoHome}
            onNextLevel={selectedLevel < 3 ? handleNextLevel : undefined}
          />
        )}
      </main>

      {/* Sanctuary Gallery Modal */}
      <AnimalSanctuaryModal
        isOpen={isSanctuaryOpen}
        onClose={() => setIsSanctuaryOpen(false)}
        rescuedAnimalIds={rescuedAnimalIds}
      />
    </div>
  );
}

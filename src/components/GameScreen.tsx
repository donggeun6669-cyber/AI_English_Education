import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  MapPin,
  Compass,
} from 'lucide-react';
import { Sentence, Animal, GameHistoryItem, GameLevel } from '../types';
import { LEVEL_CONFIGS, shuffleArray } from '../data/sentences';
import { getAnimalById } from '../data/animals';
import { SunSettingSky } from './SunSettingSky';
import { AnimalRoadToHome } from './AnimalRoadToHome';
import { sound } from '../utils/audio';
import { tts } from '../utils/tts';

interface GameScreenProps {
  level: GameLevel;
  questions: Sentence[];
  onFinishGame: (history: GameHistoryItem[], finalScore: number) => void;
  onQuitToMenu: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  level,
  questions,
  onFinishGame,
  onQuitToMenu,
  isMuted,
  onToggleMute,
}) => {
  const config = LEVEL_CONFIGS[level];

  // Current question index (0-based)
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSentence = questions[currentIndex];
  const currentAnimal: Animal = getAnimalById(currentSentence?.animalId);

  // Score & Streak
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  // Slots state: array of (string | null) for the sentence
  const [placedWords, setPlacedWords] = useState<(string | null)[]>([]);

  // Available word pieces pool (shuffled)
  const [availableWords, setAvailableWords] = useState<{ id: string; text: string }[]>([]);

  // Feedback status
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'wrong' | 'timeout'>('idle');
  // Indices of wrong slots (0-indexed)
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);
  // Message shown for feedback
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  // Show hint state
  const [showHint, setShowHint] = useState<boolean>(false);

  // Timer states
  const [timeLeft, setTimeLeft] = useState<number>(config.timePerQuestion);
  const timerRef = useRef<number | null>(null);
  const nextTimerRef = useRef<number | null>(null);

  // History tracking
  const [history, setHistory] = useState<GameHistoryItem[]>([]);
  const attemptsRef = useRef<number>(1);
  const timeSpentRef = useRef<number>(0);

  // Initialize a new question
  const loadQuestion = useCallback((sentence: Sentence) => {
    // Target slots equal to number of words in sentence
    setPlacedWords(new Array(sentence.words.length).fill(null));

    // Shuffle word pieces
    const pieces = sentence.words.map((w, idx) => ({
      id: `${sentence.id}-${idx}-${w}`,
      text: w,
    }));
    setAvailableWords(shuffleArray(pieces));

    setFeedbackStatus('idle');
    setWrongIndices([]);
    setFeedbackMessage('');
    setShowHint(false);
    setTimeLeft(config.timePerQuestion);
    attemptsRef.current = 1;
    timeSpentRef.current = 0;
  }, [config.timePerQuestion]);

  // Load question when index changes
  useEffect(() => {
    if (currentSentence) {
      loadQuestion(currentSentence);
    }
  }, [currentIndex, currentSentence, loadQuestion]);

  // Handle Sunset Timeout (Time Ran Out)
  const handleTimeout = useCallback(() => {
    sound.playGentleSunset();
    setFeedbackStatus('timeout');
    setFeedbackMessage('🌅 해가 저물었어요! 바른 길 표지판을 보고 동물 친구가 무사히 집에 도착했어요.');
    setCombo(0);

    // Reveal correct words on the road signpost
    if (currentSentence) {
      setPlacedWords(currentSentence.words);
      setAvailableWords([]);

      // Read correct sentence with TTS warmly
      if (!isMuted) {
        setTimeout(() => {
          tts.speak(currentSentence.words.join(' '));
        }, 350);
      }
    }

    // Record history
    const userOrder = placedWords.map((w) => w || '(미완성)');
    setHistory((prev) => [
      ...prev,
      {
        sentence: currentSentence,
        animal: currentAnimal,
        userOrder,
        isCorrect: false,
        attempts: attemptsRef.current,
        timeSpent: config.timePerQuestion,
      },
    ]);

    // Auto advance after giving time to observe correct sentence
    if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
    nextTimerRef.current = window.setTimeout(() => {
      tts.stop();
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onFinishGame(
          [
            ...history,
            {
              sentence: currentSentence,
              animal: currentAnimal,
              userOrder,
              isCorrect: false,
              attempts: attemptsRef.current,
              timeSpent: config.timePerQuestion,
            },
          ],
          score
        );
      }
    }, 3400);
  }, [currentIndex, currentSentence, currentAnimal, placedWords, config.timePerQuestion, history, isMuted, onFinishGame, questions.length, score]);

  // Keep latest handleTimeout in ref so timer doesn't restart when placedWords changes
  const handleTimeoutRef = useRef(handleTimeout);
  useEffect(() => {
    handleTimeoutRef.current = handleTimeout;
  }, [handleTimeout]);

  // Sunset Countdown Timer
  useEffect(() => {
    if (feedbackStatus === 'correct' || feedbackStatus === 'timeout') {
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeoutRef.current();
          return 0;
        }
        if (prev <= 5) {
          sound.playTick();
        }
        timeSpentRef.current += 1;
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [feedbackStatus, currentIndex]);

  // Cleanup timers & TTS on unmount
  useEffect(() => {
    return () => {
      tts.stop();
      if (timerRef.current) clearInterval(timerRef.current);
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
    };
  }, []);

  // Place a word piece into the first available empty slot
  const handleSelectWordPiece = (piece: { id: string; text: string }) => {
    if (feedbackStatus === 'correct' || feedbackStatus === 'timeout') return;

    sound.playTap();

    // Clear wrong indices highlight when user starts modifying again
    if (wrongIndices.length > 0) {
      setWrongIndices([]);
      setFeedbackMessage('');
    }

    // Find first empty slot index
    const emptyIndex = placedWords.findIndex((w) => w === null);
    if (emptyIndex === -1) return; // All slots full

    const nextPlaced = [...placedWords];
    nextPlaced[emptyIndex] = piece.text;
    setPlacedWords(nextPlaced);

    // Remove from available pieces
    setAvailableWords((prev) => prev.filter((p) => p.id !== piece.id));
  };

  // Remove word from a slot back to the available pool
  const handleRemoveWordFromSlot = (slotIndex: number) => {
    if (feedbackStatus === 'correct' || feedbackStatus === 'timeout') return;

    const wordToRemove = placedWords[slotIndex];
    if (!wordToRemove) return;

    sound.playRemove();

    // Clear wrong feedback highlighting
    if (wrongIndices.length > 0) {
      setWrongIndices([]);
      setFeedbackMessage('');
    }

    // Remove from slot
    const nextPlaced = [...placedWords];
    nextPlaced[slotIndex] = null;
    setPlacedWords(nextPlaced);

    // Add back to available words
    setAvailableWords((prev) => [
      ...prev,
      {
        id: `${currentSentence.id}-${Date.now()}-${wordToRemove}`,
        text: wordToRemove,
      },
    ]);
  };

  // Reset all placed words back to the pool
  const handleResetSlots = () => {
    if (feedbackStatus === 'correct' || feedbackStatus === 'timeout') return;
    sound.playRemove();
    setPlacedWords(new Array(currentSentence.words.length).fill(null));
    const pieces = currentSentence.words.map((w, idx) => ({
      id: `${currentSentence.id}-${idx}-${w}`,
      text: w,
    }));
    setAvailableWords(shuffleArray(pieces));
    setWrongIndices([]);
    setFeedbackMessage('');
  };

  // Check Answer Button Handler
  const handleCheckAnswer = () => {
    if (feedbackStatus === 'correct' || feedbackStatus === 'timeout') return;

    // Check if any slot is still empty
    const hasEmptySlot = placedWords.some((w) => w === null);
    if (hasEmptySlot) {
      sound.playTap();
      setFeedbackMessage('모든 빈칸에 단어 조각을 채워 길을 완성해주세요!');
      return;
    }

    const targetWords = currentSentence.words;
    const mismatches: number[] = [];

    placedWords.forEach((word, idx) => {
      if (word !== targetWords[idx]) {
        mismatches.push(idx);
      }
    });

    if (mismatches.length === 0) {
      // 100% CORRECT! Animal walks safely home!
      sound.playRescue();
      setFeedbackStatus('correct');
      const pointEarned = 10 + (combo > 0 ? 2 : 0);
      setScore((prev) => prev + pointEarned);
      setCombo((prev) => prev + 1);

      const fullSentence = targetWords.join(' ');

      // Speak sentence with TTS
      if (!isMuted) {
        setTimeout(() => {
          tts.speak(fullSentence);
        }, 350);
      }

      setFeedbackMessage(
        combo > 0
          ? `🎉 바른 길 안내 성공! +${pointEarned}점! (${combo + 1}연속 콤보!)`
          : `🎉 바른 길 안내 성공! +10점 획득!`
      );

      // Record history
      setHistory((prev) => [
        ...prev,
        {
          sentence: currentSentence,
          animal: currentAnimal,
          userOrder: placedWords as string[],
          isCorrect: true,
          attempts: attemptsRef.current,
          timeSpent: config.timePerQuestion - timeLeft,
        },
      ]);

      // Move to next question automatically after animal hops home & TTS plays
      if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
      nextTimerRef.current = window.setTimeout(() => {
        tts.stop();
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Finished all questions!
          onFinishGame(
            [
              ...history,
              {
                sentence: currentSentence,
                animal: currentAnimal,
                userOrder: placedWords as string[],
                isCorrect: true,
                attempts: attemptsRef.current,
                timeSpent: config.timePerQuestion - timeLeft,
              },
            ],
            score + pointEarned
          );
        }
      }, 2600);
    } else {
      // INCORRECT! Highlight ONLY the wrong slots without revealing the right answer
      sound.playWrong();
      setFeedbackStatus('wrong');
      setWrongIndices(mismatches);
      attemptsRef.current += 1;

      // Construct educational feedback pointing out wrong positions
      const wrongPositionsKorean = mismatches.map((i) => `${i + 1}번째`).join(', ');
      setFeedbackMessage(
        `⚠️ ${wrongPositionsKorean} 단어가 올바르지 않아요! 빨간색 자리를 터치해 바꿔보세요.`
      );
    }
  };

  // Skip / Next button when timeout or user wants to proceed
  const handleProceedNext = () => {
    tts.stop();
    if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinishGame(history, score);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full min-h-[620px] w-full max-w-md mx-auto p-3 sm:p-4 select-none relative">
      {/* 1. Top Header Bar: Question number (3/5 format), Score, Sound */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-stone-200/80">
        {/* Question Counter (Prompt requirement: 3/5 형식, 왼쪽 위) */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-100 text-xs font-black tracking-wide shadow-xs">
            {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-[11px] font-bold text-stone-500 uppercase">
            Level {level}
          </span>
        </div>

        {/* Center: Combo Streak pill */}
        {combo > 1 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-xs font-black shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 fill-amber-950" />
            <span>{combo}연속 길잡이!</span>
          </motion.div>
        )}

        {/* Right side: Score & Mute */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black">
            <span>{score}점</span>
          </div>
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded-lg bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
            title={isMuted ? '소리 켜기' : '소리 끄기'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* 2. SunSettingSky (제한 시간: 위에서 내려오는 문장 대신 해가 지는 하늘) */}
      <div className="w-full my-2">
        <SunSettingSky timeLeft={timeLeft} totalTime={config.timePerQuestion} />
      </div>

      {/* 3. Road Signpost Sentence Area ("집으로 가는 길" 안내판 - 화면 상단 고정) */}
      <div className="w-full relative mt-0.5">
        {/* Wooden Signpost Header Ornament */}
        <div className="flex items-center justify-between px-3 py-1 bg-amber-800 text-amber-100 rounded-t-2xl border-t-2 border-x-2 border-amber-900 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-black">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>🏡 {currentAnimal.name}의 집으로 가는 길 표지판</span>
          </div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-[11px] font-bold text-amber-200 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <Lightbulb className="w-3 h-3 text-amber-300" />
            <span>{showHint ? '힌트 닫기' : '어순 힌트'}</span>
          </button>
        </div>

        {/* Signpost Main Board */}
        <div className="w-full p-3 sm:p-3.5 rounded-b-2xl bg-gradient-to-b from-amber-50 to-orange-50/50 border-2 border-amber-800/90 shadow-md relative">
          {/* Korean Meaning Prompt */}
          <div className="mb-2">
            <span className="text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md border border-amber-300 inline-block mb-1">
              우리말 뜻
            </span>
            <p className="text-base sm:text-lg font-extrabold text-stone-900 leading-snug">
              "{currentSentence.korean}"
            </p>
          </div>

          {/* Grammar Hint Dropdown */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-2.5 p-2 rounded-xl bg-amber-100/90 border border-amber-300 text-xs text-amber-950"
              >
                <div className="font-bold flex items-center gap-1 mb-0.5 text-amber-900">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>문장 어순 구조: {currentSentence.structure}</span>
                </div>
                <p className="text-[11px] text-stone-700 leading-relaxed">{currentSentence.grammarTip}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Word Slots along the signpost path */}
          <div className="pt-2 border-t border-amber-200/80">
            <div className="text-[11px] font-bold text-amber-900 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-700" />
                <span>안내할 어순 (터치하여 회수 가능)</span>
              </span>
              <span className="text-[10px] text-amber-800">
                {placedWords.filter(Boolean).length} / {currentSentence.words.length} 단어
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center py-1 min-h-[50px]">
              {placedWords.map((word, idx) => {
                const isWrong = wrongIndices.includes(idx);
                const isFilled = word !== null;
                const isCorrectFeedback = feedbackStatus === 'correct';
                const isTimeoutRevealed = feedbackStatus === 'timeout';

                return (
                  <motion.button
                    key={`slot-${idx}`}
                    whileHover={isFilled ? { scale: 1.04 } : {}}
                    whileTap={isFilled ? { scale: 0.95 } : {}}
                    animate={isWrong ? { x: [-3, 3, -3, 3, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleRemoveWordFromSlot(idx)}
                    disabled={!isFilled || feedbackStatus === 'correct' || feedbackStatus === 'timeout'}
                    className={`relative min-w-[54px] sm:min-w-[62px] h-11 px-2.5 py-1 rounded-xl flex items-center justify-center text-sm sm:text-base font-bold transition-all border-2 ${
                      isWrong
                        ? 'bg-rose-50 border-rose-500 text-rose-800 shadow-md ring-2 ring-rose-200'
                        : isCorrectFeedback
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                        : isTimeoutRevealed
                        ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-xs'
                        : isFilled
                        ? 'bg-white border-amber-500 text-stone-900 shadow-xs hover:border-amber-600 cursor-pointer'
                        : 'bg-amber-50/70 border-dashed border-amber-300 text-amber-400'
                    }`}
                  >
                    {/* Step order badge on slot */}
                    <span className="absolute -top-2 -left-1.5 w-4 h-4 rounded-full bg-amber-900 text-amber-100 text-[9px] font-bold flex items-center justify-center shadow-xs">
                      {idx + 1}
                    </span>

                    {/* Word text or placeholder */}
                    {word ? (
                      <span className="tracking-tight">{word}</span>
                    ) : (
                      <span className="text-[11px] text-amber-400/80 font-medium">빈칸</span>
                    )}

                    {/* Wrong slot indicator badge */}
                    {isWrong && (
                      <span className="absolute -top-2 -right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs animate-bounce">
                        !
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Immediate Feedback Banner */}
      <div className="min-h-[38px] my-1 flex items-center justify-center px-1">
        <AnimatePresence mode="wait">
          {feedbackMessage ? (
            <motion.div
              key={feedbackMessage}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold text-center border shadow-xs flex items-center justify-center gap-1.5 ${
                feedbackStatus === 'correct'
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : feedbackStatus === 'wrong'
                  ? 'bg-rose-100 text-rose-900 border-rose-300'
                  : feedbackStatus === 'timeout'
                  ? 'bg-amber-100 text-amber-950 border-amber-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}
            >
              {feedbackStatus === 'wrong' && <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
              {feedbackStatus === 'correct' && (
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                    <span className="truncate">{feedbackMessage}</span>
                  </div>
                  <button
                    onClick={() => tts.speak(currentSentence.words.join(' '))}
                    className="shrink-0 ml-2 px-2 py-0.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-transform cursor-pointer"
                    title="원어민 발음 다시 듣기"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>발음 듣기</span>
                  </button>
                </div>
              )}
              {feedbackStatus === 'timeout' && (
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate">{feedbackMessage}</span>
                  </div>
                  <button
                    onClick={() => tts.speak(currentSentence.words.join(' '))}
                    className="shrink-0 ml-2 px-2 py-0.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-transform cursor-pointer"
                    title="원어민 발음 듣기"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>발음 듣기</span>
                  </button>
                </div>
              )}
              {feedbackStatus !== 'correct' && feedbackStatus !== 'timeout' && (
                <span>{feedbackMessage}</span>
              )}
            </motion.div>
          ) : (
            <p className="text-[11px] text-stone-500 font-medium text-center">
              아래 단어 조각을 터치하여 올바른 순서로 길을 밝혀주세요!
            </p>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Word Pieces Pool (단어 조각 선택 - 4~7개 하단 가로 배열) */}
      <div className="w-full bg-stone-100/90 p-2.5 rounded-2xl border border-stone-200/90 shadow-inner">
        <div className="flex items-center justify-between px-1 mb-1.5">
          <span className="text-[11px] font-bold text-stone-600">단어 조각 선택</span>
          <button
            onClick={handleResetSlots}
            disabled={feedbackStatus === 'correct' || feedbackStatus === 'timeout'}
            className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer disabled:opacity-40"
          >
            <RotateCcw className="w-3 h-3" />
            <span>다시 배열</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center min-h-[46px] items-center">
          {availableWords.map((piece) => (
            <motion.button
              key={piece.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectWordPiece(piece)}
              className="px-3.5 py-2 rounded-xl bg-white border-2 border-stone-300 hover:border-amber-400 text-stone-800 text-sm sm:text-base font-extrabold shadow-sm active:bg-amber-50 cursor-pointer transition-colors"
            >
              {piece.text}
            </motion.button>
          ))}
          {availableWords.length === 0 && (
            <span className="text-xs text-stone-400 font-medium py-1">
              모든 단어가 놓였습니다! 아래 [길 안내 완료]를 누르세요.
            </span>
          )}
        </div>
      </div>

      {/* 6. Animal Road To Home (화면 아래 왼쪽에 길 잃은 동물, 오른쪽에 집) */}
      <div className="w-full flex flex-col items-center justify-center my-0.5">
        <AnimalRoadToHome
          animal={currentAnimal}
          status={
            feedbackStatus === 'correct'
              ? 'walking_home'
              : feedbackStatus === 'timeout'
              ? 'sunset_walk'
              : 'wandering'
          }
          timeLeft={timeLeft}
        />
      </div>

      {/* 7. Bottom Action Controls ([길 안내 완료] 버튼 오른쪽 아래) */}
      <div className="w-full flex items-center justify-between gap-3 pt-1 border-t border-stone-200/80">
        <button
          onClick={onQuitToMenu}
          className="px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold transition-colors cursor-pointer"
        >
          그만하기
        </button>

        {feedbackStatus === 'timeout' ? (
          <button
            onClick={handleProceedNext}
            className="flex-1 max-w-[210px] py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer ml-auto"
          >
            <span>다음 동물 돕기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckAnswer}
            disabled={feedbackStatus === 'correct'}
            className="flex-1 max-w-[220px] py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-base shadow-md shadow-amber-500/25 border border-amber-400 flex items-center justify-center gap-2 cursor-pointer ml-auto disabled:opacity-60"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>길 안내 완료 ➔</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

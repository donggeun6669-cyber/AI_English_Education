import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Heart,
  ArrowRight,
  Volume2,
} from 'lucide-react';
import { GameHistoryItem, GameLevel } from '../types';
import { LEVEL_CONFIGS } from '../data/sentences';
import { sound } from '../utils/audio';
import { tts } from '../utils/tts';

interface ResultScreenProps {
  level: GameLevel;
  finalScore: number;
  history: GameHistoryItem[];
  onRestart: () => void;
  onGoHome: () => void;
  onNextLevel?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  level,
  finalScore,
  history,
  onRestart,
  onGoHome,
  onNextLevel,
}) => {
  const totalCount = history.length;
  const rescuedCount = history.filter((h) => h.isCorrect).length;
  const accuracy = Math.round((rescuedCount / Math.max(1, totalCount)) * 100);
  const isPerfect = rescuedCount === totalCount && totalCount > 0;

  // Filter wrong sentences for the review section (Prompt requirement: 틀린 문장의 바른 어순 목록)
  const wrongItems = history.filter((h) => !h.isCorrect);

  // Expanded review card IDs
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Determine badges earned
  const badges: { title: string; desc: string; icon: string }[] = [];
  if (isPerfect) {
    badges.push({
      title: '퍼펙트 길잡이',
      desc: '모든 동물을 100% 안전하게 집에 데려다주었습니다!',
      icon: '👑',
    });
  }
  if (rescuedCount >= 3) {
    badges.push({
      title: '다정한 길잡이',
      desc: '영어 어순 규칙을 올바르게 안내했습니다.',
      icon: '🏡',
    });
  }
  if (level === 3 && rescuedCount >= 5) {
    badges.push({
      title: '마스터 길잡이',
      desc: '고난도 7단어 복합 문장 레벨을 클리어했습니다!',
      icon: '🌟',
    });
  }
  if (badges.length === 0) {
    badges.push({
      title: '성장하는 길잡이',
      desc: '포기하지 않고 끝까지 동물 친구들의 길을 안내했습니다!',
      icon: '🌱',
    });
  }

  return (
    <div className="flex flex-col justify-between min-h-[580px] h-full w-full max-w-md mx-auto p-4 sm:p-5 select-none overflow-y-auto">
      {/* Top Banner / Celebration */}
      <div className="flex flex-col items-center text-center pt-2">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-16 h-16 rounded-3xl bg-amber-400 border-2 border-amber-300 shadow-md flex items-center justify-center text-3xl mb-2"
        >
          {isPerfect ? '🏆' : rescuedCount > 0 ? '🏡' : '💪'}
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
          {isPerfect
            ? '모든 동물 귀가 완료!'
            : rescuedCount > 0
            ? '안전하게 집 도착 완료!'
            : '다음엔 꼭 다 집으로 안내할 수 있어요!'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
          {LEVEL_CONFIGS[level].name} 미션을 마쳤습니다.
        </p>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-3 gap-2.5 my-4">
        {/* Rescued Animals Count (Prompt requirement: '구한 동물' -> '집에 데려다준 동물') */}
        <div className="p-3 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col items-center text-center">
          <span className="text-[10px] sm:text-[11px] font-bold text-stone-400 leading-tight">집에 데려다준 동물</span>
          <div className="flex items-baseline gap-0.5 mt-0.5">
            <span className="text-2xl font-black text-emerald-600">{rescuedCount}</span>
            <span className="text-xs text-stone-400 font-bold">/{totalCount}마리</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold mt-1 bg-emerald-50 px-1.5 py-0.5 rounded-full">
            {accuracy}% 귀가
          </span>
        </div>

        {/* Total Score */}
        <div className="p-3 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col items-center text-center">
          <span className="text-[10px] sm:text-[11px] font-bold text-stone-400 leading-tight">획득 총점</span>
          <span className="text-2xl font-black text-amber-600 mt-0.5">{finalScore}점</span>
          <span className="text-[10px] text-amber-700 font-bold mt-1 bg-amber-50 px-1.5 py-0.5 rounded-full">
            정답당 +10점
          </span>
        </div>

        {/* Level Played */}
        <div className="p-3 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col items-center text-center">
          <span className="text-[10px] sm:text-[11px] font-bold text-stone-400 leading-tight">도전 난이도</span>
          <span className="text-2xl font-black text-stone-800 mt-0.5">Lv.{level}</span>
          <span className="text-[10px] text-stone-600 font-bold mt-1 bg-stone-100 px-1.5 py-0.5 rounded-full">
            {LEVEL_CONFIGS[level].wordCountText}
          </span>
        </div>
      </div>

      {/* Rescued Animal Icons Parade */}
      <div className="bg-white/80 border border-stone-200 rounded-2xl p-3 mb-4 shadow-xs">
        <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5 mb-2">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>이번 라운드 귀가 현황</span>
        </span>
        <div className="flex flex-wrap gap-2 justify-center">
          {history.map((h, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold ${
                h.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800 opacity-70'
              }`}
            >
              <span>{h.animal.emoji}</span>
              <span>{h.animal.name}</span>
              {h.isCorrect ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              ) : (
                <span className="text-[10px] text-amber-600 font-bold">집 도착</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div className="mb-4">
        <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5 mb-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span>획득한 길잡이 배지</span>
        </span>
        <div className="space-y-1.5">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 shadow-2xs"
            >
              <span className="text-2xl">{b.icon}</span>
              <div className="flex-1 text-left">
                <h4 className="text-xs font-extrabold text-amber-950">{b.title}</h4>
                <p className="text-[11px] text-stone-600">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Section (Prompt requirement: 틀린 문장의 바른 어순 목록) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>어순 오답노트 & 복습 ({wrongItems.length}문장)</span>
          </span>
          {wrongItems.length === 0 && (
            <span className="text-[11px] text-emerald-600 font-bold">오답 없음! 완벽합니다 🎉</span>
          )}
        </div>

        {wrongItems.length > 0 ? (
          <div className="space-y-2">
            {wrongItems.map((item, idx) => {
              const isExpanded = expandedId === item.sentence.id;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-rose-200 bg-white shadow-2xs overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.sentence.id)}
                    className="w-full p-2.5 text-left flex items-center justify-between hover:bg-stone-50 cursor-pointer"
                  >
                    <div className="flex-1 pr-2">
                      <div className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                        <XCircle className="w-3 h-3 text-rose-500" />
                        <span>우리말: {item.sentence.korean}</span>
                      </div>
                      <div className="text-xs font-extrabold text-stone-800 mt-1 flex items-center justify-between gap-1">
                        <div className="flex flex-wrap gap-1 items-center">
                          <span className="text-emerald-700 font-black">정답 어순:</span>
                          <span>{item.sentence.words.join(' ')}</span>
                        </div>
                        <span
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            tts.speak(item.sentence.words.join(' '));
                          }}
                          className="shrink-0 p-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                          title="원어민 발음 듣기"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400" />
                    )}
                  </button>

                  {/* Expanded Grammar analysis */}
                  {isExpanded && (
                    <div className="p-2.5 bg-amber-50/60 border-t border-rose-100 text-xs text-stone-700">
                      <div className="font-bold text-amber-900 mb-1">
                        문장 어순 구조: {item.sentence.structure}
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        {item.sentence.grammarTip}
                      </p>
                      <div className="mt-2 text-[11px] text-stone-500">
                        <span className="font-semibold text-rose-600">내가 놓은 어순: </span>
                        <span>{item.userOrder.join(' ')}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 font-medium">
            틀린 문장이 없습니다! 중학 어순의 달인입니다.
          </div>
        )}
      </div>

      {/* Bottom Action Buttons (Prompt requirement: [다시 하기] · [처음으로]) */}
      <div className="flex flex-col gap-2 pt-2 border-t border-stone-200">
        <div className="flex items-center gap-2">
          {/* Restart same level */}
          <button
            onClick={() => {
              sound.playTap();
              onRestart();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
          >
            <RotateCcw className="w-4 h-4" />
            <span>다시 하기</span>
          </button>

          {/* Next Level if not on max level */}
          {level < 3 && onNextLevel && (
            <button
              onClick={() => {
                sound.playTap();
                onNextLevel();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
            >
              <span>다음 레벨 (Lv.{level + 1})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Go Home */}
        <button
          onClick={() => {
            sound.playTap();
            onGoHome();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>처음으로 (메인 화면)</span>
        </button>
      </div>
    </div>
  );
};

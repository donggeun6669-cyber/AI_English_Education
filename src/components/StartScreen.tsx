import React from 'react';
import { motion } from 'motion/react';
import { Play, Volume2, VolumeX, Sparkles, BookOpen, ShieldCheck, Clock, Award } from 'lucide-react';
import { GameLevel } from '../types';
import { LEVEL_CONFIGS } from '../data/sentences';
import { ANIMALS } from '../data/animals';
import { sound } from '../utils/audio';

interface StartScreenProps {
  selectedLevel: GameLevel;
  onSelectLevel: (lvl: GameLevel) => void;
  onStartGame: () => void;
  onOpenSanctuary: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  totalRescuedCount: number;
  highScore: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  selectedLevel,
  onSelectLevel,
  onStartGame,
  onOpenSanctuary,
  isMuted,
  onToggleMute,
  totalRescuedCount,
  highScore,
}) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-[580px] h-full w-full max-w-md mx-auto p-4 sm:p-5 relative select-none">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between mb-2">
        <button
          onClick={onToggleMute}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-stone-200 text-stone-600 text-xs font-semibold shadow-xs hover:bg-stone-50 active:scale-95 transition-transform"
          aria-label="Sound Toggle"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-rose-500" />
              <span>소리 끔</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>소리 켬</span>
            </>
          )}
        </button>

        <button
          onClick={onOpenSanctuary}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold shadow-xs hover:bg-amber-200 active:scale-95 transition-transform"
        >
          <Award className="w-4 h-4 text-amber-600" />
          <span>도감 ({totalRescuedCount}마리)</span>
        </button>
      </div>

      {/* Main Title Hero Section */}
      <div className="flex flex-col items-center text-center my-auto w-full">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 border border-amber-300 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>중등 1~2학년 어순 길 안내 게임</span>
        </motion.div>

        {/* Big Game Title */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-3xl sm:text-4xl font-black tracking-tight text-amber-950 drop-shadow-sm flex items-center justify-center gap-2"
        >
          <span>Help Animals Home!</span>
          <span className="text-3xl">🏡</span>
        </motion.h1>

        {/* Catchphrase */}
        <p className="mt-2 text-stone-600 text-sm font-medium leading-relaxed max-w-xs">
          문법 규칙 암기는 그만! 단어 조각을 올바른 어순으로 맞춰 길 잃은 아기 동물들을 해가 지기 전에 집으로 데려다주세요.
        </p>

        {/* Cute Animal Parade Carousel */}
        <div className="relative my-4 w-full flex items-center justify-center gap-2.5 py-3 bg-white/75 backdrop-blur-xs rounded-2xl border border-amber-200/80 shadow-xs overflow-hidden">
          {ANIMALS.slice(0, 5).map((a, idx) => (
            <motion.div
              key={a.id}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: idx * 0.2,
              }}
              className="flex flex-col items-center"
            >
              <span className="text-3xl sm:text-4xl filter drop-shadow-xs">{a.emoji}</span>
              <span className="text-[10px] text-stone-600 font-bold mt-0.5">{a.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Big Start Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            sound.playTap();
            onStartGame();
          }}
          className="w-full max-w-xs py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xl shadow-lg shadow-amber-500/30 border-2 border-amber-300 flex items-center justify-center gap-3 cursor-pointer transition-all hover:brightness-105 active:shadow-md"
        >
          <Play className="w-6 h-6 fill-white text-white" />
          <span>길 안내 시작하기</span>
        </motion.button>

        {/* High Score / Rescued Tracker */}
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-stone-500 font-medium">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>최고 점수: <strong>{highScore}점</strong></span>
          </div>
          <div className="w-1 h-1 rounded-full bg-stone-300" />
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-orange-600" />
            <span>1회 3분 완성</span>
          </div>
        </div>
      </div>

      {/* Level Selection Section (Prompt requirement: [레벨 선택] 버튼 하단) */}
      <div className="w-full mt-4 pt-3 border-t border-stone-200/80">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>길잡이 난이도 선택</span>
          </span>
          <span className="text-[11px] text-stone-500 font-medium">
            {LEVEL_CONFIGS[selectedLevel].wordCountText} · {LEVEL_CONFIGS[selectedLevel].questionCount}문항
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {([1, 2, 3] as GameLevel[]).map((lvl) => {
            const cfg = LEVEL_CONFIGS[lvl];
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => {
                  sound.playTap();
                  onSelectLevel(lvl);
                }}
                className={`flex flex-col items-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-300'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <span className={`text-[11px] font-bold ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                  Level {lvl}
                </span>
                <span className="text-xs font-extrabold mt-0.5 whitespace-nowrap">
                  {lvl === 1 ? '초급 (4단어)' : lvl === 2 ? '중급 (5단어)' : '고급 (7단어)'}
                </span>
                <span className={`text-[10px] mt-1 line-clamp-1 ${isSelected ? 'text-amber-100' : 'text-stone-400'}`}>
                  {cfg.subtitle.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

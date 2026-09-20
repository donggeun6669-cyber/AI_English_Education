import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Animal } from '../types';
import { Sparkles, Heart, Home } from 'lucide-react';

interface AnimalRoadToHomeProps {
  animal: Animal;
  status: 'wandering' | 'thinking' | 'walking_home' | 'safe_home' | 'sunset_walk';
  timeLeft: number;
  /** 0 ~ 1. 빈칸을 채운 비율. 채운 만큼 동물이 집 쪽으로 걸어간다 */
  progress?: number;
  /** 오답을 확인한 직후. 동물이 멈춰서 고개를 갸웃한다 */
  isConfused?: boolean;
  /** 문제가 바뀔 때마다 동물을 출발점에서 새로 시작시키기 위한 키 */
  questionKey?: string | number;
}

export const AnimalRoadToHome: React.FC<AnimalRoadToHomeProps> = ({
  animal,
  status,
  timeLeft,
  progress = 0,
  isConfused = false,
  questionKey = 'q',
}) => {
  const roadRef = useRef<HTMLDivElement>(null);
  const [roadWidth, setRoadWidth] = useState<number>(360);

  // Measure actual container width to calculate continuous journey distance across screens
  useEffect(() => {
    if (!roadRef.current) return;
    const updateWidth = () => {
      if (roadRef.current) {
        setRoadWidth(roadRef.current.clientWidth);
      }
    };
    updateWidth();

    const ro = new ResizeObserver(updateWidth);
    ro.observe(roadRef.current);
    return () => ro.disconnect();
  }, []);

  const isHeadingHome = status === 'walking_home' || status === 'safe_home';
  const isSunsetWalk = status === 'sunset_walk';
  const isWalking = isHeadingHome || isSunsetWalk;
  const isTwilight = timeLeft <= 5 && status === 'wandering' && !isConfused;

  // Speech bubble text
  let speechText = animal.lostSoundText;
  if (isHeadingHome) {
    speechText = animal.homeSoundText;
  } else if (isSunsetWalk) {
    speechText = '바른 길을 보고 무사히 집에 도착했어요!';
  } else if (isConfused) {
    speechText = '어? 이 길이 아닌 것 같아… 다시 알려줘!';
  } else if (isTwilight) {
    speechText = '어둑어둑해지고 있어, 집으로 가는 길을 서둘러 알려줘!';
  }

  // Exact distance to travel from start position (left: 16px) to right house door
  // Animal width is ~48px, house width is ~64px, padding is 16px
  const travelDistance = Math.max(180, roadWidth - 105);

  // 빈칸을 채운 만큼 길의 80%까지 한 걸음씩 전진한다.
  // 남은 20%(집 앞 마지막 구간)는 정답을 맞혔을 때만 걸어 들어간다.
  const filledRatio = Math.max(0, Math.min(1, progress));
  const stepX = travelDistance * 0.8 * filledRatio;

  // 현재 서 있는 자리에서 집까지 이어지는 걸음 키프레임
  const walkFrom = (from: number) => [
    from,
    from + (travelDistance - from) * 0.35,
    from + (travelDistance - from) * 0.7,
    travelDistance,
  ];

  // x(이동) / y(제자리 들썩임)를 분리한다.
  // 무한 반복(repeat: Infinity)은 y 에만 걸어야 한다. x 에 걸면 집↔출발점을 계속 오간다.
  const animalAnimate = isHeadingHome
    ? {
        x: walkFrom(stepX),
        y: [0, -14, 0, -16, 0],
        scale: [1, 1.08, 1, 1.12, 1],
      }
    : isSunsetWalk
    ? {
        x: walkFrom(stepX),
        y: [0, -8, 0, -8, 0],
        scale: 1,
      }
    : {
        x: stepX,
        y: [0, -4, 0],
        scale: 1,
      };

  const walkDuration = isHeadingHome ? 1.6 : 2.3;

  const animalTransition = isWalking
    ? {
        x: { duration: walkDuration, ease: 'easeInOut' as const },
        y: { duration: walkDuration, ease: 'easeInOut' as const },
        scale: { duration: walkDuration, ease: 'easeInOut' as const },
      }
    : {
        x: { type: 'spring' as const, stiffness: 150, damping: 18, mass: 0.6 },
        y: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const },
        scale: { duration: 0.3 },
      };

  return (
    <div className="relative w-full py-2 px-1 select-none">
      {/* Speech Bubble above animal / journey */}
      <div className="w-full flex justify-center mb-1">
        <motion.div
          animate={
            isHeadingHome
              ? { scale: [1, 1.05, 1], y: [0, -3, 0] }
              : { y: [0, -2, 0] }
          }
          transition={{ duration: 1.8, repeat: Infinity }}
          className={`px-3 py-1 rounded-2xl text-xs font-bold shadow-xs border flex items-center gap-1.5 transition-colors ${
            isHeadingHome
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300 ring-2 ring-emerald-200'
              : isSunsetWalk
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : isConfused
              ? 'bg-sky-50 text-sky-900 border-sky-200'
              : isTwilight
              ? 'bg-orange-50 text-orange-900 border-orange-200'
              : 'bg-white/95 text-stone-700 border-stone-200'
          }`}
        >
          {isHeadingHome && <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
          <span>{speechText}</span>
        </motion.div>
      </div>

      {/* Main Road Stage (Meadow Path leading all the way from Left to Right) */}
      <div
        ref={roadRef}
        className="relative w-full h-24 sm:h-26 rounded-2xl bg-gradient-to-b from-amber-50/70 via-emerald-50/50 to-emerald-100/70 border border-emerald-200/80 shadow-xs overflow-hidden flex items-end px-3 pb-2"
      >
        {/* Dirt & Stone Path connecting start point directly into the house */}
        <div className="absolute bottom-2 inset-x-3 h-6 bg-gradient-to-r from-amber-200/80 via-amber-100/90 to-amber-200/80 rounded-full border border-amber-300/60 shadow-inner flex items-center justify-around px-4">
          <span className="w-4 h-2 rounded-full bg-stone-300/70" />
          <span className="w-5 h-2.5 rounded-full bg-stone-300/80" />
          <span className="w-4 h-2 rounded-full bg-stone-300/70" />
          <span className="w-6 h-2.5 rounded-full bg-stone-300/80" />
          <span className="w-5 h-2.5 rounded-full bg-stone-300/70" />
          <span className="w-5 h-2.5 rounded-full bg-stone-300/80" />
        </div>

        {/* Small wildflowers along the path */}
        <div className="absolute bottom-6 left-6 text-xs select-none pointer-events-none opacity-80">🌼</div>
        <div className="absolute bottom-7 left-1/4 text-xs select-none pointer-events-none opacity-80">🌸</div>
        <div className="absolute bottom-6 left-2/4 text-xs select-none pointer-events-none opacity-80">🌷</div>
        <div className="absolute bottom-7 left-3/4 text-xs select-none pointer-events-none opacity-80">🌼</div>

        {/* Left Side: Start Point Signpost */}
        <div className="absolute bottom-7 left-3 flex flex-col items-center pointer-events-none opacity-70">
          <div className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-[9px] font-bold text-amber-900">
            출발 🐾
          </div>
          <div className="w-1 h-3 bg-amber-700/60 rounded-full" />
        </div>

        {/* The Walking Animal
            key: 문제가 바뀌면 통째로 다시 마운트되어 항상 출발점(x: 0)에서 시작한다 */}
        <motion.div
          key={questionKey}
          initial={{ x: 0, y: 0, scale: 1 }}
          animate={animalAnimate}
          transition={animalTransition}
          className="absolute bottom-3 left-4 z-20 flex flex-col items-center"
        >
          {/* Hearts eruption when entering the home */}
          <AnimatePresence>
            {isHeadingHome && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, -15, -28, -36],
                  scale: [0.6, 1.2, 1.4, 1.1],
                }}
                transition={{ duration: 1.3, delay: 1.0 }}
                className="absolute -top-4 flex items-center gap-1 text-rose-500 pointer-events-none z-30"
              >
                <Heart className="w-5 h-5 fill-rose-500 animate-ping" />
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 길을 헷갈릴 때 뜨는 작은 물음표 */}
          <AnimatePresence>
            {isConfused && (
              <motion.span
                initial={{ opacity: 0, y: 4, scale: 0.7 }}
                animate={{ opacity: 1, y: -2, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="absolute -top-3 text-sm text-sky-600 font-black pointer-events-none z-30"
              >
                ?
              </motion.span>
            )}
          </AnimatePresence>

          {/* Animal Emoji (길을 헷갈리면 고개를 갸웃거린다) */}
          <motion.span
            animate={isConfused ? { rotate: [0, -9, 9, -6, 0] } : { rotate: 0 }}
            transition={
              isConfused
                ? { duration: 1.1, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            className="text-4xl sm:text-5xl filter drop-shadow-md cursor-pointer inline-block origin-bottom"
          >
            {animal.emoji}
          </motion.span>
          <span className="text-[10px] font-extrabold text-stone-700 bg-white/90 px-1.5 py-0.2 rounded-full border border-stone-200 shadow-2xs mt-0.5 whitespace-nowrap">
            {animal.name}
          </span>
        </motion.div>

        {/* Right Side: The Cozy House 🏡 */}
        <motion.div
          animate={
            isHeadingHome
              ? { scale: [1, 1, 1.08, 1], y: [0, 0, -4, 0] }
              : {}
          }
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-2 right-3 z-15 flex flex-col items-center"
        >
          {/* Chimney smoke puffs */}
          <motion.div
            animate={{ y: [-2, -8, -14], opacity: [0.8, 0.4, 0], scale: [0.8, 1.2, 1.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[11px] text-stone-400 -mb-2 ml-3 pointer-events-none"
          >
            💨
          </motion.div>

          {/* House Visual */}
          <div className="relative">
            <span className="text-4xl sm:text-5xl filter drop-shadow-md">
              {animal.houseEmoji || '🏡'}
            </span>
            {/* Warm window glow */}
            <div className="absolute bottom-2 left-3 w-2 h-2.5 bg-amber-300 rounded-xs blur-2xs opacity-80 animate-pulse" />
          </div>

          {/* House Nameplate */}
          <div className="px-2 py-0.5 rounded-full bg-amber-900 text-amber-100 text-[10px] font-extrabold border border-amber-700 shadow-xs mt-0.5 whitespace-nowrap flex items-center gap-1">
            <Home className="w-2.5 h-2.5 text-amber-300" />
            <span>{animal.homeName}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

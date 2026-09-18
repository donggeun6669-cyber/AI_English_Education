import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface SunSettingSkyProps {
  timeLeft: number;
  totalTime: number;
}

export const SunSettingSky: React.FC<SunSettingSkyProps> = ({ timeLeft, totalTime }) => {
  // progress: 1.0 (day start) -> 0.0 (sunset complete)
  const ratio = Math.max(0, Math.min(1, timeLeft / totalTime));

  // Determine sky phase
  // Phase 1: Day (ratio > 0.6)
  // Phase 2: Sunset / Dusk (0.2 < ratio <= 0.6)
  // Phase 3: Twilight / Evening (ratio <= 0.2)
  let skyGradient = 'from-sky-300 via-sky-200 to-amber-100 text-sky-900';
  let phaseLabel = '맑은 낮';
  let phaseEmoji = '☀️';

  if (ratio <= 0.25) {
    skyGradient = 'from-indigo-900 via-purple-800 to-amber-600 text-amber-100';
    phaseLabel = '어스름한 저녁';
    phaseEmoji = '🌙';
  } else if (ratio <= 0.6) {
    skyGradient = 'from-orange-400 via-amber-300 to-rose-200 text-amber-950';
    phaseLabel = '노을빛 하늘';
    phaseEmoji = '🌅';
  }

  // Calculate Sun position:
  // Starts near top right (x: 88%, y: 15%), ends setting below horizon on lower center-left (x: 20%, y: 90%)
  const sunX = 20 + ratio * 68; // percentage across width
  const sunY = 85 - Math.sin(ratio * Math.PI * 0.85 + 0.15) * 65; // arc dipping into horizon

  return (
    <div
      className={`relative w-full h-12 sm:h-14 rounded-2xl bg-gradient-to-r ${skyGradient} overflow-hidden shadow-inner border border-white/50 transition-colors duration-1000 flex items-center justify-between px-3 select-none`}
    >
      {/* Background stars (appear when twilight) */}
      {ratio <= 0.35 && (
        <div className="absolute inset-0 pointer-events-none opacity-80">
          <div className="absolute top-2 left-6 text-[10px] text-amber-200 animate-pulse">✦</div>
          <div className="absolute top-1 left-24 text-[8px] text-amber-100 animate-ping">★</div>
          <div className="absolute top-3 right-16 text-[9px] text-amber-200">✧</div>
          <div className="absolute top-2 right-32 text-[10px] text-yellow-100 animate-pulse">✦</div>
        </div>
      )}

      {/* Gentle Rolling Hills on horizon */}
      <div className="absolute -bottom-3 inset-x-0 h-6 flex justify-around pointer-events-none opacity-40">
        <div className="w-1/2 h-8 rounded-t-full bg-emerald-700/60 -translate-x-4" />
        <div className="w-2/3 h-9 rounded-t-full bg-emerald-600/70 translate-x-2" />
        <div className="w-1/2 h-7 rounded-t-full bg-teal-800/50" />
      </div>

      {/* Sun / Moon Celestial Body following the sunset arc */}
      <div
        className="absolute transition-all duration-500 ease-linear pointer-events-none z-10"
        style={{
          left: `${sunX}%`,
          top: `${sunY}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {ratio > 0.15 ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="relative"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-orange-400 shadow-lg shadow-amber-400/50 flex items-center justify-center border border-amber-200">
              <Sun className="w-4 h-4 text-amber-950 fill-amber-300" />
            </div>
            {/* Sun rays glow */}
            <div className="absolute -inset-1 rounded-full bg-amber-300/30 blur-xs -z-10" />
          </motion.div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-amber-100 shadow-md flex items-center justify-center border border-amber-200">
            <Moon className="w-3.5 h-3.5 text-indigo-900 fill-amber-200" />
          </div>
        )}
      </div>

      {/* Left: Sky Status Label */}
      <div className="relative z-20 flex items-center gap-1.5 backdrop-blur-2xs bg-white/40 px-2.5 py-1 rounded-full border border-white/60 shadow-2xs">
        <span className="text-xs">{phaseEmoji}</span>
        <span className="text-[11px] font-bold tracking-tight">{phaseLabel}</span>
      </div>

      {/* Right: Sunset Time Bar & Counter */}
      <div className="relative z-20 flex items-center gap-2">
        <div className="w-20 sm:w-28 h-2 bg-black/15 rounded-full overflow-hidden backdrop-blur-xs p-0.5 border border-white/30">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              ratio <= 0.2
                ? 'bg-rose-400'
                : ratio <= 0.5
                ? 'bg-amber-400'
                : 'bg-emerald-400'
            }`}
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
        <span
          className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-md backdrop-blur-xs shadow-2xs ${
            ratio <= 0.2
              ? 'bg-rose-500 text-white animate-pulse'
              : 'bg-white/60 text-stone-800'
          }`}
        >
          {timeLeft}초
        </span>
      </div>
    </div>
  );
};

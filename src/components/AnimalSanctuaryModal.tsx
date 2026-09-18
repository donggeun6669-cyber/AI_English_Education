import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Heart, Shield } from 'lucide-react';
import { ANIMALS } from '../data/animals';

interface AnimalSanctuaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  rescuedAnimalIds: string[];
}

export const AnimalSanctuaryModal: React.FC<AnimalSanctuaryModalProps> = ({
  isOpen,
  onClose,
  rescuedAnimalIds,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-amber-50/80">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏡</span>
              <div>
                <h3 className="text-base font-extrabold text-stone-900">동물 친구들의 우리 집 도감</h3>
                <p className="text-[11px] text-stone-500 font-medium">
                  집을 찾은 총 {rescuedAnimalIds.length} / {ANIMALS.length}마리의 동물 친구들
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Animals Grid List */}
          <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
            {ANIMALS.map((animal) => {
              const isRescued = rescuedAnimalIds.includes(animal.id);

              return (
                <div
                  key={animal.id}
                  className={`p-3 rounded-2xl border flex items-center gap-3.5 transition-all ${
                    isRescued
                      ? 'bg-amber-50/50 border-amber-200 shadow-2xs'
                      : 'bg-stone-50 border-stone-200 opacity-50 grayscale'
                  }`}
                >
                  <div
                    className="w-13 h-13 rounded-2xl flex items-center justify-center text-3xl shadow-xs shrink-0"
                    style={{ backgroundColor: isRescued ? `${animal.color}25` : '#e2e8f0' }}
                  >
                    {isRescued ? animal.emoji : '🏡'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-extrabold text-stone-900 truncate">
                        {animal.name}
                      </h4>
                      <span className="text-[10px] font-bold text-stone-500 bg-white px-1.5 py-0.2 rounded border border-stone-200">
                        {animal.species}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mt-0.5 truncate">
                      {isRescued ? `"${animal.homeSoundText}"` : '아직 집으로 가는 길을 찾는 중이에요...'}
                    </p>

                    <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-400 font-medium">
                      <span>보금자리: {animal.homeName} ({animal.habitat})</span>
                    </div>
                  </div>

                  {isRescued && (
                    <div className="shrink-0 flex flex-col items-center">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                      <span className="text-[9px] font-black text-emerald-600 mt-0.5">집 도착</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Close */}
          <div className="p-3 border-t border-stone-200 bg-stone-50 flex justify-end">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm cursor-pointer"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export type GameLevel = 1 | 2 | 3;

export interface LevelConfig {
  id: GameLevel;
  name: string;
  subtitle: string;
  wordCountText: string;
  questionCount: number;
  timePerQuestion: number; // in seconds
  description: string;
  color: {
    badge: string;
    bg: string;
    border: string;
    text: string;
    accent: string;
  };
}

export type GrammarRole = 'subject' | 'verb' | 'object' | 'complement' | 'adverb' | 'prepositional' | 'helper';

export interface WordToken {
  id: string;
  text: string;
  originalIndex: number;
  roleHint?: string;
}

export interface Sentence {
  id: string;
  level: GameLevel;
  words: string[];
  korean: string;
  grammarTip: string;
  structure: string; // e.g. "주어(S) + 동사(V) + 목적어(O)"
  animalId: string;
}

export interface Animal {
  id: string;
  name: string;
  species: string;
  emoji: string;
  lostSoundText: string;
  homeSoundText: string;
  homeName: string;
  houseEmoji: string;
  habitat: string;
  color: string;
}

export interface GameHistoryItem {
  sentence: Sentence;
  animal: Animal;
  userOrder: string[];
  isCorrect: boolean;
  attempts: number;
  timeSpent: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

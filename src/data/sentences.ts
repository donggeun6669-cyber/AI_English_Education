import { Sentence, LevelConfig } from '../types';

export const LEVEL_CONFIGS: Record<number, LevelConfig> = {
  1: {
    id: 1,
    name: 'Level 1: 초급 길잡이',
    subtitle: '기본 어순 (주어 + 동사 + 목적어)',
    wordCountText: '4단어 문장',
    questionCount: 5,
    timePerQuestion: 24, // 24초 일몰 시간
    description: '해가 지기 전에 4단어 기초 문장으로 동물 친구에게 집 가는 길을 알려주세요!',
    color: {
      badge: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      bg: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-300',
      text: 'text-emerald-700',
      accent: '#10B981',
    },
  },
  2: {
    id: 2,
    name: 'Level 2: 중급 길잡이',
    subtitle: '확장 어순 (형용사, 확장 명사구, 길 안내 명령문)',
    wordCountText: '5단어 문장',
    questionCount: 7,
    timePerQuestion: 20, // 20초 일몰 시간
    description: '노을이 물들기 전에 5단어 문장으로 집으로 가는 바른 길을 완성해보세요!',
    color: {
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      bg: 'from-amber-50 to-orange-50',
      border: 'border-amber-300',
      text: 'text-amber-800',
      accent: '#F59E0B',
    },
  },
  3: {
    id: 3,
    name: 'Level 3: 마스터 길잡이',
    subtitle: '고급 어순 (조동사, 진행형, 빈도부사)',
    wordCountText: '7단어 문장',
    questionCount: 10,
    timePerQuestion: 16, // 16초 빠른 일몰
    description: '해가 빠르게 저무는 저녁! 7단어 복합 문장으로 안전하게 집까지 안내해주세요!',
    color: {
      badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      bg: 'from-indigo-50 to-purple-50',
      border: 'border-indigo-300',
      text: 'text-indigo-800',
      accent: '#6366F1',
    },
  },
};

export const ALL_SENTENCES: Sentence[] = [
  // --- LEVEL 1 (4 words) ---
  {
    id: 'l1-1',
    level: 1,
    words: ['Rabbits', 'know', 'the', 'way'],
    korean: '토끼들은 그 길을 안다.',
    grammarTip: '주어(Rabbits) 다음에 동사(know)가 오고, 무엇을 아는지(the way)가 목적어로 이어집니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'rabbit',
  },
  {
    id: 'l1-2',
    level: 1,
    words: ['Puppies', 'find', 'the', 'gate'],
    korean: '강아지들은 그 대문을 찾는다.',
    grammarTip: '관사 the는 언제나 명사(gate) 앞에 붙습니다. 「the + 명사」가 한 덩어리로 목적어 자리에 들어갑니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'puppy',
  },
  {
    id: 'l1-3',
    level: 1,
    words: ['I', 'see', 'my', 'roof'],
    korean: '나는 우리 집 지붕을 본다.',
    grammarTip: '대명사 주어(I) 뒤에 동사(see)가 오고, 소유격 my는 명사(roof) 앞에 붙어 목적어가 됩니다.',
    structure: '주어(S) + 동사(V) + 소유격 + 목적어(O)',
    animalId: 'kitten',
  },
  {
    id: 'l1-4',
    level: 1,
    words: ['Pandas', 'follow', 'the', 'path'],
    korean: '판다들은 그 길을 따라간다.',
    grammarTip: '「누가 + 무엇을 한다 + 무엇을」 순서입니다. 따라가는 대상(the path)은 동사 뒤에 옵니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'panda',
  },
  {
    id: 'l1-5',
    level: 1,
    words: ['We', 'cross', 'the', 'field'],
    korean: '우리는 그 들판을 건넌다.',
    grammarTip: '주어 We는 복수라서 동사에 -s를 붙이지 않습니다. 건너는 대상(the field)이 동사 뒤 목적어 자리입니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'lion',
  },
  {
    id: 'l1-6',
    level: 1,
    words: ['Foxes', 'remember', 'every', 'turn'],
    korean: '여우들은 모든 모퉁이를 기억한다.',
    grammarTip: 'every는 명사 앞에서만 쓰입니다. 「every + 단수명사(turn)」가 한 덩어리로 목적어가 됩니다.',
    structure: '주어(S) + 동사(V) + every + 목적어(O)',
    animalId: 'fox',
  },
  {
    id: 'l1-7',
    level: 1,
    words: ['Penguins', 'reach', 'the', 'igloo'],
    korean: '펭귄들은 그 이글루에 도착한다.',
    grammarTip: 'reach는 to 없이 목적어를 바로 받는 동사입니다. 그래서 「reach + the igloo」 순서가 됩니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'penguin',
  },
  {
    id: 'l1-8',
    level: 1,
    words: ['Koalas', 'climb', 'the', 'tree'],
    korean: '코알라들은 그 나무에 올라간다.',
    grammarTip: '주어(Koalas)가 복수이므로 동사는 climb 그대로 씁니다. 올라가는 대상(the tree)이 뒤에 옵니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'koala',
  },

  // --- LEVEL 2 (5 words) ---
  {
    id: 'l2-1',
    level: 2,
    words: ['We', 'enter', 'the', 'warm', 'cave'],
    korean: '우리는 그 따뜻한 동굴로 들어간다.',
    grammarTip: '주어(We) 뒤에 동사(enter)가 오고, 「관사(the) + 형용사(warm) + 명사(cave)」가 한 덩어리로 목적어 자리에 들어갑니다. enter는 into 없이 목적어를 바로 받습니다.',
    structure: '주어(S) + 동사(V) + 관사 + 형용사 + 목적어(O)',
    animalId: 'bear',
  },
  {
    id: 'l2-2',
    level: 2,
    words: ['Hamsters', 'need', 'a', 'warm', 'house'],
    korean: '햄스터들은 따뜻한 집이 필요하다.',
    grammarTip: '관사(a) + 형용사(warm) + 명사(house) 순서가 한 덩어리로 목적어 자리에 들어갑니다.',
    structure: '주어(S) + 동사(V) + 관사 + 형용사 + 목적어(O)',
    animalId: 'hamster',
  },
  {
    id: 'l2-3',
    level: 2,
    words: ['Penguins', 'see', 'the', 'white', 'igloo'],
    korean: '펭귄들은 하얀 이글루를 본다.',
    grammarTip: '형용사(white)는 꾸며 주는 명사(igloo) 바로 앞에 오고, 관사 the는 그 앞에 붙습니다.',
    structure: '주어(S) + 동사(V) + 관사 + 형용사 + 목적어(O)',
    animalId: 'penguin',
  },
  {
    id: 'l2-4',
    level: 2,
    words: ['Koalas', 'hug', 'the', 'tall', 'tree'],
    korean: '코알라들은 그 큰 나무를 껴안는다.',
    grammarTip: '「the + 형용사 + 명사」는 순서를 바꿀 수 없는 한 덩어리입니다. 동사 뒤 목적어 자리에 통째로 들어갑니다.',
    structure: '주어(S) + 동사(V) + 관사 + 형용사 + 목적어(O)',
    animalId: 'koala',
  },
  {
    id: 'l2-5',
    level: 2,
    words: ['Cross', 'the', 'small', 'wooden', 'bridge'],
    korean: '그 작은 나무다리를 건너가세요.',
    grammarTip: '명령문은 주어 없이 동사원형(Cross)으로 시작합니다. 형용사는 「크기(small) → 재료(wooden)」 순서로 놓습니다.',
    structure: '명령문 동사 + 관사 + 형용사(크기) + 형용사(재료) + 명사',
    animalId: 'rabbit',
  },
  {
    id: 'l2-6',
    level: 2,
    words: ['Follow', 'the', 'long', 'yellow', 'road'],
    korean: '그 길고 노란 길을 따라가세요.',
    grammarTip: '길을 안내하는 명령문도 동사원형으로 시작합니다. 형용사는 「길이(long) → 색깔(yellow)」 순서입니다.',
    structure: '명령문 동사 + 관사 + 형용사(길이) + 형용사(색) + 명사',
    animalId: 'lion',
  },
  {
    id: 'l2-7',
    level: 2,
    words: ['Puppies', 'pass', 'the', 'red', 'mailbox'],
    korean: '강아지들은 빨간 우편함을 지나간다.',
    grammarTip: '지나치는 대상(the red mailbox)은 동사(pass) 바로 뒤 목적어 자리에 옵니다.',
    structure: '주어(S) + 동사(V) + 관사 + 형용사 + 목적어(O)',
    animalId: 'puppy',
  },
  {
    id: 'l2-8',
    level: 2,
    words: ['Kittens', 'watch', 'the', 'orange', 'sunset'],
    korean: '새끼 고양이들은 주황빛 노을을 바라본다.',
    grammarTip: '보는 대상(the orange sunset)이 동사 뒤에 옵니다. 색을 나타내는 형용사 orange는 명사 앞에 놓입니다.',
    structure: '주어(S) + 동사(V) + 관사 + 형용사 + 목적어(O)',
    animalId: 'kitten',
  },

  // --- LEVEL 3 (7 words) ---
  {
    id: 'l3-1',
    level: 3,
    words: ['Rabbits', 'hop', 'across', 'the', 'wide', 'open', 'field'],
    korean: '토끼들은 넓게 트인 들판을 가로질러 뛴다.',
    grammarTip: '동사(hop) 뒤에 「across + 관사 + 형용사 + 명사」 전치사구가 붙습니다. wide open은 늘 이 순서로 함께 쓰는 표현입니다.',
    structure: '주어 + 동사 + 전치사구(across + 관사 + 형용사 + 명사)',
    animalId: 'rabbit',
  },
  {
    id: 'l3-2',
    level: 3,
    words: ['I', 'can', 'see', 'my', 'green', 'garden', 'gate'],
    korean: '나는 우리 집 초록색 대문을 볼 수 있다.',
    grammarTip: '조동사(can) 뒤에는 반드시 동사원형(see)이 옵니다. 목적어는 「소유격 + 형용사 + 명사 + 명사」가 한 덩어리를 이룹니다.',
    structure: '주어 + 조동사 + 동사원형 + 목적어(소유격 + 형용사 + 명사구)',
    animalId: 'puppy',
  },
  {
    id: 'l3-3',
    level: 3,
    words: ['Kittens', 'always', 'sleep', 'in', 'the', 'sunny', 'attic'],
    korean: '새끼 고양이들은 항상 볕이 드는 다락방에서 잔다.',
    grammarTip: '빈도부사 always는 일반동사(sleep) 바로 앞에 옵니다. 장소를 나타내는 전치사구는 문장 끝에 놓습니다.',
    structure: '주어 + 빈도부사 + 동사 + 장소 전치사구',
    animalId: 'kitten',
  },
  {
    id: 'l3-4',
    level: 3,
    words: ['We', 'are', 'following', 'the', 'bamboo', 'forest', 'path'],
    korean: '우리는 대나무 숲길을 따라가고 있다.',
    grammarTip: '현재진행형은 「be동사(are) + 동사-ing(following)」 순서입니다. bamboo forest path처럼 명사가 명사를 꾸밀 때도 꾸미는 말이 앞에 옵니다.',
    structure: '주어 + be동사 + 동사-ing + 목적어(명사구)',
    animalId: 'panda',
  },
  {
    id: 'l3-5',
    level: 3,
    words: ['We', 'should', 'find', 'the', 'golden', 'rock', 'house'],
    korean: '우리는 그 황금빛 바위집을 찾아야 한다.',
    grammarTip: '조동사(should) 뒤에는 동사원형(find)이 옵니다. 「관사 + 형용사 + 명사 + 명사」가 목적어 한 덩어리입니다.',
    structure: '주어 + 조동사 + 동사원형 + 목적어(관사 + 형용사 + 명사구)',
    animalId: 'lion',
  },
  {
    id: 'l3-6',
    level: 3,
    words: ['Our', 'ice', 'house', 'is', 'waiting', 'for', 'us'],
    korean: '우리 얼음집이 우리를 기다리고 있다.',
    grammarTip: '주어가 길어도(Our ice house) 「주어 + be동사 + 동사-ing」 순서는 그대로입니다. wait 뒤에는 전치사 for가 붙고, 그 뒤에는 목적격 us를 씁니다.',
    structure: '주어(명사구) + be동사 + 동사-ing + 전치사구(for + 목적격)',
    animalId: 'penguin',
  },
  {
    id: 'l3-7',
    level: 3,
    words: ['Koalas', 'climb', 'up', 'to', 'their', 'tree', 'house'],
    korean: '코알라들은 나무 위에 있는 자기 집으로 올라간다.',
    grammarTip: 'climb up to는 「~까지 올라가다」라는 한 덩어리 표현입니다. 그 뒤에 도착지(their tree house)가 옵니다.',
    structure: '주어 + 동사 + 부사(up) + 전치사구(to + 명사구)',
    animalId: 'koala',
  },
  {
    id: 'l3-8',
    level: 3,
    words: ['Red', 'foxes', 'always', 'take', 'the', 'shortest', 'path'],
    korean: '붉은 여우들은 항상 가장 짧은 길로 간다.',
    grammarTip: '최상급(shortest) 앞에는 반드시 the가 붙습니다. 빈도부사 always는 일반동사(take) 앞에 옵니다.',
    structure: '형용사 + 주어 + 빈도부사 + 동사 + the + 최상급 + 목적어',
    animalId: 'fox',
  },
  {
    id: 'l3-9',
    level: 3,
    words: ['Hamsters', 'always', 'find', 'their', 'way', 'back', 'home'],
    korean: '햄스터들은 항상 집으로 돌아가는 길을 찾는다.',
    grammarTip: 'their way back home은 「집으로 돌아가는 길」이라는 고정된 순서의 표현입니다. always는 동사(find) 앞에 옵니다.',
    structure: '주어 + 빈도부사 + 동사 + 목적어(their way back home)',
    animalId: 'hamster',
  },
  {
    id: 'l3-10',
    level: 3,
    words: ['Bears', 'follow', 'the', 'sweet', 'smell', 'of', 'honey'],
    korean: '곰들은 달콤한 꿀 냄새를 따라간다.',
    grammarTip: '「of + 명사」는 앞의 명사(smell)를 뒤에서 꾸며 줍니다. 우리말과 달리 꾸미는 말이 뒤에 오는 점을 기억하세요.',
    structure: '주어 + 동사 + 목적어(the sweet smell) + of 전치사구',
    animalId: 'bear',
  },
];

// Helper to shuffle an array
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Select questions for a round
export function getQuestionsForLevel(level: number): Sentence[] {
  const matching = ALL_SENTENCES.filter((s) => s.level === level);
  const shuffled = shuffleArray(matching);
  const count = LEVEL_CONFIGS[level]?.questionCount || 5;
  return shuffled.slice(0, count);
}

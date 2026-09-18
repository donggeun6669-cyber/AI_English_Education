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
    subtitle: '확장 어순 (형용사, 부사, 전치사구)',
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
    wordCountText: '6~7단어 문장',
    questionCount: 10,
    timePerQuestion: 16, // 16초 빠른 일몰
    description: '해가 빠르게 저무는 저녁! 6~7단어 복합 문장으로 안전하게 집까지 안내해주세요!',
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
    words: ['Cats', 'drink', 'sweet', 'milk'],
    korean: '고양이들은 달콤한 우유를 마신다.',
    grammarTip: '주어(Cats) 다음에 동작을 나타내는 동사(drink)가 오고, 목적어(sweet milk)가 옵니다.',
    structure: '주어(S) + 동사(V) + 형용사 + 목적어(O)',
    animalId: 'kitten',
  },
  {
    id: 'l1-2',
    level: 1,
    words: ['The', 'dog', 'runs', 'fast'],
    korean: '그 개는 빠르게 달린다.',
    grammarTip: '관사(The) + 명사 주어(dog) 뒤에 동사(runs)가 오고, 부사(fast)가 방법을 설명합니다.',
    structure: '주어(S) + 동사(V) + 부사(A)',
    animalId: 'puppy',
  },
  {
    id: 'l1-3',
    level: 1,
    words: ['I', 'love', 'my', 'family'],
    korean: '나는 나의 가족을 사랑한다.',
    grammarTip: '대명사 주어(I) 뒤에 상태/감정 동사(love)가 오고, 소유격 목적어(my family)가 이어집니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'rabbit',
  },
  {
    id: 'l1-4',
    level: 1,
    words: ['Birds', 'sing', 'every', 'morning'],
    korean: '새들은 매일 아침 노래한다.',
    grammarTip: '주어(Birds) + 동사(sing) 뒤에 시간을 나타내는 부사구(every morning)가 붙습니다.',
    structure: '주어(S) + 동사(V) + 시간 부사구',
    animalId: 'penguin',
  },
  {
    id: 'l1-5',
    level: 1,
    words: ['She', 'likes', 'yellow', 'bananas'],
    korean: '그녀는 노란 바나나를 좋아한다.',
    grammarTip: '3인칭 단수 주어(She)에는 동사에 -s가 붙는 likes가 오고, 목적어(yellow bananas)가 옵니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'hamster',
  },
  {
    id: 'l1-6',
    level: 1,
    words: ['We', 'eat', 'fresh', 'apples'],
    korean: '우리는 신선한 사과를 먹는다.',
    grammarTip: '주어(We) 뒤에 먹는 행동 동사(eat)가 오고, 꾸며주는 말(fresh)과 명사(apples)가 옵니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'bear',
  },
  {
    id: 'l1-7',
    level: 1,
    words: ['Tom', 'swims', 'very', 'well'],
    korean: '톰은 수영을 아주 잘한다.',
    grammarTip: '주어(Tom) + 동사(swims) 뒤에 정도 부사(very)가 부사(well)를 앞에서 꾸며줍니다.',
    structure: '주어(S) + 동사(V) + 부사(A)',
    animalId: 'koala',
  },
  {
    id: 'l1-8',
    level: 1,
    words: ['Pandas', 'eat', 'green', 'bamboo'],
    korean: '판다들은 초록 대나무를 먹는다.',
    grammarTip: '주어(Pandas) + 동사(eat) + 색깔 형용사(green) + 명사 목적어(bamboo) 순서입니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'panda',
  },

  // --- LEVEL 2 (5 words) ---
  {
    id: 'l2-1',
    level: 2,
    words: ['He', 'reads', 'a', 'good', 'book'],
    korean: '그는 좋은 책을 읽는다.',
    grammarTip: '주어(He) + 3인칭 동사(reads) + 관사(a) + 형용사(good) + 명사(book) 순서입니다.',
    structure: '주어(S) + 동사(V) + 관사 + 형용사 + 목적어(O)',
    animalId: 'fox',
  },
  {
    id: 'l2-2',
    level: 2,
    words: ['We', 'play', 'soccer', 'after', 'school'],
    korean: '우리는 방과 후에 축구를 한다.',
    grammarTip: '주어(We) + 동사(play) + 운동 종목(soccer) 뒤에 시간 전치사구(after school)가 위치합니다.',
    structure: '주어(S) + 동사(V) + 목적어(O) + 전치사구',
    animalId: 'lion',
  },
  {
    id: 'l2-3',
    level: 2,
    words: ['My', 'mom', 'cooks', 'delicious', 'dinner'],
    korean: '우리 엄마는 맛있는 저녁을 요리하신다.',
    grammarTip: '주어(My mom) 뒤에 동사(cooks), 그 뒤에 맛을 나타내는 형용사와 저녁(delicious dinner)이 옵니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'rabbit',
  },
  {
    id: 'l2-4',
    level: 2,
    words: ['The', 'baby', 'sleeps', 'very', 'peacefully'],
    korean: '아기는 매우 평화롭게 잠을 잔다.',
    grammarTip: '주어(The baby) + 동사(sleeps) 뒤에 동사를 수식하는 부사구(very peacefully)가 옵니다.',
    structure: '주어(S) + 동사(V) + 부사구',
    animalId: 'koala',
  },
  {
    id: 'l2-5',
    level: 2,
    words: ['They', 'live', 'in', 'a', 'city'],
    korean: '그들은 한 도시에 산다.',
    grammarTip: '주어(They) + 동사(live) 뒤에는 장소를 나타내는 전치사 in과 장소(in a city)가 옵니다.',
    structure: '주어(S) + 동사(V) + 장소 전치사구',
    animalId: 'puppy',
  },
  {
    id: 'l2-6',
    level: 2,
    words: ['I', 'bought', 'a', 'new', 'backpack'],
    korean: '나는 새 배낭을 샀다.',
    grammarTip: '주어(I) + 과거형 동사(bought) + 하나의 새 배낭(a new backpack) 순서입니다.',
    structure: '주어(S) + 과거 동사(V) + 목적어(O)',
    animalId: 'hamster',
  },
  {
    id: 'l2-7',
    level: 2,
    words: ['You', 'have', 'a', 'bright', 'smile'],
    korean: '너는 밝은 미소를 지니고 있다.',
    grammarTip: '주어(You) + 동사(have) + 관사(a) + 형용사(bright) + 목적어 명사(smile) 어순입니다.',
    structure: '주어(S) + 동사(V) + 목적어(O)',
    animalId: 'kitten',
  },
  {
    id: 'l2-8',
    level: 2,
    words: ['Fish', 'swim', 'in', 'deep', 'water'],
    korean: '물고기들은 깊은 물속에서 헤엄친다.',
    grammarTip: '주어(Fish) + 동사(swim) 뒤에 전치사(in)와 형용사+명사(deep water)가 결합합니다.',
    structure: '주어(S) + 동사(V) + 전치사구',
    animalId: 'penguin',
  },

  // --- LEVEL 3 (6~7 words) ---
  {
    id: 'l3-1',
    level: 3,
    words: ['You', 'should', 'brush', 'your', 'teeth', 'every', 'night'],
    korean: '너는 매일 밤 이를 닦아야 한다.',
    grammarTip: '조동사(should) 뒤에는 동사원형(brush)이 오고, 목적어(your teeth) 뒤에 시간부사(every night)가 붙습니다.',
    structure: '주어 + 조동사 + 동사원형 + 목적어 + 시간부사구',
    animalId: 'bear',
  },
  {
    id: 'l3-2',
    level: 3,
    words: ['They', 'always', 'help', 'poor', 'animals', 'in', 'winter'],
    korean: '그들은 겨울에 불쌍한 동물들을 항상 돕는다.',
    grammarTip: '빈도부사(always)는 일반동사(help) 앞에 위치합니다! 일반동사 앞, be/조동사 뒤!',
    structure: '주어 + 빈도부사 + 동사 + 목적어 + 전치사구',
    animalId: 'lion',
  },
  {
    id: 'l3-3',
    level: 3,
    words: ['My', 'sister', 'will', 'visit', 'the', 'zoo', 'tomorrow'],
    korean: '내 여동생은 내일 동물원을 방문할 것이다.',
    grammarTip: '미래를 나타내는 조동사(will) + 동사원형(visit) + 장소(the zoo) + 시간부사(tomorrow) 순서입니다.',
    structure: '주어 + 조동사 will + 동사원형 + 목적어 + 시간부사',
    animalId: 'rabbit',
  },
  {
    id: 'l3-4',
    level: 3,
    words: ['We', 'must', 'protect', 'our', 'clean', 'earth', 'together'],
    korean: '우리는 깨끗한 지구를 함께 지켜야 한다.',
    grammarTip: '당위 조동사(must) + 동사원형(protect) + 목적어(our clean earth) + 부사(together) 순서입니다.',
    structure: '주어 + 조동사 must + 동사원형 + 목적어 + 부사',
    animalId: 'panda',
  },
  {
    id: 'l3-5',
    level: 3,
    words: ['He', 'does', 'not', 'like', 'very', 'spicy', 'food'],
    korean: '그는 아주 매운 음식을 좋아하지 않는다.',
    grammarTip: '일반동사 부정문은 주어(He) 뒤에 does not + 동사원형(like) 어순입니다.',
    structure: '주어 + does not + 동사원형 + 부사 + 형용사 + 목적어',
    animalId: 'fox',
  },
  {
    id: 'l3-6',
    level: 3,
    words: ['She', 'is', 'listening', 'to', 'sweet', 'music', 'now'],
    korean: '그녀는 지금 감미로운 음악을 듣고 있다.',
    grammarTip: '현재진행형은 be동사(is) + -ing(listening) 형태이며, listen은 전치사 to와 짝을 이룹니다.',
    structure: '주어 + be동사 + 동사-ing + to + 목적어 + 부사 now',
    animalId: 'kitten',
  },
  {
    id: 'l3-7',
    level: 3,
    words: ['Many', 'students', 'study', 'hard', 'in', 'the', 'library'],
    korean: '많은 학생들이 도서관에서 열심히 공부한다.',
    grammarTip: '주어(Many students) + 동사(study) + 정도부사(hard) + 장소 전치사구(in the library) 순서입니다.',
    structure: '주어 + 동사 + 부사 + 장소 전치사구',
    animalId: 'puppy',
  },
  {
    id: 'l3-8',
    level: 3,
    words: ['The', 'clever', 'monkey', 'climbed', 'the', 'tall', 'tree'],
    korean: '영리한 원숭이가 그 높은 나무에 올라갔다.',
    grammarTip: '수식어+주어(The clever monkey) + 과거동사(climbed) + 수식어+목적어(the tall tree) 어순입니다.',
    structure: '주어구 + 과거동사 + 목적어구',
    animalId: 'koala',
  },
  {
    id: 'l3-9',
    level: 3,
    words: ['Birds', 'build', 'their', 'cozy', 'nests', 'in', 'spring'],
    korean: '새들은 봄에 아늑한 둥지를 짓는다.',
    grammarTip: '주어(Birds) + 동사(build) + 목적어(their cozy nests) + 계절 전치사구(in spring) 어순입니다.',
    structure: '주어 + 동사 + 목적어 + 전치사구',
    animalId: 'penguin',
  },
  {
    id: 'l3-10',
    level: 3,
    words: ['I', 'will', 'meet', 'my', 'best', 'friend', 'soon'],
    korean: '나는 곧 나의 가장 친한 친구를 만날 것이다.',
    grammarTip: '주어(I) + 조동사 will + 본동사 meet + 소유격 목적어(my best friend) + 시간 부사(soon) 순서입니다.',
    structure: '주어 + will + 동사원형 + 목적어 + 시간부사',
    animalId: 'hamster',
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

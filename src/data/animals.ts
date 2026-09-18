import { Animal } from '../types';

export const ANIMALS: Animal[] = [
  {
    id: 'rabbit',
    name: '토순이',
    species: '아기 토끼',
    emoji: '🐰',
    lostSoundText: '우리 집이 어디였더라? 길을 알려줘!',
    homeSoundText: '도착했다! 따뜻한 당근 통나무집이야!',
    homeName: '당근 통나무집',
    houseEmoji: '🏡',
    habitat: '초록 들판',
    color: '#F472B6', // pink-400
  },
  {
    id: 'puppy',
    name: '멍뭉이',
    species: '골든 리트리버 강아지',
    emoji: '🐶',
    lostSoundText: '멍멍! 해가 지기 전에 집에 가고 싶어요!',
    homeSoundText: '도착! 꼬리 흔들흔들! 길 알려줘서 고마워!',
    homeName: '포근한 잔디집',
    houseEmoji: '🏠',
    habitat: '따뜻한 잔디마당',
    color: '#FBBF24', // amber-400
  },
  {
    id: 'kitten',
    name: '나비',
    species: '치즈 고양이',
    emoji: '🐱',
    lostSoundText: '야옹~ 집으로 가는 길 표지판을 맞춰줘!',
    homeSoundText: '골골골~ 따뜻한 내 방 침대 도착이다냥!',
    homeName: '햇살 다락방',
    houseEmoji: '🏡',
    habitat: '햇살 가득한 지붕',
    color: '#FB923C', // orange-400
  },
  {
    id: 'panda',
    name: '바오',
    species: '아기 판다',
    emoji: '🐼',
    lostSoundText: '웅웅... 대나무 숲 속 집으로 가고 싶어!',
    homeSoundText: '야호! 시원한 대나무 방갈로 도착!',
    homeName: '대나무 방갈로',
    houseEmoji: '🛖',
    habitat: '푸른 대나무 숲',
    color: '#34D399', // emerald-400
  },
  {
    id: 'lion',
    name: '레오',
    species: '어린 사자',
    emoji: '🦁',
    lostSoundText: '엄마가 기다리는 사바나 집으로 갈래!',
    homeSoundText: '어흥! 멋진 길잡이 친구 덕분에 집 도착!',
    homeName: '황금빛 바위집',
    houseEmoji: '🏰',
    habitat: '넓은 사바나',
    color: '#F59E0B', // amber-500
  },
  {
    id: 'penguin',
    name: '펭구',
    species: '황제 펭귄',
    emoji: '🐧',
    lostSoundText: '삐약! 시원한 얼음 이글루로 가고 싶어요!',
    homeSoundText: '뒤뚱뒤뚱! 포근한 얼음 이글루 도착!',
    homeName: '시원한 얼음집',
    houseEmoji: '🏠',
    habitat: '시원한 남극 빙하',
    color: '#38BDF8', // sky-400
  },
  {
    id: 'koala',
    name: '코코',
    species: '아기 코알라',
    emoji: '🐨',
    lostSoundText: '쿨쿨... 졸리기 전에 집에 가야 해!',
    homeSoundText: '폭신폭신 나무 위 내 보금자리 도착!',
    homeName: '유칼립투스 트리하우스',
    houseEmoji: '🏡',
    habitat: '유칼립투스 숲',
    color: '#94A3B8', // slate-400
  },
  {
    id: 'fox',
    name: '루비',
    species: '붉은 여우',
    emoji: '🦊',
    lostSoundText: '단풍잎 솔솔 부는 숲속 집이 어디지?',
    homeSoundText: '사뿐사뿐! 아늑한 숲속 굴집 도착!',
    homeName: '단풍 숲속집',
    houseEmoji: '🛖',
    habitat: '신비로운 붉은 숲',
    color: '#EA580C', // orange-600
  },
  {
    id: 'hamster',
    name: '토리',
    species: '골든 햄스터',
    emoji: '🐹',
    lostSoundText: '찍찍! 해바라기씨 가득한 집으로 갈래!',
    homeSoundText: '신난다! 쳇바퀴가 있는 우리 집 도착!',
    homeName: '해바라기 통나무집',
    houseEmoji: '🏠',
    habitat: '아늑한 통나무집',
    color: '#FCD34D', // amber-300
  },
  {
    id: 'bear',
    name: '반달이',
    species: '아기 반달곰',
    emoji: '🐻',
    lostSoundText: '달콤한 꿀이 있는 동굴 집을 찾고 있어!',
    homeSoundText: '우와! 꿀단지가 놓인 우리 집 도착!',
    homeName: '달콤 꿀단지집',
    houseEmoji: '🏡',
    habitat: '깊은 단풍나무 숲',
    color: '#A16207', // yellow-700
  },
];

export function getAnimalById(id: string): Animal {
  return ANIMALS.find((a) => a.id === id) || ANIMALS[0];
}

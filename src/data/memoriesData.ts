import { MemoryPhoto, TimelineMoment } from '../types';

export const MEMORY_PHOTOS: MemoryPhoto[] = [
  {
    id: 1,
    imageUrl: '/images/memories/memory1.svg',
    caption: 'Our First Beautiful Memory',
    date: 'Spring Sunshine',
    rotation: -2.5,
    tapeStyle: 'bg-rose-200/80 -rotate-2',
  },
  {
    id: 2,
    imageUrl: '/images/memories/memory2.svg',
    caption: 'That Special Smile',
    date: 'Golden Hour',
    rotation: 1.8,
    tapeStyle: 'bg-purple-200/80 rotate-3',
  },
  {
    id: 3,
    imageUrl: '/images/memories/memory3.svg',
    caption: 'Happiest Moments Together',
    date: 'Under The Sky',
    rotation: -1.5,
    tapeStyle: 'bg-amber-200/80 -rotate-1',
  },
  {
    id: 4,
    imageUrl: '/images/memories/memory4.svg',
    caption: 'Little Things, Big Memories',
    date: 'Walks & Talks',
    rotation: 2.2,
    tapeStyle: 'bg-pink-200/80 rotate-2',
  },
  {
    id: 5,
    imageUrl: '/images/memories/memory5.svg',
    caption: 'My Favourite Person',
    date: 'Pure Warmth',
    rotation: -2.0,
    tapeStyle: 'bg-lavender-200/80 -rotate-3',
  },
  {
    id: 6,
    imageUrl: '/images/memories/memory6.svg',
    caption: 'Forever Worth Remembering',
    date: 'Twilight Glow',
    rotation: 1.5,
    tapeStyle: 'bg-rose-200/80 rotate-1',
  },
];

export const TIMELINE_MOMENTS: TimelineMoment[] = [
  {
    id: 1,
    title: 'The Day We First Met',
    date: 'A Beautiful Beginning',
    description:
      'The day our paths crossed and an ordinary afternoon turned into something unforgettable. I knew right then you were truly one of a kind.',
    tag: 'First Hello ✨',
  },
  {
    id: 2,
    title: 'Our First Special Moment',
    date: 'Under the Stars',
    description:
      'Sitting together, talking for hours until we forgot what time it was. That was the moment everything clicked in my heart.',
    tag: 'Heartbeats ❤️',
  },
  {
    id: 3,
    title: 'A Day Full of Laughter',
    date: 'Endless Smiles',
    description:
      'The silly jokes, spontaneous road trips, and laughing so hard our cheeks hurt. With you, every single second is joyful.',
    tag: 'Pure Happiness 🌸',
  },
  {
    id: 4,
    title: 'Every Moment After That',
    date: 'Forever & Always',
    description:
      'Every conversation, every little text, and every quiet smile. Falling in love with you more and more each passing day.',
    tag: 'Endless Love 💫',
  },
];

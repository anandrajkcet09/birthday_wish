export type Screen = 'landing' | 'celebration' | 'memories' | 'letter' | 'reasons' | 'final';

export interface ParticleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'heart' | 'star' | 'petal';
  duration: number;
  delay: number;
  rotate: number;
  color?: string;
}

export interface MemoryPhoto {
  id: number;
  imageUrl: string;
  caption: string;
  date?: string;
  rotation: number;
  tapeStyle?: string;
}

export interface TimelineMoment {
  id: number;
  title: string;
  date: string;
  description: string;
  tag?: string;
}

export interface LoveLetterData {
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
}

export interface ReasonCard {
  id: number;
  number: number;
  title: string;
  emoji: string;
  message: string;
  accentColor?: string;
}

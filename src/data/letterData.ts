import { LoveLetterData } from '../types';

export const LOVE_LETTER: LoveLetterData = {
  greeting: 'My Dearest Princess,',
  paragraphs: [
    "I don't know where to begin because words will never be enough to explain how special you are to me.",
    'You make my ordinary days beautiful. Your smile makes everything better, and your presence brings happiness into my life.',
    'I hope this birthday brings you all the happiness you deserve. Keep smiling, keep shining and never forget how precious you are.',
    'Thank you for being you.',
    'Happy Birthday, My Favourite Person! ❤️',
  ],
  closing: 'Forever Yours,',
  signature: 'Alex',
};

// Full plain text representation for the typing animation
export const FULL_LETTER_TEXT = `${LOVE_LETTER.greeting}

${LOVE_LETTER.paragraphs[0]}

${LOVE_LETTER.paragraphs[1]}

${LOVE_LETTER.paragraphs[2]}

${LOVE_LETTER.paragraphs[3]}

${LOVE_LETTER.paragraphs[4]}

${LOVE_LETTER.closing}
${LOVE_LETTER.signature}`;

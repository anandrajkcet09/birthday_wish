/**
 * Global Site Customization Configuration
 * Edit these values to personalize the birthday website for your special person!
 */
export const SITE_CONFIG = {
  boyfriend: {
    name: 'Alex',
  },
  girlfriend: {
    name: 'Sophia',
    nickname: 'Princess',
  },
  event: {
    title: 'Happy Birthday',
    date: 'November 19',
    tagline: 'For My Favourite Person ❤️',
  },
  audio: {
    trackName: 'Romantic Melody',
    localFilePath: '/audio/romantic-bgm.mp3',
  },
} as const;

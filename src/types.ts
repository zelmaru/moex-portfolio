export const PAGES = {
  MARKET: 'market',
  PORTFOLIO: 'portfolio',
} as const;

export type PageType = (typeof PAGES)[keyof typeof PAGES];

export const PAGES = {
  MARKET: 'market',
  PORTFOLIO: 'portfolio',
} as const;

export type PageType = (typeof PAGES)[keyof typeof PAGES];

export interface MoexTicker {
  id: string;
  ticker: string;
  name: string;
  price: number;
  percentChange24h: number;
}

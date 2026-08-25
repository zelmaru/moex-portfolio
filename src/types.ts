export const PAGES = {
  MARKET: 'market',
  PORTFOLIO: 'portfolio',
  ACADEMY: 'academy',
} as const;

export type PageType = (typeof PAGES)[keyof typeof PAGES];

export interface MoexTicker {
  id: string;
  ticker: string;
  name: string;
  price: number;
  percentChange24h: number;
}

export interface EducationalArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  conclusion: string;
}

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

export const ARTICLE_CATEGORIES = {
  BASICS: 'basics',
  PSYCHOLOGY: 'psychology',
  RISK: 'risk',
} as const;

export type ArticleCategoryType = (typeof ARTICLE_CATEGORIES)[keyof typeof ARTICLE_CATEGORIES];
export type ArticleCategoryFilterType = 'all' | ArticleCategoryType;

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
}

export interface EducationalArticle {
  id: string;
  category: ArticleCategoryType;
  publishedAt: string; //format YYYY-MM-DDTHH:mm:ss.sssZ (ISO 8601 UTC)
  title: string;
  summary: string;
  content: string;
  conclusion: string;
  quiz: QuizQuestion[];
}

export interface QuizResult {
  score: number;
  total: number;
  completedAt: string;
}

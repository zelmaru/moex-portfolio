import { EducationalArticle } from '@/types';
import { create } from 'zustand';

interface ArticleStore {
  activeArticle: EducationalArticle | null;
  setActiveArticle: (article: EducationalArticle | null) => void;
  resetActiveArticle: () => void;
}

export const useArticleStore = create<ArticleStore>((set) => ({
  activeArticle: null,
  setActiveArticle: (article: EducationalArticle | null) => {
    set({ activeArticle: article });
  },
  resetActiveArticle: () => {
    set({ activeArticle: null });
  },
}));

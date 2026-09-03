import { create } from 'zustand';

interface QuizStore {
  activeQuizId: string | null;
  currentQuestionIndex: number;
  answers: Record<string, string>; // { [idВопроса]: idОтвета }
  startQuiz: (quizId: string) => void;
  setAnswer: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  activeQuizId: null,
  currentQuestionIndex: 0,
  answers: {},
  startQuiz: (quizId) => {
    set((state) => {
      // if user goot back to the same article, keep answers
      if (state.activeQuizId === quizId) return {};

      // if user changed article, reset old answers
      return { activeQuizId: quizId, currentQuestionIndex: 0, answers: {} };
    });
  },

  setAnswer: (questionId, optionId) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionId },
    }));
  },
  nextQuestion: () => {
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 }));
  },
  resetQuiz: () => {
    set({ currentQuestionIndex: 0, answers: {} });
  },
}));

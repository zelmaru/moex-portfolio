import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldLegend, FieldSet, FieldTitle } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { useQuizStore } from '@/store/quizStore';

import { QuizQuestion } from '@/types';

interface AcademyQuizProps {
  articleId: string;
  quiz: QuizQuestion[];
}

const AcademyQuiz = ({ articleId, quiz }: AcademyQuizProps) => {
  const { currentQuestionIndex, answers, startQuiz, setAnswer, nextQuestion, resetQuiz } =
    useQuizStore();
  const currentQuestion = quiz[currentQuestionIndex];
  const selectedOptionId = answers[currentQuestion.id] || '';
  const [finalScore, setFinalScore] = useState<{ correct: number; total: number } | null>(null);

  useEffect(() => {
    startQuiz(articleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  const handleContinue = () => {
    setAnswer(currentQuestion.id, selectedOptionId);
    nextQuestion();
  };

  const handleSubmit = async () => {
    setAnswer(currentQuestion.id, selectedOptionId);
    const allAnswers = { ...answers, [currentQuestion.id]: selectedOptionId };
    const score = quiz.filter(
      (question) => allAnswers[question.id] === question.correctOptionId,
    ).length;
    setFinalScore({ correct: score, total: quiz.length });
    await storage.setItem(`local:quiz_result_${articleId}`, {
      score: score,
      total: quiz.length,
      completedAt: new Date().toISOString(),
    });
  };

  const handleReset = async () => {
    await storage.removeItem(`local:quiz_result_${articleId}`);
    resetQuiz();
    setFinalScore(null);
  };

  return (
    <>
      <h3 className="mt-8 text-sm font-bold">Проверьте себя:</h3>
      <section className="my-4 flex flex-col rounded-lg border bg-muted p-4 text-sm">
        {finalScore ? (
          <>
            <span className="leading-relaxed">
              Ваш результат: {finalScore.correct}/{finalScore.total}.
            </span>
            <Button
              variant="ghost"
              className="mt-4 self-end font-bold hover:bg-background"
              onClick={() => void handleReset()}
            >
              Повторить
            </Button>
          </>
        ) : (
          <>
            <FieldSet className="w-full max-w-xs">
              <FieldLegend variant="label" className="text-muted-foreground">
                Вопрос {currentQuestionIndex + 1}/{quiz.length}
              </FieldLegend>
              <FieldTitle className="font-bold leading-relaxed">
                {quiz[currentQuestionIndex].question}
              </FieldTitle>
              <RadioGroup
                onValueChange={(value) => {
                  setAnswer(currentQuestion.id, value);
                }}
                value={selectedOptionId}
              >
                {quiz[currentQuestionIndex].options.map((option) => (
                  <Field orientation="horizontal" className="items-start" key={option.id}>
                    <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                    <FieldLabel
                      htmlFor={option.id}
                      className={cn('cursor-pointer font-normal leading-relaxed')}
                    >
                      {option.text}
                    </FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
            </FieldSet>
            {currentQuestionIndex + 1 < quiz.length ? (
              <Button
                variant="ghost"
                className="mt-4 self-end font-bold hover:bg-background"
                disabled={selectedOptionId === ''}
                onClick={handleContinue}
              >
                Продолжить
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="mt-4 self-end font-bold hover:bg-background"
                disabled={selectedOptionId === ''}
                onClick={() => void handleSubmit()}
              >
                Отправить
              </Button>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default AcademyQuiz;

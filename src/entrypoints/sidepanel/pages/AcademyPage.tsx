import { Button } from '@/components/ui/button';
import { ACADEMY_ARTICLES } from '@/lib/academyArticles';
import { EducationalArticle } from '@/types';
import { ChevronLeft } from 'lucide-react';

const AcademyPage = () => {
  const [activeArticle, setActiveArticle] = useState<EducationalArticle | null>(null);

  return activeArticle ? (
    <div className="p-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setActiveArticle(null);
        }}
      >
        <ChevronLeft />
      </Button>
      <article className="flex flex-col gap-4 pt-4 text-sm">
        <h2 className="text-lg font-bold">{activeArticle.title}</h2>
        <p className="whitespace-pre-line leading-relaxed">{activeArticle.content}</p>
        <p className="font-semibold">{activeArticle.conclusion}</p>
      </article>
    </div>
  ) : (
    <ul className="divide-y divide-border text-sm">
      {ACADEMY_ARTICLES.map((article) => (
        <li key={article.id}>
          <button
            className="flex w-full flex-col gap-2 p-4 text-left transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none"
            onClick={() => {
              setActiveArticle(article);
            }}
          >
            <span className="font-bold leading-none">{article.title}</span>
            <p className="text-muted-foreground">{article.summary}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AcademyPage;

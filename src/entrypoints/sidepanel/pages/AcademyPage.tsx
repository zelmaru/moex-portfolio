import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ACADEMY_ARTICLES } from '@/lib/academyArticles';
import { EducationalArticle, ArticleCategoryFilterType, ARTICLE_CATEGORIES } from '@/types';
import { ChevronLeft, Search, X } from 'lucide-react';

const TOGGLE_CATEGORIES: { id: ArticleCategoryFilterType; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: ARTICLE_CATEGORIES.BASICS, label: 'Основы' },
  { id: ARTICLE_CATEGORIES.PSYCHOLOGY, label: 'Психология' },
  { id: ARTICLE_CATEGORIES.RISK, label: 'Риски' },
];
const AcademyPage = () => {
  const [activeArticle, setActiveArticle] = useState<EducationalArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');

  // ref attached to the scrollable content <div> container
  const articleListContainerRef = useRef<HTMLDivElement | null>(null);
  // remembers the scroll position before opening an article
  const articleListScrollPositionRef = useRef(0);

  // save the current scroll position before transitioning to the article view
  const handleOpenArticle = (article: EducationalArticle) => {
    if (articleListContainerRef.current) {
      articleListScrollPositionRef.current = articleListContainerRef.current.scrollTop;
    }
    setActiveArticle(article);
  };

  // restore the saved scroll position when navigating back from an article
  useEffect(() => {
    if (!activeArticle && articleListContainerRef.current) {
      articleListContainerRef.current.scrollTop = articleListScrollPositionRef.current;
    }
  }, [activeArticle]);

  const filteredArticles = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    return ACADEMY_ARTICLES.filter(
      (article) => selectedCategoryId === 'all' || article.category === selectedCategoryId,
    ).filter((article) =>
      [article.id, article.title, article.summary, article.content, article.conclusion]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearchQuery),
    );
  }, [searchQuery, selectedCategoryId]);

  const renderSearch = () => {
    return (
      <InputGroup>
        <InputGroupInput
          className="text-sm"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {searchQuery && (
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              className="pr-1.5! text-xs"
              onClick={() => {
                setSearchQuery('');
              }}
            >
              <X />
            </InputGroupButton>
          )}
        </InputGroupAddon>
      </InputGroup>
    );
  };

  const renderFilters = () => {
    return (
      <ToggleGroup
        variant="outline"
        defaultValue={TOGGLE_CATEGORIES[0].id}
        type="single"
        className="mt-4 flex justify-start"
        size="xs"
        value={selectedCategoryId}
        onValueChange={(value) => {
          setSelectedCategoryId(value || 'all'); // shadcn sets value to "" by default on untoggle
        }}
      >
        {TOGGLE_CATEGORIES.map((category) => (
          <ToggleGroupItem
            key={category.id}
            value={category.id}
            className="text-xs"
            aria-label={`Выбрать категорию ${category.label}`}
          >
            {category.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  };

  return activeArticle ? (
    <PageContainer>
      <PageContainer.Header>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setActiveArticle(null);
          }}
        >
          <ChevronLeft />
        </Button>
      </PageContainer.Header>
      <PageContainer.Content className="px-4 pb-4" scrollResetDeps={[activeArticle]}>
        <article className="flex flex-col gap-4 text-sm">
          <h2 className="text-lg font-bold">{activeArticle.title}</h2>
          <p className="whitespace-pre-line leading-relaxed">{activeArticle.content}</p>
          <p className="font-semibold">{activeArticle.conclusion}</p>
        </article>
      </PageContainer.Content>
    </PageContainer>
  ) : (
    <PageContainer>
      <PageContainer.Header>
        {renderSearch()}
        {renderFilters()}
      </PageContainer.Header>
      <PageContainer.Content
        scrollResetDeps={[searchQuery, selectedCategoryId]}
        scrollableContainerRef={articleListContainerRef}
      >
        {filteredArticles.length === 0 ? (
          <div className="p-4 text-xs text-muted-foreground">
            Ничего не найдено. Попробуйте изменить запрос.
          </div>
        ) : (
          <ul className="divide-y divide-border text-sm">
            {filteredArticles.map((article) => (
              <li key={article.id}>
                <button
                  className="flex w-full flex-col gap-2 p-4 text-left transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none"
                  onClick={() => {
                    handleOpenArticle(article);
                  }}
                >
                  <span className="font-bold leading-none">{article.title}</span>
                  <p className="text-muted-foreground">{article.summary}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </PageContainer.Content>
    </PageContainer>
  );
};

export default AcademyPage;

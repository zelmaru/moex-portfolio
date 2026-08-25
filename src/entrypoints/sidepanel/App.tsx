import ThemeToggleButton from '@/components/ThemeButton';
import { ThemeProvider } from '@/context/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PAGES } from '@/types';
import MarketPage from './pages/MarketPage';
import PortfolioPage from './pages/PortfolioPage';
import AcademyPage from './pages/AcademyPage';

const App = () => {
  return (
    <ThemeProvider>
      <Tabs defaultValue={PAGES.MARKET}>
        <header className="flex items-center justify-between p-2">
          <TabsList className="rounded-none bg-transparent p-0">
            <TabsTrigger
              value={PAGES.MARKET}
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none"
            >
              Рынок
            </TabsTrigger>
            <TabsTrigger
              value={PAGES.PORTFOLIO}
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none"
            >
              Портфель
            </TabsTrigger>
            <TabsTrigger
              value={PAGES.ACADEMY}
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:shadow-none"
            >
              Академия
            </TabsTrigger>
          </TabsList>
          <ThemeToggleButton />
        </header>
        <TabsContent value={PAGES.MARKET}>
          <MarketPage />
        </TabsContent>
        <TabsContent value={PAGES.PORTFOLIO}>
          <PortfolioPage />
        </TabsContent>
        <TabsContent value={PAGES.ACADEMY}>
          <AcademyPage />
        </TabsContent>
      </Tabs>
    </ThemeProvider>
  );
};

export default App;

import ThemeToggleButton from '@/components/ThemeButton';
import { ThemeProvider } from '@/context/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PAGES } from '@/types';
import MarketPage from './pages/MarketPage';
import PortfolioPage from './pages/PortfolioPage';

const App = () => {
  return (
    <ThemeProvider>
      <Tabs defaultValue={PAGES.MARKET}>
        <header className="flex items-center justify-between p-2">
          <TabsList>
            <TabsTrigger value={PAGES.MARKET}>Рынок</TabsTrigger>
            <TabsTrigger value={PAGES.PORTFOLIO}>Портфель</TabsTrigger>
          </TabsList>
          <ThemeToggleButton />
        </header>
        <TabsContent value={PAGES.MARKET}>
          <MarketPage />
        </TabsContent>
        <TabsContent value={PAGES.PORTFOLIO}>
          <PortfolioPage />
        </TabsContent>
      </Tabs>
    </ThemeProvider>
  );
};

export default App;

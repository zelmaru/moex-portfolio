import ThemeToggleButton from '@/components/ThemeButton';
import { ThemeProvider } from '@/context/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <header className="flex items-center justify-end p-2">
        <nav>
          <ThemeToggleButton />
        </nav>
      </header>
    </ThemeProvider>
  );
};

export default App;

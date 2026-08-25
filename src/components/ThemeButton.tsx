import { Moon, Sun } from 'lucide-react';
import { useAppTheme } from '@/context/ThemeProvider';
import { Button } from '@/components/ui/button';

const ThemeToggleButton = () => {
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        toggleTheme().catch((err: unknown) => {
          console.error('Theme fail:', err);
        });
      }}
      aria-pressed={isDark}
      aria-label="Toggle theme mode"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeToggleButton;

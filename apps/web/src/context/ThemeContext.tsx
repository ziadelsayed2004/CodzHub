import React, { createContext, useContext, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark' | 'dim';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme, event?: React.MouseEvent | React.ChangeEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const PRECEDENCE: Record<Theme, number> = {
  light: 1,
  dim: 2,
  dark: 3
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved === 'light' || saved === 'dark' || saved === 'dim' ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme, event?: React.MouseEvent | React.ChangeEvent) => {
    if (newTheme === theme) return;

    const doc = document as any;
    if (!event || !doc.startViewTransition) {
      setThemeState(newTheme);
      return;
    }

    // Capture click or element coordinates
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    let clientX = (event as any).clientX;
    let clientY = (event as any).clientY;

    if (clientX === undefined && (event as any).nativeEvent) {
      clientX = (event as any).nativeEvent.clientX;
      clientY = (event as any).nativeEvent.clientY;
    }

    if (clientX !== undefined && clientX !== 0) {
      x = clientX;
      y = clientY;
    } else if ((event as any).target) {
      const rect = (event as any).target.getBoundingClientRect();
      if (rect.width > 0) {
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const currentTheme = theme;
    const isCollapsing = PRECEDENCE[newTheme] < PRECEDENCE[currentTheme];

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setThemeState(newTheme);
      });
    });

    transition.ready.then(() => {
      if (isCollapsing) {
        // Collapsing reveal: Shrink current theme away, revealing target theme underneath
        document.documentElement.animate(
          {
            clipPath: [
              `circle(${endRadius}px at ${x}px ${y}px)`,
              `circle(0px at ${x}px ${y}px)`
            ],
            opacity: [1, 0]
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            pseudoElement: '::view-transition-old(root)',
          }
        );
      } else {
        // Expanding reveal: Spreads new theme on top of current theme
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ],
            opacity: [0, 1]
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

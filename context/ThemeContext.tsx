'use client';

import { ReactNode, createContext, useState, useContext } from "react";

type ThemProviderProps = {
  children: ReactNode
}

type ThemeContextProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: ThemProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark');
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
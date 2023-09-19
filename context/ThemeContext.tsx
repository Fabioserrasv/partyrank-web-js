'use client';

import { useSession } from "next-auth/react";
import { ReactNode, createContext, useState, useContext } from "react";

type ThemeProviderProps = {
  children: ReactNode;
  theme: "dark" | "light";
}

type ThemeContextProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  toggleTheme: () => {}
});

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(theme == "dark")

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
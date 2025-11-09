'use client';
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useState, useContext, useEffect } from "react";

type ThemeProviderProps = {
  children: ReactNode;
  theme: "dark" | "light";
}

type ThemeContextProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: true,
  toggleTheme: () => { }
});

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  const { data: session, update } = useSession()
  const [isDarkMode, setIsDarkMode] = useState<boolean>(theme === "dark")

  // Sincroniza o estado quando a prop theme muda ou quando a sessão carrega
  useEffect(() => {
    const currentTheme = session?.user?.theme || theme;
    const shouldBeDark = currentTheme === "dark";
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, [theme, session?.user?.theme]);

  async function toggleTheme() {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    const newTheme = newDarkMode ? "dark" : "light";
    document.documentElement.classList.toggle('dark', newDarkMode);
    
    await update({
      user: {
        theme: newTheme
      }
    });
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
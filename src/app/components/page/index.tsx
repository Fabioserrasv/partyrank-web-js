'use client'
import { ReactNode } from "react";
import './page.scss';
import { useTheme } from "../../../../context/ThemeContext";
import { Moon } from 'lucide-react';

type PageProps = {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className="content">
      <header>
        <Moon onClick={toggleTheme} className="icon" />
      </header>
      <div className="main">
        {children}
      </div>
      <footer></footer>
    </div>
  )
}
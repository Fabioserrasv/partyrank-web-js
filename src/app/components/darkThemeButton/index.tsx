'use client'

import { useTheme } from "../../context/ThemeContext";
import { Moon } from 'lucide-react';

export function DarkThemeButton(){
  const { isDarkMode, toggleTheme } = useTheme();

  return <Moon onClick={toggleTheme} className="icon" />
}
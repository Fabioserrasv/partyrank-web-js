'use client'

import { useTheme } from "../../../../context/ThemeContext";
import { Moon } from 'lucide-react';

export function Night(){
  const { isDarkMode, toggleTheme } = useTheme();

  return <Moon onClick={toggleTheme} className="icon" />
}
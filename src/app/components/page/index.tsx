import { ReactNode } from "react";
import './page.scss';
import { useTheme } from "../../context/ThemeContext";
import { DarkThemeButton } from "../darkThemeButton";

type PageProps = {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div className="content">
      <header>
        <DarkThemeButton />
      </header>
      <div className="main">
        {children}
      </div>
      <footer></footer>
    </div>
  )
}
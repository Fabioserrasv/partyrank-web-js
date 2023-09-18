import { ReactNode } from "react";
import './page.scss';
import { useTheme } from "../../../../context/ThemeContext";
import { Night } from "../night";

type PageProps = {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div className="content">
      <header>
        <Night />
      </header>
      <div className="main">
        {children}
      </div>
      <footer></footer>
    </div>
  )
}
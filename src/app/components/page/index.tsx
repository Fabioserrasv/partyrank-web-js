import { ReactNode } from "react";
import './page.scss';
import { useTheme } from "../../context/ThemeContext";
import { DarkThemeButton } from "../darkThemeButton";
import { SignOut } from "../signout";

type PageProps = {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div className="content">
      <header>
        <SignOut />
        <DarkThemeButton />
      </header>
      <div className="main">
        {children}
      </div>
      <footer></footer>
    </div>
  )
}
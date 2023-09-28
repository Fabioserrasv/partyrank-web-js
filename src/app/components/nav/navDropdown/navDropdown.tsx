'use client'
import { LogOut, Moon, User } from "lucide-react";
import './navDropdown.scss';
import { signOut } from "next-auth/react";
import { MutableRefObject, RefAttributes, forwardRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

type NavDropdownProps = {
  isOpen: boolean;
}

export const NavDropdown = forwardRef<HTMLUListElement, NavDropdownProps>(({ isOpen }: NavDropdownProps, ref) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ul ref={ref} className={`dropdown-menu ${isOpen ? 'active' : 'inactive'}`} >
      <Link href="/profile">
        <li className="item">
          <User className="icon" />
          <span>Profile</span>
        </li>
      </Link>

      <li className="item" onClick={toggleTheme}>
        <Moon className="icon" />
        <span>Change Theme</span>
      </li>

      <li className="item">
        <LogOut onClick={() => { signOut() }} className="icon" />
        <span>Sign out</span>
      </li>
    </ul>
  )
})
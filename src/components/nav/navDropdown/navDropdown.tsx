'use client'
import { LogOut, Moon, User } from "lucide-react";
import './navDropdown.scss';
import { signOut } from "next-auth/react";
import { forwardRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

type NavDropdownProps = {
  isOpen: boolean;
}

const NavDropdown = forwardRef<HTMLUListElement, NavDropdownProps>(({ isOpen }: NavDropdownProps, ref) => {
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

      <li className="item" onClick={() => { signOut() }}>
        <LogOut className="icon" />
        <span>Sign out</span>
      </li>
    </ul>
  )
})

NavDropdown.displayName = "NavDropdown"

export default NavDropdown;
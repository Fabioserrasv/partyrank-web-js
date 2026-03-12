'use client'
import './nav.scss'
import { FolderSearch2, Home, Library, Users } from "lucide-react"
import { User } from "next-auth"
import { NavDropdown } from "./navDropdown/navDropdown"
import { NavItem } from "./navDropdown/navItem";
import Link from "next/link";
import { NavUser } from "./navUser/navUser";
import { Button } from "../button/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import BootstrapNav from 'react-bootstrap/Nav';
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from '@/context/ThemeContext'

type NavProps = {
  user: User;
}

export function Nav({ user }: NavProps) {
  const { isDarkMode } = useTheme();
  const pathname = usePathname();

  function isActive(path: string) {
    return pathname.includes(path) ? 'active' : '';
  }
    
  return (
    <Navbar expand="lg"  bg={isDarkMode ? 'dark' : ''} data-bs-theme={isDarkMode ? 'dark' : ''}>
      <Container fluid>
        {/* <Navbar.Brand href="/">Party Rank</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <BootstrapNav className="me-auto">
            <BootstrapNav.Link href="/home" className={"d-flex " + isActive('/home')}>
              <Home />
              <span className="ms-1">Home</span>
            </BootstrapNav.Link>
            <BootstrapNav.Link href="/songsets" className={"d-flex " + isActive('/songsets')}>
              <Library />
              <span className="ms-1">My Song Sets</span>
            </BootstrapNav.Link>
            <BootstrapNav.Link href="/songfinder" className={"d-flex " + isActive('/songfinder')}>
              <FolderSearch2 />
              <span className="ms-1">Song Finder</span>
            </BootstrapNav.Link>
            <BootstrapNav.Link href="/users" className={"d-flex " + isActive('/users')}>
              <Users />
              <span className="ms-1">Users</span>
            </BootstrapNav.Link>
          </BootstrapNav>
          <Link className="buttonCreate" href={"/songsets/create/0"}>
            <Button
              name="New song set"
            />
          </Link>
          <NavUser user={user} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
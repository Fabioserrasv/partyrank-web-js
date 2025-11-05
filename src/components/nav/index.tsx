'use client'
import { FolderSearch2, Home, Library, Users } from "lucide-react"
import './nav.scss'
import { User } from "next-auth"
import { NavDropdown } from "./navDropdown/navDropdown"
import { headers } from "next/headers";
import { NavItem } from "./navDropdown/navItem";
import Link from "next/link";
import { NavUser } from "./navUser/navUser";
import { Button } from "../button/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import BootstrapNav from 'react-bootstrap/Nav';
import { usePathname } from "next/navigation";

type NavProps = {
  user: User;
}

export function Nav({ user }: NavProps) {

  function isActive(path: string) {
    const pathname = usePathname();
    return pathname.includes(path) ? 'active' : '';
  }

  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Party Rank</Navbar.Brand>
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
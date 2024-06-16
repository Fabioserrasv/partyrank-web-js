import { FolderSearch2, Home, Library, Users } from "lucide-react"
import './nav.scss'
import { User } from "next-auth"
import NavDropdown from "./navDropdown/navDropdown"
import { headers } from "next/headers";
import { NavItem } from "./navDropdown/navItem";
import Link from "next/link";
import { NavUser } from "./navUser/navUser";
import { Button } from "../button/Button";
type NavProps = {
  user: User;
}

export function Nav({ user }: NavProps) {

  return (
    <nav>
      <Link href="/home">
        <NavItem route="/home">
          <Home />
          <span>Home</span>
        </NavItem>
      </Link>

      <Link href="/songsets">
        <NavItem route="/songsets">
          <Library />
          <span>My Song Sets</span>
        </NavItem>
      </Link>

      <Link href="/songfinder">
        <NavItem route="/songfinder">
          <FolderSearch2 />
          <span>Song Finder</span>
        </NavItem>
      </Link>

      <Link href="/users">
        <NavItem route="/users">
          <Users />
          <span>Users</span>
        </NavItem>
      </Link>

      <Link className="buttonCreate" href={"/songsets/create/0"}>
        <Button
          name="New song set"
        />
      </Link>

      <NavUser user={user} />
    </nav>
  )
}
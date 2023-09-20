import { FolderSearch2, Library, Users } from "lucide-react"
import './nav.scss'
import { SignOut } from "../signout"
import { DarkThemeButton } from "../darkThemeButton"
import { User } from "next-auth"

type NavProps = {
  user: User
}

export function Nav({ user }: NavProps) {
  return (
    <nav>
      <div className="navItem">
        <Library />
        <span>Song Set</span>
      </div>
      <div className="navItem">
        <FolderSearch2 />
        <span>Song Finder</span>
      </div>
      <div className="navItem active">
        <Users />
        <span>Users</span>
      </div>
      <div className="actions">
        <SignOut />
        <DarkThemeButton />
      </div>
      <div className="user">
        <div className="info">
          <span className="name">{user.username}</span>
          <span className="avg">Avg: 7.27</span>
        </div>
        <div className="pfp">
          <img src={user.imageUrl} alt="" />
        </div>
      </div>
    </nav>
  )
}
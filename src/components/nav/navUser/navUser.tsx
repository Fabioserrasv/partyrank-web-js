'use client'
import { User } from "next-auth";
import { NavDropdown } from "../navDropdown/navDropdown";
import { RefAttributes, useEffect, useRef, useState } from "react";
import { getUserImageUrlPath } from "@/lib/utils";

type NavUserProps = {
  user: User;
}

export function NavUser({ user }: NavUserProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  let menuRef = useRef<HTMLUListElement>(null);
  let imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    function checkChildsWasClicked(nodes: NodeListOf<ChildNode>, target: HTMLElement) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === target) {
          return true;
        }
      }

      return false;
    }

    let handler = (e: MouseEvent) => {
      if (
        menuRef.current
        && imgRef.current
        && !menuRef.current.contains(e.target as HTMLElement)
        && !imgRef.current.contains(e.target as HTMLElement)
        && !checkChildsWasClicked(menuRef.current.childNodes, e.target as HTMLElement)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  })

  return (
    <div className="user">
      <div className="info">
        <span className="name">{user.username}</span>
        <span className="avg">Average: {user.average}</span>
      </div>
      <div className="pfp" onClick={() => { setIsDropdownOpen(!isDropdownOpen); }}>
        <img src={getUserImageUrlPath(user.imageUrl)} alt="Profile Picture" ref={imgRef} />
      </div>

      <NavDropdown isOpen={isDropdownOpen} ref={menuRef} />
    </div>
  )
}
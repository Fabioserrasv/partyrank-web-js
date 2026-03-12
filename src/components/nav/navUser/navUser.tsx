"use client";
import { User } from "next-auth";
import { NavDropdown } from "../navDropdown/navDropdown";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { ProfilePicture } from "@/components/profile-picture";

type NavUserProps = {
  user: User;
};

export function NavUser({ user }: NavUserProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const imageUrl = session?.user?.imageUrl ?? user.imageUrl;

  let menuRef = useRef<HTMLUListElement>(null);
  let pfpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function checkChildsWasClicked(
      nodes: NodeListOf<ChildNode>,
      target: HTMLElement,
    ) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === target) {
          return true;
        }
      }

      return false;
    }

    let handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        pfpRef.current &&
        !menuRef.current.contains(e.target as HTMLElement) &&
        !pfpRef.current.contains(e.target as HTMLElement) &&
        !checkChildsWasClicked(
          menuRef.current.childNodes,
          e.target as HTMLElement,
        )
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="user">
      <div className="info">
        <span className="name">{user.username}</span>
        <span className="avg">Average: {user.average}</span>
      </div>
      <div
        className="pfp"
        ref={pfpRef}
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <ProfilePicture userId={user.id} imageUrl={imageUrl} width={0} height={0} />
      </div>

      <NavDropdown isOpen={isDropdownOpen} ref={menuRef} />
    </div>
  );
}

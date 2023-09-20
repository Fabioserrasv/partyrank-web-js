'use client';
import { usePathname } from "next/navigation";
import '../nav.scss';

type NavItemProps = {
  route: string;
  children: React.ReactNode
}
export function NavItem({ route, children }: NavItemProps) {
  function isActive(route: string) {
    
    return route == usePathname() ? 'active' : ''; 
  }

  return (
    <div className={"navItem " + isActive(route)} >
      {children}
    </div>
  )
}
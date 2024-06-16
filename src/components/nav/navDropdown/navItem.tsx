'use client';
import { usePathname } from "next/navigation";
import '../nav.scss';

type NavItemProps = {
  route: string;
  children: React.ReactNode
}

export function NavItem({ route, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(route) ? 'active' : '';

  return (
    <div className={"navItem " + isActive}>
      {children}
    </div>
  );
}
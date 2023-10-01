'use client'
import './auth.scss';
import { usePathname } from "next/navigation";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  function currentPageSubTitle() {
    const pathname = usePathname()

    if (pathname.includes('register')) return 'Sign up';
    if (pathname.includes('login')) return 'Sign in';
  }

  return (
    <div className="authPage">
      <div className='title'>
        <h1 >Party Rank Web シ</h1>
        <span>パーティーランク</span>
      </div>
      <div className='cards'>
        <span>{currentPageSubTitle()}</span>
        {children}
      </div>
    </div>
  )
}
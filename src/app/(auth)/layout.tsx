'use client'
import { Suspense } from 'react';
import './auth.scss';
import { usePathname } from "next/navigation";
import { LoadingComponent } from '../components/loading-component';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  function currentPageSubTitle() {
    const pathname = usePathname()

    if (pathname.includes('register')) return 'Sign up';
    if (pathname.includes('login')) return 'Sign in';
    return ''
  }

  return (
    <div className="authPage">
      <div className='title'>
        <h1 >Party Rank Web シ</h1>
        <span>パーティーランク</span>
      </div>
      <div className='cards'>
        <span className='subtitle'>{currentPageSubTitle()}</span>
        <Suspense fallback={<LoadingComponent />}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}
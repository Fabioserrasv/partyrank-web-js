'use client'
import { Suspense } from 'react';
import './auth.scss';
import { usePathname } from "next/navigation";
import { LoadingComponent } from '@/components/loading-component';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const subtitle = pathname.includes('register') ? 'Sign up' : pathname.includes('login') ? 'Sign in' : '';

  return (
    <div className="authPage">
      <div className='title'>
        <h1 >Party Rank Web シ</h1>
        <span>パーティーランク</span>
      </div>
      <div className='cards'>
        <span className='subtitle'>{subtitle}</span>
        <Suspense fallback={<LoadingComponent />}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '../context/ThemeContext'
import '../styles/layout.scss';
import { Page } from './components/page';
import AuthProvider from '../context/AuthProvider';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import { Suspense } from 'react';
import { Loading } from './components/loading';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Party Rank Web',
  description: 'A platform for rating anime songs with your friends and, in the end, generating a ranking!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options);
  const theme = session?.user.theme || "light"

  return (
    <html lang="pt-BR" className={theme}>
      <body className={roboto.className}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Page>
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </Page>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

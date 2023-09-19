import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from './context/ThemeContext'
import './styles/layout.scss';
import { Page } from './components/page';
import { getSession } from 'next-auth/react';
import AuthProvider from './context/AuthProvider';

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
  const session = await getSession();
  const theme = session?.user.theme || "light"
  
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Page>
              {children}
            </Page>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '../../context/ThemeContext'
import './styles/layout.scss';
import { Page } from './components/page';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Party Rank Web',
  description: 'A platform for rating anime songs with your friends and, in the end, generating a ranking!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <ThemeProvider>
          <Page>
            {children}
          </Page>
        </ThemeProvider>
      </body>
    </html>
  )
}

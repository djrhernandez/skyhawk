import './globals.css'
import './styles/App.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

import { Providers } from './providers'
import { NavBar } from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skyhawk',
  description: 'Generated with React and Next.js, Deployed on Vercel',
}

export default function RootLayout({ 
  children 
}: PropsWithChildren) {
  return (
    <html lang="en" className='antialiased' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className='app'>
            <NavBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}

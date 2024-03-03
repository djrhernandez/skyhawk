import './globals.css'
import './styles/App.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

import { Providers } from './providers'
import { NavBar } from './components/Navbar'
import { Footer } from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Skyhawk',
	description: 'Generated with React and Next.js, Deployed on Vercel',
}

export default function RootLayout({
	children
}: { children: React.ReactNode }) {
	return (
		<html lang="en" className='antialiased' suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					
					<div className='app'>
						<NavBar />
						{children}
					</div>

					<Footer />

				</Providers>
				<Analytics />
			</body>
		</html>
	)
}

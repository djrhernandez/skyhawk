import './globals.css'
import './styles/App.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import { Providers } from './providers'
import { NavBar } from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Skyhawk',
	description: 'Generated with React and Next.js, Deployed on Vercel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className='antialiased' suppressHydrationWarning>
			<body className={inter.className}>
				<div className='app'>
					<Providers>
						<NavBar />
						<div className='dashboard'>
							{children}
							<Analytics />	
						</div>
					</Providers>
				</div>
			</body>
			<GoogleTagManager gtmId='GTM-MPN4CZ6T' />
			<GoogleAnalytics gaId='G-QHS7SXXJPB' />
		</html>
	)
}

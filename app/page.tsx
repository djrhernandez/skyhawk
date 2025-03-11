'use client'
import { useEffect, useState } from 'react'

import { Card } from './components/Card'
import { Wrapper } from './components/Wrapper'
import { useRouter } from 'next/navigation'

import nycImg from './styles/images/nyc-liberty-logo-1024.png'
import dotaImg from './styles/images/dota2-logo-1024.png'
import sketchpadImg from './styles/images/sketchpad-icon.png'


export default function AppPage() {
	const router = useRouter()
	const [isMobile, setIsMobile] = useState(false)

	const nycData = `Explore fascinating insights from freely available ` +
	`public data on hotels and properties across the five boroughs within ` + 
	`New York City`

	const sketchpadData = `Experience an interactive whiteboard, where ` + 
	`collaboration and creativity come alive with just a click. Dive ` +
	`into a seamless world of digital collaboration, right from your browser`

	const dota2Data = `Dive into the world of Dota 2 analytics to elevate ` + 
	`your gameplay with comprehensive insight. Unlock the secrets to mastering ` +
	`strategies, optimizing performance, and achieving victory in every match`

	useEffect(() => {
        const handleResize = () => {
			if (window.innerWidth < 640) {
				setIsMobile(true)
			}

			if (window.innerWidth >= 640) {
				setIsMobile(false)
			}
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

	return (
		<Wrapper>
			<div className='home-grid'>
				<Card 
					title='New York - OpenData' 
					body={nycData}
					buttonText='Go'
					image={nycImg}
					isMobile={isMobile}
					onPrimaryClick={() => router.push('/nycod')}
				/>
				
				<Card 
					title='Sketchpad (WIP)' 
					body={sketchpadData}
					buttonText='Go'
					image={sketchpadImg}
					isMobile={isMobile}
					onPrimaryClick={() => router.push('/sketchpad')}
				/>

				<Card 
					title='Dota 2 Analytics (WIP)' 
					body={dota2Data}
					buttonText='Go'
					image={dotaImg}
					isMobile={isMobile}
					onPrimaryClick={() => router.push('/dota2')}
				/>
			</div>
			<div className='home-graphql'>
				
			</div>
		</Wrapper>
	)
}
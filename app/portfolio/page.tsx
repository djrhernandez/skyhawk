'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { Card } from '../components/Card'
import { ProfileCard } from '../components/profile/Card'
import { TextItem } from '../components/TextItem'

import californiaImg from '../styles/images/portfolio/california.png'
import oregonImg from '../styles/images/portfolio/oregon.png'
import laImg from '../styles/images/portfolio/la-silhouette.png'


export default function Page() {
	const [isMobile, setIsMobile] = useState(false)

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
		<div className='portfolio-page'>
			<ProfileCard onClick={null} isMobile={false} />
			{/* <section className='about'>
				<div className='container'>
					<h4 className='text'>About Me</h4>
					<hr className='obj-dark' />
					<div className='row'>
						<div className='col'>
							<Image
							src={californiaImg && californiaImg.src}
							alt='Geo-California'
							width={isMobile ? 128 : 256}
							height={isMobile ? 128 : 256}
							/>
						</div>
					</div>
					<br/>
					<div className='row'>
						<div className='col'>
							<Image
							src={oregonImg && oregonImg.src}
							alt='Geo-Oregon'
							width={isMobile ? 128 : 256}
							height={isMobile ? 128 : 256}
							/>
						</div>
					</div>
					<br/>
					<div className='row'>
						<div className='col'>
							<Image
							src={laImg && laImg.src}
							alt='Los-Angeles-Skyline'
							width={isMobile ? 128 : 256}
							height={isMobile ? 128 : 256}
							/>
						</div>
					</div>
				</div>
			</section>

			<div className='resume'>
				<div className='about'></div>
				<div className='skills'></div>
				<div className='experience'></div>
				<div className='education'></div>
				<div className='projects'></div>
				<div className='coursework'></div>
				<div className='interests'></div>
			</div>

			<div className='social-media'>
				<div className='media-list'>
					<li>LinkedIn</li>
					<li>Github</li>
					<li>Steam</li>
					<li>LeetCode</li>
				</div>

			</div>

			<div className='scroll-to-top'>
				<a className='js-scroll-trigger' href='#page-top'>
					<i className='material-icons'>expand_less</i>
				</a>
			</div> */}
		</div>
	)
}

'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import skyhawk from '../styles/images/skyhawk_logo_v4_alpha.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import { Footer } from '../components/Footer'

export const NavBar = (props) => {
	const [isMobile, setIsMobile] = useState(false)
	const [visible, setVisible] = useState(true)

	useEffect(() => {
        const handleResize = () => {
			if (window.innerWidth < 640) {
				setIsMobile(true)
				setVisible(false)
			}

			if (window.innerWidth >= 640) {
				setIsMobile(false)
				setVisible(true)
			}
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


	return (
		<div className={`navbar ${isMobile ? 'sidebar' : 'header'}`}>
			<div className={`navbar-home ${isMobile ? 'mobile js-scroll-trigger' : ''}`}>
				<a className='nav-logo' href='/'>
					<div className='graphic'>
						<Image
							src={skyhawk.src}
							alt='Skyhawk Logo'
							width={isMobile ? 32 : 64}
							height={isMobile ? 32 : 64}
							priority={true}
						/>
					</div>
					<div className='graphic-title'>
						Skyhawk
					</div>
				</a>
				
				{ isMobile && (
					<div className={`menu-button ${visible ? 'active' : ''}`}>
						{ visible && (
							<a href='#' onClick={(evt) => { setVisible(false); evt.preventDefault() }}>
								<div className='menu-toggle'>
									{<FontAwesomeIcon icon={faChevronUp} />}
								</div>
							</a>
						)}
						
						{ !visible && (
							<a href='#' onClick={(evt) => { setVisible(true); evt.preventDefault() }}>
								<div className='menu-toggle'>
									{<FontAwesomeIcon icon={faChevronDown} />}
								</div>
							</a>
						)}
					</div>
				)}
			</div>
			
			{ visible && (
				<div className='container' id='responsive-navbar'>
					<div className='nav-item'>
						<ul>
							<li>
								<a className='nav-link' href='nycod'>NYC-Data</a>
							</li>
						</ul>
					</div>

					<div className='nav-item'>
						<ul>
							<li>
								<a className='nav-link' href='sketchpad'>Sketchpad</a>
							</li>
						</ul>					
					</div>
					
					<div className='nav-item'>
						<ul>
							<li>
								<a className='nav-link' href='dota2'>Dota 2</a>
							</li>
						</ul>
					</div>
				</div>
			)}
			
			{ !isMobile && <Footer /> }
		</div>
	)
}

'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import skyhawk from '../styles/images/skyhawk_logo.png'

export const NavBar = (props) => {
	return (
		<div className='navbar'>
			<div className='navbar-home js-scroll-trigger'>
				<a className='nav-logo-link' href='\'>
					<div className='graphic'>
						<Image 
							src={skyhawk.src} 
							alt='Skyhawk Logo'
							width={500}
							height={500}
							priority={true}
						/>
					</div>
					<div className='graphic-title'>
						<span>Skyhawk</span>
					</div>
				</a>
			</div>
			<div className='container' id='responsive-navbar'>
				<ul className='nav-item'>
					<li>
						<a className='nav-link' href='link_1'>Mock-1</a>
					</li>	
				</ul>
				<ul className='nav-item'>
					<li>
						<a className='nav-link' href='link_2'>Mock-2</a>
					</li>	
				</ul>
			</div>
		</div>
	)
}

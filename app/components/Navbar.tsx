'use client'
import React, { useEffect, useState } from 'react'
import skyhawk from '../styles/images/skyhawk_logo.png'

export const NavBar = ({ viewBar, setViewBar, setTitle, title }, ...props) => {
	return (
		<div className='navbar'>
			<a className='navbar-home js-scroll-trigger' href='home'>
				<div className='graphic'>
					<img src={skyhawk.src} alt={'Skyhawk Logo'} />
				</div>
				<div>
					<span>Skyhawk</span>
				</div>
			</a>
			<div className='container' id='responsive-navbar'>
				<ul className='nav-item'>
					<li>
						<a className='nav-link' href='link_1'>Link-1</a>
					</li>	
				</ul>
				<ul className='nav-item'>
					<li>
						<a className='nav-link' href='link_2'>Link-2</a>
					</li>	
				</ul>
			</div>
		</div>
	)
}
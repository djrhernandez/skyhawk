'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Card } from './components/Card'
import { Wrapper } from './components/Wrapper'

export default function AppPage() {
	const nycData = `Explore fascinating insights from freely available ` +
	`public data on hotels and properties across the five boroughs within ` + 
	`New York City`

	const canvasData = `Experience an interactive whiteboard, where ` + 
	`collaboration and creativity come alive with just a click. Dive ` +
	`into a seamless world of digital collaboration, right from your browser`

	const dota2Data = `Dive into the world of Dota 2 analytics to elevate ` + 
	`your gameplay with comprehensive insight. Unlock the secrets to mastering ` +
	`strategies, optimizing performance, and achieving victory in every match`

	return (
		<Wrapper>
			<div className='home-grid'>
				<Card 
					title='New York - OpenData' 
					body={nycData}
					primaryBody='Go' />
				
				<Card 
					title='Canvas' 
					body={canvasData}
					primaryBody='Go' />

				<Card 
					title='Dota 2 Analytics' 
					body={dota2Data}
					primaryBody='Go' />
			</div>
		</Wrapper>
	)
}
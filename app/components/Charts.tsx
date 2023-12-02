'use client'
import React, { useEffect, useState } from 'react'
import {
	BarChart, XAxis, YAxis, CartesianGrid, Bar, ResponsiveContainer, Tooltip
} from 'recharts'
import { getRandomColor } from '../lib/utils'
import { rechartGraphColors, building_classifications } from '../lib/definitions'

let decidedGraphColors = {}
const getChartColors = (ctype) => {
	if (!decidedGraphColors[ctype] && rechartGraphColors.length > 0) decidedGraphColors[ctype] = rechartGraphColors.shift()
	else if (!decidedGraphColors[ctype]) decidedGraphColors[ctype] = getRandomColor()
	return decidedGraphColors[ctype]
}

export const Charts = ({ data, pageState }, props) => {
	const mediaQuery = window.matchMedia("(mid-width: 768px)")
	const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(mid-width: 768px)").matches)

	useEffect(() => {
		const handleMediaChange = (evt) => {
			setIsLargeScreen(evt.matches)
		}
		
		mediaQuery.addEventListener('change', handleMediaChange)
		return () => mediaQuery.removeEventListener('change', handleMediaChange)
	}, [])

	const boroughlist = data.reduce((acc, item) => {
		if (!item.parid || !item.borough || item.borough === '1' || item.borough === '2') return acc
		if (!acc[item.borough]) acc[item.borough] = 0
		acc[item.borough] += 1
		return acc
	}, {})

	const bldgList = data.reduce((acc, item) => {
		if (!item.parid || !item.bldg_class) return acc

		let bldg = item.bldg_class
		if (!acc[bldg]) acc[bldg] = 0
		acc[bldg] += 1
		return acc
	}, {})

	const boroughData = Object.keys(boroughlist)
		.map((bucket) => ({ bucket, count: boroughlist[bucket] }))
		.sort((a, b) => b.count - a.count)

	const bldgData = Object.keys(bldgList)
		.map((bucket) => ({ bucket, count: bldgList[bucket] }))
		.filter((item) => item.bucket !== 'RH')
		.sort((a, b) => b.count - a.count)

	const ChartTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			const { name } = payload[0]
			const { bucket, count } = payload[0].payload
			const buildingTip = building_classifications[bucket]

			return (
				buildingTip ?
					<div className='recharts-tooltip'>
						<div className='section'>
							<div className='row'>
								<b>{`${name}: `}</b>{`${label} (${buildingTip.type})`}
							</div>
							<div className='row'>
								<b>{`Count: `}</b>{`${count}`}
							</div>
						</div>
						<div className='section'>
							<div className='row'>
								{`- ${buildingTip.description}` || ''}
							</div>
						</div>
						
					</div>
				:
					<div className='recharts-tooltip'>
						<div className='section'>
							<div className='row'>
								<b>{`${name}: `}</b>{`${label}`}
							</div>
							<div className='row'>
								<b>{`Count: `}</b>{`${count}`}
							</div>
						</div>
					</div>
			)
		}
		return null;
	}

	const ChartTick = ({ x, y, payload}) => {
		const offsetX = 0;
		const offsetY = 4;
		const textHeight = 8;

		const text = payload && payload.value && payload.value.split(' ');
		return (
			<g transform={`translate(${x},${y + 4})`}>
				{/* Map through the words and render each on a new line */}
				{text.map((word, index) => (
					<text
						key={`${word}-${index}`}
						x={offsetX}
						y={offsetY}
						dy={`${index * textHeight}px`}
						textAnchor="middle"
						fontSize={10}
					>
						{word}
					</text>
				))}
			</g>
		);
	};

	return (
		<div className='charts'>
			{/* Displays the # of properties in a given borough */}
			<div className='chart-wrapper'>
				<div className='chart-header'>
					<div className='header small-important-header'>Properties/Borough</div>
				</div>
				<div className='chart-data'>
					<ResponsiveContainer width='100%' height='100%' minHeight={300}>
						<BarChart data={boroughData} margin={isLargeScreen && { top: 15, left: 15, right: 15, bottom: 30}}>
							<CartesianGrid strokeDasharray="10 10" />
							<Tooltip content={ChartTooltip} />
							<XAxis
								interval={0}
								type='category'
								dataKey='bucket'
								label={{ value: 'Borough', position: 'bottom'}}
								tick={ChartTick}
							/>
							<YAxis
								type='number'
								fontSize={10}
								domain={[0, dataMax => (dataMax + (50 - (dataMax % 50)))]}
								label={{ value: '# of properties', angle: -90, dx: -25 }}
							/>

							<Bar dataKey="count" name='Borough' fill='#000' />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Displays the # of properties in a given building classification */}
			<div className='chart-wrapper'>
				<div className='chart-header'>
					<div className='header small-important-header'>Building Classification</div>
				</div>
				<div className='chart-data'>
					<ResponsiveContainer width='100%' height='100%' minHeight={300}>
						<BarChart data={bldgData} margin={isLargeScreen && { top: 15, left: 15, right: 15, bottom: 30}}>
							<CartesianGrid strokeDasharray="10 10" />
							<Tooltip content={ChartTooltip} />
							<XAxis
								interval={0}
								type='category'
								dataKey='bucket'
								label={{ value: 'Building Class', position: 'bottom' }}
								tick={ChartTick}
							/>
							<YAxis
								type='number'
								fontSize={10}
								domain={[0, dataMax => (dataMax + (50 - (dataMax % 50)))]}
								label={{ value: '# of properties', angle: -90, dx: -25 }}
							/>

							<Bar dataKey="count" name='Building Class' fill='#000' />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}

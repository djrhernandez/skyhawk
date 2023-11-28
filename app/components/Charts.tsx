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
	// WIP
	// const hotelByBoroughList = data.reduce((acc, item) => {
	// 	if (!item.borough || !item.parid || item.borough === '1' || item.borough === '2') return acc
	// 	if (!acc[item.borough]) acc[item.borough] = []
	// 	acc[item.borough].push(item)
	// 	return acc
	// }, {})

	const boroughlist = data.reduce((acc, item) => {
		if (!item.borough || !item.parid || item.borough === '1' || item.borough === '2') return acc
		if (!acc[item.borough]) acc[item.borough] = 0
		acc[item.borough] += 1
		return acc
	}, {})

	const ownerList = data.reduce((acc, item) => {
		if (!item.parid || !item.owner_name) return acc

		let owner = item.owner_name
		if (!acc[owner]) acc[owner] = 0
		acc[owner] += 1
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

	const ownerData = Object.keys(ownerList)
		.map((bucket) => ({ bucket, count: ownerList[bucket] }))
		.filter((item) => item.count > 50)
		.sort((a, b) => b.count - a.count)

	const bldgData = Object.keys(bldgList)
		.map((bucket) => ({ bucket, count: bldgList[bucket] }))
		.filter((item) => item.bucket !== 'RH')
		.sort((a, b) => b.count - a.count)

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className='custom-tooltip'>
					<span className='label'>{`${label}`}</span>
					<span className='desc'>{`Count: ${payload[0].value}`}</span>
				</div>
			)
		}
		return null;
	}

	const CustomizedAxisTick = ({ x, y, payload = {}}) => {
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
						fontSize={8}
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
				<div className='data'>
					<ResponsiveContainer width='100%' height={300}>
						<BarChart data={boroughData}>
							<CartesianGrid strokeDasharray="10 10" />
							<Tooltip content={CustomTooltip} />
							<XAxis
								interval={0}
								type='category'
								dataKey='bucket'
								label={{ value: 'Borough', position: 'bottom' }}
								tick={<CustomizedAxisTick x={0} y={0} />}
							/>
							<YAxis
								type='number'
								fontSize={10}
								domain={[0, dataMax => (dataMax + (50 - (dataMax % 50)))]}
								label={{ value: '# of properties', angle: -90, dx: -15 }}
							/>

							<Bar dataKey="count" fill='#000' />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Displays the # of properties in a given building classification */}
			<div className='chart-wrapper'>
				<div className='chart-header'>
					<div className='header small-important-header'>Building Classification</div>
				</div>
				<div className='data'>
					<ResponsiveContainer width='100%' height={300}>
						<BarChart data={bldgData}>
							<CartesianGrid strokeDasharray="10 10" />
							<Tooltip content={CustomTooltip} />
							<XAxis
								interval={0}
								type='category'
								dataKey='bucket'
								label={{ value: 'BLDG Class', position: 'bottom' }}
							/>
							<YAxis
								type='number'
								fontSize={10}
								domain={[0, dataMax => (dataMax + (50 - (dataMax % 50)))]}
								label={{ value: '# of properties', angle: -90, dx: -15 }}
							/>

							<Bar dataKey="count" fill='#000' />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}

{/* Displays the # of properties an owner possesses */ }
{/* <div className='chart-wrapper'>
<div className='chart-header'>
	<div className='header small-important-header'>Properties/Owner</div>
</div>
<div className='chart-data'>
	<ResponsiveContainer width='100%' height={300}>
		<BarChart data={ownerData}>
			<CartesianGrid strokeDasharray="10 10"/>
			<Tooltip active={true} content={CustomTooltip} />
			<XAxis
				interval={0}
				type='category' 
				dataKey='bucket'
				label={{ value: 'Owner', position: 'bottom'}}
				tick={<CustomizedAxisTick/>}
			/>
			<YAxis
				interval={0}
				type='number'
				fontSize={10}
				domain={[0, dataMax => (dataMax + (50 - (dataMax % 50)))]}
				label={{ value: '# of properties', angle: -90, dx: -15 }}
			/>

			<Bar dataKey="count" fill='#8884d8'/>
		</BarChart>
	</ResponsiveContainer>
</div>
</div> */}
'use client'
import React, { useEffect, useState } from 'react'
import { BarChart, XAxis, YAxis, CartesianGrid, Bar, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import { getRandomColor } from '../lib/utils'
import { rechartGraphColors, rechartsLayout, building_classes } from '../lib/definitions'

let decidedGraphColors = {}
const getChartColors = (ctype: string | number) => {
	if (!decidedGraphColors[ctype] && !!rechartGraphColors.length) decidedGraphColors[ctype] = rechartGraphColors.shift()
	else if (!decidedGraphColors[ctype]) decidedGraphColors[ctype] = getRandomColor()
	return decidedGraphColors[ctype]
} 

export const Charts = ({ data, pageState }, props) => {
	return (
		<div className='charts'>
			{pageState === 'failure' && renderError(props)}
			{pageState === 'loading' && renderLoading(props)}
			{pageState === 'success' && renderGraphs(data, pageState, props)}
		</div>
	)
}

const renderGraphs = (data: any, pageState: string, props: any) => {
	const layout = rechartsLayout
	const boroughlist = data.reduce((acc: { [x: string]: number }, item: { parid: any; borough: string }) => {
		if (!item.parid || !item.borough || ['1', '2'].includes(item.borough)) return acc
		if (!acc[item.borough]) acc[item.borough] = 0
		acc[item.borough] += 1
		return acc
	}, {})

	const buildingList = data.reduce((acc: { [x: string]: number }, item: { parid: any; bldg_class: any }) => {
		if (!item.parid || !item.bldg_class) return acc

		let bldg = item.bldg_class
		if (!acc[bldg]) acc[bldg] = 0
		acc[bldg] += 1
		return acc
	}, {})

	const boroughData = Object.keys(boroughlist)
		.map((bucket) => ({ bucket, count: boroughlist[bucket], color: getChartColors(bucket) }))
		.sort((a, b) => b.count - a.count)

	const buildingData = Object.keys(buildingList)
		.map((bucket) => ({ bucket, count: buildingList[bucket], color: getChartColors(bucket) }))
		.filter((item) => item.bucket !== 'RH')
		.sort((a, b) => b.count - a.count)
	
	if (!Object.keys(boroughData).length || !Object.keys(buildingData).length) return renderDataError()

	return (
		<div className='contents'>
			<div className='chart-wrapper'>
				<div className='chart-header'>
					<div className='header'>Properties/Borough</div>
				</div>

				<div className='chart-data'>
					{!!boroughlist && !!boroughData && (
						<ResponsiveContainer 
							width={layout.width}
							height={layout.height}
							minHeight={layout.minHeight}
							maxHeight={layout.maxHeight}
						>
							<BarChart data={boroughData} margin={layout.margins}>
								<CartesianGrid strokeDasharray={layout.strokeDashArray} />
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
									fontSize={layout.fontSize}
									domain={[0, (dataMax: number) => (dataMax + (layout.dataMax - (dataMax % layout.dataMax)))]}
									label={{ value: '# of properties', angle: -90, dx: -25 }}
								/>

								<Bar stackId='bucket' dataKey='count' name='Borough'>
									{boroughData.map((boro, idx) => {
										return (
											<Cell key={`cell-${idx}`} fill={boro.color} />
										)
									})}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					)}
				</div>
			</div>

			<div className='chart-wrapper'>
				<div className='chart-header'>
					<div className='header'>Building Classification</div>
				</div>

				<div className='chart-data'>
					{!!buildingList && !!buildingData && (
						<ResponsiveContainer 
							width={layout.width}
							height={layout.height}
							minHeight={layout.minHeight}
							maxHeight={layout.maxHeight}
						>
							<BarChart data={buildingData} margin={layout.margins}>
								<CartesianGrid strokeDasharray={layout.strokeDashArray} />
								<Tooltip content={ChartTooltip} />
								<XAxis
									interval={0}
									type='category'
									dataKey='bucket'
									label={{ value: 'Building Class', position: 'bottom'}}
									tick={ChartTick}
								/>
								<YAxis
									type='number'
									fontSize={layout.fontSize}
									domain={[0, (dataMax: number) => (dataMax + (layout.dataMax - (dataMax % layout.dataMax)))]}
									label={{ value: '# of properties', angle: -90, dx: -25 }}
								/>
								
								<Bar stackId='bucket' dataKey='count' name='Building Class'>
									{buildingData.map((bldg, idx) => {
										return (
											<Cell key={`cell-${idx}`} fill={bldg.color} />
										)
									})}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					)}
				</div>
			</div>
		</div>
	)
}

const ChartTooltip = (props: { active: any; payload: any; label: any }) => {
	const { active, payload, label } = props
	if (active && !!payload.length) {
		const { name } = payload[0]
		const { bucket, count } = payload[0].payload
		const buildingTip = building_classes[bucket]

		return (buildingTip ? (
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
		) : (
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
		))
	}
	return null
}

const ChartTick = (props: { x: any; y: any; payload: any }) => {
	const { x, y, payload } = props
	const offsetX = 0;
	const offsetY = 4;
	const textHeight = 10;

	const text = payload && payload.value && payload.value.split(' ');
	return (
		<g transform={`translate(${x},${y + 4})`}>
			{/* Map through the words and render each on a new line */}
			{text.map((word: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode, index: number) => (
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
	)
}

const renderDataError = () => (
	<div style={{textAlign: 'center', fontSize: '1rem', margin: '2.5em'}}>
		Not enough data to render graphs. Please modify the time range for the dashboard.
	</div>
)

const renderLoading = (props) => (
	<div className='loading'>Loading...</div>
)

const renderError = (props) => (
	<div className='error'>Error!</div>
)

'use client'
import React, { useEffect, useState } from 'react'
import {
	BarChart, XAxis, YAxis, CartesianGrid, Bar, ResponsiveContainer, Tooltip, Legend
} from 'recharts'
import { sortKeyValueEntries } from '../lib/utils'

export const Charts = ({ data }, props) => {
	const boroughData = data.reduce((acc, item) => {
		if (!item.borough || !item.parid || item.borough === '1' || item.borough === '2') return acc
		
		let borough = item.borough
		if (!acc[borough]) acc[borough] = 0
		acc[borough] += 1
		return acc
	}, {})

	const ownerData = data.reduce((acc, item) => {
		if (!item.parid || !item.owner_name) return acc
		
		let owner = item.owner_name
		if (!acc[owner]) acc[owner] = 0
		acc[owner] += 1
		return acc
	}, {})

	const chartData1 = Object.keys(boroughData)
		.map((bucket) => ({bucket, count: boroughData[bucket]}))
		.sort((a,b) => b.count - a.count)

	const chartData2 = Object.keys(ownerData)
		.map((bucket) => ({bucket, count: ownerData[bucket]}))
		.filter((item) => item.count > 50)
		.sort((a,b) => b.count - a.count)

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className='custom-tooltip'>
					<p className='label'>{`Owner: ${label}`}</p>
					<p className='desc'>{`Count: ${payload[0].value}`}</p>
				</div>
			)
		}
		return null;
	}

	const CustomizedAxisTick = ({ x, y, payload }) => {
		const offsetX = 16;
		const offsetY = 4;
		const textHeight = 8;
		
		const text = payload.value && payload.value.split(' ');
		return (
			<g transform={`translate(${x+8},${y+8})`}>
				{/* Map through the words and render each on a new line */}
				{ text.map((word, index) => (
					<text
						x={offsetX}
						y={offsetY}
						dy={`${index * textHeight}px`}
						textAnchor="end"
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
			{/* Displays the # of properties an owner possesses */}
			<div className='chart-wrapper'>
				<div className='chart-header'>
					<h4 className='header small-important-header'>Owners/Property</h4>
				</div>
				<div className='data'>
					<ResponsiveContainer width='100%' height={300}>
						<BarChart data={chartData2}>
							<CartesianGrid strokeDasharray="10 10"/>
							<Tooltip content={CustomTooltip} />
							<XAxis
								interval={0}
								type='category' 
								dataKey='bucket'
								label={{ value: 'Owner', position: 'bottom'}}
								height={60}
								tick={<CustomizedAxisTick/>}
							/>
							<YAxis
								type='number'
								domain={[0, dataMax => (dataMax + (25 - (dataMax % 25)))]}
								label={{ value: '# of properties', angle: -90 }}
							/>

							<Bar dataKey="count" fill='#8884d8'/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Displays the # of properties in a given borough */}
			<div className='chart-wrapper'>
				<div className='chart-header'>
					<h4 className='header small-important-header'>Properties/Borough</h4>
				</div>
				<div className='data'>
					<ResponsiveContainer width='100%' height={300}>
						<BarChart data={chartData1}>
							<CartesianGrid strokeDasharray="10 10"/>
							<Tooltip/>
							<XAxis 
								interval={0}
								type='category' 
								dataKey='bucket'
								label={{ value: 'Borough', position: 'bottom'}}
							/>
							<YAxis
								type='number'
								domain={[0, dataMax => (dataMax + (25 - (dataMax % 25)))]}
								label={{ value: '# of properties', angle: -90 }}
							/>

							<Bar dataKey="count" fill='#000'/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}

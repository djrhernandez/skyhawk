'use client'
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { fetchApi } from '../api/fetchApi'
import { Charts } from '../components/Charts'
import { Table } from '../components/Table'
import { TextItem } from '../components/TextItem'

import { GET_HOTELS } from '../lib/const'
import { capitalize } from '../lib/utils'
import * as searchStates from '../lib/states'

process.on('uncaughtException', function (err) {
	console.log('[UncaughtException]:', err)
	console.log('Trace Stack: ', JSON.stringify({ err }))
})

export default function Page() {
	const [pageState, setPageState] = useState(searchStates.NOT_STARTED)
	const [errors, setErrors] = useState('')
	const [apiData, setApiData] = useState()

	const { loading, error, data } = useQuery(GET_HOTELS)

	// Data fetch with cache from direct NYCOD API
	useEffect(() => {
		const cacheKey = 'apiDataCache_v1'
		const cachedData = localStorage.getItem(cacheKey)
		const endpoint = 'resource/tjus-cn27.json'

		// console.log('cachedData - ', cachedData)
		const fetchData = async () => {
			try {
				setPageState(searchStates.LOADING)
				let params = { '$limit': 5000 }
				const data = await fetchApi('nycod', endpoint, params)

				setApiData(data);
				setPageState(searchStates.SUCCESS)

				const cache = {
					data: data,
					timestamp: new Date().getTime(),
				}
				localStorage.setItem(cacheKey, JSON.stringify(cache))
			} catch (error) {
				setErrors(error)
				setPageState(searchStates.FAILURE)
			}
		}

		if (cachedData) {
			const { data, timestamp } = JSON.parse(cachedData)
			const age = (new Date().getTime() - timestamp) / 1000 / 60 // Age in minutes

			if (age < 5) {
				setApiData(data)
				setPageState(searchStates.SUCCESS)
				return
			} else {
				fetchData()
			}
		}
	}, [])

	useEffect(() => {
		console.log({ loading, error, data })
	}, [loading, error, data])

	useEffect(() => {
		console.log({ apiData, pageState })
	}, [apiData, pageState])

	return (
		<div className='nycod'>
			{pageState === searchStates.SUCCESS && renderSuccess(apiData, pageState)}
			{pageState === searchStates.LOADING && renderLoading(apiData, pageState)}
			{pageState === searchStates.FAILURE && renderError(errors, pageState)}
		</div>
	)
}

const renderSuccess = (data, pageState) => (
	<div className='interface'>
		<TextItem 
			className='nycod-page-title'
			title={'New York City - Hotel Properties Citywide'}
			center={false} 
			message={''}
		/>
		
		{ data && (<Charts data={data} pageState={pageState} />)}
		{ data && (<Table data={data} pageState={pageState} />)}

		{ !data && (
			<div className='error'>
				<div className='header'>{`No Data Available!`}</div>
				<div className='body'>{`Data: ${data}`}</div>
			</div>
		)}

	</div>
)

const renderLoading = (data, pageState) => (
	<div className='loading'>
		<div className='header'>{`${capitalize(pageState)}...`}</div>
		{ data && (
			<div className='body'>{`Data: ${JSON.stringify(data)}`}</div>
		)}
	</div>
)

const renderError = (error, pageState) => (
	<div className='error'>
		<div className='header'>{`${capitalize(pageState)}!`}</div>
		<div className='body'>{`Data: ${error}`}</div>
	</div>
)

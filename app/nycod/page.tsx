'use client'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Charts } from '../components/Charts'
import { Table } from '../components/Table'
import { TextItem } from '../components/TextItem'

import { GET_HOTELS } from '../lib/const'
import * as searchStates from '../lib/states'
import { capitalize, numberWithCommas } from '../lib/utils'

export default function Page() {
	const [pageState, setPageState] = useState(searchStates.NOT_STARTED)
	const { loading, error, data } = useQuery(GET_HOTELS, { errorPolicy: 'all' })
	
	useEffect(() => {
		if (loading) {
			setPageState(searchStates.LOADING)
		} else if (data) {
			setPageState(searchStates.SUCCESS)
		} else {
			setPageState(searchStates.FAILURE)
		}
		
		console.log({ pageState, loading, error, data })
	}, [loading, error, data])

	return (
		<div className='nycod'>
			{pageState === searchStates.NOT_STARTED && renderNotStarted(pageState, data, loading, error)}
			{pageState === searchStates.SUCCESS && renderSuccess(pageState, data)}
			{pageState === searchStates.LOADING && renderLoading(pageState, data)}
			{pageState === searchStates.FAILURE && renderError(pageState, data, error)}
		</div>
	)
}

const renderSuccess = (pageState, data) => (
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

const renderLoading = (pageState, data) => (
	<div className='loading'>
		<div className='header'>{`${capitalize(pageState)}...`}</div>
		{ data && (
			<div className='body'>
				<span>{`${data.hotels && numberWithCommas(data.hotels.length)} Properties Found! Visualizing Data...`}</span>
			</div>
		)}
	</div>
)

const renderError = (pageState, data, error) => (
	<div className='error'>
		<div className='header'>{`${capitalize(pageState)}!`}</div>
		<div className='body'>
			Bad:{" "}
			{error.graphQLErrors.map(({ message }, i) => (
				<span key={i}>{message}</span>
			))}
			
			{`Data: ${error}`}
		</div>
	</div>
)

const renderNotStarted = (pageState, data, loading, error) => (
	<div className='not-started'>
		<div className='header'>{`About to start...`}</div>
		<div className='body'>{'Please wait for the data to load.'}</div>
	</div>
)
'use client'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import LoadingBar from '../components/LoadingBar'
import { Charts } from '../components/Charts'
import { Table } from '../components/Table'
import { TextItem } from '../components/TextItem'
import { Properties } from '../components/Properties'

import { GET_HOTELS } from '../lib/const'
import * as searchStates from '../lib/states'
import { capitalize, numberWithCommas } from '../lib/utils'

export default function Page() {
	const [pageState, setPageState] = useState(searchStates.NOT_STARTED)
	const [prefs, setPrefs] = useState({})
	const [filters, setFilters] = useState({
		ownerName: '',
		streetAddress: '',
		postcode: 10000,
		latitude: 0.0000,
		longitude: 0.0000,
		radius: 0.5,
	})

	const { loading, error, data } = useQuery(GET_HOTELS, { errorPolicy: 'all' })
	
	useEffect(() => {
		if (loading) {
			setPageState(searchStates.LOADING)
		} else if (data) {
			setPageState(searchStates.SUCCESS)
		} else {
			setPageState(searchStates.FAILURE)
		}
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
		
		<Properties latitude={40.7128} longitude={-74.0060} radius={0.25} />

		{ data && (<Table data={data} pageState={pageState} />)}

		{ !data && (
			<div className='error'>
				<div className='error-wrapper'>
					<div className='header'>{`No Data Available!`}</div>
					<div className='body'>{`Data: ${data}`}</div>
				</div>
			</div>
		)}

	</div>
)

const renderLoading = (pageState, data) => (
	<div className='loading'>
		<div className='loading-wrapper'>
			<div className='header'>{`${capitalize(pageState)}...`}</div>
			<div className='body'>
				<LoadingBar />
				{ data && data.hotels && (
					<span>
						{`${numberWithCommas(data.hotels.length)} Properties Found! Visualizing Data...`}
					</span>
				)}
			</div>
		</div>
	</div>
)

const renderError = (pageState, data, error) => (
	<div className='error'>
		<div className='error-wrapper'>
			<div className='header'>{`${capitalize(pageState)}!`}</div>
			<div className='body'>
				{error.graphQLErrors.map(({ message }, i) => (
					<span key={i}>{message}</span>
				))}
				{`Data: ${error}`}
			</div>
		</div>
	</div>
)

const renderNotStarted = (pageState, data, loading, error) => (
	<div className='not-started'>
		<div className='not-started-wrapper'>
			<div className='header'>{`About to start...`}</div>
			<div className='body'>{'Please wait for the data to load.'}</div>
		</div>
	</div>
)
'use client'
import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"

import LoadingBar from '../components/LoadingBar'
import { Map } from "../components/Map"

import { GET_PROPERTIES } from "../lib/const"
import * as searchStates from '../lib/states'
import { capitalize, numberWithCommas } from '../lib/utils'

export const Properties = ({ latitude, longitude, radius }) => {
	const [pageState, setPageState] = useState(searchStates.NOT_STARTED)
	const { loading, error, data } = useQuery(GET_PROPERTIES, {
		variables: { longitude, latitude, radius },
		errorPolicy: "all",
	})

	const markers = data && data.hotelsNearLocation.map((prop) => ({
		lat: prop.latitude,
		lng: prop.longitude
	}))

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
		<div className="map-wrapper" style={{ marginBottom: '20px' }}>
			{pageState === searchStates.SUCCESS && renderSuccess(latitude, longitude, markers)}
			{pageState === searchStates.LOADING && renderLoading(pageState, data, radius)}
			{pageState === searchStates.FAILURE && renderError(pageState, data, error)}
		</div>
	)
}

const renderSuccess = (latitude, longitude, markers) => (
	<Map center={{ lat: latitude, lng: longitude }} markers={markers} />
)

const renderLoading = (pageState, data, radius) => (
	<div className='loading'>
		<div className='header'>{`${capitalize(pageState)}...`}</div>
		<div className='body'>
			{ data && data.hotelsNearLocation && (
				<span>
					{`${numberWithCommas(data.hotelsNearLocation.length)} properties found with a ${radius} m radius! Visualizing Data...`}
				</span>
			)}
			<LoadingBar />
		</div>
	</div>
)

const renderError = (pageState, data, error) => (
	<div className='error'>
		<div className='header'>{`${capitalize(pageState)}!`}</div>
		<div className='body'>
			{error.graphQLErrors.map(({ message }, i) => (
				<span key={i}>{message}</span>
			))}
			{`Data: ${data}`}
		</div>
	</div>
)

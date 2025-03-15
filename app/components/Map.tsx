'use client'
import { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

export const Map = ({ center, markers }) => {
	const [isMobile, setIsMobile] = useState(false)
	const [mapContainerStyle, setMapContainerStyle] = useState({})

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) {
				setIsMobile(true)
				setMapContainerStyle({ width: '100%', height: '100px' })
			}

			if (window.innerWidth >= 640) {
				setIsMobile(false)
				setMapContainerStyle({ width: '100%', height: '350px' })
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
			<GoogleMap 
			id='nycod-map'
			zoom={15}
			clickableIcons={true}
			center={center}
			mapContainerStyle={mapContainerStyle}
			>
				{markers.map((marker, index) => (
					<Marker key={index} position={marker} />
				))}
			</GoogleMap>
		</LoadScript>
	)
}

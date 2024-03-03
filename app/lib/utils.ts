import { useLayoutEffect, useState } from 'react'

export const getRandomColor = () => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

export const capitalize = (str: string) => {
	return str.replace(/\b\w/g, letr => letr.toUpperCase())
}

export function useWindowSize() {
	const [browserSize, setBrowserSize] = useState([window.innerWidth, window.innerHeight])

	useLayoutEffect(() => {
		function updateSize() {
			setBrowserSize([window.innerWidth, window.innerHeight])
		}

		window.addEventListener('resize', updateSize)
		updateSize()

		return () => {
			window.removeEventListener('resize', updateSize)
		}
	}, [])

	return browserSize
}
// @flow
import React from 'react'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cs(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export let DARK_MODE = false
const DARK_MODE_KEY = 'dark_mode_setting'
if (typeof window !== 'undefined') {
	DARK_MODE = window.localStorage.getItem(DARK_MODE_KEY) === 'true' || (window.localStorage.getItem(DARK_MODE_KEY) !== 'false' && window.matchMedia('(prefers-color-scheme: dark)').matches)
}

export const setDarkMode = (darkMode: any) => {
  window.localStorage.setItem(DARK_MODE_KEY, darkMode)
  window.location.reload()
}

export const TV_MODE = process.env.REACT_APP_TV_MODE === 'true'

export const apiUrl = process.env.NEXT_PUBLIC_TOPFLIGHT_URL

export const hex2rgba = (hex, alpha = 1) => {
	const [r, g, b] = hex.match(/\w\w/g).map((x: string) => parseInt(x, 16));
	return `rgba(${r},${g},${b},${alpha})`;
}

export const getRandomColor = () => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

export const capitalize = (str: string) => {
	return str.replace(/\b\w/g, letr => letr.toUpperCase());
}

export function useWindowSize() {
	const [browserSize, setBrowserSize] = React.useState([window.innerWidth, window.innerHeight])

	React.useLayoutEffect(() => {
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

export const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const sortKeyValueEntries = (obj) => {
	return Object.entries(obj).sort((a: any, b: any) => b - a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
}
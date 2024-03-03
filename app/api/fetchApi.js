const API_BASE_URL = 'https://data.cityofnewyork.us'
const HEADERS = {
	'Accept': 'application/json',
	'Content-Type': 'application/json; charset=utf-8',
}

const buildUrl = (src, path, params = {}) => {
	let endpoint
	switch (src) {
		case 'cloud':
			endpoint = 'WIP'
			break
		case 'dota':
			endpoint = 'WIP'
			break
		case 'localhost':
			endpoint = 'WIP'
			break
		case 'misc':
			endpoint = 'WIP'
			break
		default:
			endpoint = API_BASE_URL
	}

	const url = new URL(`${endpoint}/${path}`)
	Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
	return url.toString()
}

const handleResponse = async (response) => {
	if (!response.ok) {
		const errorMessage = `Failed to fetch data: ${response.status} ${response.statusText}`
		throw new Error(errorMessage)
	}
	return response.json()
}

export async function fetchApi(src = null, path, params = {}) {
	const url = buildUrl(src, path, params)
	const response = await fetch(url, {
		method: 'GET',
		headers: HEADERS,
	})
	return handleResponse(response);
}

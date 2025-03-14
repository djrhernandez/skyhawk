const API_BASE_URL = process.env.NEXT_PUBLIC_TOPFLIGHT_URL
const NYCOD_API_URL = process.env.NEXT_PUBLIC_NYCOD_API_URL
const LOCALHOST_URL = process.env.NEXT_PUBLIC_LOCALHOST_URL

const HEADERS = {
	'Accept': 'application/json',
	'Allow-Control-Allow-Origin': '*',
	'Access-Control-Allow-Credentials': true,
	'Content-Type': 'application/json; charset=utf-8',
}

const buildUrl = (src, path, params = {}) => {
	let endpoint
	switch (src) {
		case 'dota':
			endpoint = 'WIP'
			break
		case 'localhost':
			endpoint = LOCALHOST_URL
			break
		case 'nycod':
			endpoint = NYCOD_API_URL
			break
		case 'topflight':
			endpoint = API_BASE_URL
			break
		case 'winston':
			endpoint = API_BASE_URL + '/winston'
			break
		default:
			endpoint = API_BASE_URL
	}

	const pathname = path && path.startsWith('/') ? `${endpoint}${path}` : `${endpoint}/${path}`
	const url = pathname && new URL(pathname)
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

export async function fetchApi(src = null, path, params = {}, method = 'GET') {
	const url = buildUrl(src, path, params)

	const response = await fetch(url, {
		method: method,
		headers: HEADERS
	})
	return handleResponse(response);
}

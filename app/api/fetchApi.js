const API_BASE_URL = 'https://data.cityofnewyork.us'
const DEFAULT_PARAMS = { '$limit': 5000 }
const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
}

export const dynamic = 'force-dynamic'

const buildUrl = (type, path, params = {}) => {
  let endpoint
  switch(type) {
    case 'misc':
      endpoint = '<SOME_URL>'
    case 'dota':
      endpoint = '<DOTA2_URL>'
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

export async function fetchApi(path, params = {}) {
  const url = buildUrl(path, params)
  const response = await fetch(url, {
      method: 'GET',
      headers: HEADERS,
  })
  return handleResponse(response);
}

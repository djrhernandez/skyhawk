const API_BASE_URL = 'https://data.cityofnewyork.us'
const DEFAULT_PARAMS = { '$limit': 5000 }
const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
}

export const dynamic = 'force-dynamic'

const buildUrl = (path, params = {}) => {
  const url = new URL(`${API_BASE_URL}/${path}`)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
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

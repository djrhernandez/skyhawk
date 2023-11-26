const API_URL = 'https://data.cityofnewyork.us';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
};

export const dynamic = 'force-dynamic'

const _url = (path, args) => {
	let url = `${API_URL}/${path}?`;

	for (let arg in args) {
		url += `&${arg}=${args[arg]}`;
	}
	return url
}

export async function fetchApi(path, args = {}) {
  const response = await fetch(_url(path, args), {
    method: 'GET',
    headers: headers,
  })

  if (!response.ok) {
    throw new Error('Failed to fetch API data')
  }

  return response.json()
}

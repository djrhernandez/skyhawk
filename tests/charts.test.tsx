import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { Charts } from '../app/components/Charts'
import { fetchMockData } from '../app/api/fetchApi'

jest.mock('../app/api/fetchApi');

describe('Charts', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it('displays chart data after successful API fetch', async () => {
	  const mockData = [
		{
			"parid": "1000080039",
			"borocode": "1",
			"block": "8",
			"lot": "39",
			"taxyear": "2021",
			"street_num": "32",
			"street_name": "PEARL STREET",
			"postcode": "10004",
			"bldg_class": "H3",
			"taxclass": "4",
			"owner_name": "32 PEARL, LLC",
			"borough": "MANHATTAN",
			"latitude": "40.703235",
			"longitude": "-74.012421",
			"community_board": "101",
			"council_district": "1",
			"census_tract": "9",
			"bin": "1078968",
			"bbl": "1000080039",
			"nta": "Battery Park City-Lower Manhattan"
		},
		{
			"parid": "1000080051",
			"borocode": "1",
			"block": "8",
			"lot": "51",
			"taxyear": "2021",
			"street_num": "6",
			"street_name": "WATER STREET",
			"postcode": "10004",
			"bldg_class": "H2",
			"taxclass": "4",
			"owner_name": "AI IV LLC",
			"borough": "MANHATTAN",
			"latitude": "40.702744",
			"longitude": "-74.012201",
			"community_board": "101",
			"council_district": "1",
			"census_tract": "9",
			"bin": "1090472",
			"bbl": "1000080051",
			"nta": "Battery Park City-Lower Manhattan"
		},
		{
			"parid": "1000100033",
			"borocode": "1",
			"block": "10",
			"lot": "33",
			"taxyear": "2021",
			"street_num": "8",
			"street_name": "STONE STREET",
			"postcode": "10004",
			"bldg_class": "H2",
			"taxclass": "4",
			"owner_name": "B.H. 8 STONE STREET AG, LLC",
			"borough": "MANHATTAN",
			"latitude": "40.704025",
			"longitude": "-74.012638",
			"community_board": "101",
			"council_district": "1",
			"census_tract": "9",
			"bin": "1087618",
			"bbl": "1000100033",
			"nta": "Battery Park City-Lower Manhattan"
		}
	  ];
  
	  (fetchMockData as jest.MockedFunction<typeof fetchMockData>).mockResolvedValueOnce(mockData)	// Mock successful API response
	  
	  render(<Charts data={mockData}/>)

	  await waitFor(() => {
		expect(screen.getByTestId('charts')).toBeInTheDocument() // Ensure chart is rendered
	  })
	})
})
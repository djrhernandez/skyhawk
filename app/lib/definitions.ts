// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

// Listing of Hotels within the 5 boroughs of New York City
export const columnDefinitions = [
  {
      headerName: 'ID',
      field: 'parid',
      width: 115,
      cellStyle: { padding: 0 }
  },
  {
      headerName: 'Owner',
      field: 'owner_name',
      filter: true,
      wrapText: true,
  },
  {
      headerName: 'Borough Info',
      children: [
          { headerName: 'Borough', field: 'borough' },
          { headerName: 'Borough Code', field: 'borocode', columnGroupShow: 'open' }
      ]
  },
  {
      headerName: 'Location Info',
      children: [
          {
              headerName: 'Street Address', 
              valueGetter: (params: { data: { street_num: string; street_name: string; }; }) => {
                  return params.data.street_num + ' ' + params.data.street_name;
              },
          },
          { headerName: 'Postcode', field: 'postcode', columnGroupShow: 'open' },
          { headerName: 'Lat', field: 'latitude', columnGroupShow: 'open'  },
          { headerName: 'Long', field: 'longitude', columnGroupShow: 'open' },
      ]
  },
  {
      headerName: 'Tax Info',
      children: [
          { headerName: 'Year', field: 'taxyear' },
          { headerName: 'Class', field: 'taxclass', columnGroupShow: 'open' },
          { headerName: 'Block #', field: 'block', columnGroupShow: 'open' },
          { headerName: 'Lot #', field: 'lot', columnGroupShow: 'open' },
          { headerName: 'Building Class', field: 'bldg_class', columnGroupShow: 'open' }, // Bldg Classification (ie Luxury/Boutique Hotel, Office/Retail Space, etc.)
          { headerName: 'BIN #', field: 'bin', columnGroupShow: 'open' },                 // Bldg Identification Number
          { headerName: 'BBL #', field: 'bbl', columnGroupShow: 'open' },                 // Borough-Block-Lot (location of buildings/properties used for paying property taxes)
      ]
  },
  { 
      headerName: 'Census Info',
      children: [
        { headerName: 'Community Board', field: 'community_board' },
          { headerName: 'Census Tract', field: 'census_tract', columnGroupShow: 'open' }, // The geolocation of the property to which the surrounding populace is censused 
          { headerName: 'Council District', field: 'council_district', columnGroupShow: 'open' },
          { headerName: 'NTA', field: 'nta', columnGroupShow: 'open' },                   // Neighborhood Tabulation Area (meant for census)
          { headerName: 'NTA Code', field: 'nta_code2', columnGroupShow: 'open' },        // Code associated with the NTA a property possesses
      ]
  }
]

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Hotel = {
  parid: number;
  owner_name: string;
  address: string;
  postcode: string;
  borough: string;
  borocode: number;
  latitude: number;
  longitude: number;
  building_class: string;
}
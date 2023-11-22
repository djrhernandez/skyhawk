// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

// Listing of Hotels within the 5 boroughs of New York City
export const columnDefinitions = [
  {
      headerName: 'ID',
      field: 'parid',
      resizable: false
  },
  {
      headerName: 'Owner',
      field: 'owner_name',
      resizable: true,
      filter: true,
      wrapText: true,
      suppressSizeToFit: false
  },
  {
      headerName: 'Borough Info',
      children: [
          { headerName: 'Borough', field: 'borough' },
          { headerName: 'Borough Code', field: 'borocode' }
      ]
  },
  {
      headerName: 'Location Info',
      children: [
          { headerName: 'Street No.', field: 'street_num' },
          { headerName: 'Street Name', field: 'street_name' },
          {
              headerName: 'Street Address', 
              valueGetter: (params: { data: { street_num: string; street_name: string; }; }) => {
                  return params.data.street_num + ' ' + params.data.street_name;
              },
          },
          { headerName: 'Postcode', field: 'postcode' },
          { headerName: 'Lat', field: 'latitude' },
          { headerName: 'Long', field: 'longitude' },
      ]
  },
  {
      headerName: 'Tax Info',
      children: [
          { headerName: 'Year', field: 'taxyear' },
          { headerName: 'Class', field: 'taxclass' },
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
          { headerName: 'Census Tract', field: 'census_tract' },          // The geolocation of the property to which the surrounding populace is censused 
          { headerName: 'Community Board', field: 'community_board' },
          { headerName: 'Council District', field: 'council_district' },
          { headerName: 'NTA', field: 'nta' },                            // Neighborhood Tabulation Area (meant for census)
          { headerName: 'NTA Code', field: 'nta_code2' },                 // Code associated with the NTA a property possesses
      ]
  }
]

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Hotel = {
  id: number;
  name: string;
  address: string;
  zipcode: string;
  owner: string;
  borough: string;
  borocode: number;
  latitude: number;
  longitude: number;
}

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
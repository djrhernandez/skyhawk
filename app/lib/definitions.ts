// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export const rechartGraphColors = ['#1f77b4', '#ff7f0e', '#ffbb78', '#2ca02c', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']

export const rechartsLayout = {
    width: '99%',
    height: '100%',
    minHeight: 200,
    maxHeight: 300,
    strokeDashArray: '10 10',
    fontSize: 10,
    dataMax: 50,
    margins: {
        top: 15,
        left: 15,
        right: 15,
        bottom: 30
    }
}

export const defaultColumnDefs = {
    flex: 1,
    filter: true,
    sortable: true,
    suppressMovable: true
}

// Listing of Hotels within the 5 boroughs of New York City
export const propertyColumnsDetailed = [
    {
        headerName: 'ID',
        field: 'parid',
        width: 100,
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
            { 
                headerName: 'Borough', 
                field: 'borough',
                width: 125
            },
            { 
                headerName: 'Code', 
                field: 'borocode',
                width: 125,
                columnGroupShow: 'open',
            }
        ]
    },
    {
        headerName: 'Location Info',
        children: [
            {
                headerName: 'Street Address',
                valueGetter: (params: { data: { street_num: string; street_name: string; }; }) => {
                    return params.data.street_num + ' ' + params.data.street_name;
                }
            },
            { 
                headerName: 'Postcode', 
                field: 'postcode',
                width: 100,
                columnGroupShow: 'open'
            },
            {
                headerName: 'Lat/Long',
                columnGroupShow: 'open',
                width: 150,
                valueGetter: (params: { data: { latitude: any; longitude: any; }; }) => {
                  return [params.data.latitude, params.data.longitude];
                }
            },
        ]
    },
    {
        headerName: 'Additional Info',
        children: [
            {
                headerName: 'Building Class',
                field: 'bldg_class',
                headerTooltip: 'Building Classification (ie Luxury/Boutique Hotel, Office/Retail Space, etc.)'
            },
            {
                headerName: 'BIN #',
                field: 'bin',
                headerTooltip: 'Building Identification Number',
                columnGroupShow: 'open'
            },
            {
                headerName: 'Block #',
                field: 'block',
                columnGroupShow: 'open'
            },
            {
                headerName: 'Lot #',
                field: 'lot',
                columnGroupShow: 'open'
            },
            {
                headerName: 'Borough-Block-Lot (BBL) #',
                field: 'bbl',
                headerTooltip: 'Location of buildings/properties (used for paying property taxes)',
                columnGroupShow: 'open'
            },
            {
                headerName: 'Tax Year',
                field: 'taxyear',
                columnGroupShow: 'open'
            },
            {
                headerName: 'Tax Class',
                field: 'taxclass',
                columnGroupShow: 'open'
            },
        ]
    },
    {
        headerName: 'Census Info',
        children: [
            {
                headerName: 'Community Board',
                field: 'community_board'
            },
            {
                headerName: 'Census Tract',
                field: 'census_tract',
                headerTooltip: 'The geolocation of the property to which the surrounding populace is censused',
                columnGroupShow: 'open'
            },
            {
                headerName: 'Council District',
                field: 'council_district',
                columnGroupShow: 'open'
            },
            {
                headerName: 'NTA',
                field: 'nta',
                headerTooltip: 'Neighborhood Tabulation Area (meant for census)',
                columnGroupShow: 'open'
            },
            {
                headerName: 'NTA Code',
                field: 'nta_code2',
                headerTooltip: 'Code associated with the NTA a property possesses',
                columnGroupShow: 'open'
            },
        ]
    }
]

export const propertyColumns = propertyColumnsDetailed.filter((item) => {
    return ['ID', 'Owner', 'Borough Info', 'Location Info'].includes(item.headerName)
})

/* 
    NYC Building Classes:
    - Class R (Residential) Buildings - Condominiums
    - Class H (Commercial) Buildings - Hotels
*/
export const building_classes = {
    "RH": {
        type: 'Hotel/Boatel',
        description: 'Covers hotels and boatels.\n' +
        'Almost all buildings in this class are in Manhattan.\n' +
        'The highest concentration can be found in Hudson Square, Lincoln Square, the Theatre District, Central Midtown and Turtle Bay.'
    },
    "HB": {
        type: 'Boutique: 10-100 Rooms, W/Luxury Facilities, Themed, Stylish, W/Full Svc Accommodations',
        description: 'Covers boutique luxury hotels.\n' + 
        'The majority of hotels in this class are in Manhattan (84%).\n' + 
        'Can find most of them in Murray Hill, SoHo, Central Midtown, the Theatre District and NoMad, all in Manhattan.'
    },
    "HH": {
        type: 'Hostels - Bed Rentals In Dormitory-Like Settings W/Shared Rooms & Bathrooms',
        description: 'Covers hostels and other dormitory-like rentals.\n' + 
        'The majority of buildings in this class are in Manhattan (89%), and they make up just 1% of all buildings in the H general class.\n' +
        'Can find most of them in the Upper West Side, the Theatre District, Chelsea, Manhattan Valley and NoLIta, all in Manhattan.'
    },
    "HR": {
        type: 'SRO - 1 Or 2 People Housed In Individual Rooms In Multiple Dwelling Affordable Housing',
        description: 'Designates rental buildings offering single-room occupancy units designed for low-income residents.\n' + 
        'The majority of buildings in this class are in Manhattan (63%), and 28% of them are in Brooklyn.\n' + 
        'These buildings make up 4% of all buildings in the H general class. ' +
        'The neighborhoods where you can find the most HR class hotels are the Upper West Side, Harlem, Lincoln Square and Chinatown in Manhattan, and Brighton Beach in Brooklyn.'
    },
    "HS": {
        type: 'Extended Stay/Suite: Amenities Similar To Apt; Typically Charge Weekly Rates & Less Expensive Than Full-Service Hotel',
        description: 'The HS building class covers extended-stay hotels and other types of rentals similar to apartments, but not luxury or full-service hotels.\n' + 
        'Manhattan has most of the buildings in this class available in the city (93%), and Queens has 5%.\n' + 
        'The neighborhoods where you can find the most HS class buildings are Lenox Hill, Turtle Bay, Sutton Place, Manhattan Valley and the Upper West Side.'
    },
    "H1": { 
        type: "Luxury Hotel", 
        description: 'Consists of luxury hotels that were built prior to 1960 and are exclusive to Manhattan.\n' + 
        'The Radisson Lexington and The Carlyle are examples of hotels that fall under this category – they were the second and the third biggest hotel transactions in 2011.\n' + 
        'These hotels can most frequently be encountered in Midtown/Midtown South, Turtle Bay/East Midtown, Murray Hill/Kips Bay, the Upper East Side/Carnegie Hill and Gramercy.'
    },
    "H2": { 
        type: "Full Service Hotel",
        description: 'Comprises of luxury hotels that were built after 1960.\n' + 
        'Most of them are in Manhattan, but several can be also found in Queens, Brooklyn and Staten Island. One such hotel, the New York Palace, represented the biggest hotel transaction in 2011.\n' +
        'They can be found in the biggest numbers in Midtown/Midtown South, SoHo/Tribeca/Civic Central/Little Italy, Battery Park City/Lower Manhattan, Turtle Bay/East Midtown and Chinatown, all of which are in Manhattan.'
    },
    "H3": { 
        type: "Limited Service; Many Affiliated With National Chain",
        description: 'Comprises of hotels with transient occupancy. They are most frequently found in Manhattan, but several can be found also in Brooklyn, the Bronx and Queens.\n' + 
        'Top neighborhoods where these hotels can be found are Midtown/Midtown South, Murray Hill/Kips Bay, Hudson Yards/Chelsea/Flatiron/Union Square, Turtle Bay/East Midtown and Clinton, all in Manhattan.'
    },
    "H4": { 
        type: "Motel",
        description: 'Represented by the motels in New York City. Most of them are in Queens, the Bronx and Brooklyn, but there are a few in Manhattan and Staten Island as well.\n' +
        'Motels are most frequent in Elmhurst/Maspeth (Queens), East New York (Brooklyn), Co-Op City (the Bronx), Eastchester / Edenwald / Baychester (the Bronx) and Clinton (Manhattan).'
    },
    "H5": { 
        type: "Hotel; Private Club, Luxury Type",
        description: 'Made of private clubs and luxury-type hotels.' +
        'Almost all of them are located in Manhattan, especially in Upper East Side/Carnegie Hill and Midtown/Midtown South.'
    },
    "H6": { 
        type: "Apartment Hotel",
        description: 'Comprises of apartment hotels that are most often found in Manhattan, with a few in Brooklyn and the Bronx.\n' +
        'They can most frequently be found on the Upper West Side, but also in Turtle Bay/East Midtown, Midtown/Midtown South, Lincoln Square and Clinton.'
    },
    "H7": { 
        type: "Apartment Hotel – Cooperatively Owned",
        description: 'Made up of hotels that are coop-owned. The units in these buildings are owned individually, but the buildings themselves operate as hotels.\n' +
        'There are only 3 of these buildings in New York City, all in Manhattan: 797 5th Avenue, 109 East 56th Street and 50 Gramercy Park North.'
    },
    "H8": { 
        type: "Dormitory",
        description: 'Dormitories in NYC - the vast majority of them can be found in Manhattan and Brooklyn.\n' +
        'The neighborhoods where they are the most numerous are West Village (Manhattan), Morningside Heights (Manhattan), East Village (Manhattan), Brooklyn Heights (Brooklyn) and Murray Hill/Kips Bay (Manhattan).'
    },
    "H9": { 
        type: "Miscellaneous Hotel",
        description: 'Various types of hotels that don’t fit into any of the other H-class buildings.\n' +
        'They are actually the most numerous, accounting for approximately 40% of the total number of hotels. They are most frequent in Manhattan (55%), Queens (26%) and Brooklyn (12%).\n' +
        'The neighborhoods where they can be found most often are the Upper West Side (Manhattan), Hudson Yards/Chelsea/Flatiron/Union Square (Manhattan), Midtown/Midtown South (Manhattan), Queens Bridge/Ravenswood/Long Island City North (Queens) and Clinton (Manhattan).'
    },
}
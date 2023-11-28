'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'

import { columnDefinitions } from '../lib/definitions'

export const Table = ({ data, pageState }, props) => {
	
  	// Sets props common to all Columns in AG-Grid
	const defaultColDef = useMemo(() => {
		return {
		sortable: true,
		}
	}, [])

	const onGridReady = useCallback((params) => {
		params.api.sizeColumnsToFit()
	}, [])
	
	return (
		<div className='ag-theme-balham'>
        	<AgGridReact
            	rowData={data}
				rowHeight={30}
				columnDefs={columnDefinitions}
				defaultColDef={defaultColDef}
				animateRows={true}
				pagination={true}
				paginationPageSize={10}
				paginationAutoPageSize={true}
				tooltipHideDelay={500}
				alwaysShowVerticalScroll={true}
				onGridReady={onGridReady}
            />
        </div>
	)
}

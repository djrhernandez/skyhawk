'use client'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'

import { columnDefinitions } from '../lib/definitions'

export const Table = ({ data, pageState }: any, props: any) => {
	const gridRef = useRef<AgGridReact>(null)
	
  	// Sets props common to all Columns in AG-Grid
	const defaultColDef = useMemo(() => {
		return {
			sortable: true,
		}
	}, [])

	const onGridReady = useCallback((params: { api: { sizeColumnsToFit: () => void; }; }) => {
		params.api.sizeColumnsToFit()
	}, [])

	const onPageSizeChanged = useCallback(() => {
		let pageDiv = document.getElementById('page-size')
		var value = pageDiv && (pageDiv as HTMLInputElement).value

		gridRef.current.api.paginationSetPageSize(Number(value))
	}, [])

	return (
		<div className='sky-table'>
			<div className='page-tab'>
				<span>Page Size:</span>
				<select onChange={onPageSizeChanged} id="page-size">
					<option value="10">10</option>
					<option value="25">25</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>

			<div className='ag-theme-balham'>
				<AgGridReact
					ref={gridRef}
					rowData={data}
					columnDefs={columnDefinitions}
					defaultColDef={defaultColDef}
					animateRows={true}
					pagination={true}
					paginationPageSize={10}
					tooltipHideDelay={500}
					onGridReady={onGridReady}
					/>
			</div>
		</div>
	)
}

'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { propertyColumns, propertyColumnsDetailed, defaultColumnDefs } from '../lib/definitions'
import { useWindowSize } from '../lib/utils'

export const Table = ({ data, pageState }: any, props: any) => {
	const gridRef = useRef<AgGridReact>(null)
	const [pageWidth, pageHeight] = useWindowSize()
	const [headerColumns, setHeaderColumns] = useState(propertyColumns)

	const onGridReady = useCallback((params: { api: { sizeColumnsToFit: () => void; }; }) => {
		params.api.sizeColumnsToFit()
	}, [])

	const onPageSizeChanged = useCallback(() => {
		let pageDiv = document.getElementById('page-size')
		var value = pageDiv && (pageDiv as HTMLInputElement).value

		gridRef.current.api.paginationSetPageSize(Number(value))
	}, [])

	useEffect(() => {
		if (!!pageHeight && pageWidth < 960) {
			defaultColumnDefs.suppressMovable = true
			setHeaderColumns(propertyColumns)
		} else {
			defaultColumnDefs.suppressMovable = false
			setHeaderColumns(propertyColumnsDetailed)
		}
	}, [pageWidth, pageHeight, defaultColumnDefs])

	return (
		<div className='sky-table'>
			<div className='page'>
				<div className='page-header'>
					<span>
						Click on any tab to sort by field name. Click on the menu after hovering over a tab to filter data.
						Some tabs may be expanded to look at additional information.
					</span>
				</div>

				<div className='page-tab'>
					<span>Page Size:</span>
					<select onChange={onPageSizeChanged} id="page-size">
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div>
			</div>

			<div className='ag-theme-balham'>
				<AgGridReact
					ref={gridRef}
					rowData={data}
					columnDefs={headerColumns}
					defaultColDef={defaultColumnDefs}
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

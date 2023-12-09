'use client'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { propertyColumns } from '../lib/definitions'

export const Table = ({ data, pageState }: any, props: any) => {
	const gridRef = useRef<AgGridReact>(null)
	const [headerColumns, setHeaderColumns] = useState(propertyColumns)
	const [pageWidth, pageHeight] = useWindowSize()

	useEffect(() => {
		// console.log({headerColumns})
		if (pageWidth < 768) {
			const modColumns = headerColumns.filter((item) => {
				// console.log(item.headerName)
				return ['ID', 'Owner', 'Borough Info', 'Location Info'].includes(item.headerName)
			})
			// console.log({newColumns})
			setHeaderColumns(modColumns)
		} else {
			setHeaderColumns(propertyColumns)
		}
		// console.log({headerColumns})
	}, [pageWidth])

  	// Sets props common to all Columns in AG-Grid
	const defaultColDef = useMemo(() => {
		return {
			sortable: true,
			suppressMovable: true
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
					columnDefs={headerColumns}
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

function useWindowSize() {
	const [browserSize, setBrowserSize] = useState([window.innerWidth, window.innerHeight])

	useLayoutEffect(() => {
		function updateSize() {
			setBrowserSize([window.innerWidth, window.innerHeight])
		}

		window.addEventListener('resize', updateSize)
		updateSize()

		return () => {
			window.removeEventListener('resize', updateSize)
		}
	}, [])

	return browserSize
}
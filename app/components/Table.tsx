'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { propertyColumns, propertyColumnsDetailed, defaultColumnDefs } from '../lib/definitions'
import { useWindowSize } from '../lib/utils'

// Upgrades to AG-Grid 33 requires migration from v30.2.1 and module registration
// If not using Theming API, mark all grids as using legacy themes
// Doc: https://www.ag-grid.com/react-data-grid/upgrading-to-ag-grid-33/
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community'; 
ModuleRegistry.registerModules([ AllCommunityModule ]); 
provideGlobalGridOptions({ theme: 'legacy'})

export const Table = ({ data, pageState }: any, props: any) => {
	const rowData = data
	const gridRef = useRef<AgGridReact>(null)
	const [pageWidth, pageHeight] = useWindowSize()
	const [headerColumns, setHeaderColumns] = useState(propertyColumns)

	const onGridReady = useCallback((params: { api: { sizeColumnsToFit: () => void; }; }) => {
		params.api.sizeColumnsToFit()
	}, [])

	// Handy Info: https://www.ag-grid.com/react-data-grid/grid-interface/#updating-grid-options
	// const onPageSizeChanged = useCallback(() => {
	// 	let pageDiv = document.getElementById('page-size')
	// 	var value = pageDiv && (pageDiv as HTMLInputElement).value

	// 	gridRef.current.api.setGridOption('paginationPageSize', Number(value))
	// }, [])

	console.log({rowData})

	useEffect(() => {
		if (!!pageHeight && pageWidth < 960) {
			defaultColumnDefs.suppressMovable = true
			setHeaderColumns(propertyColumns)
		} else {
			defaultColumnDefs.suppressMovable = false
			setHeaderColumns(propertyColumnsDetailed)
		}
	}, [pageWidth, pageHeight])

	return (
		<div className='sky-table'>
			<div className='page'>
				<div className='page-header'>
					<span>
						Click on any tab to sort by field name. Click on the menu after hovering over a tab to filter data.
						Some tabs may be expanded to look at additional information.
					</span>
				</div>

				{/* <div className='page-tab'>
					<span>Page Size:</span>
					<select onChange={onPageSizeChanged} id="page-size">
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div> */}
			</div>

			<div className='ag-theme-balham'>
				<AgGridReact
					ref={gridRef}
					rowData={rowData}
					columnDefs={headerColumns}
					defaultColDef={defaultColumnDefs}
					animateRows={true}
					pagination={true}
					tooltipHideDelay={500}
					onGridReady={onGridReady}
				/>
			</div>
		</div>
	)
}

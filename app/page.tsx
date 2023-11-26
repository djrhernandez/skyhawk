'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { NextUIProvider } from '@nextui-org/system'
import Image from 'next/image'
import { AgGridReact } from 'ag-grid-react'
import { fetchApi } from './api/fetchApi'
import { columnDefinitions } from './lib/definitions'
import { Charts } from './components/Charts'

export default function AppPage() {
  const [apiData, setApiData] = useState()
  const params = {
    '$limit': 5000
  }

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  
  // const [tableReady, setTableReady] = useState(false)
  // Sets props common to all Columns
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
    }
  }, [])
  
  // Data fetch
  useEffect(() => {
    setIsLoading(true)

    fetchApi('/resource/tjus-cn27.json', params).then((data) => {
      setApiData(data)
    }).catch((error) => {
      setErrors(error)
      console.log({ error })
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="skyhawk-wrapper">
      <div className='sidebar'></div>
      {isLoading && <div>Loading...</div>}
      {errors && <div className='text-red-500'>Error: {errors}</div>}
      {apiData && 
        <div className='dashboard'>  
          <div className='charts-section'>
            <Charts data={apiData}/>
          </div>

          <div className='dash-tbl'>
              <div className='ag-theme-alpine'>
                <AgGridReact
                  rowData={apiData}
                  rowHeight={30}
                  columnDefs={columnDefinitions}
                  defaultColDef={defaultColDef}
                  animateRows={true}
                  pagination={true}
                />
              </div>
          </div>
        </div>
      }
    </div>
  )
}

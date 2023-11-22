'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NextUIProvider } from '@nextui-org/system'
import Image from 'next/image'
import { AgGridReact } from 'ag-grid-react'
import { getApiData } from './api/fetchApi'
import { columnDefinitions } from './lib/table-definitions'
import './styles/ui/_ag-theme.scss'
import './styles/MainPage.scss'

export default function Home() {
  const gridRef = useRef();
  const [apiData, setApiData] = useState()
  const params = {
    '$limit': 50
  }

  const [isFitted, setIsFitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  
  // const [tableReady, setTableReady] = useState(false)
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    }
  }, [])

  const sizeToFit = useCallback(() => {
    console.log(isFitted)
    if (!gridRef.current) return

    setIsFitted(true)
    console.log(isFitted)
    if (isFitted) {
      gridRef.current.api.sizeColumnsToFit({
        defaultMinWidth: 150,
      });
    } else {
      gridRef.current.api.sizeColumnsToFit({
        defaultMinWidth: 100,
      });
    }
  }, [])

  useEffect(() => {
    console.log({isFitted})
  }, [sizeToFit])
  
  // Data fetch
  useEffect(() => {
    setIsLoading(true)

    getApiData('/resource/tjus-cn27.json', params).then((data) => {
      setApiData(data)
    }).catch((error) => {
      setErrors(error)
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const loadingDiv = <div>Loading...</div>
  const errorDiv = <div className='text-red-500'>Error: {errors}</div>

  return (
    <div className="skyhawk-wrapper">
      {isLoading && (loadingDiv)}
      {errors && (errorDiv)}
      {apiData && (
        <div className='outer-div'>
          <div className='button-bar'>
            <button onClick={sizeToFit}>Size to Fit</button>
          </div>
          <div className='ag-theme-alpine'>
            <AgGridReact
              ref={gridRef}
              rowData={apiData}
              rowHeight={30}
              columnDefs={columnDefinitions}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      )}
    </div>
  )
}

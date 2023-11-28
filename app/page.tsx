'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { AgGridReact } from 'ag-grid-react'
import { fetchApi } from './api/fetchApi'
import { columnDefinitions } from './lib/definitions'
import { Charts } from './components/Charts'
import { Table } from './components/Table'

import * as searchStates from './lib/states'
import { pages } from 'next/dist/build/templates/app-page'

export default function AppPage() {
  const [pageState, setPageState] = useState(searchStates.NOT_STARTED)
  const [errors, setErrors] = useState('')
  const [apiData, setApiData] = useState()
  
  // Data fetch
  useEffect(() => {
    setPageState(searchStates.LOADING)
    
    let params = {
      '$limit': 5000
    }

    fetchApi('/resource/tjus-cn27.json', params)
    .then((data) => {
      setApiData(data)
      setPageState(searchStates.SUCCESS)
    }).catch((error) => {
      setErrors(error)
      setPageState(searchStates.FAILURE)
    })
  }, [])

  return (
    <div className="skyhawk-wrapper">
      <div className='dashboard'>  
        {pageState === searchStates.SUCCESS && 
          <div>
            <Charts data={apiData} pageState={pageState} />
            <Table data={apiData} pageState={pageState} />
          </div>
        }

        {pageState === searchStates.LOADING && (
          <div className='loading'>Loading...</div>
        )}

        {pageState === searchStates.FAILURE && (
          <div className='error'>Error: {errors}</div>
        )}
      </div>
    </div>
  )
}

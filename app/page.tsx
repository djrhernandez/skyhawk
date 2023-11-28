'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { AgGridReact } from 'ag-grid-react'
import { fetchApi } from './api/fetchApi'
import { columnDefinitions } from './lib/definitions'
import { Charts } from './components/Charts'
import { Table } from './components/Table'

import * as searchStates from './lib/states'

export default function AppPage() {
  const [pageState, setPageState] = useState(searchStates.NOT_STARTED)
  const [errors, setErrors] = useState('')
  const [apiData, setApiData] = useState()
  
  // Data fetch with cache
  useEffect(() => {
    const cacheKey = 'apiDataCache';
    const cachedData = localStorage.getItem(cacheKey);

    const fetchData = async () => {
      try {
        setPageState(searchStates.LOADING);
        let params = { '$limit': 5000 };
        const data = await fetchApi('/resource/tjus-cn27.json', params);

        setApiData(data);
        setPageState(searchStates.SUCCESS);

        const cache = {
          data: data,
          timestamp: new Date().getTime(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(cache));
      } catch (error) {
        setErrors(error);
        setPageState(searchStates.FAILURE);
      }
    };

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const age = (new Date().getTime() - timestamp) / 1000 / 60; // Age in minutes

      if (age < 60) {
        setApiData(data);
        setPageState(searchStates.SUCCESS);
        return;
      }
    }

    fetchData();
  }, []);

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

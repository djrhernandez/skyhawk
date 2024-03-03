'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { fetchApi } from './api/fetchApi'
import { Charts } from './components/Charts'
import { Table } from './components/Table'

import { capitalize } from './lib/utils'
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
    <div className="dashboard">
      {pageState === searchStates.SUCCESS && renderSuccess(apiData, pageState)}
      {pageState === searchStates.LOADING && renderLoading(apiData, pageState)}
      {pageState === searchStates.FAILURE && renderError(errors, pageState)}
    </div>
  )
}

const renderSuccess = (data, pageState) => (
  <div className='skyhawk-wrapper'>
    <Charts data={data} pageState={pageState} />
    <Table data={data} pageState={pageState} />
  </div>
)

const renderLoading = (data, pageState) => (
  <div className='loading'>
    <div className='header'>{`${capitalize(pageState)}...`}</div>
    <div className='body'>{`${data ? `Data: ${JSON.stringify(data)}` : '...'}`}</div>
  </div>
)

const renderError = (error, pageState) => (
  <div className='error'>
    <div className='header'>{`${capitalize(pageState)}!`}</div>
    <div className='body'>{`Data: ${error}`}</div>
  </div>
)

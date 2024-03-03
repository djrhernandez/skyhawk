import React, { useEffect, useMemo, useState } from 'react'
import { fetchApi } from '../api/fetchApi'
import { Charts } from '../components/Charts'
import { Table } from '../components/Table'

import { capitalize } from '../lib/utils'
import * as searchStates from '../lib/states'

export default function Page() {

	return (
		<div className='container'>
			Sketchpad/Canvas Page
		</div>
	)
}
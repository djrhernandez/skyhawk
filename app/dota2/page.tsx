import React, { useEffect, useMemo, useState } from 'react'
import { fetchApi } from '../api/fetchApi'

import { Button } from '../components/Button'
import { Card } from '../components/Card'

export default function Dota2() {

	return (
		<div className='container'>
			<section>
				Dota 2 Page
			</section>
			<section>
				<Card title='Check Mate' content='Hello World'/>
			</section>
			<section>
				<Button type='primary' label='Button' onClick={null}/>
			</section>
		</div>	
	)
}
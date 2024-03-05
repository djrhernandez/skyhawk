import React from 'react'

import { Button } from '../components/Button'
import { Card } from '../components/Card'

export default function Dota2() {

	return (
		<div className='page-dota2'>
			<section>
				Dota 2 Page
			</section>
			<section>
				<Card title='Check Mate' body='Hello World'/>
			</section>
			<section>
				<Button type='primary' label='Button' onClick={null}/>
			</section>
		</div>
	)
}
import React from 'react'

import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Wrapper } from '../components/Wrapper'

export default function Dota2() {

	return (
		<Wrapper>
			<section>
				Dota 2 Page
			</section>
			<section>
				<Card title='Check Mate' content='Hello World'/>
			</section>
			<section>
				<Button type='primary' label='Button' onClick={null}/>
			</section>
		</Wrapper>
	)
}
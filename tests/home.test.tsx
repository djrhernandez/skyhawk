import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { NavBar } from '../app/components/Navbar'

// You can add more test cases for different scenarios and interactions
// Rule of Thumb: Arrange, Act, Assert

describe('NavBar', () => {
	it('Renders the Navbar Logo', () => {
		const { getByText } = render(<NavBar />)

		const heading = screen.getByRole('img')
		expect(heading).toBeInTheDocument()

		expect(getByText('Skyhawk')).toBeInTheDocument()
		expect(getByText('Dota2')).toBeInTheDocument()
		expect(getByText('Mock-1')).toBeInTheDocument()	
	})
})
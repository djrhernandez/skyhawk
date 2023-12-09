import React from 'react'
import { render } from '@testing-library/react'
import { NavBar } from '../app/components/Navbar'

test('Renders the NavBar component', () => {
	const { getByText } = render(<NavBar />);
	
	// Assert that the component renders without errors
	expect(getByText('Skyhawk')).toBeInTheDocument();
	expect(getByText('Mock-1')).toBeInTheDocument();
	expect(getByText('Mock-2')).toBeInTheDocument();
});  
// You can add more test cases for different scenarios and interactions
    
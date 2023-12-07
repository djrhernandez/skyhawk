import React from 'react'
import { render } from '@testing-library/react'
a
test('Adding 1 + 1 equals 2', () => {
	// Arrange (Setup)
	const num1 = 1;
	const num2 = 1;
  
	// Act (Action)
	const result = num1 + num2;
  
	// Assert (Assertion)
	expect(result).toBe(2);
  });
  
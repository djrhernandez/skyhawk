'use client'
import React from 'react';

export const Button = ({ type, label, onClick = null, disabled = false }) => {
	return (
		<div className='button'>
			<button className={`button ${type}`} onClick={onClick} disabled={disabled}>
				{label}
			</button>
		</div>
	)
}
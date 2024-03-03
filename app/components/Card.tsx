'use client'
import React from 'react'

export const Card = ({ title, content, onPrimaryClick = null, onSecondaryClick = null }) => {
	return (
		<div className="card">
			<div className="card__header">{title}</div>
			<div className="card__body">
				<p>{content}</p>
			</div>
			<div className="card__footer">
				<button className="primary" onClick={onPrimaryClick}>Primary</button>
				<button className="secondary" onClick={onSecondaryClick}>Secondary</button>
			</div>
		</div>
	)
}

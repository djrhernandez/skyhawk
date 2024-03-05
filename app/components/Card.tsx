'use client'
import React from 'react'

export const Card = ({ title, body, primaryBody, onPrimaryClick = null, secondaryBtn = false, secondaryBody = null, onSecondaryClick = null }) => {
	return (
		<div className="card">
			<div className="card_header">
				{title}
			</div>

			<div className="card_body">
				<p>{body}</p>
			</div>

			{ primaryBody && (
				<div className="card_footer">
					<button className="primary" onClick={onPrimaryClick}>{primaryBody}</button>
					{ secondaryBtn && (
						<button className="secondary" onClick={onSecondaryClick}>{secondaryBody}</button>
					)}
				</div>

			)}
		</div>
	)
}

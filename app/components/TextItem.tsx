import React from 'react';

export const TextItem = ({ className, title, message, center, ...props }) => {
	return (
		<div className={`text-item ${className || ''}`}>
			<div className={`title ${center ? 'center' : ''}`}>
				<h4>{title}</h4>
			</div>
			{message &&
				<div className={`message ${center ? 'center' : ''}`}>
					<span>{message}</span>
				</div>
			}
		</div>
	)
}
'use client'
import React from 'react'
import Image from 'next/image'

export const Card = ({ title, body, buttonText = null, image = null, onPrimaryClick = null, secondaryBtn = false, secondaryBody = null, onSecondaryClick = null, isMobile = false }) => {
	return (
		<div className="card">
			<div className="card_header">
				{title}
			</div>

			<div className='card_body'>
				{/* TODO: Create space for image either below or next to text */}
				{ image && (
					<div className='card_image'>
						<Image
							src={image && image.src}
							alt='Logo'
							width={isMobile ? 96 : 128}
							height={isMobile ? 96 : 128}
							priority={true}
						/>
					</div>
				)}

				<div className="card_text">
					<p>{body}</p>
				</div>
			</div>

			{ buttonText && (
				<div className="card_footer">
					<button className="primary" onClick={onPrimaryClick}>{buttonText}</button>
					{ secondaryBtn && (
						<button className="secondary" onClick={onSecondaryClick}>{secondaryBody}</button>
					)}
				</div>
			)}
		</div>
	)
}

'use client'
import React from 'react'
import Image from 'next/image'

import { PORTFOLIO } from '../../lib/const'

import portrait from '../../styles/images/portfolio/portrait.jpeg'

export const ProfileCard = ({ onClick = null, isMobile = false }) => {
	const info = PORTFOLIO.contact_info

	return (
        (<div className='profile'>
            <div className='profile-card'>
				<div className='header'>
					<Image
						src={portrait && portrait.src}
						alt='Profile-Picture'
						width={isMobile ? 128 : 192}
						height={isMobile ? 128 : 192}
						priority={true}
					/>
				</div>

				<div className='body'>
					<div className='section'>
						<div className='name'>{info.name}</div>
						<div className='details'>
							<div>{info.location}</div>
							<div>{info.email}</div>
						</div>

						<div className='occupations'>
							<ul>
								{ info.occupation && info.occupation.map((item) => (
									<li key={item}>{item}<br/></li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>

            {/* <div className='card'>
				<div className='card_title'>Skills</div>

				<table className='card_body'>
					<tr className='card_row'>
						<td className='card_text'>Lorem Ipsum</td>
						<td className='card_text'>Lorem Ipsum</td>
					</tr>
					<tr className='card_row'>
						<td className='card_text'>Lorem Ipsum</td>
						<td className='card_text'>Lorem Ipsum</td>
					</tr>

					<div className='card_column'>
						<div className='card_text'>
							Lorem Ipsum
						</div>

						<div className='card_text'>
							Lorem Ipsum
						</div>

						<div className='card_text'>
							Lorem Ipsum
						</div>
						
						<div className='card_text'>
							Lorem Ipsum
						</div>
					</div>
				</table>
			</div> */}

			{/* <div className="card">
				<div className="card_header">
					{title}
				</div>
				<div className='card_body'>
					TODO: Create space for image either below or next to text
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
        	</div> */}
        </div>)
    );
}

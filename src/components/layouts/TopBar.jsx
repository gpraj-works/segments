import React from 'react';

const TopBar = ({ link, title }) => {
	return (
		<div className='bg-primary w-100 p-3'>
			<div className='w-50'>
				<a
					href={link}
					className='text-white text-decoration-none d-inline-flex gap-2'
				>
					<em className='bi bi-chevron-left'></em>
					<span>{title}</span>
				</a>
			</div>
		</div>
	);
};

export default TopBar;

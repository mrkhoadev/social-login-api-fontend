"use client"
import React from 'react';

export default function Button({
	children,
	type,
	onClick,
	...props
}) {
	return (
		<button
			type={type || 'button'}
			onClick={onClick}
			className='p-4 border-black border-2 rounded-sm'
			{...props}
		>
			{children}
		</button>
	);
}

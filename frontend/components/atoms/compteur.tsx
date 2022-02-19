import * as React from 'react';

export const Compteur = ({ className, serieNumber }) => {
	return (
		<div className={"h-9 w-9  bg-gray-100 " + className}>
			<span className="h-fit text-center flex-initial border-solid">{serieNumber}</span>
		</div>

	)
};

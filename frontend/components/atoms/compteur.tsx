import * as React from 'react';

export const Compteur = ({ className, serieNumber }) => {
	return (
		<div className={"h-9 w-9  bg-gray-100 border-solid border-2 border-indigo-600 flex justify-center items-center " + className}>
			<div className="" >{serieNumber}</div>
		</div>

	)
};

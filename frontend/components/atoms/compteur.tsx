import * as React from 'react';

export const Compteur = ({ className = "", isActif, serieNumber }) => {
	const dev = isActif ? "border-solid border-black" : ""
	return (
		<div className={"h-9 w-9  m-2 min-w-7  bg-gray-100 border-solid border-2 border-indigo-600 flex justify-center items-center " + dev + className}>
			<div>{serieNumber}</div>
		</div>

	)
};

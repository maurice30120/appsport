import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Compteur } from '../../components/atoms/compteur';
import type { NextPage } from 'next'


export const MouvementView = ({ data, objectif = 0, rest = 0 }) => {
	const { Title, content, images, slug } = data;

	return (
		<Wrapper >
			<>
				{[...Array(6)].map((x, i) => <Compteur serieNumber={i + 1} className=" " key={`mvt_${Title}_${i}`} />)}
			</>
		</Wrapper>


	);
};


const Wrapper = ({ className, children }: { className?: string, children: any }) => {

	return (<div className={'flex justify-around border-t-2 border-black ' + className || ""}>{children}</div>)
}
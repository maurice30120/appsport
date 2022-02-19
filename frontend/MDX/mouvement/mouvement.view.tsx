import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { Compteur } from '../../components/atoms/compteur';

const Heading = styled.h1`
	font-size: 50px;

	color: black;
`;

export const MouvementView = ({ data, objectif = 0, rest = 0 }) => {
	const { Title, content, images, slug } = data;

	return (
		<div>
			<Wrapper >
				<>
					{[...Array(6)].map((x, i) => <Compteur serieNumber={i + 1} className=" " key={`mvt_${Title}_${i}`} />)}
				</>
			</Wrapper>
			<div className="h-56 grid grid-cols-3 gap-4 content-evenly ...">
				<div>01</div>
				<div>02</div>
				<div>03</div>
				<div>04</div>
				<div>05</div>
			</div>
		</div>

	);
};


const Wrapper = ({ className, children }: { className?: string, children: any }) => {

	return (<div style={{ border: "solid", justifyContent: "space-around" }} className={'flex justify-around ' + className || ""}>{children}</div>)
}
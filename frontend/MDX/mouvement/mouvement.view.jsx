import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Heading = styled.h1`
	font-size: 50px;

	color: black;
`;

export const MouvementView = ({ data, objectif = 0, rest = 0 }) => {
	const { Title, content, images, slug } = data;

	return (
		<div>
			<h2>{Title}</h2>
			<ReactMarkdown source={content} escapeHtml={false} />
			<Heading>Hello World!</Heading>
		</div>
	);
};

import React from 'react';

import ReactMarkdown from 'react-markdown';

export const MouvementView = ({ data, objectif = 0, rest = 0 }) => {

	const { Title, content, images, slug } = data;

	return (
		<div>
			<h2>{Title}</h2>
			<ReactMarkdown source={content} escapeHtml={false} />
		</div>
	);
};

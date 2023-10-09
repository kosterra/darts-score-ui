import React from 'react';
import {
	Container,
	Row
} from 'react-bootstrap';

import AboutCard from '../components/about/about.card';


const AboutPage = () => {
	return (
		<Container className="m-4 bg-transparent border-0">
			<Row>
				<AboutCard />
			</Row>
		</Container>
	);
};

export default AboutPage;

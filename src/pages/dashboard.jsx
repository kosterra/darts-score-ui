import React from 'react';
import { 
	Container,
	Row
} from 'react-bootstrap';

import RunningX01Games from '../components/dashboard/running.x01';
import FinishedX01Games from '../components/dashboard/finished.x01';
import RunningCricketGames from '../components/dashboard/running.cricket';
import FinishedCricketGames from '../components/dashboard/finished.cricket';

const Dashboard = () => {
	return (
		<Container fluid className="p-4 bg-transparent border-0">
			<Row>
				<RunningX01Games />
				<RunningCricketGames />
				<FinishedX01Games />
				<FinishedCricketGames />
			</Row>
		</Container>
	);
};

export default Dashboard;
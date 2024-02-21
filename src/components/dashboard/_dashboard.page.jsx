import { useState, useEffect } from 'react';
import DashboardGameList from './dashboard.gamelist';

import X01Service from '../../services/x01.service';
import CricketService from '../../services/cricket.service';
import PlayerService from '../../services/player.service';

const Dashboard = () => {
	
	const [runningX01Games, setRunningX01Games] = useState([]);
	const [finishedX01Games, setFinishedX01Games] = useState([]);
	const [runningCricketGames, setRunningCricketGames] = useState([]);
	const [finishedCricketGames, setFinishedCricketGames] = useState([]);
	const [players, setPlayers] = useState([]);

	const loadRunningX01Games = async () => {
		let data = await X01Service.loadRunningX01Games();
		setRunningX01Games(data);
	}

	const loadRunningCricketGames = async () => {
		let data = await CricketService.loadRunningCricketGames();
		setRunningCricketGames(data);
	}

	const loadFinishedX01Games = async () => {
		let data = await X01Service.loadFinishedX01Games();
		setFinishedX01Games(data);
	}

	const loadFinishedCricketGames = async () => {
		let data = await CricketService.loadFinishedCricketGames();
		setFinishedCricketGames(data);
	}

	const loadPlayers = async () => {
		let data = await PlayerService.loadPlayers('');
		setPlayers(data);
	}

	useEffect(() => {
		loadRunningX01Games();
		loadFinishedX01Games();
		loadRunningCricketGames();
		loadFinishedCricketGames();
		loadPlayers();
	}, []);

	return (
		<div className="container-fluid p-4 border-0">
			<div className="row" data-masonry='{"percentPosition": true }'>
				<DashboardGameList title="X01" subtitle="Currently Running" games={runningX01Games} players={players} gamesType="x01" />
				<DashboardGameList title="X01" subtitle="Recently Finished" games={finishedX01Games} players={players} gamesType="x01" />
				<DashboardGameList title="Cricket" subtitle="Currently Running" games={runningCricketGames} players={players} gamesType="cricket" />
				<DashboardGameList title="Cricket" subtitle="Recently Finished" games={finishedCricketGames} players={players} gamesType="cricket" />
			</div>
		</div>
	);
};

export default Dashboard;
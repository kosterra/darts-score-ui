import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { NavigationBar } from './components/navigation/navigation.bar';

import Dashboard from './pages/dashboard';
import X01ConfigPage from './pages/config/x01';
import X01GamePage from './pages/games/x01';
import CricketConfigPage from './pages/config/cricket';
import CricketGamePage from './pages/games/cricket';
import StatsPage from './pages/stats';
import AboutPage from './pages/about';
import AdminPage from './pages/admin';

import 'react-toastify/dist/ReactToastify.css';
import './resources/scss/main.scss';

function App() {

	return (
		<Router>
			<NavigationBar />
			<Routes>
				<Route path="/" element={<Dashboard/>} />
				<Route path="/x01" element={<X01ConfigPage/>} />
				<Route path="/x01/:id" element={<X01GamePage/>} />
				<Route path="/cricket" element={<CricketConfigPage/>} />
				<Route path="/cricket/:id" element={<CricketGamePage/>} />
				<Route path="/stats" element={<Navigate replace to="/stats/players" />} />
				<Route path="/stats/:id" element={<StatsPage/>} />
				<Route path="/stats/games/:id" element={<StatsPage/>} />
				<Route path="/about" element={<AboutPage/>} />
				<Route path="/admin" element={<Navigate replace to="/admin/players" />} />
				<Route path="/admin/:id" element={<AdminPage/>} />
				<Route path="/admin/games/:id" element={<AdminPage/>} />
				<Route path="*" element={<Navigate replace to="/" />} />
			</Routes>
			<ToastContainer 
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark" />
		</Router>
	);
}

export default App;

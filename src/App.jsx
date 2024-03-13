import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PrimeReactProvider } from 'primereact/api';

import NavigationSidebar from './components/navigation/navigation.sidebar';

import Dashboard from './components/dashboard/_dashboard.page';
import X01ConfigPage from './components/game_config/x01/_x01.config.page';
import X01GamePage from './components/games/x01/_x01.game.page';
import X01GameStats from './components/stats/x01/x01.game.stats';
import CricketConfigPage from './components/game_config/cricket/_cricket.config.page';
import CricketGamePage from './components/games/cricket/_cricket.game.page';
import CricketGameStats from './components/stats/cricket/cricket.game.stats';
import StatsPage from './components/stats/_stats.page';
import AboutPage from './components/about/_about.page';
import AdminPage from './components/admin/_admin.page';

import 'react-toastify/dist/ReactToastify.css';
import 'primeicons/primeicons.css';
import "./theme/dark/green/theme.scss";

function App() {

  return (
    <PrimeReactProvider>
      <Router>
        <div className="d-flex">
          <NavigationSidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/x01" element={<X01ConfigPage />} />
            <Route path="/x01/:id" element={<X01GamePage />} />
            <Route path="/cricket" element={<CricketConfigPage />} />
            <Route path="/cricket/:id" element={<CricketGamePage />} />
            <Route path="/stats" element={<Navigate replace to="/stats/players" />} />
            <Route path="/stats/:id" element={<StatsPage />} />
            <Route path="/stats/games/:id" element={<StatsPage />} />
            <Route path="/stats/games/x01/:id" element={<X01GameStats />} />
            <Route path="/stats/games/cricket/:id" element={<CricketGameStats />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin" element={<Navigate replace to="/admin/players" />} />
            <Route path="/admin/:id" element={<AdminPage />} />
            <Route path="/admin/games/:id" element={<AdminPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
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
    </PrimeReactProvider>
  );
}

export default App;
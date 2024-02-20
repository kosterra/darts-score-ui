import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PrimeReactProvider } from 'primereact/api';

import NavigationSidebar from './components/navigation/navigation.sidebar';

import Dashboard from './pages/dashboard';
import X01ConfigPage from './pages/config/x01';
import X01GamePage from './pages/games/x01';
import X01GameStats from './components/stats/x01.game.stats';
import CricketConfigPage from './pages/config/cricket';
import CricketGamePage from './pages/games/cricket';
import CricketGameStats from './components/stats/cricket.game.stats';
import StatsPage from './pages/stats';
import AboutPage from './pages/about';
import AdminPage from './pages/admin';

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
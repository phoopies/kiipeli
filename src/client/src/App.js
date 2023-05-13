import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Splash from './components/Splash';
import useTimeout from './hooks/useTimeout';
import Home from './pages/Home';
import Wall from './pages/Wall';
import WallAddRoute from './pages/WallAddRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wall/:wallId" element={<Wall />} />
        <Route path="/wall/:wallId/add" element={<WallAddRoute />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

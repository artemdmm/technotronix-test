import { BrowserRouter, Navigate, Routes, Route, Link } from 'react-router-dom';
import { Accumulators } from './accumulators/Accumulators';
import { Binding } from './accumulators/Binding';
import { Devices } from './devices/Devices';
import './style/App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav className="Navbox">
        <Link to="/accumulators">Аккумуляторы</Link> |{" "}
        <Link to="/devices">Устройства</Link> |{" "}
        <Link to="/binding">Привязка</Link>{" "}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/accumulators" replace />} />
        <Route path="/accumulators" element={<Accumulators />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/binding" element={<Binding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

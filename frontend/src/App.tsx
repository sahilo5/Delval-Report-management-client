import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ComponentTest from './components/ComponentTest';


import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <Router>
      <Toaster>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<ComponentTest />} />
        </Routes>
      </Toaster>
    </Router>
  );
}

export default App;
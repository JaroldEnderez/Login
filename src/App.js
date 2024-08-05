import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Users from './components/Users';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login/>} exact />
        <Route path="/users" element={<Users/>} exact />
      </Routes>
    </Router>
  );
}
 
export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Replace Switch with Routes
import HomePage from './pages/HomePage';

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

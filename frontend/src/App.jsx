import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Replace Switch with Routes
import HomePage from './screens/HomePage';
import NavBar from './components/HomeComponents/NavBar';

function App () {
  document.title = 'AirBRB';
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

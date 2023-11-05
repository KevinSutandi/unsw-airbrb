import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import NavBar from './components/HomeComponents/NavBar';
import './input.css';
import HostedListings from './screens/HostedListings';
import ErrorModal from './components/ErrorModal';

function App () {
  document.title = 'AirBRB';

  // Manage the login status at the App level and pass it to child components
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setErrorMessage={setErrorMessage} setErrorModalOpen={setErrorModalOpen} />
        <Routes>
          <Route path='/' element={<HomePage isLoggedIn={isLoggedIn}/>} />
          <Route path='/listings' element={<HostedListings setErrorMessage={setErrorMessage} setErrorModalOpen={setErrorModalOpen} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </Router>

      <ErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errorMessage={errorMessage}
      ></ErrorModal>
    </>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import NavBar from './components/HomeComponents/NavBar';
import './input.css';
import HostedListings from './screens/HostedListings';
import ErrorModal from './components/ErrorModal';
import CreateListing from './screens/CreateListing';
import EditListing from './screens/EditListing';
import { Product, SingleDetailListing } from './types/types';

function App () {
  document.title = 'AirBRB';

  // Manage the login status at the App level and pass it to child components
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState<SingleDetailListing[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  return (
    <>
      <Router>
        <NavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setErrorMessage={setErrorMessage}
          setErrorModalOpen={setErrorModalOpen}
          product={products}
          setProduct={setProducts}
          setIsFiltered={setIsFiltered}
        />
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} products={products} setProducts={setProducts} isFiltered={isFiltered} setIsFiltered={setIsFiltered}/>} />
          <Route
            path="/listings"
            element={
              <HostedListings
                setErrorMessage={setErrorMessage}
                setErrorModalOpen={setErrorModalOpen}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/listings/create"
            element={
              <CreateListing
                setErrorMessage={setErrorMessage}
                setErrorModalOpen={setErrorModalOpen}
              />
            }
          />
          <Route
            path="/listings/edit/:id"
            element={
              <EditListing
                setErrorMessage={setErrorMessage}
                setErrorModalOpen={setErrorModalOpen}
              />
            }
          />
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

import React, { useEffect } from 'react';
import { makeRequest } from '../utils/axiosHelper';
import { getEmail, getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function HostedListngs ({ isLoggedIn, setErrorMessage, setErrorModalOpen, setIsLoggedIn }) {
  // const [myListings, setMyListings] = useState('')

  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken()

    if (token === 'null') {
      navigate('/');
      setErrorMessage("Cannot access 'My Listings' Page when not Logged In")
      setErrorModalOpen(true)
      return;
    }

    const userEmail = getEmail();
    makeRequest('GET', 'LISTINGS', { token })
      .then((response) => {
        // Assuming response.data.listings is an array of listings
        const filteredListings = response.data.listings.filter(
          (listing) => listing.owner === userEmail
        );

        // filteredListings now contains only the listings where the owner's email matches the user's email
        console.log(filteredListings);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div className='mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          My Listings
        </h2>
      </div>
    </>
  );
}

import React, { useContext } from 'react';
import Calendar from './Calendar';
import { SingleDetailListing } from '../../types/types';
import { isAfter, isBefore, add } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../GlobalContext';

interface CheckInOutCounterProps {
    checkIn: Date;
    setCheckIn: React.Dispatch<React.SetStateAction<Date>>;
    checkOut: Date;
    setCheckOut: React.Dispatch<React.SetStateAction<Date>>;
    difference: number
    detailedListings: SingleDetailListing[];
    setProducts: React.Dispatch<React.SetStateAction<SingleDetailListing[]>>;
    setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CheckInOut ({
  checkIn, setCheckIn, checkOut, setCheckOut, difference, detailedListings, setProducts, setIsFiltered
}: CheckInOutCounterProps) {
  const navigate = useNavigate()
  function searchByCheckInOut (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    const filteredProducts = detailedListings.filter((listing) => {
      const availability = listing.availability;

      // Use Array.some to check if there is any date range that overlaps with the checkIn and checkOut
      return availability.some((date) => {
        const dateFrom = new Date(date.from);
        const dateTo = new Date(date.to);
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        console.log(listing.title)
        console.log(isAfter(checkInDate, add(dateFrom, { days: -1 })));
        console.log(isBefore(checkOutDate, dateTo));

        return isAfter(checkInDate, add(dateFrom, { days: -1 })) && isBefore(checkOutDate, dateTo);
      });
    });

    navigate('/')
    setProducts(filteredProducts);
    setIsFiltered(true);
  }

  const globalContextValue = useContext(GlobalContext)

  if (!globalContextValue) {
    throw new Error('Global context value not provided')
  }

  const { setFilteredCheckin, setFilteredCheckout } = globalContextValue

  return (
    <>
      <div className='flex flex-col p-5 gap-3 justify-center lg:flex-row'>
        <div className='flex flex-col gap-3 justify-center items-center'>
          <h1 className='font-bold text-gray-800'>Check in</h1>
          <Calendar selectedDay={checkIn} setSelectedDay={setCheckIn} setFiltered={setFilteredCheckin} />
        </div>

        <hr className='border-gray-200 lg:hidden' />

        <div className='flex flex-col gap-3 justify-center items-center'>
          <h1 className='font-bold text-gray-800'>Check out</h1>
          <Calendar
            selectedDay={checkOut}
            setSelectedDay={setCheckOut}
            checkIn={checkIn}
            setFiltered={setFilteredCheckout}
          />
        </div>
      </div>
      <div className='mt-2 text-center'>
        Searching dates from {checkIn.toLocaleDateString()} to{' '}
        {checkOut.toLocaleDateString()} ({difference} nights)
      </div>
      <hr className='border-gray-200 my-5' />
      <button onClick={searchByCheckInOut} className='w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>
        Search
      </button>
    </>
  );
}

import React from 'react';
import Calendar from './Calendar';

interface CheckInOutCounterProps {
    checkIn: Date;
    setCheckIn: React.Dispatch<React.SetStateAction<Date>>;
    checkOut: Date;
    setCheckOut: React.Dispatch<React.SetStateAction<Date>>;
    difference: number
}

export default function CheckInOut ({
  checkIn, setCheckIn, checkOut, setCheckOut, difference
}: CheckInOutCounterProps) {
  return (
    <>
      <div className='flex flex-col p-5 gap-3 justify-center lg:flex-row'>
        <div className='flex flex-col gap-3 justify-center items-center'>
          <h1 className='font-bold text-gray-800'>Check in</h1>
          <Calendar selectedDay={checkIn} setSelectedDay={setCheckIn} />
        </div>

        <hr className='border-gray-200 lg:hidden' />

        <div className='flex flex-col gap-3 justify-center items-center'>
          <h1 className='font-bold text-gray-800'>Check out</h1>
          <Calendar
            selectedDay={checkOut}
            setSelectedDay={setCheckOut}
            checkIn={checkIn}
          />
        </div>
      </div>
      <div className='mt-2 text-center'>
        Searching dates from {checkIn.toLocaleDateString()} to{' '}
        {checkOut.toLocaleDateString()} ({difference} nights)
      </div>
      <hr className='border-gray-200 my-5' />
      <button className='w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>
        Search
      </button>
    </>
  );
}

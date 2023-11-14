import React, { useContext } from 'react';
import DateContext from './DateContext';
import { Nullable } from 'primereact/ts-helpers';
import { getEmail } from '../../utils/auth';
import { NavLink } from 'react-router-dom';

type BookingModalProps = {
  price: number;
  openDateModal: () => void;
  owner: string;
  handleBook: () => void;
  listingId: string;
};

export default function BookingFooter ({
  price,
  openDateModal,
  handleBook,
  owner,
  listingId,
}: BookingModalProps) {
  const contextValue = useContext(DateContext);

  if (!contextValue) {
    throw new Error('DateContext is undefined');
  }

  const { checkinDate, checkoutDate } = contextValue;

  const formatDate = (dateString: Nullable<Date>) => {
    if (!dateString) {
      return;
    }
    const formattedDate = dateString.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    return formattedDate;
  };

  return (
    <footer className="w-full border-t border-black xl:hidden flex justify-between p-5 items-center sticky bottom-0 bg-white left-0">
      <div>
        <div className='flex items-baseline gap-2'>
          <div className="font-bold text-2xl">${price} AUD</div>
          <p>Per Night</p>
        </div>
        <button
          className="underline text-lg font-semibold"
          onClick={openDateModal}
        >
          {formatDate(checkinDate)} - {formatDate(checkoutDate)}
        </button>
      </div>
      {owner === getEmail()
        ? (
        <NavLink to={`/listings/edit/${listingId}`} className="inline-block rounded-md bg-blue-600 px-8 py-4 text-center text-2xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Edit Listing</NavLink>
          )
        : (
        <button
          onClick={handleBook}
          className="inline-block rounded-md bg-blue-600 px-8 py-4 text-center text-2xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Book Now
        </button>
          )}
      {/* <button
        onClick={handleBook}
        className="inline-block rounded-md bg-blue-600 px-8 py-4 text-center text-2xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Book Now
      </button> */}
    </footer>
  );
}

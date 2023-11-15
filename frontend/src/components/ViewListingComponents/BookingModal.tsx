import React, { useContext } from 'react';
import DateForm from './DateForm';
import DateContext from './DateContext';
import { calculateDifferenceInDays } from '../../screens/ViewListing';
import { getEmail, getToken } from '../../utils/auth';
import { NavLink } from 'react-router-dom';

type BookingModalProps = {
  owner: string;
  price: number;
  handleBook: () => void;
  listingId: string
};

export default function BookingModal ({
  price,
  handleBook,
  owner,
  listingId
}: BookingModalProps) {
  const dateContextValue = useContext(DateContext);

  if (!dateContextValue) {
    throw new Error('Date Context Error');
  }

  const { checkinDate, checkoutDate } = dateContextValue;

  return (
    <div className="hidden xl:block">
      <div className="lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 box-border">
        <div className="rounded-2xl bg-gray-50 py-5 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center shadow-xl px-10">
          <div className="mx-auto">
            <div className='flex items-baseline gap-2'>
            <h3 className="font-bold text-left text-2xl font-semibol mb-5">
              ${price} AUD
            </h3>
            <p>Per Night</p>
            </div>
            <DateForm />
            {owner === getEmail()
              ? (
                <NavLink
                  to={`/listings/edit/${listingId}`}
                  className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Listing
                </NavLink>
                )
              : (
              <button
                onClick={handleBook}
                disabled={!checkinDate || !checkoutDate || !getToken()}
                className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-40 disabled:hover:bg-blue-600"
              >
                {getToken() ? 'Book Now' : 'Log in to book'}
              </button>
                )}
            {checkinDate && checkoutDate && (
              <div className="mt-5 text-lg">
                <div className="flex justify-between border-black border-b pb-5">
                  <div className="underline">{`$${price} X ${calculateDifferenceInDays(
                    checkinDate,
                    checkoutDate
                  )} nights`}</div>
                  <div>{`$${
                    price * calculateDifferenceInDays(checkinDate, checkoutDate)
                  } AUD`}</div>
                </div>
                <div className="flex justify-between font-bold text-xl mt-5">
                  <div>Total</div>
                  <div>{`$${
                    price * calculateDifferenceInDays(checkinDate, checkoutDate)
                  } AUD`}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

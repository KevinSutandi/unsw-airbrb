import React, { useContext } from 'react';
import DateForm from './DateForm';
import DateContext from './DateContext';
import { Nullable } from 'primereact/ts-helpers';

type BookingModalProps = {
  price: number;
};

export default function BookingModal ({ price }: BookingModalProps) {
  const contextValue = useContext(DateContext);

  if (!contextValue) {
    throw new Error('Date Context Error');
  }

  const { checkinDate, checkoutDate } = contextValue;

  const calculateDifferenceInDays = (
    date1: Nullable<Date>,
    date2: Nullable<Date>
  ) => {
    if (!date1 || !date2) {
      return 0;
    }
    const differenceInMilliseconds = date2.getTime() - date1.getTime();
    return Math.round(differenceInMilliseconds / (24 * 60 * 60 * 1000));
  };

  return (
    <div className="hidden xl:block">
      <div className="lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 box-border">
        <div className="rounded-2xl bg-gray-50 py-5 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center shadow-xl px-10">
          <div className="mx-auto">
            <h3 className="font-bold text-left text-2xl font-semibol mb-5">
              ${price} AUD
            </h3>
            <DateForm />
            <button className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Book Now
            </button>
            {checkinDate && checkoutDate && (
              <div className='mt-5 text-lg'>
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

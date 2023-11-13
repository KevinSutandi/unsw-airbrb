import React, { useContext } from 'react';
import DateContext from './DateContext';

type BookingModalProps = {
  price: number;
  openDateModal: () => void;
};

export default function BookingFooter ({
  price,
  openDateModal,
}: BookingModalProps) {
  const contextValue = useContext(DateContext);

  if (!contextValue) {
    throw new Error('DateContext is undefined');
  }

  const { checkinDate, checkoutDate } = contextValue;

  const formatDate = (dateString: string) => {
    const parsedDate = new Date(dateString);

    const formattedDate = parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    return formattedDate;
  };

  return (
    <footer className="w-full border-t border-black xl:hidden flex justify-between p-5 items-center sticky bottom-0 bg-white left-0">
      <div>
        <div className="font-bold text-2xl">${price} AUD</div>
        <button
          className="underline text-lg font-semibold"
          onClick={openDateModal}
        >
          {formatDate(checkinDate)} - {formatDate(checkoutDate)}
        </button>
      </div>
      <button className="inline-block rounded-md bg-blue-600 px-8 py-4 text-center text-2xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Book Now
      </button>
    </footer>
  );
}

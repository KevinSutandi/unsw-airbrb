import React, { useContext } from 'react';
import DateContext from './DateContext';
import { Calendar } from 'primereact/calendar';

export default function DateForm () {
  const contextValue = useContext(DateContext);

  if (!contextValue) {
    throw new Error('DateContext is undefined');
  }

  const {
    checkinDate,
    checkoutDate,
    setCheckinDate,
    setCheckoutDate,
    availability,
  } = contextValue;

  const generateDateRange = (startDate: Date, endDate: Date) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }

    return dates;
  };

  const availableDates = availability.flatMap((elem) =>
    generateDateRange(new Date(elem.from), new Date(elem.to))
  );

  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 xl:text-sm rounded-lg w-full flex box-border gap-1 text-left justify-between cursor-pointer text-lg">
      <div className="py-2.5 px-2.5">
        <div>
          <label htmlFor="checkin" className="cursor-pointer font-medium">
            CHECK-IN
          </label>
          <Calendar
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.value)}
            enabledDates={availableDates}
            minDate={new Date()}
          />
        </div>
      </div>
      <div>
        <div className="py-2.5 px-2.5">
          <label htmlFor="checkout" className="cursor-pointer font-medium">
            CHECKOUT
          </label>
          <Calendar
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.value)}
            enabledDates={availableDates}
            minDate={new Date()}
          />
        </div>
      </div>
    </div>
  );
}

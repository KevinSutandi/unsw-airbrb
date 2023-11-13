import React, { useContext, useState } from 'react';
import DateContext from './DateContext';

export default function DateForm () {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const contextValue = useContext(DateContext);

  const handleFocus = (inputName: 'checkin' | 'checkout') =>
    setFocusedInput(inputName);
  const handleBlur = () => setFocusedInput(null);

  const getDivClass = (inputName: 'checkin' | 'checkout') => {
    return `flex flex-1 py-2.5 px-2.5 rounded-md ${
      focusedInput === inputName
        ? 'ring-2 ring-black cursor-text'
        : 'border-black cursor-pointer'
    } `;
  };

  if (!contextValue) {
    throw new Error('DateContext is undefined')
  }

  const { checkinDate, checkoutDate, handleCheckinChange, handleCheckoutChange } = contextValue;

  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 xl:text-sm rounded-lg w-full flex box-border gap-1 text-left justify-between cursor-pointer text-lg">
      <div className={getDivClass('checkin')}>
        <div>
          <label htmlFor="checkin" className="cursor-pointer font-medium">
            CHECK-IN
          </label>
          <input
            type="date"
            className="w-full border-none h-5 p-0 focus:ring-0 cursor-text bg-transparent"
            placeholder="Select date"
            onFocus={() => handleFocus('checkin')}
            onBlur={handleBlur}
            id="checkin"
            onChange={handleCheckinChange}
            value={checkinDate}
          />
        </div>
      </div>
      <div className={getDivClass('checkout')}>
        <div>
          <label htmlFor="checkout" className="cursor-pointer font-medium">
            CHECKOUT
          </label>
          <input
            type="date"
            value={checkoutDate}
            className="w-full border-none h-5 p-0 focus:outline-none focus:ring-0 cursor-text bg-transparent"
            onFocus={() => handleFocus('checkout')}
            onBlur={handleBlur}
            onChange={handleCheckoutChange}
            id="checkout"
          />
        </div>
      </div>
    </div>
  );
}

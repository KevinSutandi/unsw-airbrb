import React, { createContext } from 'react';

type DateContext = {
  checkinDate: string,
  checkoutDate: string
  handleCheckinChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckoutChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateContext = createContext<DateContext | undefined>(undefined)

export default DateContext

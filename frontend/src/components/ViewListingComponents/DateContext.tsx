import React, { createContext } from 'react';
import { Nullable } from 'primereact/ts-helpers';

type DateContext = {
  checkinDate: Nullable<Date>,
  checkoutDate: Nullable<Date>,
  setCheckinDate: React.Dispatch<React.SetStateAction<Nullable<Date>>>
  setCheckoutDate: React.Dispatch<React.SetStateAction<Nullable<Date>>>
}

const DateContext = createContext<DateContext | undefined>(undefined)

export default DateContext

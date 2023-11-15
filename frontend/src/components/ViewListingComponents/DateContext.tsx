import React, { createContext } from 'react';
import { Nullable } from 'primereact/ts-helpers';
import { Availability } from '../../types/types';

type DateContext = {
  availability: Availability[];
  checkinDate: Nullable<Date>;
  checkoutDate: Nullable<Date>;
  setCheckinDate: React.Dispatch<React.SetStateAction<Nullable<Date>>>;
  setCheckoutDate: React.Dispatch<React.SetStateAction<Nullable<Date>>>;
};

const DateContext = createContext<DateContext | undefined>(undefined);

export default DateContext;

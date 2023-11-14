import { Nullable } from 'primereact/ts-helpers';
import React, { createContext } from 'react'

type GlobalContextValue = {
  filteredCheckin: Nullable<Date>;
  filteredCheckout: Nullable<Date>;
  setFilteredCheckin: React.Dispatch<React.SetStateAction<Nullable<Date>>>;
  setFilteredCheckout: React.Dispatch<React.SetStateAction<Nullable<Date>>>;
}

const GlobalContext = createContext<GlobalContextValue | null>(null)

export default GlobalContext

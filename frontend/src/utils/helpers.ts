import { Nullable } from 'primereact/ts-helpers';

export const areDatesValid = (fromDate: Nullable<Date>, toDate: Nullable<Date>) => {
  // Check for undefined or null to ensure function only returns boolean
  if (!fromDate || !toDate) return false
  return fromDate && toDate && fromDate < toDate;
};

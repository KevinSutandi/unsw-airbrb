import { Nullable } from 'primereact/ts-helpers';

export const areDatesValid = (fromDate: Nullable<Date>, toDate: Nullable<Date>) => {
  // Check for undefined or null to ensure function only returns boolean
  if (!fromDate || !toDate) return false
  return fromDate && toDate && fromDate < toDate;
};

export const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

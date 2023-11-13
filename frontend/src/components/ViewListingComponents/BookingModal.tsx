import React from 'react';
import DateForm from './DateForm';

type BookingModalProps = {
  price: number;
};

export default function BookingModal ({ price }: BookingModalProps) {
  return (
    <div>
      <div className="lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 box-border">
        <div className="rounded-2xl bg-gray-50 py-5 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center shadow-xl px-10">
          <div className="mx-auto">
            <h3 className="font-bold text-left text-2xl font-semibol">
              ${price} USD
            </h3>
            <DateForm />
            <a
              href="#"
              className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Book Now
            </a>
            <p className="mt-6 text-xs leading-5 text-gray-600">
              Invoices and receipts available for easy company reimbursement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

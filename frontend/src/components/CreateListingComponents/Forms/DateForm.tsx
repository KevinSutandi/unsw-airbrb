import React from 'react';
import { DateFormProps } from '../../../types/types';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function DateForm ({ fromValue, toValue, idx, setAvailability }: DateFormProps) {
  const removeAvailability = () => {
    setAvailability(prev => prev.filter((_, index) => index !== idx))
  }

  return (
    <div className="mt-2 flex justify-between w-full items-center">
      <div>
        <input
          type="date"
          value={fromValue}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
          placeholder="Select date"
        />
      </div>
      <div>To</div>
      <div>
        <input
          type="date"
          value={toValue}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
          placeholder="Select date"
        />
      </div>
      <button className="mx-auto flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10" onClick={removeAvailability}>
        <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
      </button>
    </div>
  );
}

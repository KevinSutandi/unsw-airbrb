import React, { Fragment } from 'react';
import TextForm from '../Forms/TextForm';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function SearchBar () {
  return (
    <>
      <div className='border-1 w-full md:w-auto py-2 rounded-full shadow-md hover:shadow-lg transition cursor-pointer'>
        <div className='flex flex-row item-center justify-between'>
          <div className='text-gray-900 text-xs md:text-base px-4'>
            Search by Title / City
          </div>
        </div>
      </div>

    </>
  );
}

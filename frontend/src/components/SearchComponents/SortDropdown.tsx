import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { SingleDetailListing, sortingOption } from '../../types/types';

interface SortDropdownProps {
    products: SingleDetailListing[];
    setProducts: React.Dispatch<React.SetStateAction<SingleDetailListing[]>>;
    selected: sortingOption;
    setSelected: React.Dispatch<React.SetStateAction<sortingOption>>;
    sortingOptions: sortingOption[];
}

export default function SortDropdown ({ products, setProducts, selected, setSelected, sortingOptions }: SortDropdownProps) {
  // function to sort products by rating
  const sortProducts = (value: sortingOption) => {
    const sortedProducts = [...products];

    if (value.value === 'none') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (value.value === 'ratingLowToHigh') {
      sortedProducts.sort((a, b) => a.averageStars - b.averageStars);
    } else if (value.value === 'ratingHighToLow') {
      sortedProducts.sort((a, b) => b.averageStars - a.averageStars);
    }

    setProducts(sortedProducts);
  };

  const handleChange = (value: sortingOption) => {
    setSelected(value);
    sortProducts(value);
  }

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className='relative mt-1 w-48'>
        <Listbox.Button className='relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
          <span className='block truncate text-xs lg:text-sm'>{selected?.name}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronUpDownIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
            {sortingOptions.map((sortOption) => (
              <Listbox.Option
                key={sortOption.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  }`
                }
                value={sortOption}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate text-sm ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {sortOption.name}
                    </span>
                    {selected
                      ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600'>
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                        )
                      : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

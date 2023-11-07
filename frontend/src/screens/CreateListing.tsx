import React, { useState, Fragment } from 'react';
import TextForm from '../components/CreateListingComponents/TextForm';
import NumberForm from '../components/CreateListingComponents/NumberForm';
import BedroomForm from '../components/CreateListingComponents/BedroomForm';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const propertyTypes = [
  { id: 'entirePlace', name: 'Entire Place' },
  { id: 'room', name: 'Room' },
  { id: 'sharedRoom', name: 'Shared Room' },
];

export default function CreateListing () {
  const [selectedType, setSelectedType] = useState(propertyTypes[0]);

  return (
    <>
      <div className='mx-auto max-w-4xl px-4 py-10 sm:px-12 sm:py-15 lg:max-w-7xl lg:px-24'>
        <div className='flex flex-row justify-between'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Create Listing
          </h2>
        </div>
      </div>
      <form className='mx-auto max-w-4xl px-4 sm:px-12 lg:px-24'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='listing-title'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Listing Title
                </label>
                <div className='mt-2'>
                  <TextForm name='listing-title' id='listing-title' />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='listing-title'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Property Type
                </label>
                <div className='mt-2'>
                  <Listbox value={selectedType} onChange={setSelectedType}>
                    <div className='relative mt-1'>
                      <Listbox.Button className='relative w-full cursor-default ring-1 ring-inset ring-gray-300 rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                        <span className='block truncate'>
                          {selectedType ? selectedType.name : ''}
                        </span>{' '}
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
                          {propertyTypes.map((type) => (
                            <Listbox.Option
                              key={type.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-blue-100 text-blue-900'
                                    : 'text-gray-900'
                                }`
                              }
                              value={type}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {type.name}
                                  </span>
                                  {selected
                                    ? (
                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600'>
                                      <CheckIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                      />
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
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='street-address'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Street address
                </label>
                <div className='mt-2'>
                  <TextForm
                    name='street-address'
                    id='street-address'
                    autoComplete='street-address'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Price per night
                </label>
                <div className='flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                  <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'>
                    $
                  </span>
                  <NumberForm
                    name='price'
                    id='price'
                    min={1}
                    className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Number of Bathrooms
                </label>
                <div className='flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                  <NumberForm name='bathroom' id='bathroom' min={0} />
                </div>
              </div>
              <BedroomForm />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

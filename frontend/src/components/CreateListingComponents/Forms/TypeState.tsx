import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { PropertyType, StateListProps } from '../../../types/types';

const stateTypes: PropertyType[] = [
  { id: 'ACT', name: 'Australian Capital Territory' },
  { id: 'NSW', name: 'New South Wales' },
  { id: 'NT', name: 'Northern Territory' },
  { id: 'QLD', name: 'Queensland' },
  { id: 'SA', name: 'South Australia' },
  { id: 'TAS', name: 'Tasmania' },
  { id: 'WA', name: 'Western Australia' },
];

const TypeState: React.FC<StateListProps> = ({ selectedState, setSelectedState }) => {
  return (
    <Listbox value={selectedState} onChange={setSelectedState}>
      <div className='relative mt-1 z-20'>
        <Listbox.Button className='relative w-full cursor-default shadow-sm ring-1 ring-inset ring-gray-300 rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 sm:text-sm'>
          <span className='block truncate'>{selectedState ? selectedState.name : ''}</span>{' '}
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
            {stateTypes.map((type) => (
              <Listbox.Option
                key={type.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
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
};

export default TypeState;

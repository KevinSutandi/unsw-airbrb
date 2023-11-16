import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Country, CountryListProps, CountryReturn } from '../../types/types';

export const CountryList: React.FC<CountryListProps> = ({ selectedCountry, setSelectedCountry }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [query, setQuery] = useState<string>('');

  const filteredCountries = query
    ? countries.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    )
    : countries;

  useEffect(() => {
    // Fetch the list of countries from the REST Countries API
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      const countryData = response.data;
      const countryList: Country[] = countryData.map((country: CountryReturn) => ({
        name: country.name.common,
        id: country.name.common,
      }));

      // Sort the list alphabetically by country name
      const sortedCountries = countryList.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setCountries(sortedCountries);
    });
  }, []);

  return (
    <Combobox value={selectedCountry} onChange={setSelectedCountry}>
      <div className="relative mt-1 z-10">
        <div className="relative w-full cursor-default overflow-hidden shadow-sm rounded-lg ring-1 ring-gray-300 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 sm:text-sm">
          <Combobox.Input
            className="country-input w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(country: Country | null) =>
              country ? country.name : ''
            }
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button aria-label='toggle' className="absolute inset-y-0 right-0 flex items-center pr-2" >
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredCountries.length === 0 && query !== ''
              ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
                )
              : (
                  filteredCountries.map((country) => (
                <Combobox.Option
                  key={country.name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    }`
                  }
                  value={country}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {country.name}
                      </span>
                      {selected
                        ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-blue-900'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5 text-blue-900" aria-hidden="true" />
                        </span>
                          )
                        : null}
                    </>
                  )}
                </Combobox.Option>
                  ))
                )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default CountryList;

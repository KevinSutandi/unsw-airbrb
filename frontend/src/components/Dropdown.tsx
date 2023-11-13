import { Popover, Tab, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useState } from 'react';
import SearchForm from './SearchComponents/SearchBar';
import MinMaxCounter from './SearchComponents/MinMaxCounter';
import { differenceInCalendarDays, startOfToday } from 'date-fns';
import CheckInOut from './SearchComponents/CheckInOut';
import {
  DetailListing,
  HomePageProps,
  ListingsReturn,
  SingleDetailListing,
} from '../types/types';
import { makeRequest } from '../utils/axiosHelper';
import PriceFilter from './SearchComponents/PriceFilter';

interface DropdownProps {
  products: HomePageProps['products'];
  setProducts: HomePageProps['setProducts'];
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Dropdown ({
  setProducts,
  setIsFiltered,
}: DropdownProps) {
  function classNames (...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const today = startOfToday();
  const [checkIn, setCheckIn] = useState<Date>(today);
  const [checkOut, setCheckOut] = useState<Date>(today);

  const [detailedListings, setDetailedListings] = useState<
    SingleDetailListing[]
  >([]);

  useEffect(() => {
    getDetailedListings();
  }, []);

  // Get all listings and with details
  async function getDetailedListings () {
    const res = await makeRequest<ListingsReturn>('GET', 'listings');
    const listings = res.data.listings;
    const detailedListings: SingleDetailListing[] = [];

    listings.forEach(async (listing) => {
      const res = await makeRequest<DetailListing>(
        'GET',
        `listings/${listing.id}`
      );
      detailedListings.push(res.data.listing);
    });

    setDetailedListings(detailedListings);
  }

  /**
   * The difference in calendar days between checkOut and checkIn dates.
   */
  const difference = differenceInCalendarDays(checkOut, checkIn);

  const categories = {
    'Title / City': 'Title / City',
    Bedrooms: 'Bedrooms',
    'Check In / Check Out': 'Check In / Check Out',
    Price: 'Price',
  };

  return (
    <div>
      <Popover className='relative'>
        {({ open }) => (
          <>
            <Popover.Button className='border-1 w-full ring-1 ring-gray-500 md:w-auto py-2 rounded-full shadow-md hover:shadow-lg transition cursor-pointer'>
              <div className='flex flex-row item-center justify-between'>
                <div className='text-gray-900 flex flex-row gap-3 items-center text-xs md:text-base px-4'>
                  <MagnifyingGlassIcon className='h-4 w-4 md:h-5 md:w-5 inline-block' />{' '}
                  Search by category
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-200'
                  enterFrom='opacity-0 translate-y-1'
                  enterTo='opacity-100 translate-y-0'
                  leave='transition ease-in duration-150'
                  leaveFrom='opacity-100 translate-y-0'
                  leaveTo='opacity-0 translate-y-1'
                >
                  {open
                    ? (
                    <div className='fixed z-40 inset-0 bg-gray-500 bg-opacity-50 transition-opacity' />
                      )
                    : (
                    <div />
                      )}
                </Transition>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute left-1/2 z-50 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl'>
                <Tab.Group>
                  <Tab.List className='flex space-x-1 rounded-xl bg-gray-500/90 p-1'>
                    {Object.keys(categories).map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                              ? 'bg-white shadow text-blue-700'
                              : 'text-gray-200 hover:bg-white/[0.12] hover:text-white'
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className='mt-2'>
                    <Tab.Panel
                      key='titleCity'
                      className={classNames(
                        'rounded-xl bg-white p-5',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                      <SearchForm
                        detailedListings={detailedListings}
                        setProducts={setProducts}
                        setIsFiltered={setIsFiltered}
                      />
                    </Tab.Panel>

                    <Tab.Panel
                      key='bedrooms'
                      className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                      <MinMaxCounter
                        min={min}
                        setMin={setMin}
                        max={max}
                        setMax={setMax}
                        detailedListings={detailedListings}
                        setProducts={setProducts}
                        setIsFiltered={setIsFiltered}
                      />
                    </Tab.Panel>

                    <Tab.Panel
                      key='checkInOut'
                      className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                      <CheckInOut
                        checkIn={checkIn}
                        setCheckIn={setCheckIn}
                        checkOut={checkOut}
                        setCheckOut={setCheckOut}
                        difference={difference}
                        detailedListings={detailedListings}
                        setProducts={setProducts}
                        setIsFiltered={setIsFiltered}
                      />
                    </Tab.Panel>

                    <Tab.Panel
                      key='price'
                      className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                      <PriceFilter
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        detailedListings={detailedListings}
                        setProducts={setProducts}
                        setIsFiltered={setIsFiltered}
                        />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

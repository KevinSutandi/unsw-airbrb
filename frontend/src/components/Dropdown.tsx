import { Popover, Tab, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useState } from 'react';
import SearchForm from './SearchComponents/SearchBar';
import MinMaxCounter from './SearchComponents/MinMaxCounter';
import { differenceInCalendarDays, startOfToday } from 'date-fns';
import CheckInOut from './SearchComponents/CheckInOut';
import NumberForm from './Forms/NumberForm';
import { DetailListing, HomePageProps, ListingsReturn, SingleDetailListing } from '../types/types';
import { makeRequest } from '../utils/axiosHelper';

interface DropdownProps {
  products: HomePageProps['products'];
  setProducts: HomePageProps['setProducts'];
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Dropdown ({ products, setProducts, setIsFiltered }: DropdownProps) {
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

  const [detailedListings, setDetailedListings] = useState<SingleDetailListing[]>([]);

  useEffect(() => {
    getDetailedListings();
  }, []);

  // Get all listings and with details
  async function getDetailedListings () {
    const res = await makeRequest<ListingsReturn>('GET', 'listings');
    const listings = res.data.listings;
    const detailedListings: SingleDetailListing[] = [];

    listings.forEach(async (listing) => {
      const res = await makeRequest<DetailListing>('GET', `listings/${listing.id}`);
      detailedListings.push(res.data.listing);
    });

    setDetailedListings(detailedListings);
  }

  // Function for filtering products based on the price range
  function filterPriceRange () {
    const filteredProducts = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setProducts(filteredProducts);
  }

  // Function for filtering products based on the number of bedrooms (Get number of bedrooms from the single listing)
  function filterBedrooms () {
    getDetailedListings()
    const filteredProducts = detailedListings.filter(
      (product) => product.metadata.numBedrooms >= min && product.metadata.numBedrooms <= max
    );
    setProducts(filteredProducts);
  }

  // Function for filtering products based on the check in and check out dates
  function filterCheckInOut () {
    getDetailedListings()
    const filteredProducts = detailedListings.filter((product) => {
      const availability = product.availability;

      // Check if there is any availability range that overlaps with the selected check-in and check-out dates
      return availability.some((range) => {
        const rangeStart = new Date(range.from).getTime();
        const rangeEnd = new Date(range.to).getTime();
        const checkInDate = new Date(checkIn).getTime();
        const checkOutDate = new Date(checkOut).getTime();

        // Check if the selected check-in is before or equal to the range end and the selected check-out is after or equal to the range start
        return checkInDate <= rangeEnd && checkOutDate >= rangeStart;
      });
    });

    setProducts(filteredProducts);
  }

  /**
   * The difference in calendar days between checkOut and checkIn dates.
   */
  const difference = differenceInCalendarDays(checkOut, checkIn);

  const categories = {
    'Title / Country': 'Title / Country',
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
                      <SearchForm getDetailedListings={getDetailedListings} detailedListings={detailedListings} setProducts={setProducts} setIsFiltered={setIsFiltered}/>
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
                      />
                    </Tab.Panel>

                    <Tab.Panel
                      key='price'
                      className={classNames(
                        'rounded-xl bg-white p-3',
                        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                      )}
                    >
                      <div className='flex flex-col gap-5'>
                        <div className='flex flex-row items-center justify-between'>
                          Minimum Price
                          <div className='flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:w-64'>
                            <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'>
                              $
                            </span>
                            <NumberForm
                              name='minPrice'
                              id='minPrice'
                              min={0}
                              onChange={(event) => {
                                setMinPrice(parseInt(event.target.value));
                              }}
                              className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                            />
                          </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                          Maximum Price
                          <div className='flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:w-64'>
                            <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'>
                              $
                            </span>
                            <NumberForm
                              name='maxPrice'
                              id='maxPrice'
                              min={minPrice}
                              onChange={(event) => {
                                setMaxPrice(parseInt(event.target.value));
                              }}
                              className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                            />
                          </div>
                        </div>
                      </div>
                      <hr className='my-5 border-gray-200' />
                      <button className='w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>
                        Search
                      </button>
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

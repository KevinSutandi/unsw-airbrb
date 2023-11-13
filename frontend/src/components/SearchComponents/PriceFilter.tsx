import React from 'react';
import Counter from './Counter';
import { SingleDetailListing } from '../../types/types';
import NumberForm from '../Forms/NumberForm';

interface MinMaxCounterProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  detailedListings: SingleDetailListing[];
  setProducts: React.Dispatch<React.SetStateAction<SingleDetailListing[]>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PriceFilter ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  detailedListings,
  setProducts,
  setIsFiltered,
}: MinMaxCounterProps) {
  // Search by minimum and maximum number of beds
  function handleSearchByMinMax (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    const filteredProducts = detailedListings.filter((product) => {
      const price = product.price;

      return price >= minPrice && price <= maxPrice;
    });

    setProducts(filteredProducts);
    setIsFiltered(true);
  }

  return (
    <>
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
      <button onClick={handleSearchByMinMax} className='w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>
        Search
      </button>
    </>
  );
}

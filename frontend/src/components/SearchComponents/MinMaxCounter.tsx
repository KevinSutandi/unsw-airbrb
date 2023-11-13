import React from 'react';
import Counter from './Counter';
import { SingleDetailListing } from '../../types/types';
import { useNavigate } from 'react-router-dom';

interface MinMaxCounterProps {
  min: number;
  max: number;
  setMin: React.Dispatch<React.SetStateAction<number>>;
  setMax: React.Dispatch<React.SetStateAction<number>>;
  detailedListings: SingleDetailListing[];
  setProducts: React.Dispatch<React.SetStateAction<SingleDetailListing[]>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MinMaxCounter ({
  min,
  setMin,
  max,
  setMax,
  detailedListings,
  setProducts,
  setIsFiltered,
}: MinMaxCounterProps) {
  const navigate = useNavigate()
  // Search by minimum and maximum number of beds
  function handleSearchByMinMax (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    const filteredProducts = detailedListings.filter((product) => {
      const numBedrooms = product.metadata.numBedrooms;

      return numBedrooms >= min && numBedrooms <= max;
    });

    setProducts(filteredProducts);
    navigate('/')
    setIsFiltered(true);
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <label
          htmlFor='min'
          className='text-sm font-medium text-gray-700 mr-3 lg:hidden'
        >
          Minimum
        </label>
        <label
          htmlFor='min'
          className='hidden text-md font-medium text-gray-700 mr-3 lg:block'
        >
          Minimum number of beds
        </label>

        <Counter count={min} setCount={setMin} />
      </div>
      <div className='flex items-center mt-10 justify-between'>
        <label
          htmlFor='max'
          className='text-sm font-medium text-gray-700 mr-3 lg:hidden'
        >
          Maximum
        </label>
        <label
          htmlFor='max'
          className='hidden text-md font-medium text-gray-700 mr-3 lg:block'
        >
          Maximum number of beds
        </label>

        <Counter count={max} setCount={setMax} min={min} />
      </div>
      <hr className='my-5 border-gray-200' />
      <button onClick={handleSearchByMinMax} className='w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>
        Search
      </button>
    </>
  );
}

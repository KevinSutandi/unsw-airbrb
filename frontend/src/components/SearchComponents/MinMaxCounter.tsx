import React from 'react';
import Counter from './Counter';

interface MinMaxCounterProps {
  min: number;
  max: number;
  setMin: React.Dispatch<React.SetStateAction<number>>;
  setMax: React.Dispatch<React.SetStateAction<number>>;
}

export default function MinMaxCounter ({
  min,
  setMin,
  max,
  setMax,
}: MinMaxCounterProps) {
  return (
    <>
      <div className='flex items-center justify-between'>
        <label
          htmlFor='min'
          className='text-sm font-medium text-gray-700 mr-3 sm:hidden'
        >
          Minimum
        </label>
        <label
          htmlFor='min'
          className='hidden text-sm font-medium text-gray-700 mr-3 sm:block'
        >
          Minimum number of beds
        </label>

        <Counter count={min} setCount={setMin} />
      </div>
      <div className='flex items-center mt-10 justify-between'>
        <label
          htmlFor='max'
          className='text-sm font-medium text-gray-700 mr-3 sm:hidden'
        >
          Maximum
        </label>
        <label
          htmlFor='max'
          className='hidden text-sm font-medium text-gray-700 mr-3 sm:block'
        >
          Maximum number of beds
        </label>

        <Counter count={max} setCount={setMax} min={min} />
      </div>
      <button className='w-full mt-8 mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>
        Search
      </button>
    </>
  );
}

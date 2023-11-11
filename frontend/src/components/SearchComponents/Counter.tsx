import React from 'react';
import NumberForm from '../Forms/NumberForm';

interface CounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
}

const Counter: React.FC<CounterProps> = ({ count, setCount, min }) => {
  const increment = () => {
    if (count === 50) return;
    setCount(count + 1);
  };

  const decrement = () => {
    if (count === 0 || count === min) return;
    setCount(count - 1);
  };

  // if min has changed value and the max has lower value than min, set max to min
  if (min && count < min) {
    setCount(min);
  }

  return (
    <div className='flex flex-row justify-center items-center gap-5'>
      <button
        className='bg-gray-500 px-5 py-2 rounded-full text-white hover:bg-gray-700 disabled:bg-gray-500 disabled:opacity-50'
        onClick={decrement}
        disabled={count === 0 || count === min}
      >
        -
      </button>
      <NumberForm
        name='beds'
        id='beds'
        value={count}
        className='block w-75 rounded-md border-0 py-1.5 text-center text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-md sm:leading-6'
        disabled
      />
      <button
        className='bg-gray-500 px-5 py-2 rounded-full text-white hover:bg-gray-700 disabled:bg-gray-500 disabled:opacity-50'
        onClick={increment}
        disabled={count === 50}
      >
        +
      </button>
    </div>
  );
};

export default Counter;

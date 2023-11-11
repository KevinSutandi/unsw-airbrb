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

  return (
    <div className='flex flex-row justify-center items-center gap-5'>
      <button
        className='bg-gray-500 px-5 py-2'
        onClick={decrement}
        disabled={count === 0 || count === min}
      >
        -
      </button>
      <NumberForm
        name='beds'
        id='beds'
        value={count}
        className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full rounded-md border-0 py-1.5 text-center text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-md sm:leading-6'
        disabled
      />
      <button
        className='bg-gray-500 px-5 py-2'
        onClick={increment}
        disabled={count === 50}
      >
        +
      </button>
    </div>
  );
};

export default Counter;

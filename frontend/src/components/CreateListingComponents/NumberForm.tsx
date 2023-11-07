import React from 'react';
import { NumberFormProps } from '../../types/types';

const NumberForm: React.FC<NumberFormProps> = ({ name, id, min, className, onChange }) => {
  return (
    <input
      type='number'
      name={name}
      id={id}
      min={min}
      onChange={onChange}
      className={className || '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'}
    />
  );
};

export default NumberForm;

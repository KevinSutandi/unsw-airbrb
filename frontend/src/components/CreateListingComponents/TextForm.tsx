import React from 'react';
import { TextFormProps } from '../../types/types';

const TextForm: React.FC<TextFormProps> = ({ name, id, autoComplete }) => {
  return (
    <input
      type='text'
      name={name}
      id={id}
      autoComplete={autoComplete}
      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    />
  );
};

export default TextForm;

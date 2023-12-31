import React from 'react';
import { NumberFormProps } from '../../types/types';

const NumberForm: React.FC<NumberFormProps> = ({ name, id, min, max, value, className, autoComplete, onChange, disabled }) => {
  // Define a function to handle input changes while respecting min and max limits
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (min && parseInt(event.target.value) < min) {
      event.target.value = min.toString();
    } else if (max && parseInt(event.target.value) > max) {
      event.target.value = max.toString();
    }

    if (onChange) {
      onChange(event);
    }
  };

  // Ensure that the provided className includes required styles
  const combinedClassName = `${className || 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;

  return (
    <input
      type='number'
      name={name}
      data-testid={name}
      id={id}
      min={min}
      max={max}
      value={value}
      autoComplete={autoComplete}
      onChange={handleInputChange}
      disabled={disabled}
      className={combinedClassName}
    />
  );
};

export default NumberForm;

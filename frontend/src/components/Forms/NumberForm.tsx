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
  const combinedClassName = `${className || ''} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;

  return (
    <input
      type='number'
      name={name}
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

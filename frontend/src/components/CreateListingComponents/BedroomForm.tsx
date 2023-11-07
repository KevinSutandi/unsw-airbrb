import React, { useState, ChangeEvent } from 'react';
import NumberForm from './NumberForm';

interface Bed {
  name: string;
  id: string;
}

interface BedroomFormState {
  numBedrooms: number;
  beds: Bed[];
}

const BedroomForm: React.FC = () => {
  const [state, setState] = useState<BedroomFormState>({
    numBedrooms: 0,
    beds: [],
  });

  const handleNumBedroomsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setState({
      ...state,
      numBedrooms: value,
      beds: Array.from({ length: value }, (_, index) => ({
        name: `Bedroom ${index + 1}`,
        id: `bed_${index + 1}`,
      })),
    });
  };

  return (
    <div className='sm:col-span-2'>
      <label htmlFor='numBedrooms' className='block text-sm font-medium leading-6 text-gray-900'>
        Number of Bedrooms
      </label>
      <div className='flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
        <NumberForm name='numBedrooms' id='numBedrooms' min={0} onChange={handleNumBedroomsChange} />
      </div>
      {state.beds.map((bed) => (
        <div key={bed.id} className='rounded-md ring-1 ring-inset ring-gray-500 my-2 py-3 sm:col-span-2'>
          <label htmlFor={bed.id} className='block text-sm font-medium leading-6 text-gray-900'>
            {`${bed.name}`}
          </label>
          {/* <div className='flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
            <input
              type='text'
              name={bed.name}
              id={bed.id}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
            />
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default BedroomForm;

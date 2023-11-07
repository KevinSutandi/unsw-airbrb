import React, { useState, Fragment, ChangeEvent } from 'react';
import TextForm from '../components/CreateListingComponents/TextForm';
import NumberForm from '../components/CreateListingComponents/NumberForm';
import BedIcon from '../assets/double-bed-icon.svg';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { BedroomFormState } from '../types/types';
import TypeList from '../components/CreateListingComponents/TypeList';
import TypeCountry from '../components/CreateListingComponents/TypeCountry';
import TypeState from '../components/CreateListingComponents/TypeState';

export default function CreateListing () {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <>
      <div className='mx-auto max-w-4xl px-4 pt-3 sm:px-12 sm:pt-9 lg:max-w-6xl lg:px-24'>
        <div className='flex flex-row justify-between'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Create Listing
          </h2>
        </div>
      </div>
      <form className='mx-auto max-w-4xl px-4 sm:px-12 lg:px-24'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-4'>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='listing-title'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Listing Title
                </label>
                <div className='mt-2'>
                  <TextForm name='listing-title' id='listing-title' />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='listing-title'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Property Type
                </label>
                <div className='mt-2'>
                  <TypeList />
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='street-address'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Street address
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='street-address'
                    id='street-address'
                    autoComplete='street-address'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Country
                </label>
                <div className='mt-2'>
                  <TypeCountry />
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  City
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='city'
                    id='city'
                    autoComplete='address-level2'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='region'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  State / Province
                </label>
                <div className='mt-2'>
                  <TypeState />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='postal-code'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ZIP / Postal code
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='postal-code'
                    id='postal-code'
                    autoComplete='postal-code'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Price per night
                </label>
                <div className='flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                  <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'>
                    $
                  </span>
                  <NumberForm
                    name='price'
                    id='price'
                    min={1}
                    className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Number of Bathrooms
                </label>
                <div className='flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                  <NumberForm name='bathroom' id='bathroom' min={0} />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='numBedrooms'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Number of Bedrooms
                </label>
                <div className='flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <NumberForm
                    name='numBedrooms'
                    id='numBedrooms'
                    min={0}
                    max={50}
                    onChange={handleNumBedroomsChange}
                  />
                </div>
              </div>

              <div className='col-span-full'>
              <label
                  htmlFor='numBedrooms'
                  className='block text-sm font-medium leading-6 text-gray-900 mb-2'
                >
                  Bed Number Selector
                </label>
                <div className='grid grid-cols-2 p-3 rounded-md border border-dashed border-gray-300 gap-4 h-72 overflow-y-scroll sm:col-span-full lg:grid-cols-4'>
                  {state.beds.map((bed) => (
                    <div
                      key={bed.id}
                      className='rounded-md h-40 ring-1 ring-inset ring-gray-500 px-3 my-2 py-3'
                    >
                      <div className='flex items-center'>
                        <img
                          src={BedIcon}
                          alt='Bed Icon'
                          className='h-7 w-7 mr-2'
                        />
                      </div>
                      <label
                        htmlFor={bed.id}
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        {`${bed.name}`}
                      </label>
                      <label
                        htmlFor={bed.id}
                        className='mt-3 block text-sm font-medium leading-6 text-gray-900'
                      >
                        {'Number of beds'}
                      </label>
                      <div className='flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                        <input
                          type='text'
                          name={bed.name}
                          id={bed.id}
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='col-span-full'>
                <label
                  htmlFor='thumbnail'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Thumbnail
                </label>
                <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                  <div className='text-center'>
                    <PhotoIcon
                      className='mx-auto h-12 w-12 text-gray-300'
                      aria-hidden='true'
                    />
                    <div className='mt-4 text-sm leading-6 text-gray-600'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500'
                      >
                        <span>Upload a file</span>
                        <input
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          className='sr-only'
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <p className='text-xs leading-5 text-gray-600'>
                      {selectedFile
                        ? `Selected file: ${selectedFile.name}`
                        : 'PNG, JPG, up to 10MB'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className='w-full my-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>
          Create Listing
        </button>
      </form>
    </>
  );
}

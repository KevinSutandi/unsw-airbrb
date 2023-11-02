import React, { useState, useEffect } from 'react';
import { makeRequest } from '../utils/axiosHelper'
import '../App.css';

export default function HomePage () {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    makeRequest('GETNOAUTH', 'LISTINGS', {})
      .then((response) => {
        // Assuming the response contains an array of products
        setProducts(response.data.listings);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs once on component mount

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          Listings
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <div key={product.id} className='group relative'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                />
              </div>
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a className='cursor-pointer'>
                      <span aria-hidden='true' className='absolute inset-0 ' />
                      <span className='font-semibold'>{product.title}</span>
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{product.color}</p>
                </div>
                <p className='text-sm font-bold text-gray-900 underline underline-offset-2'>
                  ${product.price}
                  <span className='text-sm font-normal text-gray-500'> per night</span>
                </p>
              </div>
              <div className='flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='text-yellow-300 shrink-0 w-5 h-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='text-yellow-300 shrink-0 w-5 h-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='text-yellow-300 shrink-0 w-5 h-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='text-yellow-300 shrink-0 w-5 h-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='text-gray-300 shrink-0 w-5 h-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <p className='text-gray-400 text-sm ml-1'>(24)</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

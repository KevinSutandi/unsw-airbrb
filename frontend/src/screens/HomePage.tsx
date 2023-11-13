import React, { useEffect } from 'react';
import { makeRequest } from '../utils/axiosHelper';
import { StarIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';
import {
  DetailListing,
  HomePageProps,
  ListingsReturn,
  Product,
  SingleDetailListing,
} from '../types/types';
import { AxiosError } from 'axios';

// Function to generate star icons based on the average rating
const generateStarIcons = (averageStars: number): JSX.Element[] => {
  const starIcons: JSX.Element[] = [];
  const maxRating = 5;

  for (let i = 1; i <= maxRating; i++) {
    if (i <= averageStars) {
      starIcons.push(<StarIcon key={i} className='text-yellow-300 w-5 h-5' />);
    } else {
      starIcons.push(<StarIcon key={i} className='text-gray-300 w-5 h-5' />);
    }
  }

  return starIcons;
};

export default function HomePage ({
  products,
  setProducts,
  isFiltered,
  setIsFiltered,
}: HomePageProps) {
  const setAvailableProducts = async (listings: Product[]) => {
    const productsNew: SingleDetailListing[] = [];

    // Use map to create an array of promises
    const requests = listings.map(async (listing) => {
      try {
        const response = await makeRequest<DetailListing>(
          'GET',
          `listings/${listing.id}`
        );
        const product = response.data.listing;
        if (product.published === false) {
          return;
        }
        product.id = listing.id;
        productsNew.push(product);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    // Wait for all promises to resolve
    await Promise.all(requests);

    // Set the state after all requests are complete
    setProducts(productsNew);
  };

  const getListings = async () => {
    makeRequest<ListingsReturn>('GET', 'listings')
      .then(async (response) => {
        const listings = response.data.listings;
        const sortedListings = listings.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        try {
          await setAvailableProducts(sortedListings);
        } catch (err) {
          if (err instanceof AxiosError) {
            console.error('Error setting available products', err.message);
          } else {
            console.error('Error setting available products');
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    getListings();
  }, []);

  products.forEach((product) => {
    const reviews = product.reviews;
    let totalStars = 0;
    reviews.forEach((review) => {
      totalStars += review.rating;
    });

    const average = totalStars / reviews.length;
    product.averageStars = average;
    product.numReviews = reviews.length;
  });

  async function clearFilter () {
    setIsFiltered(false);
    await getListings();
  }

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Listings
          </h2>
          {isFiltered && (
            <button
              onClick={clearFilter}
              type='button'
              className='inline-flex items-center rounded-md ring-1 ring-gray-500 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-1 focus-visible:ring-offset-1 focus-visible:ring-gray-600'
            >
              <AdjustmentsVerticalIcon
                className='h-4 w-4 mr-1'
                aria-hidden='true'
              />
              Reset Filters
            </button>
          )}
        </div>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.length > 0
            ? (
                products.map((product) => (
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
                        <span aria-hidden='true' className='absolute inset-0' />
                        <span className='font-semibold'>{product.title}</span>
                      </a>
                    </h3>
                  </div>
                  <p className='text-sm font-bold text-gray-900 underline underline-offset-2'>
                    ${product.price}
                    <span className='text-sm font-normal text-gray-500'>
                      {' '}
                      per night
                    </span>
                  </p>
                </div>
                <div className='flex items-center'>
                  {generateStarIcons(product.averageStars)}
                  <p className='text-gray-400 text-sm ml-1'>
                    ({product.numReviews})
                  </p>
                </div>
              </div>
                ))
              )
            : isFiltered
              ? (
            <div className='col-span-full mx-auto text-center flex gap-3 flex-col'>
              <h1 className='font-bold text-md underline text-gray-800'>
                No Results Found
              </h1>
              <button
                onClick={clearFilter}
                type='button'
                className='inline-flex items-center rounded-md ring-1 ring-gray-500 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-1 focus-visible:ring-offset-1 focus-visible:ring-gray-600'
              >
                <AdjustmentsVerticalIcon
                  className='h-4 w-4 mr-1'
                  aria-hidden='true'
                />
                Reset Filters
              </button>
            </div>
                )
              : (
            <div className='col-span-full mx-auto text-center'>
              <h1 className='font-bold text-md underline text-gray-800'>
                No Listings Published Currently
              </h1>
              <h3 className='text-xs text-gray-500'>Check back later</h3>
            </div>
                )}
        </div>
      </div>
    </div>
  );
}

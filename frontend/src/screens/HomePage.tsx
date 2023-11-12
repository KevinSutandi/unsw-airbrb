import React, { useState, useEffect } from 'react';
import { makeRequest } from '../utils/axiosHelper';
import { StarIcon } from '@heroicons/react/24/solid';
import {
  GetSingleListingReturn,
  HomePageProps,
  ListingsReturn,
  Product,
} from '../types/types';
import { AxiosError } from 'axios';
import { NavLink } from 'react-router-dom';

// Function to generate star icons based on the average rating
const generateStarIcons = (averageStars: number): JSX.Element[] => {
  const starIcons: JSX.Element[] = [];
  const maxRating = 5;

  for (let i = 1; i <= maxRating; i++) {
    if (i <= averageStars) {
      starIcons.push(<StarIcon key={i} className="text-yellow-300 w-5 h-5" />);
    } else {
      starIcons.push(<StarIcon key={i} className="text-gray-300 w-5 h-5" />);
    }
  }

  return starIcons;
};

export default function HomePage ({ isLoggedIn }: HomePageProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getSingleListingData = async (id: number) => {
      const res = await makeRequest<GetSingleListingReturn>(
        'GET',
        `listings/${id}`
      );

      return res;
    };

    const setAvailableProducts = async (listings: Product[]) => {
      listings.forEach(async (listing) => {
        const res = await getSingleListingData(listing.id);
        if (res.data.listing.published) {
          setProducts((prev) => [...prev, listing]);
        }
      });
    };

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

  return (
    <div className="bg-white">
      {isLoggedIn && (
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Your Bookings
          </h2>
        </div>
      )}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Listings
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <NavLink to={`/listings/view/${product.id}`} key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a className="cursor-pointer">
                      <span aria-hidden="true" className="absolute inset-0" />
                      <span className="font-semibold">{product.title}</span>
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-bold text-gray-900 underline underline-offset-2">
                  ${product.price}
                  <span className="text-sm font-normal text-gray-500">
                    {' '}
                    per night
                  </span>
                </p>
              </div>
              <div className="flex items-center">
                {generateStarIcons(product.averageStars)}
                <p className="text-gray-400 text-sm ml-1">
                  ({product.numReviews})
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { makeRequest } from '../utils/axiosHelper';
import { NavLink, useParams } from 'react-router-dom';
import {
  DetailListing,
  HostedListingsProps,
  ListingsReturn,
  SingleDetailListing,
} from '../types/types';
import { getToken } from '../utils/auth';
import ViewBookingBreadcrumb from '../components/ViewBookingComponents/ViewBookingBreadcrumbs';
import { set } from 'lodash';

// Define a function to fetch details for a single listing
const fetchListingDetail = async (token: string, listingId: number) => {
  try {
    const response = await makeRequest<DetailListing>(
      'GET',
      `listings/${listingId}`,
      { token }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching listing detail:', error);
    return null;
  }
};

export default function ViewBookings () {
  const [myListing, setMyListing] = useState<SingleDetailListing | null>(null);
  const [uptime, setUptime] = useState<string>('');

  const { listingId } = useParams<{ listingId: string }>();
  const numericListingId = Number(listingId);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchListingDetail(token, numericListingId).then((data) => {
        if (data) {
          setMyListing(data.listing);

          const now = new Date();
          const created = new Date(data.listing.postedOn);
          const diff = now.getTime() - created.getTime();
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor(diff / (1000 * 60));
          const seconds = Math.floor(diff / 1000);
          if (days > 0) {
            setUptime(`${days} days`);
          } else if (hours > 0) {
            setUptime(`${hours} hours`);
          } else if (minutes > 0) {
            setUptime(`${minutes} minutes`);
          } else {
            setUptime(`${seconds} seconds`);
          }
        }
      });
    }
  }, []);

  return (
    <>
      <div className='mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8'>
        <ViewBookingBreadcrumb />
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            View Bookings for {myListing?.title}
          </h2>
          <h5 className='text-gray-400 text-sm'>Booking has been up for <span className='font-bold'>{uptime}</span></h5>
        </div>

        </div>
    </>
  );
}

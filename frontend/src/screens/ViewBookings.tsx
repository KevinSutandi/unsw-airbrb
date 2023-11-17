import React, { useEffect, useState } from 'react';
import { makeRequest } from '../utils/axiosHelper';
import { useParams } from 'react-router-dom';
import {
  Booking,
  DetailListing,
  GetBookingsReturn,
  SingleDetailListing,
} from '../types/types';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { getToken } from '../utils/auth';
import ViewBookingBreadcrumb from '../components/ViewBookingComponents/ViewBookingBreadcrumbs';

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

const fetchBookings = async (token: string, listingId: number) => {
  try {
    const response = await makeRequest<GetBookingsReturn>('GET', 'bookings', {
      token,
    });
    const bookings = response.data.bookings;
    // Filter bookings to only include those that match the listingId
    const filteredBookings = bookings.filter(
      (booking) => booking.listingId === listingId.toString()
    );
    return filteredBookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return null;
  }
};

function formatDate (dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate: string = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

export default function ViewBookings () {
  const [myListing, setMyListing] = useState<SingleDetailListing | null>(null);
  const [uptime, setUptime] = useState<string>('');
  const [runEffect, setRunEffect] = useState<boolean>(false);

  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  const { listingId } = useParams<{ listingId: string }>();
  const numericListingId = Number(listingId);

  const acceptBooking = async (bookingId: string) => {
    try {
      const token = getToken();
      if (token) {
        await makeRequest('PUT', `bookings/accept/${bookingId}`, { token });
        setRunEffect(true);
        console.log('Booking Accepted');
      } else {
        console.error('Error accepting booking: no token');
      }
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };

  const declineBooking = async (bookingId: string) => {
    try {
      const token = getToken();
      if (token) {
        await makeRequest('PUT', `bookings/decline/${bookingId}`, { token });
        setRunEffect(true);
        console.log('Booking declined');
      } else {
        console.error('Error declining booking: no token');
      }
    } catch (error) {
      console.error('Error declining booking:', error);
    }
  };

  const totalProfit = () => {
    let total = 0;
    myBookings.forEach((booking) => {
      if (booking.status === 'accepted') {
        total += booking.totalPrice;
      }
    });
    return total;
  };

  const totalDaysBooked = () => {
    let total = 0;
    myBookings.forEach((booking) => {
      if (booking.status === 'accepted') {
        const from = new Date(booking.dateRange.from);
        const to = new Date(booking.dateRange.to);
        const diff = to.getTime() - from.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        total += days;
      }
    });
    return total;
  };

  useEffect(() => {
    setRunEffect(false);
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

          fetchBookings(token, numericListingId)
            .then((data) => {
              if (data) {
                setMyBookings(data);
              }
            })
            .catch((error) => {
              console.error('Error fetching bookings:', error);
            });
        }
      });
    }
  }, [runEffect]);

  return (
    <>
      <div className='mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8'>
        <ViewBookingBreadcrumb />
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            View Bookings for {myListing?.title}
          </h2>
          <h5 className='text-gray-400 text-sm'>
            Booking has been up for{' '}
            <span className='font-bold text-gray-800'>{uptime}</span>
          </h5>
          <h5 className='text-gray-400 text-sm'>
            Total days booked this year:{' '}
            <span className='font-bold text-gray-800'>{totalDaysBooked()}</span>
          </h5>
          <h5 className='text-gray-400 text-sm'>
            Total Profits this year:{' '}
            <span className='font-bold text-gray-800'>${totalProfit()}</span>
          </h5>
        </div>
        <div className='my-3'>
          <hr />
          {myBookings.length === 0
            ? (
            <div className='flex flex-col mt-20 items-center justify-center h-100'>
              <FaceFrownIcon className='h-10 w-10 text-gray-400' />
              <p className='font-bold'>No Bookings For Now, Come back later</p>
            </div>
              )
            : (
            <ul role='list' className='divide-y my-3 divide-gray-100'>
              {myBookings.map((booking) => (
                <li
                  key={booking.id}
                  className='flex flex-col rounded-xl my-3 p-3 gap-3 justify-between gap-x-6 py-5 sm:flex-row'
                >
                  <div className='flex flex-col'>
                    <span>
                      Booking by:{' '}
                      <span className='font-bold'>{booking.owner}</span>
                    </span>
                    <span>
                      Status:{' '}
                      <span
                        className={`${
                          booking.status === 'pending'
                            ? 'text-yellow-500' // or any other yellow color class
                            : booking.status === 'declined'
                            ? 'text-red-500' // or any other red color class
                            : booking.status === 'accepted'
                            ? 'text-green-500' // or any other green color class
                            : '' // default or other status
                        } font-bold`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1).toLowerCase()}
                      </span>
                    </span>
                    <span className='text-sm font-bold text-gray-400'>
                      From: {formatDate(booking.dateRange.from)}
                    </span>
                    <span className='text-sm font-bold text-gray-400'>
                      To: {formatDate(booking.dateRange.to)}
                    </span>
                  </div>
                  <span>
                    Total Price:{' '}
                    <span className='font-bold'>${booking.totalPrice}</span>
                  </span>
                  {booking.status === 'pending' && (
                    <div className='flex flex-col gap-2'>
                      <button
                        type='button'
                        name='accept-booking'
                        onClick={() => acceptBooking(booking.id)}
                        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                      >
                        Accept
                      </button>
                      <button
                        type='button'
                        name='decline-booking'
                        onClick={() => declineBooking(booking.id)}
                        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
              )}
        </div>
      </div>
    </>
  );
}

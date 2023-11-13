import React, { useEffect, useState } from 'react';
import { makeRequest } from '../utils/axiosHelper';
import { getEmail, getToken } from '../utils/auth';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  DetailListing,
  HostedListingsProps,
  ListingsReturn,
  SingleDetailListing,
} from '../types/types';
import { StarIcon } from '@heroicons/react/20/solid';
import DeleteListing from '../components/CreateListingComponents/Modals/DeleteListingModal';
import PublishListingModal from '../components/CreateListingComponents/Modals/PublishListingModal';
import HostedBreadcrumbs from '../components/HostedListingComponents/HostedListingBreadcrumbs';

const generateStarIcons = (averageStars: number): JSX.Element[] => {
  const starIcons: JSX.Element[] = [];
  const maxRating = 5;

  for (let i = 1; i <= maxRating; i++) {
    if (i <= averageStars) {
      starIcons.push(<StarIcon key={i} className="text-yellow-300 w-4 h-4" />);
    } else {
      starIcons.push(<StarIcon key={i} className="text-gray-300 w-4 h-4" />);
    }
  }

  return starIcons;
};

const fetchUserListings = async (token: string, userEmail: string) => {
  try {
    const response = await makeRequest<ListingsReturn>('GET', 'listings', {
      token,
    });
    return response.data.listings.filter(
      (listing) => listing.owner === userEmail
    );
  } catch (error) {
    console.error('Error fetching data:', error);

    return [];
  }
};

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

export default function HostedListngs ({
  setErrorMessage,
  setErrorModalOpen,
}: HostedListingsProps) {
  const [myListings, setMyListings] = useState<SingleDetailListing[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<number>(0);
  const [runEffect, setRunEffect] = useState(false);

  const [publishedListingId, setPublishedListingId] = useState(0);
  const [publishedListingOpen, setPublishedListingOpen] = useState(false);

  const openDeleteListingModal = (listingId: number) => {
    setSelectedListingId(listingId);
    setOpen(true);
  };

  const openPublishListingModal = (listingId: number) => {
    setPublishedListingId(listingId);
    setPublishedListingOpen(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListingsAndDetails = async (
      token: string,
      userEmail: string
    ) => {
      try {
        const userListings = await fetchUserListings(token, userEmail);

        const listingIds = userListings
          .filter((listing) => listing.owner === userEmail)
          .map((listing) => listing.id);

        const fetchedListings: SingleDetailListing[] = [];

        const listingDetails = await Promise.all(
          listingIds.map((listingId) => fetchListingDetail(token, listingId))
        );

        listingDetails.forEach((listing, index) => {
          if (listing !== null) {
            const listingDetail = listing.listing;
            listingDetail.id = listingIds[index] as number;

            const reviews = listingDetail.reviews;
            const totalStars = reviews.reduce(
              (total, review) => total + review.rating,
              0
            );

            const beds = listingDetail.metadata.beds;

            // Calculate the total number of beds
            let totalBeds = 0;

            for (const bedKey in beds) {
              totalBeds += parseInt(beds[bedKey] as string);
            }

            listingDetail.averageStars =
              reviews.length !== 0 ? totalStars / reviews.length : 0;
            listingDetail.numReviews = reviews.length;
            listingDetail.totalBeds = totalBeds;

            fetchedListings.push(listingDetail);
          }
        });

        setMyListings(fetchedListings);
        setRunEffect(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const token = getToken();

    if (token === 'null') {
      navigate('/');
      setErrorMessage("Cannot access 'My Listings' Page when not logged in");
      setErrorModalOpen(true);
      return;
    }

    const userEmail = getEmail();
    if (token && userEmail !== null) {
      fetchUserListingsAndDetails(token, userEmail);
    }
  }, [runEffect]);

  const navigateCreate = () => {
    navigate('/listings/create');
  };

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8">
        <HostedBreadcrumbs />
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My Listings
          </h2>
          <button
            type="button"
            onClick={navigateCreate}
            className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Listing
          </button>
        </div>
        <div className="my-3">
          <hr />
          <ul role="list" className="divide-y divide-gray-100">
            {myListings.map((listings) => (
              <li
                key={listings.id}
                className="flex flex-col gap-3 justify-between gap-x-6 py-5 sm:flex-row"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={listings.thumbnail}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900 flex flex-row space-x-3 align-middle">
                      <span>{listings.title}</span>
                      <span className="flex flex-row items-center">
                        {generateStarIcons(listings.averageStars)}
                        <span className="text-gray-400 font-medium">
                          &nbsp;{listings.averageStars.toFixed(1)}&nbsp;&nbsp;(
                          {listings.numReviews} Reviews)
                        </span>
                      </span>
                    </p>

                    <p className="mt-1 truncate text-xs leading-5 text-black font-bold">
                      <span className="font-bold text-gray-500">
                        Property Type:&nbsp;
                      </span>
                      {listings.metadata.propertyType}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-black font-bold">
                      <span className="font-bold text-gray-500">
                        Number of Beds:&nbsp;
                      </span>
                      {listings.totalBeds}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-black font-bold">
                      <span className="font-bold text-gray-500">
                        Number of Bathrooms:&nbsp;
                      </span>
                      {listings.metadata.numBathrooms}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-black font-bold">
                      <span className="font-bold text-gray-500">
                        Current Price:&nbsp;
                      </span>
                      <span className="underline">${listings.price}</span> per
                      night
                    </p>
                  </div>
                </div>
                <div className="flex flex-row   shrink-0 gap-3 justify-center items-end sm:flex-col">
                  <NavLink
                    to={`/listings/edit/${listings.id}`}
                    type="button"
                    className="inline-flex items-center rounded-md ring-1 ring-blue-500 px-3 py-2 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-1 focus-visible:ring-offset-1 focus-visible:ring-blue-600"
                  >
                    Edit Listing
                  </NavLink>
                  <button
                    onClick={() => openPublishListingModal(listings.id)}
                    disabled={listings.published}
                    className="inline-flex items-center rounded-md ring-1 ring-blue-500 px-3 py-2 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-1 focus-visible:ring-offset-1 focus-visible:ring-blue-600 disabled:opacity-40"
                  >
                    {listings.published
                      ? 'Published'
                      : 'Publish Listing'
                    }
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteListingModal(listings.id)}
                    className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Delete Listing
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DeleteListing
        open={open}
        setOpen={setOpen}
        listingId={selectedListingId}
        setErrorMessage={setErrorMessage}
        setErrorModalOpen={setErrorModalOpen}
        setRunEffect={setRunEffect}
      />
      <PublishListingModal
        open={publishedListingOpen}
        setOpen={setPublishedListingOpen}
        listingId={publishedListingId}
        setErrorMessage={setErrorMessage}
        setErrorModalOpen={setErrorModalOpen}
        setRunEffect={setRunEffect}
      />
    </>
  );
}

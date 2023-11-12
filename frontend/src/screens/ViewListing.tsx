import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeRequest } from '../utils/axiosHelper';
import { GetSingleListingReturn } from '../types/types';

export default function ViewListing () {
  const { listingId } = useParams();

  const [listingDetails, setListingDetails] = useState({
    listingTitle: '',
    streetAddress: '',
    propertyAmenities: [] as string[],
    city: '',
    state: '',
    postalCode: '',
    price: 0,
    numBathrooms: 0,
    beds: {} as { [key: string]: string },
    thumbnail: '',
    propertyImages: [] as string[],
  });

  const fetchListingDetails = async () => {
    const res = await makeRequest<GetSingleListingReturn>(
      'GET',
      `listings/${listingId}`
    );
    return res;
  };

  useEffect(() => {
    const populateDetails = async () => {
      const res = await fetchListingDetails();
      const listing = res.data.listing;
      console.log(listing);
      setListingDetails((prev) => ({
        ...prev,
        listingTitle: listing.title,
        // streetAddress: listing.address.streetAddress,
        propertyAmenities: listing.metadata.propertyAmenities,
        city: listing.address.city,
        state: listing.address.state,
        postalCode: listing.address.postalCode,
        price: listing.price,
        numBathrooms: listing.metadata.numBathrooms,
        beds: listing.metadata.beds,
        thumbnail: listing.thumbnail,
        propertyImages: listing.metadata.propertyImages,
      }));
    };

    populateDetails();
  }, []);

  const countBeds = (beds: { [key: string]: string }) => {
    return Object.values(beds).reduce(
      (count, value) => count + parseInt(value), 0
    );
  };

  return (
    <div>
      <div>{listingDetails.listingTitle}</div>
      <img src={listingDetails.thumbnail} />
      <div>
        {Object.keys(listingDetails.beds).length} bedroom •{' '}
        {listingDetails.numBathrooms} bathroom •{' '}
        {countBeds(listingDetails.beds)} bed
      </div>
    </div>
  );
}

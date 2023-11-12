import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeRequest } from '../utils/axiosHelper';
import { GetSingleListingReturn } from '../types/types';
import { StarIcon } from '@heroicons/react/24/solid';
import BedCard from '../components/ViewListingComponents/BedCard';

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

  const [featuredImg, setFeaturedImg] = useState('');

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
      setFeaturedImg(listing.thumbnail);
    };

    populateDetails();
  }, []);

  const countBeds = (beds: { [key: string]: string }) => {
    return Object.values(beds).reduce(
      (count, value) => count + parseInt(value),
      0
    );
  };

  const handleClickPropertyImg = (
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    const image = event.currentTarget.src;
    setFeaturedImg(image)
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pt-3 sm:px-12 sm:pt-9 lg:max-w-6xl lg:px-24">
      <h3 className="font-bold text-4xl">{listingDetails.listingTitle}</h3>
      <div className="grid gap-4">
        <div>
          <img
            className="h-auto max-w-full rounded-lg"
            src={featuredImg}
            alt="featured image"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <button>
            <img
              className="h-auto max-w-full rounded-lg"
              src={listingDetails.thumbnail}
              onClick={handleClickPropertyImg}
              alt='property image'
            />
          </button>
          {listingDetails.propertyImages.map((image, idx) => (
            <img
              className="h-auto max-w-full rounded-lg cursor-pointer"
              src={image}
              key={idx}
              onClick={handleClickPropertyImg}
              alt='property image'
            />
          ))}
        </div>
      </div>
      <div className="text-md font-medium">
        {Object.keys(listingDetails.beds).length} bedroom •{' '}
        {listingDetails.numBathrooms} bathroom •{' '}
        {countBeds(listingDetails.beds)} bed
      </div>
      <div className="w-full flex items-center gap-3">
        <StarIcon className="w-5 h-5" />
        <div className="flex gap-1">
          <div>5</div>
          <div>•</div>
          <div className="underline"> 90 reviews</div>
        </div>
      </div>
      <section>
        <h3 className="text-2xl font-medium">Bedrooms</h3>
        {Object.entries(listingDetails.beds).map(([key, value]) => (
          <BedCard key={key} bedroomName={key} bedTotal={value} />
        ))}
      </section>
    </div>
  );
}

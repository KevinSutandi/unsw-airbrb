import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeRequest } from '../utils/axiosHelper';
import { GetSingleListingReturn } from '../types/types';
import { StarIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/20/solid';
import BedCard from '../components/ViewListingComponents/BedCard';
import BookingModal from '../components/ViewListingComponents/BookingModal';
import BookingFooter from '../components/ViewListingComponents/BookingFooter';
import DateModal from '../components/ViewListingComponents/DateModal';
import DateContext from '../components/ViewListingComponents/DateContext';

export default function ViewListing () {
  const { listingId } = useParams();

  const [listingDetails, setListingDetails] = useState({
    listingTitle: '',
    propertyAmenities: [] as string[],
    price: 0,
    numBathrooms: 0,
    address: {
      city: '',
      state: '',
      postalCode: '',
      streetAddress: '',
    },
    beds: {} as { [key: string]: string },
    thumbnail: '',
    propertyImages: [] as string[],
    properyType: '',
  });

  const [featuredImg, setFeaturedImg] = useState('');
  const [combinedImg, setCombinedImg] = useState<string[]>([]);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');

  const closeDateModal = () => {
    setIsDateModalOpen(false);
  };

  const openDateModal = () => {
    setIsDateModalOpen(true);
  };

  const handleCheckinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckinDate(event.target.value);
  };

  const handleCheckoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutDate(event.target.value);
  };

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
      setListingDetails((prev) => ({
        ...prev,
        listingTitle: listing.title,
        propertyAmenities: listing.metadata.propertyAmenities,
        properyType: listing.metadata.propertyType,
        address: {
          city: listing.address.city,
          state: listing.address.state,
          postalCode: listing.address.postalCode,
          streetAddress: listing.address.streetAddress,
        },
        price: listing.price,
        numBathrooms: listing.metadata.numBathrooms,
        beds: listing.metadata.beds,
        thumbnail: listing.thumbnail,
        propertyImages: listing.metadata.propertyImages,
      }));
      setFeaturedImg(listing.thumbnail);
      setCombinedImg([listing.thumbnail, ...listing.metadata.propertyImages]);
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
    setFeaturedImg(image);
  };

  return (
    <DateContext.Provider
      value={{
        checkinDate,
        handleCheckinChange,
        checkoutDate,
        handleCheckoutChange,
      }}
    >
      <div className="xl:mx-auto pt-3 sm:pt-9 xl:max-w-6xl w-full">
        <h3 className="font-bold text-4xl mb-7 px-4">
          {listingDetails.listingTitle}
        </h3>
        <div className="grid gap-4 px-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={featuredImg}
              alt="featured image"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {combinedImg.map((image, idx) => (
              <button key={idx} className="hover: bg-gray-500 rounded-lg">
                <img
                  className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-25"
                  src={image}
                  onClick={handleClickPropertyImg}
                  alt="property image"
                />
              </button>
            ))}
          </div>
        </div>
        <section className="xl:flex xl:justify-between mt-10">
          <div>
            <div className="text-md my-5 px-4">
              <h4 className="text-3xl font-medium">
                {listingDetails.properyType} in {listingDetails.address.city},{' '}
                {listingDetails.address.state}
              </h4>
              {Object.keys(listingDetails.beds).length} bedroom •{' '}
              {listingDetails.numBathrooms} bathroom •{' '}
              {countBeds(listingDetails.beds)} bed
            </div>
            <div className="w-full flex items-center gap-3 text-lg px-4">
              <StarIcon className="w-5 h-5" />
              <div className="flex gap-1">
                <div>5</div>
                <div>•</div>
                <div className="underline"> 90 reviews</div>
              </div>
            </div>
            <div className="w-full flex items-center gap-3 mb-5 text-lg px-4 border-b border-black pb-10">
              <MapPinIcon className="w-5 h-5" />
              <div>
                {listingDetails.address.streetAddress},{' '}
                {listingDetails.address.postalCode},{' '}
                {listingDetails.address.city}, {listingDetails.address.state}
              </div>
            </div>
            <section className="border-b border-b-black pb-10 px-4">
              <h3 className="text-2xl font-medium mb-5">Bedrooms</h3>
              {Object.entries(listingDetails.beds).map(([key, value]) => (
                <BedCard key={key} bedroomName={key} bedTotal={value} />
              ))}
            </section>
            <section className='px-4'>
              <h3>Amenities</h3>
              <ul className="list-disc">
                {listingDetails.propertyAmenities.map((amenity, idx) => (
                  <li key={idx}>{amenity}</li>
                ))}
              </ul>
            </section>
          </div>
          <BookingModal price={listingDetails.price} />
        </section>
        <BookingFooter
          price={listingDetails.price}
          openDateModal={openDateModal}
        />
        <DateModal open={isDateModalOpen} onClose={closeDateModal} />
      </div>
    </DateContext.Provider>
  );
}

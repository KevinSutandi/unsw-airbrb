import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeRequest } from '../utils/axiosHelper';
import { Availability, GetSingleListingReturn } from '../types/types';
import { StarIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/20/solid';
import BedCard from '../components/ViewListingComponents/BedCard';
import BookingModal from '../components/ViewListingComponents/BookingModal';
import BookingFooter from '../components/ViewListingComponents/BookingFooter';
import DateModal from '../components/ViewListingComponents/DateModal';
import DateContext from '../components/ViewListingComponents/DateContext';
import { Nullable } from 'primereact/ts-helpers';
import { getToken } from '../utils/auth';
import { AxiosError } from 'axios';
import BookConfirmation from '../components/ViewListingComponents/BookConfirmation';

export const calculateDifferenceInDays = (
  date1: Nullable<Date>,
  date2: Nullable<Date>
) => {
  if (!date1 || !date2) {
    return 0;
  }
  const differenceInMilliseconds = date2.getTime() - date1.getTime();
  return Math.round(differenceInMilliseconds / (24 * 60 * 60 * 1000));
};

export default function ViewListing () {
  const { listingId } = useParams();

  const [listingDetails, setListingDetails] = useState({
    owner: '',
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
    availability: [] as Availability[],
  });

  const [featuredImg, setFeaturedImg] = useState('');
  const [combinedImg, setCombinedImg] = useState<string[]>([]);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const [checkinDate, setCheckinDate] = useState<Nullable<Date>>(null);
  const [checkoutDate, setCheckoutDate] = useState<Nullable<Date>>(null);
  const [isBookConfirmationOpen, setIsBookConfirmationOpen] = useState(false);

  const closeDateModal = () => {
    setIsDateModalOpen(false);
  };

  const openDateModal = () => {
    setIsDateModalOpen(true);
  };

  const closeBookConfirmation = () => {
    setIsBookConfirmationOpen(false);
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
        owner: listing.owner,
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
        availability: listing.availability,
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

  const dateToString = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // getMonth() returns 0-11
    const day = dateObj.getDate();

    // Pad the month and day with leading zeros if necessary
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const dayStr = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${monthStr}-${dayStr}`;
  };

  const handleBook = async () => {
    const token = getToken();
    if (token) {
      const body = {
        dateRange: {
          from: dateToString(checkinDate as Date),
          to: dateToString(checkoutDate as Date),
        },
        totalPrice:
          listingDetails.price *
          calculateDifferenceInDays(checkinDate, checkoutDate),
      };
      console.log({ token, ...body }, listingId, token);
      try {
        await makeRequest('POST', `bookings/new/${listingId}`, {
          token,
          ...body,
        });
        setIsBookConfirmationOpen(true);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.message);
        }
        console.error(error);
      }
    }
  };

  return (
    <DateContext.Provider
      value={{
        checkinDate,
        setCheckinDate,
        checkoutDate,
        setCheckoutDate,
        availability: listingDetails.availability,
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
          <div className="xl:max-w-2xl">
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
            <section className="px-4">
              <h3>Amenities</h3>
              <ul className="list-disc">
                {listingDetails.propertyAmenities.map((amenity, idx) => (
                  <li key={idx}>{amenity}</li>
                ))}
              </ul>
            </section>
          </div>
          <BookingModal
            price={listingDetails.price}
            handleBook={handleBook}
            owner={listingDetails.owner}
            listingId={listingId as string}
          />
        </section>
        <BookingFooter
          price={listingDetails.price}
          openDateModal={openDateModal}
          handleBook={handleBook}
          owner={listingDetails.owner}
          listingId={listingId as string}
        />
        <DateModal open={isDateModalOpen} onClose={closeDateModal} />
        <BookConfirmation
          open={isBookConfirmationOpen}
          onClose={closeBookConfirmation}
        />
      </div>
    </DateContext.Provider>
  );
}

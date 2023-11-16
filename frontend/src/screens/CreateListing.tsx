import React, { useState, ChangeEvent, useEffect } from 'react';
import TextForm from '../components/Forms/TextForm';
import NumberForm from '../components/Forms/NumberForm';
import BedIcon from '../assets/double-bed-icon.svg';
import { PhotoIcon } from '@heroicons/react/24/solid';
import {
  BedroomFormState,
  Country,
  CreateListingProps,
  PropertyListing,
  PropertyType,
} from '../types/types';
import TypeList from '../components/Forms/TypeList';
import TypeCountry from '../components/Forms/TypeCountry';
import fileToBase64 from '../utils/fileToData';
import { makeRequest } from '../utils/axiosHelper';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import axios from 'axios';
import CreateBreadcrumbs from '../components/CreateListingComponents/Modals/CreateBreadcrumbs';

export default function CreateListing ({
  setErrorMessage,
  setErrorModalOpen,
}: CreateListingProps) {
  // For Property Type
  const defaultSelection: PropertyType = { id: '', name: 'Select a type' };
  const [selectedType, setSelectedType] = useState(defaultSelection);

  // For Country
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [state, setState] = useState<BedroomFormState>({
    numBedrooms: 0,
    beds: [],
  });

  const [formValues, setFormValues] = useState({
    listingTitle: '',
    streetAddress: '',
    propertyAmenities: [] as string[],
    city: '',
    state: '',
    postalCode: '',
    price: 0,
    numBathrooms: 0,
    beds: {} as { [key: string]: string },
  });

  const [formErrors, setFormErrors] = useState({
    listingTitle: '',
    streetAddress: '',
    propertyAmenities: '',
    selectedType: '',
    selectedCountry: '',
    selectedState: '',
    city: '',
    postalCode: '',
    price: '',
    numBathrooms: '',
    numBedrooms: '',
    beds: {} as { [key: string]: string },
    uploadImage: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (token === 'null') {
      navigate('/');
      setErrorMessage("Cannot access 'My Listings' Page when not logged in");
      setErrorModalOpen(true);
    }
  }, []);

  function scrollToTop () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleSubmitBackend = (body: PropertyListing) => {
    const token = getToken() as string;
    if (token !== 'null') {
      console.log(body);

      makeRequest('POST', 'listings/new', { token, ...body })
        .then(() => {
          navigate('/listings');
        })
        .catch((error) => {
          console.error(error);
          if (axios.isAxiosError(error)) {
            if (error.response?.data) {
              setErrorMessage(
                'Error creating listing: ' + error.response.data.error
              );
            }
          } else {
            setErrorMessage('An unexpected error occurred.');
          }
          setErrorModalOpen(true);
        });
    } else {
      navigate('/');
      setErrorMessage('Cannot create new listing when not logged in');
      setErrorModalOpen(true);
    }
  };

  const handleNumBedroomsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setState({
      ...state,
      numBedrooms: value,
      beds: Array.from({ length: value }, (_, index) => ({
        name: `Bedroom ${index + 1}`,
        id: `bed_${index + 1}`,
      })),
    });

    // Create an object for bed-related errors
    const bedErrors: { [key: string]: string } = {};
    state.beds.forEach((bed) => {
      bedErrors[bed.id] = '';
    });

    setFormErrors({
      ...formErrors,
      numBedrooms: '', // Clear the error for numBedrooms
      beds: bedErrors, // Reset bed-related errors
    });

    handleInputChange(event);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, id, value } = event.target;

    if (id.includes('bed')) {
      // Handle bed-related input
      setFormValues({
        ...formValues,
        beds: {
          ...formValues.beds,
          [id]: value,
        },
      });
    } else if (name === 'propertyAmenities') {
      const amenitiesArray = value.split(',').map((amenity) => amenity.trim());

      setFormValues({
        ...formValues,
        propertyAmenities: amenitiesArray,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Input validation logic goes here
    const errors = {
      listingTitle: '',
      streetAddress: '',
      propertyAmenities: '',
      selectedType: '',
      selectedCountry: '',
      selectedState: '',
      city: '',
      postalCode: '',
      price: '',
      numBathrooms: '',
      numBedrooms: '',
      beds: {} as { [key: string]: string },
      uploadImage: '',
    };

    // Check for errors in bed-related inputs
    state.beds.forEach((bed) => {
      if (!formValues.beds[bed.id]) {
        errors.beds[bed.id] = 'error';
      }
    });

    // Check for errors in other regular inputs
    if (!formValues.listingTitle) {
      errors.listingTitle = 'Listing Title is required.';
    }
    if (!formValues.streetAddress) {
      errors.streetAddress = 'Street Address is required.';
    }
    if (!formValues.city) {
      errors.city = 'City is required.';
    }
    if (formValues.propertyAmenities.length === 0) {
      errors.propertyAmenities = 'Property Amenities is required.';
    }
    if (selectedType.id === '') {
      errors.selectedType = 'Property Type is required.';
    }
    if (selectedCountry === null) {
      errors.selectedCountry = 'Country is required.';
    }
    if (formValues.state === '') {
      errors.selectedState = 'State is required.';
    }
    if (!formValues.postalCode) {
      errors.postalCode = 'Postal Code is required.';
    }
    if (!formValues.price) {
      errors.price = 'Price is required.';
    }
    if (!formValues.numBathrooms) {
      errors.numBathrooms = 'Number of Bathrooms is required';
    }
    if (!state.numBedrooms) {
      errors.numBedrooms = 'Number of Bedrooms is required';
    }
    if (selectedFile === null) {
      errors.uploadImage = 'Image is required.';
    }

    // Check if there are errors in bed-related inputs
    const bedErrors = Object.values(errors.beds);
    const hasBedErrors = bedErrors.some((error) => error !== '');

    // Check if there are any errors in regular inputs
    const regularErrors = Object.values(errors).slice(0, 2); // Modify the slice range according to your regular input fields
    const hasRegularErrors = regularErrors.some((error) => error !== '');

    if (hasBedErrors || hasRegularErrors) {
      // There are errors; set the errors state and scroll to the top
      setFormErrors(errors);
      console.log(errors);

      scrollToTop();
    } else {
      // No errors, proceed with form submission
      setFormErrors(errors); // Clear any previous errors
      // Create the body of the request
      if (selectedFile !== null) {
        fileToBase64(selectedFile)
          .then((base64) => {
            const body = {
              title: formValues.listingTitle,
              address: {
                streetAddress: formValues.streetAddress,
                city: formValues.city,
                state: formValues.state,
                country: selectedCountry?.name,
                postalCode: formValues.postalCode,
              },
              price: formValues.price,
              thumbnail: base64,
              metadata: {
                propertyType: selectedType.name,
                numBathrooms: formValues.numBathrooms,
                numBedrooms: state.numBedrooms,
                beds: formValues.beds,
                propertyAmenities: formValues.propertyAmenities,
                propertyImages: [],
              },
            };
            handleSubmitBackend(body);
          })
          .catch((error) => {
            setErrorMessage(error.toString());
            setErrorModalOpen(true);
          });
      }
    }
  };

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 pt-3 sm:px-12 sm:pt-9 lg:max-w-6xl lg:px-24">
        <CreateBreadcrumbs />
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Create Listing
          </h2>
        </div>
      </div>
      <form
        className="mx-auto max-w-4xl px-4 sm:px-12 lg:px-24"
        onSubmit={handleFormSubmit}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-4">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="listing-title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Listing Title
                </label>
                <div className="mt-2">
                  <TextForm
                    name="listingTitle"
                    id="listing-title"
                    value={formValues.listingTitle}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                {formErrors.listingTitle && (
                  <p className="text-red-600 text-sm">
                    {formErrors.listingTitle}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="listing-title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Property Type
                </label>
                <div className="mt-2" data-cy="property-type">
                  <TypeList

                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                  />
                </div>
                {formErrors.selectedType && (
                  <p className="text-red-600 text-sm">
                    {formErrors.selectedType}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Property Amenities{' '}
                  <span className="text-gray-500 text-xs font-normal">
                    (separated by commas)
                  </span>
                </label>
                <div className="mt-2">
                  <TextForm
                    name="propertyAmenities"
                    id="property-amenities"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                {formErrors.propertyAmenities && (
                  <p className="text-red-600 text-sm">
                    {formErrors.propertyAmenities}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <TextForm
                    name="streetAddress"
                    id="street-address"
                    autoComplete="street-address"
                    value={formValues.streetAddress}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                {formErrors.streetAddress && (
                  <p className="text-red-600 text-sm">
                    {formErrors.streetAddress}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <TextForm
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    value={formValues.city}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                {formErrors.city && (
                  <p className="text-red-600 text-sm">{formErrors.city}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <TextForm
                    name="state"
                    id="state"
                    autoComplete="state"
                    value={formValues.state}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                {formErrors.selectedState && (
                  <p className="text-red-600 text-sm">
                    {formErrors.selectedState}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <TextForm
                    name="postalCode"
                    id="postal-code"
                    autoComplete="postal-code"
                    value={formValues.postalCode}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                {formErrors.postalCode && (
                  <p className="text-red-600 text-sm">
                    {formErrors.postalCode}
                  </p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2" data-cy="country">
                  <TypeCountry
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                  />
                </div>
                {formErrors.selectedCountry && (
                  <p className="text-red-600 text-sm">
                    {formErrors.selectedCountry}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price per night
                </label>
                <div className="flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    $
                  </span>
                  <NumberForm
                    name="price"
                    id="price"
                    min={1}
                    onChange={(event) => handleInputChange(event)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {formErrors.price && (
                  <p className="text-red-600 text-sm">{formErrors.price}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="numBathroomsc"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Number of Bathrooms
                </label>
                <div className="flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                  <NumberForm
                    name="numBathrooms"
                    id="numBathrooms"
                    min={0}
                    onChange={(event) => handleInputChange(event)}
                  />
                </div>
                {formErrors.numBathrooms && (
                  <p className="text-red-600 text-sm">
                    {formErrors.numBathrooms}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="numBedrooms"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Number of Bedrooms
                </label>
                <div className="flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <NumberForm
                    name="numBedrooms"
                    id="numBedrooms"
                    min={0}
                    max={50}
                    onChange={handleNumBedroomsChange}
                  />
                </div>
                {formErrors.numBedrooms && (
                  <p className="text-red-600 text-sm">
                    {formErrors.numBedrooms}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="numBedrooms"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Bed Number Selector
                </label>
                <div className="grid grid-cols-2 p-3 rounded-md border border-dashed border-gray-300 gap-4 h-72 overflow-y-scroll sm:col-span-full lg:grid-cols-4" data-cy='bed-input'>
                  {state.beds.map((bed) => (
                    <div
                      data-cy="bed-input-indiv"
                      key={bed.id}
                      className="rounded-md h-40 ring-1 ring-inset ring-gray-500 px-3 my-2 py-3"
                    >
                      <div className="flex items-center">
                        <img
                          src={BedIcon}
                          alt="Bed Icon"
                          className="h-7 w-7 mr-2"
                        />
                      </div>
                      <label
                        htmlFor={bed.id}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {`${bed.name}`}
                      </label>
                      <label
                        htmlFor={bed.id}
                        className="mt-3 block text-sm font-medium leading-6 text-gray-900"
                      >
                        {'Number of beds'}
                      </label>
                      <div>
                        <NumberForm
                          name={bed.name}
                          id={bed.id}
                          min={0}
                          max={50}
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                            formErrors.beds[bed.id] === 'error'
                              ? 'ring-red-600'
                              : 'ring-gray-300'
                          } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6`}
                          onChange={(e) => handleInputChange(e)} // Pass the input name as an argument
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div
                  className={`mt-2 flex justify-center rounded-lg border border-dashed ${
                    !formErrors.uploadImage
                      ? ' border-gray-900/25'
                      : 'border-red-600'
                  } px-6 py-10`}
                >
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {selectedFile
                      ? (
                      <p className="text-xs leading-5 text-gray-600" data-cy="file-name">
                        Selected file: {selectedFile.name}
                      </p>
                        )
                      : (
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, up to 10MB
                      </p>
                        )}
                  </div>
                </div>
                {formErrors.uploadImage && (
                  <p className="text-red-600 text-sm">
                    {formErrors.uploadImage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <button name="create-listing-button" className="w-full my-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
          Create Listing
        </button>
      </form>
    </>
  );
}

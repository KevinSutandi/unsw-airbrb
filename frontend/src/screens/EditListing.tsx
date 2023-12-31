import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import TextForm from '../components/Forms/TextForm';
import TypeList, { propertyTypes } from '../components/Forms/TypeList';
import TypeCountry from '../components/Forms/TypeCountry';
import NumberForm from '../components/Forms/NumberForm';
import {
  BedroomFormState,
  Country,
  CreateListingProps,
  EditPropertyListing,
  FormValues,
  GetSingleListingReturn,
  PropertyType,
} from '../types/types';
import fileToBase64 from '../utils/fileToData';
import BedIcon from '../assets/double-bed-icon.svg';
import { makeRequest } from '../utils/axiosHelper';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import PropertyImage from '../components/Forms/PropertyImage';
import Breadcrumb from '../components/EditListingComponents/EditBreadcrumbs';

export default function EditListing ({
  setErrorMessage,
  setErrorModalOpen,
  setRunEffect
}: CreateListingProps) {
  const { id } = useParams();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  // For Property Type
  const defaultSelection: PropertyType = { id: '', name: 'Select a type' };
  const [selectedType, setSelectedType] = useState(defaultSelection);

  // For Country
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [state, setState] = useState<BedroomFormState>({
    numBedrooms: 0,
    beds: [],
  });

  const [selectedThumbnail, setSelectedThumbnail] = useState('');

  const [propertyImages, setPropertyImages] = useState<string[]>([]);

  const [formValues, setFormValues] = useState({
    listingTitle: '',
    streetAddress: '',
    propertyAmenities: [] as string[],
    city: '',
    postalCode: '',
    state: '',
    price: 0,
    numBathrooms: 0,
    propertyImages: [],
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

  // Refs to store initial values when fetched
  const initialFormValues = useRef<FormValues>();
  const initialSelectedType = useRef<PropertyType>();
  const initialState = useRef<BedroomFormState>();
  const initialSelectedCountry = useRef<Country>();
  const initialSelectedThumbnail = useRef<string>();
  const initialPropertyImages = useRef<string[]>();

  useEffect(() => {
    const token = getToken();

    if (token === 'null') {
      navigate('/');
      setErrorMessage("Cannot access 'Edit Listings' Page when not logged in");
      setErrorModalOpen(true);
    } else {
      getListingData(token as string).then((res) => {
        const data = res.data.listing;
        setFormValues((prev) => ({
          ...prev,
          listingTitle: data.title,
          streetAddress: data.address.streetAddress,
          propertyAmenities: data.metadata.propertyAmenities,
          city: data.address.city,
          postalCode: data.address.postalCode,
          price: data.price,
          numBathrooms: data.metadata.numBathrooms,
          beds: data.metadata.beds,
          state: data.address.state,
        }));
        initialFormValues.current = {
          listingTitle: data.title,
          streetAddress: data.address.streetAddress,
          propertyAmenities: data.metadata.propertyAmenities,
          city: data.address.city,
          postalCode: data.address.postalCode,
          price: data.price,
          numBathrooms: data.metadata.numBathrooms,
          beds: data.metadata.beds,
          state: data.address.state,
        };

        const fetchedType = propertyTypes.find(
          (prop) => prop.name === data.metadata.propertyType
        );
        if (fetchedType) {
          setSelectedType(fetchedType);
          initialSelectedType.current = fetchedType;
        }

        setState((prev) => ({
          ...prev,
          numBedrooms: data.metadata.numBedrooms,
          beds: Object.keys(data.metadata.beds).map((key) => {
            const idx = key.split('_')[1];
            const id = key;
            const name = `Bedroom ${idx}`;
            return { id, name };
          }),
        }));
        initialState.current = {
          numBedrooms: data.metadata.numBedrooms,
          beds: Object.keys(data.metadata.beds).map((key) => {
            const idx = key.split('_')[1];
            const id = key;
            const name = `Bedroom ${idx}`;
            return { id, name };
          }),
        };

        setSelectedCountry((prev) => ({ ...prev, name: data.address.country }));
        initialSelectedCountry.current = {
          name: data.address.country as string,
        };
        setSelectedThumbnail(data.thumbnail);
        initialSelectedThumbnail.current = data.thumbnail;

        setPropertyImages(data.metadata.propertyImages);

        // Set the button to be disabled
        setIsSubmitted(false);
        setIsFormChanged(false);
        setIsDataChanged(false);
      });
    }
  }, [isSubmitted]);

  useEffect(() => {
    setIsDataChanged(hasDataChanged());
  }, [selectedType, selectedCountry, selectedThumbnail, propertyImages]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasDataChanged = () => {
    const hasTypeChanged = !_.isEqual(
      selectedType,
      initialSelectedType.current
    );
    const hasCountryChanged =
      selectedCountry?.name !== initialSelectedCountry.current?.name;

    const hasThumbnailChanged =
      selectedThumbnail !== initialSelectedThumbnail.current;

    const hasPropertyImagesChanged = !_.isEqual(
      propertyImages,
      initialPropertyImages.current
    );

    return (
      hasTypeChanged ||
      hasThumbnailChanged ||
      hasCountryChanged ||
      hasPropertyImagesChanged
    );
  };

  const getListingData = async (token: string) => {
    const res = await makeRequest<GetSingleListingReturn>(
      'GET',
      `listings/${id}`,
      { token }
    );

    return res;
  };

  const handleSubmitBackend = (body: EditPropertyListing) => {
    const token = getToken() as string;
    if (token !== 'null') {
      makeRequest('PUT', `listings/${id}`, { token, ...body })
        .then(() => {
          setRunEffect(true);
          setIsSubmitted(true);
        })
        .catch((error) => {
          setErrorMessage('Error creating listing: ' + error);
          setErrorModalOpen(true);
        });
    } else {
      navigate('/');
      setErrorMessage('Cannot edit listing when not logged in');
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const res = await fileToBase64(file);
        setSelectedThumbnail(res);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(String(error));
        }
        setErrorModalOpen(true);
      }
    }
    // setSelectedFile(file || null);
  };

  const deletePropertyImage = (idxToRemove: number) => {
    setPropertyImages((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handlePropertyImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const res = await fileToBase64(file);
        // setSelectedThumbnail(res);
        setPropertyImages((prev) => [...prev, res]);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(String(error));
        }
        setErrorModalOpen(true);
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, id, value } = event.target;

    if (id.includes('bed')) {
      // Handle bed-related input
      setFormValues((prev) => {
        const newValues = {
          ...prev,
          beds: {
            ...prev.beds,
            [id]: value,
          },
        };
        setIsFormChanged(
          !_.isEqual(newValues.beds, initialFormValues.current?.beds)
        );
        return newValues;
      });
    } else if (name === 'propertyAmenities') {
      const amenitiesArray = value
        .split(',')
        .map((amenity) => amenity.trim())
        .filter((amenity) => amenity); // Removes empty string

      setFormValues((prev) => {
        const newValues = { ...prev, propertyAmenities: amenitiesArray };
        // Set save button status
        setIsFormChanged(!_.isEqual(newValues, initialFormValues.current));
        return newValues;
      });
    } else {
      setFormValues((prev) => {
        const newValues = { ...prev, [name]: value };
        // Set save button status
        setIsFormChanged(!_.isEqual(newValues, initialFormValues.current));
        return newValues;
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
    if (!formValues.state) {
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

    // Check if there are errors in bed-related inputs
    const bedErrors = Object.values(errors.beds);
    const hasBedErrors = bedErrors.some((error) => error !== '');

    // Check if there are any errors in regular inputs
    const regularErrors = Object.values(errors).slice(0, 2); // Modify the slice range according to your regular input fields
    const hasRegularErrors = regularErrors.some((error) => error !== '');

    if (hasBedErrors || hasRegularErrors) {
      // There are errors; set the errors state and scroll to the top
      setFormErrors(errors);
      scrollToTop();
    } else {
      // No errors, proceed with form submission
      setFormErrors(errors); // Clear any previous errors
      // Create the body of the request
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
        metadata: {
          propertyType: selectedType.name,
          numBathrooms: formValues.numBathrooms,
          numBedrooms: state.numBedrooms,
          beds: formValues.beds,
          propertyAmenities: formValues.propertyAmenities,
          propertyImages,
        },
        thumbnail: selectedThumbnail,
      };
      handleSubmitBackend(body);
    }
  };
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 pt-3 sm:px-12 sm:pt-9 lg:max-w-6xl lg:px-24 relative">
        <Breadcrumb />
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Edit Listing
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
                <div className="mt-2">
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
                    value={formValues.propertyAmenities.join(', ')}
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
                <div className="mt-2">
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
                    value={formValues.price}
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
                    value={formValues.numBathrooms}
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
                    value={state.numBedrooms}
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
                <div className="grid grid-cols-2 p-3 rounded-md border border-dashed border-gray-300 gap-4 h-72 overflow-y-scroll sm:col-span-full lg:grid-cols-4">
                  {state.beds.map((bed) => (
                    <div
                      key={bed.id}
                      data-cy="bed-input-indiv"
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
                          value={parseInt(formValues.beds[bed.id] || '')}
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
                <div className="flex justify-between">
                  <label className="font-medium text-sm">Property Images</label>
                  <label
                    htmlFor="property-img-upload"
                    className="text-blue-500 text-sm font-medium cursor-pointer"
                  >
                    + Add Image
                  </label>
                  <input
                    type="file"
                    id="property-img-upload"
                    name="property-img-upload"
                    className="sr-only"
                    onChange={handlePropertyImageUpload}
                  />
                </div>
                <div
                  className={`mt-2 justify-center grid grid-cols-3 gap-3 rounded-lg border border-dashed overflow-hidden ${
                    !formErrors.uploadImage
                      ? ' border-gray-900/25'
                      : 'border-red-600'
                  } px-6 py-10`}
                >
                  {propertyImages.map((image, idx) => (
                    <PropertyImage
                      key={idx}
                      src={image}
                      idx={idx}
                      deletePropertyImage={deletePropertyImage}
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-full">
                <div className="flex justify-between">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thumbnail
                  </label>
                  <div>
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-blue-500 text-sm font-medium"
                    >
                      Change Thumbnail
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div
                  className={`mt-2 flex justify-center rounded-lg border border-dashed ${
                    !formErrors.uploadImage
                      ? ' border-gray-900/25'
                      : 'border-red-600'
                  } px-6 py-10`}
                >
                  <div className="text-center">
                    <img
                      className="mx-auto h-full w-full text-gray-300"
                      aria-hidden="true"
                      alt='selected thumbnail'
                      src={selectedThumbnail}
                    />
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
        <button
          disabled={!isFormChanged && !isDataChanged}
          className="w-full my-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md disabled:opacity-40 disabled:bg-blue-500"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}

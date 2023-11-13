var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useEffect } from 'react';
import TextForm from '../components/Forms/TextForm';
import NumberForm from '../components/Forms/NumberForm';
import BedIcon from '../assets/double-bed-icon.svg';
import { PhotoIcon } from '@heroicons/react/24/solid';
import TypeList from '../components/Forms/TypeList';
import TypeCountry from '../components/Forms/TypeCountry';
import fileToBase64 from '../utils/fileToData';
import { makeRequest } from '../utils/axiosHelper';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import axios from 'axios';
export default function CreateListing(_a) {
    var setErrorMessage = _a.setErrorMessage, setErrorModalOpen = _a.setErrorModalOpen;
    // For Property Type
    var defaultSelection = { id: '', name: 'Select a type' };
    var _b = useState(defaultSelection), selectedType = _b[0], setSelectedType = _b[1];
    // For Country
    var _c = useState(null), selectedCountry = _c[0], setSelectedCountry = _c[1];
    var _d = useState(null), selectedFile = _d[0], setSelectedFile = _d[1];
    var _e = useState({
        numBedrooms: 0,
        beds: [],
    }), state = _e[0], setState = _e[1];
    var _f = useState({
        listingTitle: '',
        streetAddress: '',
        propertyAmenities: [],
        city: '',
        state: '',
        postalCode: '',
        price: 0,
        numBathrooms: 0,
        beds: {},
    }), formValues = _f[0], setFormValues = _f[1];
    var _g = useState({
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
        beds: {},
        uploadImage: '',
    }), formErrors = _g[0], setFormErrors = _g[1];
    var navigate = useNavigate();
    useEffect(function () {
        var token = getToken();
        if (token === 'null') {
            navigate('/');
            setErrorMessage("Cannot access 'My Listings' Page when not logged in");
            setErrorModalOpen(true);
        }
    }, []);
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    var handleSubmitBackend = function (body) {
        var token = getToken();
        if (token !== 'null') {
            console.log(body);
            makeRequest('POST', 'listings/new', __assign({ token: token }, body))
                .then(function () {
                navigate('/listings');
            })
                .catch(function (error) {
                var _a;
                console.error(error);
                if (axios.isAxiosError(error)) {
                    if ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) {
                        setErrorMessage('Error creating listing: ' + error.response.data.error);
                    }
                }
                else {
                    setErrorMessage('An unexpected error occurred.');
                }
                setErrorModalOpen(true);
            });
        }
        else {
            navigate('/');
            setErrorMessage('Cannot create new listing when not logged in');
            setErrorModalOpen(true);
        }
    };
    var handleNumBedroomsChange = function (event) {
        var value = parseInt(event.target.value, 10);
        setState(__assign(__assign({}, state), { numBedrooms: value, beds: Array.from({ length: value }, function (_, index) { return ({
                name: "Bedroom ".concat(index + 1),
                id: "bed_".concat(index + 1),
            }); }) }));
        // Create an object for bed-related errors
        var bedErrors = {};
        state.beds.forEach(function (bed) {
            bedErrors[bed.id] = '';
        });
        setFormErrors(__assign(__assign({}, formErrors), { numBedrooms: '', beds: bedErrors }));
        handleInputChange(event);
    };
    var handleFileChange = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        setSelectedFile(file || null);
    };
    var handleInputChange = function (event) {
        var _a, _b;
        var _c = event.target, name = _c.name, id = _c.id, value = _c.value;
        if (id.includes('bed')) {
            // Handle bed-related input
            setFormValues(__assign(__assign({}, formValues), { beds: __assign(__assign({}, formValues.beds), (_a = {}, _a[id] = value, _a)) }));
        }
        else if (name === 'propertyAmenities') {
            var amenitiesArray = value.split(',').map(function (amenity) { return amenity.trim(); });
            setFormValues(__assign(__assign({}, formValues), { propertyAmenities: amenitiesArray }));
        }
        else {
            setFormValues(__assign(__assign({}, formValues), (_b = {}, _b[name] = value, _b)));
        }
    };
    var handleFormSubmit = function (event) {
        event.preventDefault();
        // Input validation logic goes here
        var errors = {
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
            beds: {},
            uploadImage: '',
        };
        // Check for errors in bed-related inputs
        state.beds.forEach(function (bed) {
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
        var bedErrors = Object.values(errors.beds);
        var hasBedErrors = bedErrors.some(function (error) { return error !== ''; });
        // Check if there are any errors in regular inputs
        var regularErrors = Object.values(errors).slice(0, 2); // Modify the slice range according to your regular input fields
        var hasRegularErrors = regularErrors.some(function (error) { return error !== ''; });
        if (hasBedErrors || hasRegularErrors) {
            // There are errors; set the errors state and scroll to the top
            setFormErrors(errors);
            console.log(errors);
            scrollToTop();
        }
        else {
            // No errors, proceed with form submission
            setFormErrors(errors); // Clear any previous errors
            // Create the body of the request
            if (selectedFile !== null) {
                fileToBase64(selectedFile)
                    .then(function (base64) {
                    var body = {
                        title: formValues.listingTitle,
                        address: {
                            streetAddress: formValues.streetAddress,
                            city: formValues.city,
                            state: formValues.state,
                            country: selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.name,
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
                            propertyImages: []
                        },
                    };
                    handleSubmitBackend(body);
                })
                    .catch(function (error) {
                    setErrorMessage(error.toString());
                    setErrorModalOpen(true);
                });
            }
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'mx-auto max-w-4xl px-4 pt-3 sm:px-12 sm:pt-9 lg:max-w-6xl lg:px-24' },
            React.createElement("div", { className: 'flex flex-row justify-between' },
                React.createElement("h2", { className: 'text-2xl font-bold tracking-tight text-gray-900' }, "Create Listing"))),
        React.createElement("form", { className: 'mx-auto max-w-4xl px-4 sm:px-12 lg:px-24', onSubmit: handleFormSubmit },
            React.createElement("div", { className: 'space-y-12' },
                React.createElement("div", { className: 'border-b border-gray-900/10 pb-4' },
                    React.createElement("div", { className: 'mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6' },
                        React.createElement("div", { className: 'sm:col-span-4' },
                            React.createElement("label", { htmlFor: 'listing-title', className: 'block text-sm font-medium leading-6 text-gray-900' }, "Listing Title"),
                            React.createElement("div", { className: 'mt-2' },
                                React.createElement(TextForm, { name: 'listingTitle', id: 'listing-title', value: formValues.listingTitle, onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.listingTitle && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.listingTitle))),
                        React.createElement("div", { className: 'sm:col-span-2' },
                            React.createElement("label", { htmlFor: 'listing-title', className: 'block text-sm font-medium leading-6 text-gray-900' }, "Property Type"),
                            React.createElement("div", { className: 'mt-2' },
                                React.createElement(TypeList, { selectedType: selectedType, setSelectedType: setSelectedType })),
                            formErrors.selectedType && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.selectedType))),
                        React.createElement("div", { className: 'col-span-full' },
                            React.createElement("label", { htmlFor: 'street-address', className: 'block text-sm font-medium leading-6 text-gray-900' },
                                "Property Amenities",
                                ' ',
                                React.createElement("span", { className: 'text-gray-500 text-xs font-normal' }, "(separated by commas)")),
                            React.createElement("div", { className: 'mt-2' },
                                React.createElement(TextForm, { name: 'propertyAmenities', id: 'property-amenities', onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.propertyAmenities && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.propertyAmenities))),
                        React.createElement("div", { className: 'col-span-full' },
                            React.createElement("label", { htmlFor: 'street-address', className: 'block text-sm font-medium leading-6 text-gray-900' }, "Street address"),
                            React.createElement("div", { className: 'mt-2' },
                                React.createElement(TextForm, { name: 'streetAddress', id: 'street-address', autoComplete: 'street-address', value: formValues.streetAddress, onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.streetAddress && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.streetAddress))),
                        React.createElement("div", { className: 'sm:col-span-2 sm:col-start-1' },
                            React.createElement("label", { htmlFor: 'city', className: 'block text-sm font-medium leading-6 text-gray-900' }, "City"),
                            React.createElement("div", { className: 'mt-2' },
                                React.createElement(TextForm, { name: 'city', id: 'city', autoComplete: 'address-level2', value: formValues.city, onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.city && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.city))),
                        React.createElement("div", { className: 'sm:col-span-2' },
                            React.createElement("label", { htmlFor: 'region', className: 'block text-sm font-medium leading-6 text-gray-900' }, "State / Province"),
                            React.createElement("div", { className: 'mt-2' },
                                React.createElement(TextForm, { name: 'state', id: 'state', autoComplete: 'state', value: formValues.state, onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.selectedState && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.selectedState))),
                        React.createElement("div", { className: 'sm:col-span-2' },
                            React.createElement("label", { htmlFor: 'postal-code', className: 'block text-sm font-medium leading-6 text-gray-900' }, "ZIP / Postal code"),
                            React.createElement("div", { className: 'mt-2' },
                                React.createElement(TextForm, { name: 'postalCode', id: 'postal-code', autoComplete: 'postal-code', value: formValues.postalCode, onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.postalCode && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.postalCode))),
                        React.createElement("div", { className: 'sm:col-span-3' },
                            React.createElement("label", { htmlFor: 'country', className: 'block text-sm font-medium leading-6 text-gray-900' }, "Country"),
                            React.createElement("div", { className: 'mt-2' },
                                React.createElement(TypeCountry, { selectedCountry: selectedCountry, setSelectedCountry: setSelectedCountry })),
                            formErrors.selectedCountry && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.selectedCountry))),
                        React.createElement("div", { className: 'sm:col-span-2 sm:col-start-1' },
                            React.createElement("label", { htmlFor: 'price', className: 'block text-sm font-medium leading-6 text-gray-900' }, "Price per night"),
                            React.createElement("div", { className: 'flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md' },
                                React.createElement("span", { className: 'flex select-none items-center pl-3 text-gray-500 sm:text-sm' }, "$"),
                                React.createElement(NumberForm, { name: 'price', id: 'price', min: 1, onChange: function (event) { return handleInputChange(event); }, className: 'block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' })),
                            formErrors.price && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.price))),
                        React.createElement("div", { className: 'sm:col-span-2' },
                            React.createElement("label", { htmlFor: 'numBathroomsc', className: 'block text-sm font-medium leading-6 text-gray-900' }, "Number of Bathrooms"),
                            React.createElement("div", { className: 'flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md' },
                                React.createElement(NumberForm, { name: 'numBathrooms', id: 'numBathrooms', min: 0, onChange: function (event) { return handleInputChange(event); } })),
                            formErrors.numBathrooms && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.numBathrooms))),
                        React.createElement("div", { className: 'sm:col-span-2' },
                            React.createElement("label", { htmlFor: 'numBedrooms', className: 'block text-sm font-medium leading-6 text-gray-900' }, "Number of Bedrooms"),
                            React.createElement("div", { className: 'flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md' },
                                React.createElement(NumberForm, { name: 'numBedrooms', id: 'numBedrooms', min: 0, max: 50, onChange: handleNumBedroomsChange })),
                            formErrors.numBedrooms && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.numBedrooms))),
                        React.createElement("div", { className: 'col-span-full' },
                            React.createElement("label", { htmlFor: 'numBedrooms', className: 'block text-sm font-medium leading-6 text-gray-900 mb-2' }, "Bed Number Selector"),
                            React.createElement("div", { className: 'grid grid-cols-2 p-3 rounded-md border border-dashed border-gray-300 gap-4 h-72 overflow-y-scroll sm:col-span-full lg:grid-cols-4' }, state.beds.map(function (bed) { return (React.createElement("div", { key: bed.id, className: 'rounded-md h-40 ring-1 ring-inset ring-gray-500 px-3 my-2 py-3' },
                                React.createElement("div", { className: 'flex items-center' },
                                    React.createElement("img", { src: BedIcon, alt: 'Bed Icon', className: 'h-7 w-7 mr-2' })),
                                React.createElement("label", { htmlFor: bed.id, className: 'block text-sm font-medium leading-6 text-gray-900' }, "".concat(bed.name)),
                                React.createElement("label", { htmlFor: bed.id, className: 'mt-3 block text-sm font-medium leading-6 text-gray-900' }, 'Number of beds'),
                                React.createElement("div", null,
                                    React.createElement(NumberForm, { name: bed.name, id: bed.id, min: 0, max: 50, className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ".concat(formErrors.beds[bed.id] === 'error'
                                            ? 'ring-red-600'
                                            : 'ring-gray-300', " placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"), onChange: function (e) { return handleInputChange(e); } })))); }))),
                        React.createElement("div", { className: 'col-span-full' },
                            React.createElement("label", { htmlFor: 'thumbnail', className: 'block text-sm font-medium leading-6 text-gray-900' }, "Thumbnail"),
                            React.createElement("div", { className: "mt-2 flex justify-center rounded-lg border border-dashed ".concat(!formErrors.uploadImage
                                    ? ' border-gray-900/25'
                                    : 'border-red-600', " px-6 py-10") },
                                React.createElement("div", { className: 'text-center' },
                                    React.createElement(PhotoIcon, { className: 'mx-auto h-12 w-12 text-gray-300', "aria-hidden": 'true' }),
                                    React.createElement("div", { className: 'mt-4 text-sm leading-6 text-gray-600' },
                                        React.createElement("label", { htmlFor: 'file-upload', className: 'relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500' },
                                            React.createElement("span", null, "Upload a file"),
                                            React.createElement("input", { id: 'file-upload', name: 'file-upload', type: 'file', className: 'sr-only', onChange: handleFileChange }))),
                                    selectedFile
                                        ? (React.createElement("p", { className: 'text-xs leading-5 text-gray-600' },
                                            "Selected file: ",
                                            selectedFile.name))
                                        : (React.createElement("p", { className: 'text-xs leading-5 text-gray-600' }, "PNG, JPG, up to 10MB")))),
                            formErrors.uploadImage && (React.createElement("p", { className: 'text-red-600 text-sm' }, formErrors.uploadImage)))))),
            React.createElement("button", { className: 'w-full my-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md' }, "Create Listing"))));
}
//# sourceMappingURL=CreateListing.js.map
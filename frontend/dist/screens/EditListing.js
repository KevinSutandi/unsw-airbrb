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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import TextForm from '../components/Forms/TextForm';
import TypeList, { propertyTypes } from '../components/Forms/TypeList';
import TypeCountry from '../components/Forms/TypeCountry';
import NumberForm from '../components/Forms/NumberForm';
import fileToBase64 from '../utils/fileToData';
import BedIcon from '../assets/double-bed-icon.svg';
import { makeRequest } from '../utils/axiosHelper';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import PropertyImage from '../components/Forms/PropertyImage';
import Breadcrumb from '../components/EditListingComponents/EditBreadcrumbs';
export default function EditListing(_a) {
    var _this = this;
    var setErrorMessage = _a.setErrorMessage, setErrorModalOpen = _a.setErrorModalOpen, setRunEffect = _a.setRunEffect;
    var id = useParams().id;
    var _b = useState(false), isFormChanged = _b[0], setIsFormChanged = _b[1];
    var _c = useState(false), isDataChanged = _c[0], setIsDataChanged = _c[1];
    var _d = useState(false), isSubmitted = _d[0], setIsSubmitted = _d[1];
    // For Property Type
    var defaultSelection = { id: '', name: 'Select a type' };
    var _e = useState(defaultSelection), selectedType = _e[0], setSelectedType = _e[1];
    // For Country
    var _f = useState(null), selectedCountry = _f[0], setSelectedCountry = _f[1];
    var _g = useState({
        numBedrooms: 0,
        beds: [],
    }), state = _g[0], setState = _g[1];
    var _h = useState(''), selectedThumbnail = _h[0], setSelectedThumbnail = _h[1];
    var _j = useState([]), propertyImages = _j[0], setPropertyImages = _j[1];
    var _k = useState({
        listingTitle: '',
        streetAddress: '',
        propertyAmenities: [],
        city: '',
        postalCode: '',
        state: '',
        price: 0,
        numBathrooms: 0,
        propertyImages: [],
        beds: {},
    }), formValues = _k[0], setFormValues = _k[1];
    var _l = useState({
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
    }), formErrors = _l[0], setFormErrors = _l[1];
    var navigate = useNavigate();
    // Refs to store initial values when fetched
    var initialFormValues = useRef();
    var initialSelectedType = useRef();
    var initialState = useRef();
    var initialSelectedCountry = useRef();
    var initialSelectedThumbnail = useRef();
    var initialPropertyImages = useRef();
    useEffect(function () {
        var token = getToken();
        if (token === 'null') {
            navigate('/');
            setErrorMessage("Cannot access 'Edit Listings' Page when not logged in");
            setErrorModalOpen(true);
        }
        else {
            getListingData(token).then(function (res) {
                var data = res.data.listing;
                setFormValues(function (prev) { return (__assign(__assign({}, prev), { listingTitle: data.title, streetAddress: data.address.streetAddress, propertyAmenities: data.metadata.propertyAmenities, city: data.address.city, postalCode: data.address.postalCode, price: data.price, numBathrooms: data.metadata.numBathrooms, beds: data.metadata.beds, state: data.address.state })); });
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
                var fetchedType = propertyTypes.find(function (prop) { return prop.name === data.metadata.propertyType; });
                if (fetchedType) {
                    setSelectedType(fetchedType);
                    initialSelectedType.current = fetchedType;
                }
                setState(function (prev) { return (__assign(__assign({}, prev), { numBedrooms: data.metadata.numBedrooms, beds: Object.keys(data.metadata.beds).map(function (key) {
                        var idx = key.split('_')[1];
                        var id = key;
                        var name = "Bedroom ".concat(idx);
                        return { id: id, name: name };
                    }) })); });
                initialState.current = {
                    numBedrooms: data.metadata.numBedrooms,
                    beds: Object.keys(data.metadata.beds).map(function (key) {
                        var idx = key.split('_')[1];
                        var id = key;
                        var name = "Bedroom ".concat(idx);
                        return { id: id, name: name };
                    }),
                };
                setSelectedCountry(function (prev) { return (__assign(__assign({}, prev), { name: data.address.country })); });
                initialSelectedCountry.current = {
                    name: data.address.country,
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
    useEffect(function () {
        setIsDataChanged(hasDataChanged());
    }, [selectedType, selectedCountry, selectedThumbnail, propertyImages]);
    var scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    var hasDataChanged = function () {
        var _a;
        var hasTypeChanged = !_.isEqual(selectedType, initialSelectedType.current);
        var hasCountryChanged = (selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.name) !== ((_a = initialSelectedCountry.current) === null || _a === void 0 ? void 0 : _a.name);
        var hasThumbnailChanged = selectedThumbnail !== initialSelectedThumbnail.current;
        var hasPropertyImagesChanged = !_.isEqual(propertyImages, initialPropertyImages.current);
        return (hasTypeChanged ||
            hasThumbnailChanged ||
            hasCountryChanged ||
            hasPropertyImagesChanged);
    };
    var getListingData = function (token) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('GET', "listings/".concat(id), { token: token })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    }); };
    var handleSubmitBackend = function (body) {
        var token = getToken();
        if (token !== 'null') {
            makeRequest('PUT', "listings/".concat(id), __assign({ token: token }, body))
                .then(function () {
                setRunEffect(true);
                setIsSubmitted(true);
            })
                .catch(function (error) {
                setErrorMessage('Error creating listing: ' + error);
                setErrorModalOpen(true);
            });
        }
        else {
            navigate('/');
            setErrorMessage('Cannot edit listing when not logged in');
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
    var handleFileChange = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var file, res, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!file) return [3 /*break*/, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fileToBase64(file)];
                case 2:
                    res = _b.sent();
                    setSelectedThumbnail(res);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    if (error_1 instanceof Error) {
                        setErrorMessage(error_1.message);
                    }
                    else {
                        setErrorMessage(String(error_1));
                    }
                    setErrorModalOpen(true);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var deletePropertyImage = function (idxToRemove) {
        setPropertyImages(function (prev) { return prev.filter(function (_, idx) { return idx !== idxToRemove; }); });
    };
    var handlePropertyImageUpload = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var file, res_1, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!file) return [3 /*break*/, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fileToBase64(file)];
                case 2:
                    res_1 = _b.sent();
                    // setSelectedThumbnail(res);
                    setPropertyImages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [res_1], false); });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    if (error_2 instanceof Error) {
                        setErrorMessage(error_2.message);
                    }
                    else {
                        setErrorMessage(String(error_2));
                    }
                    setErrorModalOpen(true);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleInputChange = function (event) {
        var _a = event.target, name = _a.name, id = _a.id, value = _a.value;
        if (id.includes('bed')) {
            // Handle bed-related input
            setFormValues(function (prev) {
                var _a;
                var _b;
                var newValues = __assign(__assign({}, prev), { beds: __assign(__assign({}, prev.beds), (_a = {}, _a[id] = value, _a)) });
                setIsFormChanged(!_.isEqual(newValues.beds, (_b = initialFormValues.current) === null || _b === void 0 ? void 0 : _b.beds));
                return newValues;
            });
        }
        else if (name === 'propertyAmenities') {
            var amenitiesArray_1 = value
                .split(',')
                .map(function (amenity) { return amenity.trim(); })
                .filter(function (amenity) { return amenity; }); // Removes empty string
            setFormValues(function (prev) {
                var newValues = __assign(__assign({}, prev), { propertyAmenities: amenitiesArray_1 });
                // Set save button status
                setIsFormChanged(!_.isEqual(newValues, initialFormValues.current));
                return newValues;
            });
        }
        else {
            setFormValues(function (prev) {
                var _a;
                var newValues = __assign(__assign({}, prev), (_a = {}, _a[name] = value, _a));
                // Set save button status
                setIsFormChanged(!_.isEqual(newValues, initialFormValues.current));
                return newValues;
            });
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
        var bedErrors = Object.values(errors.beds);
        var hasBedErrors = bedErrors.some(function (error) { return error !== ''; });
        // Check if there are any errors in regular inputs
        var regularErrors = Object.values(errors).slice(0, 2); // Modify the slice range according to your regular input fields
        var hasRegularErrors = regularErrors.some(function (error) { return error !== ''; });
        if (hasBedErrors || hasRegularErrors) {
            // There are errors; set the errors state and scroll to the top
            setFormErrors(errors);
            scrollToTop();
        }
        else {
            // No errors, proceed with form submission
            setFormErrors(errors); // Clear any previous errors
            // Create the body of the request
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
                metadata: {
                    propertyType: selectedType.name,
                    numBathrooms: formValues.numBathrooms,
                    numBedrooms: state.numBedrooms,
                    beds: formValues.beds,
                    propertyAmenities: formValues.propertyAmenities,
                    propertyImages: propertyImages,
                },
                thumbnail: selectedThumbnail,
            };
            handleSubmitBackend(body);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "mx-auto max-w-4xl px-4 pt-3 sm:px-12 sm:pt-9 lg:max-w-6xl lg:px-24 relative" },
            React.createElement(Breadcrumb, null),
            React.createElement("div", { className: "flex flex-row justify-between" },
                React.createElement("h2", { className: "text-2xl font-bold tracking-tight text-gray-900" }, "Edit Listing"))),
        React.createElement("form", { className: "mx-auto max-w-4xl px-4 sm:px-12 lg:px-24", onSubmit: handleFormSubmit },
            React.createElement("div", { className: "space-y-12" },
                React.createElement("div", { className: "border-b border-gray-900/10 pb-4" },
                    React.createElement("div", { className: "mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" },
                        React.createElement("div", { className: "sm:col-span-4" },
                            React.createElement("label", { htmlFor: "listing-title", className: "block text-sm font-medium leading-6 text-gray-900" }, "Listing Title"),
                            React.createElement("div", { className: "mt-2" },
                                React.createElement(TextForm, { name: "listingTitle", id: "listing-title", value: formValues.listingTitle, onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.listingTitle && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.listingTitle))),
                        React.createElement("div", { className: "sm:col-span-2" },
                            React.createElement("label", { htmlFor: "listing-title", className: "block text-sm font-medium leading-6 text-gray-900" }, "Property Type"),
                            React.createElement("div", { className: "mt-2" },
                                React.createElement(TypeList, { selectedType: selectedType, setSelectedType: setSelectedType })),
                            formErrors.selectedType && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.selectedType))),
                        React.createElement("div", { className: "col-span-full" },
                            React.createElement("label", { htmlFor: "street-address", className: "block text-sm font-medium leading-6 text-gray-900" },
                                "Property Amenities",
                                ' ',
                                React.createElement("span", { className: "text-gray-500 text-xs font-normal" }, "(separated by commas)")),
                            React.createElement("div", { className: "mt-2" },
                                React.createElement(TextForm, { name: "propertyAmenities", id: "property-amenities", value: formValues.propertyAmenities.join(', '), onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.propertyAmenities && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.propertyAmenities))),
                        React.createElement("div", { className: "col-span-full" },
                            React.createElement("label", { htmlFor: "street-address", className: "block text-sm font-medium leading-6 text-gray-900" }, "Street address"),
                            React.createElement("div", { className: "mt-2" },
                                React.createElement(TextForm, { name: "streetAddress", id: "street-address", autoComplete: "street-address", value: formValues.streetAddress, onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.streetAddress && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.streetAddress))),
                        React.createElement("div", { className: "sm:col-span-2 sm:col-start-1" },
                            React.createElement("label", { htmlFor: "city", className: "block text-sm font-medium leading-6 text-gray-900" }, "City"),
                            React.createElement("div", { className: "mt-2" },
                                React.createElement(TextForm, { name: "city", id: "city", autoComplete: "address-level2", value: formValues.city, onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.city && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.city))),
                        React.createElement("div", { className: "sm:col-span-2" },
                            React.createElement("label", { htmlFor: "region", className: "block text-sm font-medium leading-6 text-gray-900" }, "State / Province"),
                            React.createElement("div", { className: "mt-2" },
                                React.createElement(TextForm, { name: "state", id: "state", autoComplete: "state", value: formValues.state, onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.selectedState && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.selectedState))),
                        React.createElement("div", { className: "sm:col-span-2" },
                            React.createElement("label", { htmlFor: "postal-code", className: "block text-sm font-medium leading-6 text-gray-900" }, "ZIP / Postal code"),
                            React.createElement("div", { className: "mt-2" },
                                React.createElement(TextForm, { name: "postalCode", id: "postal-code", autoComplete: "postal-code", value: formValues.postalCode, onChange: function (e) { return handleInputChange(e); } })),
                            formErrors.postalCode && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.postalCode))),
                        React.createElement("div", { className: "sm:col-span-3" },
                            React.createElement("label", { htmlFor: "country", className: "block text-sm font-medium leading-6 text-gray-900" }, "Country"),
                            React.createElement("div", { className: "mt-2" },
                                React.createElement(TypeCountry, { selectedCountry: selectedCountry, setSelectedCountry: setSelectedCountry })),
                            formErrors.selectedCountry && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.selectedCountry))),
                        React.createElement("div", { className: "sm:col-span-2 sm:col-start-1" },
                            React.createElement("label", { htmlFor: "price", className: "block text-sm font-medium leading-6 text-gray-900" }, "Price per night"),
                            React.createElement("div", { className: "flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md" },
                                React.createElement("span", { className: "flex select-none items-center pl-3 text-gray-500 sm:text-sm" }, "$"),
                                React.createElement(NumberForm, { name: "price", id: "price", min: 1, value: formValues.price, onChange: function (event) { return handleInputChange(event); }, className: "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" })),
                            formErrors.price && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.price))),
                        React.createElement("div", { className: "sm:col-span-2" },
                            React.createElement("label", { htmlFor: "numBathroomsc", className: "block text-sm font-medium leading-6 text-gray-900" }, "Number of Bathrooms"),
                            React.createElement("div", { className: "flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md" },
                                React.createElement(NumberForm, { name: "numBathrooms", id: "numBathrooms", min: 0, value: formValues.numBathrooms, onChange: function (event) { return handleInputChange(event); } })),
                            formErrors.numBathrooms && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.numBathrooms))),
                        React.createElement("div", { className: "sm:col-span-2" },
                            React.createElement("label", { htmlFor: "numBedrooms", className: "block text-sm font-medium leading-6 text-gray-900" }, "Number of Bedrooms"),
                            React.createElement("div", { className: "flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md" },
                                React.createElement(NumberForm, { name: "numBedrooms", id: "numBedrooms", min: 0, max: 50, value: state.numBedrooms, onChange: handleNumBedroomsChange })),
                            formErrors.numBedrooms && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.numBedrooms))),
                        React.createElement("div", { className: "col-span-full" },
                            React.createElement("label", { htmlFor: "numBedrooms", className: "block text-sm font-medium leading-6 text-gray-900 mb-2" }, "Bed Number Selector"),
                            React.createElement("div", { className: "grid grid-cols-2 p-3 rounded-md border border-dashed border-gray-300 gap-4 h-72 overflow-y-scroll sm:col-span-full lg:grid-cols-4" }, state.beds.map(function (bed) { return (React.createElement("div", { key: bed.id, "data-cy": "bed-input-indiv", className: "rounded-md h-40 ring-1 ring-inset ring-gray-500 px-3 my-2 py-3" },
                                React.createElement("div", { className: "flex items-center" },
                                    React.createElement("img", { src: BedIcon, alt: "Bed Icon", className: "h-7 w-7 mr-2" })),
                                React.createElement("label", { htmlFor: bed.id, className: "block text-sm font-medium leading-6 text-gray-900" }, "".concat(bed.name)),
                                React.createElement("label", { htmlFor: bed.id, className: "mt-3 block text-sm font-medium leading-6 text-gray-900" }, 'Number of beds'),
                                React.createElement("div", null,
                                    React.createElement(NumberForm, { name: bed.name, id: bed.id, min: 0, max: 50, value: parseInt(formValues.beds[bed.id] || ''), className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ".concat(formErrors.beds[bed.id] === 'error'
                                            ? 'ring-red-600'
                                            : 'ring-gray-300', " placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"), onChange: function (e) { return handleInputChange(e); } })))); }))),
                        React.createElement("div", { className: "col-span-full" },
                            React.createElement("div", { className: "flex justify-between" },
                                React.createElement("label", { className: "font-medium text-sm" }, "Property Images"),
                                React.createElement("label", { htmlFor: "property-img-upload", className: "text-blue-500 text-sm font-medium cursor-pointer" }, "+ Add Image"),
                                React.createElement("input", { type: "file", id: "property-img-upload", name: "property-img-upload", className: "sr-only", onChange: handlePropertyImageUpload })),
                            React.createElement("div", { className: "mt-2 justify-center grid grid-cols-3 gap-3 rounded-lg border border-dashed overflow-hidden ".concat(!formErrors.uploadImage
                                    ? ' border-gray-900/25'
                                    : 'border-red-600', " px-6 py-10") }, propertyImages.map(function (image, idx) { return (React.createElement(PropertyImage, { key: idx, src: image, idx: idx, deletePropertyImage: deletePropertyImage })); }))),
                        React.createElement("div", { className: "col-span-full" },
                            React.createElement("div", { className: "flex justify-between" },
                                React.createElement("label", { htmlFor: "thumbnail", className: "block text-sm font-medium leading-6 text-gray-900" }, "Thumbnail"),
                                React.createElement("div", null,
                                    React.createElement("label", { htmlFor: "file-upload", className: "cursor-pointer text-blue-500 text-sm font-medium" }, "Change Thumbnail"),
                                    React.createElement("input", { id: "file-upload", name: "file-upload", type: "file", className: "sr-only", onChange: handleFileChange }))),
                            React.createElement("div", { className: "mt-2 flex justify-center rounded-lg border border-dashed ".concat(!formErrors.uploadImage
                                    ? ' border-gray-900/25'
                                    : 'border-red-600', " px-6 py-10") },
                                React.createElement("div", { className: "text-center" },
                                    React.createElement("img", { className: "mx-auto h-full w-full text-gray-300", "aria-hidden": "true", alt: 'selected thumbnail', src: selectedThumbnail }))),
                            formErrors.uploadImage && (React.createElement("p", { className: "text-red-600 text-sm" }, formErrors.uploadImage)))))),
            React.createElement("button", { disabled: !isFormChanged && !isDataChanged, className: "w-full my-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md disabled:opacity-40 disabled:bg-blue-500" }, "Save Changes"))));
}
//# sourceMappingURL=EditListing.js.map
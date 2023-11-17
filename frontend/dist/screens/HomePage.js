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
import React, { useContext, useEffect, useState } from 'react';
import { makeRequest } from '../utils/axiosHelper';
import { StarIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';
import { AxiosError } from 'axios';
import { NavLink } from 'react-router-dom';
import SortDropdown from '../components/SearchComponents/SortDropdown';
import GlobalContext from '../components/GlobalContext';
import { getEmail, getToken } from '../utils/auth';
// Function to generate star icons based on the average rating
var generateStarIcons = function (averageStars) {
    var starIcons = [];
    var maxRating = 5;
    for (var i = 1; i <= maxRating; i++) {
        if (i <= averageStars) {
            starIcons.push(React.createElement(StarIcon, { key: i, className: 'text-yellow-300 w-5 h-5' }));
        }
        else {
            starIcons.push(React.createElement(StarIcon, { key: i, className: 'text-gray-300 w-5 h-5' }));
        }
    }
    return starIcons;
};
var sortingOptions = [
    { name: 'No Sorting', value: 'none' },
    { name: 'Rating: Low to High', value: 'ratingLowToHigh' },
    { name: 'Rating: High to Low', value: 'ratingHighToLow' },
];
export default function HomePage(_a) {
    var _this = this;
    var products = _a.products, setProducts = _a.setProducts, isFiltered = _a.isFiltered, setIsFiltered = _a.setIsFiltered, runEffect = _a.runEffect, setRunEffect = _a.setRunEffect;
    var globalContextValue = useContext(GlobalContext);
    if (!globalContextValue) {
        throw new Error('Global context undefined');
    }
    var _b = useState(sortingOptions[0]), selected = _b[0], setSelected = _b[1];
    var setFilteredCheckin = globalContextValue.setFilteredCheckin, setFilteredCheckout = globalContextValue.setFilteredCheckout;
    var setAvailableProducts = function (listings) { return __awaiter(_this, void 0, void 0, function () {
        var productsNew, _i, listings_1, listing, response, product, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productsNew = [];
                    _i = 0, listings_1 = listings;
                    _a.label = 1;
                case 1:
                    if (!(_i < listings_1.length)) return [3 /*break*/, 6];
                    listing = listings_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, makeRequest('GET', "listings/".concat(listing.id))];
                case 3:
                    response = _a.sent();
                    product = response.data.listing;
                    if (product.published === false) {
                        return [3 /*break*/, 5]; // Skip to the next iteration if the product is not published
                    }
                    product.id = listing.id;
                    productsNew.push(product);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error fetching data:', error_1);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    // Set the state after all requests are complete
                    // Set all products current user doesn't host
                    setProducts(productsNew);
                    return [2 /*return*/];
            }
        });
    }); };
    var fetchBookings = function () { return __awaiter(_this, void 0, void 0, function () {
        var email_1, token, response, bookings, filteredBookings, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    email_1 = getEmail();
                    token = getToken();
                    if (!email_1 || !token) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, makeRequest('GET', 'bookings', {
                            token: token,
                        })];
                case 1:
                    response = _a.sent();
                    bookings = response.data.bookings;
                    filteredBookings = bookings.filter(function (booking) { return booking.owner === email_1; });
                    return [2 /*return*/, filteredBookings];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error fetching bookings:', error_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getListings = function () { return __awaiter(_this, void 0, void 0, function () {
        var userBookings, response, listings_2, uniqueListingIds_1, ListingWithBookings_1, listingsWithBookings_1, sortedListings, combinedListings, err_1, listing, err_2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 13]);
                    return [4 /*yield*/, fetchBookings()];
                case 1:
                    userBookings = _a.sent();
                    return [4 /*yield*/, makeRequest('GET', 'listings')];
                case 2:
                    response = _a.sent();
                    listings_2 = response.data.listings;
                    if (!userBookings) return [3 /*break*/, 7];
                    uniqueListingIds_1 = new Set();
                    ListingWithBookings_1 = [];
                    // Get all listings that have bookings, ensuring no duplicates
                    userBookings.forEach(function (booking) {
                        var listing = listings_2.find(function (listing) { return listing.id.toString() === booking.listingId; });
                        if (listing && !uniqueListingIds_1.has(listing.id.toString())) {
                            uniqueListingIds_1.add(listing.id.toString());
                            ListingWithBookings_1.push(listing);
                        }
                    });
                    listingsWithBookings_1 = ListingWithBookings_1.map(function (listing) { return listing.id; });
                    sortedListings = listings_2
                        .filter(function (listing) { return !listingsWithBookings_1.includes(listing.id); })
                        .sort(function (a, b) { return a.title.localeCompare(b.title); });
                    combinedListings = __spreadArray(__spreadArray([], ListingWithBookings_1, true), sortedListings, true);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, setAvailableProducts(combinedListings)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    if (err_1 instanceof AxiosError) {
                        console.error('Error setting available products', err_1.message);
                    }
                    else {
                        console.error('Error setting available products');
                    }
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 11];
                case 7:
                    listing = listings_2.sort(function (a, b) { return a.title.localeCompare(b.title); });
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, setAvailableProducts(listing)];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 10:
                    err_2 = _a.sent();
                    if (err_2 instanceof AxiosError) {
                        console.error('Error setting available products', err_2.message);
                    }
                    else {
                        console.error('Error setting available products');
                    }
                    return [3 /*break*/, 11];
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_3 = _a.sent();
                    if (error_3 instanceof AxiosError) {
                        console.error('Error fetching or sorting data:', error_3.message);
                    }
                    else {
                        console.error('Error fetching or sorting data');
                    }
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        setRunEffect(false);
        if (isFiltered === false) {
            getListings();
        }
    }, [isFiltered, runEffect]);
    products.forEach(function (product) {
        var reviews = product.reviews;
        var totalStars = 0;
        reviews.forEach(function (review) {
            totalStars += review.rating;
        });
        var average = totalStars / reviews.length;
        product.averageStars = average;
        product.numReviews = reviews.length;
    });
    function clearFilter() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsFiltered(false);
                        setSelected(sortingOptions[0]);
                        setFilteredCheckin(new Date());
                        setFilteredCheckout(null);
                        return [4 /*yield*/, getListings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: 'bg-white' },
        React.createElement("div", { className: 'mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8' },
            React.createElement("div", { className: 'flex flex-row justify-between items-center' },
                React.createElement("h2", { className: 'text-2xl font-bold tracking-tight text-gray-900' }, "Listings"),
                React.createElement("div", { className: 'flex flex-row gap-3' },
                    React.createElement(SortDropdown, { products: products, setProducts: setProducts, selected: selected, setSelected: setSelected, sortingOptions: sortingOptions }),
                    isFiltered && (React.createElement("button", { onClick: clearFilter, type: 'button', className: 'inline-flex items-center rounded-md ring-1 ring-gray-500 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-1 focus-visible:ring-offset-1 focus-visible:ring-gray-600' },
                        React.createElement(AdjustmentsVerticalIcon, { className: 'h-4 w-4 mr-1', "aria-hidden": 'true' }),
                        "Reset Filters")))),
            React.createElement("div", { className: 'mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8' }, products.length > 0
                ? (products.map(function (product) {
                    return (React.createElement(NavLink, { to: "/listings/view/".concat(product.id), key: product.id, className: 'group relative' },
                        React.createElement("div", { className: 'aspect-h-1 aspect-w-1 w-full h-[400px] overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80' },
                            React.createElement("img", { src: product.thumbnail, alt: product.title, className: 'h-full w-full object-cover object-center lg:h-full lg:w-full' })),
                        React.createElement("div", { className: 'mt-4 flex justify-between' },
                            React.createElement("div", null,
                                React.createElement("h3", { className: 'text-sm text-gray-700' },
                                    React.createElement("p", { className: 'cursor-pointer' },
                                        React.createElement("span", { "aria-hidden": 'true', className: 'absolute inset-0' }),
                                        React.createElement("span", { className: 'font-semibold' }, product.title)))),
                            React.createElement("p", { className: 'text-sm font-bold text-gray-900 underline underline-offset-2' },
                                "$",
                                product.price,
                                React.createElement("span", { className: 'text-sm font-normal text-gray-500' },
                                    ' ',
                                    "per night"))),
                        React.createElement("div", { className: 'flex items-center' },
                            generateStarIcons(product.averageStars),
                            React.createElement("p", { className: 'text-gray-400 text-sm ml-1' },
                                "(",
                                product.numReviews,
                                ")"))));
                }))
                : isFiltered
                    ? (React.createElement("div", { className: 'col-span-full mx-auto text-center flex gap-3 flex-col' },
                        React.createElement("h1", { className: 'font-bold text-md underline text-gray-800' }, "No Results Found"),
                        React.createElement("button", { onClick: clearFilter, type: 'button', className: 'inline-flex items-center rounded-md ring-1 ring-gray-500 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-1 focus-visible:ring-offset-1 focus-visible:ring-gray-600' },
                            React.createElement(AdjustmentsVerticalIcon, { className: 'h-4 w-4 mr-1', "aria-hidden": 'true' }),
                            "Reset Filters")))
                    : (React.createElement("div", { className: 'col-span-full mx-auto text-center' },
                        React.createElement("h1", { className: 'font-bold text-md underline text-gray-800' }, "No Listings Published Currently"),
                        React.createElement("h3", { className: 'text-xs text-gray-500' }, "Check back later")))))));
}
//# sourceMappingURL=HomePage.js.map
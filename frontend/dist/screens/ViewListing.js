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
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeRequest } from '../utils/axiosHelper';
import { StarIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/20/solid';
import BedCard from '../components/ViewListingComponents/BedCard';
import BookingModal from '../components/ViewListingComponents/BookingModal';
import BookingFooter from '../components/ViewListingComponents/BookingFooter';
import DateModal from '../components/ViewListingComponents/DateModal';
import DateContext from '../components/ViewListingComponents/DateContext';
import { getEmail, getToken } from '../utils/auth';
import { AxiosError } from 'axios';
import BookConfirmation from '../components/ViewListingComponents/BookConfirmation';
import AmenitiesList from '../components/ViewListingComponents/AmenitiesList';
import GlobalContext from '../components/GlobalContext';
import ViewListingHeader from '../components/ViewListingComponents/ViewListingHeader';
import ReviewModal from '../components/ViewListingComponents/ReviewModal';
import { differenceInCalendarDays } from 'date-fns';
// TODO: Show chevrons when the showcased pictures exceed 5
export var calculateDifferenceInDays = function (date1, date2) {
    if (!date1 || !date2) {
        return 0;
    }
    return differenceInCalendarDays(date2, date1);
};
export default function ViewListing() {
    var _this = this;
    var listingId = useParams().listingId;
    var _a = useState({
        owner: '',
        listingTitle: '',
        propertyAmenities: [],
        price: 0,
        numBathrooms: 0,
        address: {
            city: '',
            state: '',
            postalCode: '',
            streetAddress: '',
        },
        beds: {},
        thumbnail: '',
        propertyImages: [],
        properyType: '',
        availability: [],
        reviews: [],
    }), listingDetails = _a[0], setListingDetails = _a[1];
    var _b = useState({
        id: '',
        owner: '',
        dateRange: { from: '', to: '' },
        totalPrice: 0,
        listingId: '',
        status: '',
    }), bookingDetails = _b[0], setBookingDetails = _b[1];
    var _c = useState(''), featuredImg = _c[0], setFeaturedImg = _c[1];
    var _d = useState([]), combinedImg = _d[0], setCombinedImg = _d[1];
    var _e = useState(false), isDateModalOpen = _e[0], setIsDateModalOpen = _e[1];
    var _f = useState(false), isReviewModalOpen = _f[0], setIsReviewModalOpen = _f[1];
    var _g = useState(null), checkinDate = _g[0], setCheckinDate = _g[1];
    var _h = useState(null), checkoutDate = _h[0], setCheckoutDate = _h[1];
    var _j = useState(false), isBookConfirmationOpen = _j[0], setIsBookConfirmationOpen = _j[1];
    var _k = useState(''), bookingId = _k[0], setBookingId = _k[1];
    var globalContextValue = useContext(GlobalContext);
    if (!globalContextValue) {
        throw new Error('Global Context Error');
    }
    var filteredCheckin = globalContextValue.filteredCheckin, filteredCheckout = globalContextValue.filteredCheckout;
    // Set the pricing to price per stay if the user uses a date range
    useEffect(function () {
        if (filteredCheckin && filteredCheckout) {
            setCheckinDate(filteredCheckin);
            setCheckoutDate(filteredCheckout);
        }
    }, []);
    var closeDateModal = function () {
        setIsDateModalOpen(false);
    };
    var openDateModal = function () {
        setIsDateModalOpen(true);
    };
    var closeBookConfirmation = function () {
        setIsBookConfirmationOpen(false);
    };
    var openReviewModal = function () {
        setIsReviewModalOpen(true);
    };
    var closeReviewModal = function () {
        setIsReviewModalOpen(false);
    };
    var fetchListingDetails = function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('GET', "listings/".concat(listingId))];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    }); };
    var fetchBookingDetails = function (token, listingId) { return __awaiter(_this, void 0, void 0, function () {
        var res, acceptedBooking;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeRequest('GET', 'bookings', {
                        token: token,
                    })];
                case 1:
                    res = _a.sent();
                    acceptedBooking = res.data.bookings.find(function (booking) {
                        return booking.listingId === listingId &&
                            booking.owner === getEmail() &&
                            booking.status === 'accepted';
                    });
                    if (acceptedBooking) {
                        return [2 /*return*/, acceptedBooking];
                    }
                    return [2 /*return*/, res.data.bookings.find(function (booking) {
                            return booking.listingId === listingId && booking.owner === getEmail();
                        })];
            }
        });
    }); };
    var calculateRating = function (reviewsToCalculate) {
        var total = 0;
        reviewsToCalculate.forEach(function (review) {
            total += review.rating;
        });
        var average = total / reviewsToCalculate.length;
        return parseFloat(average.toFixed(1));
    };
    useEffect(function () {
        var populateDetails = function () { return __awaiter(_this, void 0, void 0, function () {
            var listingRes, listing_1, token, bookingRes_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, fetchListingDetails()];
                    case 1:
                        listingRes = _a.sent();
                        listing_1 = listingRes.data.listing;
                        setListingDetails(function (prev) { return (__assign(__assign({}, prev), { owner: listing_1.owner, listingTitle: listing_1.title, propertyAmenities: listing_1.metadata.propertyAmenities, properyType: listing_1.metadata.propertyType, address: {
                                city: listing_1.address.city,
                                state: listing_1.address.state,
                                postalCode: listing_1.address.postalCode,
                                streetAddress: listing_1.address.streetAddress,
                            }, price: listing_1.price, numBathrooms: listing_1.metadata.numBathrooms, beds: listing_1.metadata.beds, thumbnail: listing_1.thumbnail, propertyImages: listing_1.metadata.propertyImages, availability: listing_1.availability, reviews: listing_1.reviews })); });
                        setFeaturedImg(listing_1.thumbnail);
                        setCombinedImg(__spreadArray([listing_1.thumbnail], listing_1.metadata.propertyImages, true));
                        token = getToken();
                        if (!token) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetchBookingDetails(token, listingId)];
                    case 2:
                        bookingRes_1 = _a.sent();
                        if (bookingRes_1) {
                            setBookingDetails(function (prev) { return (__assign(__assign({}, prev), { id: bookingRes_1.id, owner: bookingRes_1.owner, dateRange: {
                                    from: bookingRes_1.dateRange.from,
                                    to: bookingRes_1.dateRange.to,
                                }, totalPrice: bookingRes_1.totalPrice, listingId: bookingRes_1.listingId, status: bookingRes_1.status })); });
                            setBookingId(bookingRes_1.id);
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('View listing error', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        populateDetails();
    }, [isBookConfirmationOpen, isReviewModalOpen]);
    var countBeds = function (beds) {
        return Object.values(beds).reduce(function (count, value) { return count + parseInt(value); }, 0);
    };
    var handleClickPropertyImg = function (event) {
        var image = event.currentTarget.src;
        setFeaturedImg(image);
    };
    var dateToString = function (dateObj) {
        var year = dateObj.getFullYear();
        var month = dateObj.getMonth() + 1; // getMonth() returns 0-11
        var day = dateObj.getDate();
        // Pad the month and day with leading zeros if necessary
        var monthStr = month < 10 ? "0".concat(month) : "".concat(month);
        var dayStr = day < 10 ? "0".concat(day) : "".concat(day);
        return "".concat(year, "-").concat(monthStr, "-").concat(dayStr);
    };
    var handleBook = function () { return __awaiter(_this, void 0, void 0, function () {
        var token, body, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getToken();
                    if (!token) return [3 /*break*/, 4];
                    body = {
                        dateRange: {
                            from: dateToString(checkinDate),
                            to: dateToString(checkoutDate),
                        },
                        totalPrice: listingDetails.price *
                            calculateDifferenceInDays(checkinDate, checkoutDate),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, makeRequest('POST', "bookings/new/".concat(listingId), __assign({ token: token }, body))];
                case 2:
                    _a.sent();
                    setIsBookConfirmationOpen(true);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    if (error_2 instanceof AxiosError) {
                        console.error(error_2.message);
                    }
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(DateContext.Provider, { value: {
            checkinDate: checkinDate,
            setCheckinDate: setCheckinDate,
            checkoutDate: checkoutDate,
            setCheckoutDate: setCheckoutDate,
            availability: listingDetails.availability,
        } },
        React.createElement("div", { className: "xl:mx-auto pt-3 sm:pt-9 xl:max-w-6xl w-full p-10" },
            React.createElement(ViewListingHeader, { status: bookingDetails.status, openReviewModal: openReviewModal }),
            React.createElement("h3", { className: "font-bold text-4xl mb-7 px-4" }, listingDetails.listingTitle),
            React.createElement("div", { className: "grid gap-4 px-4" },
                React.createElement("div", null,
                    React.createElement("img", { className: "h-auto max-w-full rounded-lg", src: featuredImg, alt: "featured image" })),
                React.createElement("div", { className: "grid grid-cols-4 gap-4" }, combinedImg.map(function (image, idx) { return (React.createElement("button", { key: idx, className: "hover: bg-gray-500 rounded-lg" },
                    React.createElement("img", { className: "h-auto max-w-full rounded-lg cursor-pointer hover:opacity-25", src: image, onClick: handleClickPropertyImg, alt: "property image" }))); }))),
            React.createElement("section", { className: "xl:flex xl:justify-between mt-10" },
                React.createElement("div", { className: "xl:max-w-2xl" },
                    React.createElement("div", { className: "text-md my-5 px-4" },
                        React.createElement("h4", { className: "text-3xl font-medium" },
                            listingDetails.properyType,
                            " in ",
                            listingDetails.address.city,
                            ",",
                            ' ',
                            listingDetails.address.state),
                        Object.keys(listingDetails.beds).length,
                        " bedroom \u2022",
                        ' ',
                        listingDetails.numBathrooms,
                        " bathroom \u2022",
                        ' ',
                        countBeds(listingDetails.beds),
                        " bed"),
                    React.createElement("div", { className: "w-full flex items-center gap-3 text-lg px-4" },
                        React.createElement(StarIcon, { className: "w-5 h-5" }),
                        React.createElement("div", { className: "flex gap-1" },
                            React.createElement("div", null, listingDetails.reviews.length === 0
                                ? 'N/A'
                                : calculateRating(listingDetails.reviews)),
                            React.createElement("div", null, "\u2022"),
                            React.createElement("div", { className: "underline" },
                                listingDetails.reviews.length,
                                " reviews"))),
                    React.createElement("div", { className: "w-full flex items-center gap-3 mb-5 text-lg px-4 border-b border-black pb-10" },
                        React.createElement(MapPinIcon, { className: "w-5 h-5" }),
                        React.createElement("div", null,
                            listingDetails.address.streetAddress,
                            ",",
                            ' ',
                            listingDetails.address.postalCode,
                            ",",
                            ' ',
                            listingDetails.address.city,
                            ", ",
                            listingDetails.address.state)),
                    React.createElement("section", { className: "border-b border-b-black pb-10 px-4" },
                        React.createElement("h3", { className: "text-2xl font-medium mb-5" }, "Bedrooms"),
                        Object.entries(listingDetails.beds).map(function (_a) {
                            var key = _a[0], value = _a[1];
                            return (React.createElement(BedCard, { key: key, bedroomName: key, bedTotal: value }));
                        })),
                    React.createElement("section", { className: "mt-2 p-5" },
                        React.createElement("h3", { className: "text-2xl font-medium mb-2" }, "Amenities"),
                        React.createElement("ul", { className: "flex flex-col gap-2" }, listingDetails.propertyAmenities.map(function (amenity, idx) { return (React.createElement(AmenitiesList, { amenity: amenity, key: idx, idx: idx })); })))),
                React.createElement(BookingModal, { price: listingDetails.price, handleBook: handleBook, owner: listingDetails.owner, listingId: listingId })),
            React.createElement(BookingFooter, { price: listingDetails.price, openDateModal: openDateModal, handleBook: handleBook, owner: listingDetails.owner, listingId: listingId }),
            React.createElement(DateModal, { open: isDateModalOpen, onClose: closeDateModal }),
            React.createElement(BookConfirmation, { open: isBookConfirmationOpen, onClose: closeBookConfirmation }),
            React.createElement(ReviewModal, { open: isReviewModalOpen, onClose: closeReviewModal, bookingId: bookingId, listingId: listingId }))));
}
//# sourceMappingURL=ViewListing.js.map
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
import React, { useEffect, useState } from 'react';
import { makeRequest } from '../utils/axiosHelper';
import { getEmail, getToken } from '../utils/auth';
import { useNavigate, NavLink } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
import DeleteListing from '../components/CreateListingComponents/Modals/DeleteListingModal';
import PublishListingModal from '../components/CreateListingComponents/Modals/PublishListingModal';
var generateStarIcons = function (averageStars) {
    var starIcons = [];
    var maxRating = 5;
    for (var i = 1; i <= maxRating; i++) {
        if (i <= averageStars) {
            starIcons.push(React.createElement(StarIcon, { key: i, className: "text-yellow-300 w-4 h-4" }));
        }
        else {
            starIcons.push(React.createElement(StarIcon, { key: i, className: "text-gray-300 w-4 h-4" }));
        }
    }
    return starIcons;
};
var fetchUserListings = function (token, userEmail) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, makeRequest('GET', 'listings', {
                        token: token,
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.listings.filter(function (listing) { return listing.owner === userEmail; })];
            case 2:
                error_1 = _a.sent();
                console.error('Error fetching data:', error_1);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Define a function to fetch details for a single listing
var fetchListingDetail = function (token, listingId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, makeRequest('GET', "listings/".concat(listingId), { token: token })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_2 = _a.sent();
                console.error('Error fetching listing detail:', error_2);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
export default function HostedListngs(_a) {
    var _this = this;
    var setErrorMessage = _a.setErrorMessage, setErrorModalOpen = _a.setErrorModalOpen;
    var _b = useState([]), myListings = _b[0], setMyListings = _b[1];
    var _c = useState(false), open = _c[0], setOpen = _c[1];
    var _d = useState(0), selectedListingId = _d[0], setSelectedListingId = _d[1];
    var _e = useState(false), runEffect = _e[0], setRunEffect = _e[1];
    var _f = useState(0), publishedListingId = _f[0], setPublishedListingId = _f[1];
    var _g = useState(false), publishedListingOpen = _g[0], setPublishedListingOpen = _g[1];
    var openDeleteListingModal = function (listingId) {
        setSelectedListingId(listingId);
        setOpen(true);
    };
    var openPublishListingModal = function (listingId) {
        setPublishedListingId(listingId);
        setPublishedListingOpen(true);
    };
    var navigate = useNavigate();
    useEffect(function () {
        var fetchUserListingsAndDetails = function (token, userEmail) { return __awaiter(_this, void 0, void 0, function () {
            var userListings, listingIds_1, fetchedListings_1, listingDetails, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetchUserListings(token, userEmail)];
                    case 1:
                        userListings = _a.sent();
                        listingIds_1 = userListings
                            .filter(function (listing) { return listing.owner === userEmail; })
                            .map(function (listing) { return listing.id; });
                        fetchedListings_1 = [];
                        return [4 /*yield*/, Promise.all(listingIds_1.map(function (listingId) { return fetchListingDetail(token, listingId); }))];
                    case 2:
                        listingDetails = _a.sent();
                        listingDetails.forEach(function (listing, index) {
                            if (listing !== null) {
                                var listingDetail = listing.listing;
                                listingDetail.id = listingIds_1[index];
                                var reviews = listingDetail.reviews;
                                var totalStars = reviews.reduce(function (total, review) { return total + review.rating; }, 0);
                                var beds = listingDetail.metadata.beds;
                                // Calculate the total number of beds
                                var totalBeds = 0;
                                for (var bedKey in beds) {
                                    totalBeds += parseInt(beds[bedKey]);
                                }
                                listingDetail.averageStars =
                                    reviews.length !== 0 ? totalStars / reviews.length : 0;
                                listingDetail.numReviews = reviews.length;
                                listingDetail.totalBeds = totalBeds;
                                fetchedListings_1.push(listingDetail);
                            }
                        });
                        setMyListings(fetchedListings_1);
                        setRunEffect(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error fetching data:', error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        var token = getToken();
        if (token === 'null') {
            navigate('/');
            setErrorMessage("Cannot access 'My Listings' Page when not logged in");
            setErrorModalOpen(true);
            return;
        }
        var userEmail = getEmail();
        if (token && userEmail !== null) {
            fetchUserListingsAndDetails(token, userEmail);
        }
    }, [runEffect]);
    var navigateCreate = function () {
        navigate('/listings/create');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8" },
            React.createElement("div", { className: "flex flex-row justify-between" },
                React.createElement("h2", { className: "text-2xl font-bold tracking-tight text-gray-900" }, "My Listings"),
                React.createElement("button", { type: "button", onClick: navigateCreate, className: "inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" }, "Add New Listing")),
            React.createElement("div", { className: "my-3" },
                React.createElement("hr", null),
                React.createElement("ul", { role: "list", className: "divide-y divide-gray-100" }, myListings.map(function (listings) { return (React.createElement("li", { key: listings.id, className: "flex flex-col gap-3 justify-between gap-x-6 py-5 sm:flex-row" },
                    React.createElement("div", { className: "flex min-w-0 gap-x-4" },
                        React.createElement("img", { className: "h-12 w-12 flex-none rounded-full bg-gray-50", src: listings.thumbnail, alt: "" }),
                        React.createElement("div", { className: "min-w-0 flex-auto" },
                            React.createElement("p", { className: "text-sm font-semibold leading-6 text-gray-900 flex flex-row space-x-3 align-middle" },
                                React.createElement("span", null, listings.title),
                                React.createElement("span", { className: "flex flex-row items-center" },
                                    generateStarIcons(listings.averageStars),
                                    React.createElement("span", { className: "text-gray-400 font-medium" },
                                        "\u00A0",
                                        listings.averageStars.toFixed(1),
                                        "\u00A0\u00A0(",
                                        listings.numReviews,
                                        " Reviews)"))),
                            React.createElement("p", { className: "mt-1 truncate text-xs leading-5 text-black font-bold" },
                                React.createElement("span", { className: "font-bold text-gray-500" }, "Property Type:\u00A0"),
                                listings.metadata.propertyType),
                            React.createElement("p", { className: "mt-1 truncate text-xs leading-5 text-black font-bold" },
                                React.createElement("span", { className: "font-bold text-gray-500" }, "Number of Beds:\u00A0"),
                                listings.totalBeds),
                            React.createElement("p", { className: "mt-1 truncate text-xs leading-5 text-black font-bold" },
                                React.createElement("span", { className: "font-bold text-gray-500" }, "Number of Bathrooms:\u00A0"),
                                listings.metadata.numBathrooms),
                            React.createElement("p", { className: "mt-1 truncate text-xs leading-5 text-black font-bold" },
                                React.createElement("span", { className: "font-bold text-gray-500" }, "Current Price:\u00A0"),
                                React.createElement("span", { className: "underline" },
                                    "$",
                                    listings.price),
                                " per night"))),
                    React.createElement("div", { className: "flex flex-row   shrink-0 gap-3 justify-center items-end sm:flex-col" },
                        React.createElement(NavLink, { to: "/listings/edit/".concat(listings.id), type: "button", className: "inline-flex items-center rounded-md ring-1 ring-blue-500 px-3 py-2 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-1 focus-visible:ring-offset-1 focus-visible:ring-blue-600" }, "Edit Listing"),
                        React.createElement("button", { onClick: function () { return openPublishListingModal(listings.id); }, disabled: listings.availability.length !== 0, className: "inline-flex items-center rounded-md ring-1 ring-blue-500 px-3 py-2 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-1 focus-visible:ring-offset-1 focus-visible:ring-blue-600 disabled:opacity-40" }, listings.availability.length === 0
                            ? 'Publish Listing'
                            : 'Published'),
                        React.createElement("button", { type: "button", onClick: function () { return openDeleteListingModal(listings.id); }, className: "inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" }, "Delete Listing")))); })))),
        React.createElement(DeleteListing, { open: open, setOpen: setOpen, listingId: selectedListingId, setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen, setRunEffect: setRunEffect }),
        React.createElement(PublishListingModal, { open: publishedListingOpen, setOpen: setPublishedListingOpen, listingId: publishedListingId, setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen, setRunEffect: setRunEffect })));
}
//# sourceMappingURL=HostedListings.js.map
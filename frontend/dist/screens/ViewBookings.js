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
import { useParams } from 'react-router-dom';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { getToken } from '../utils/auth';
import ViewBookingBreadcrumb from '../components/ViewBookingComponents/ViewBookingBreadcrumbs';
// Define a function to fetch details for a single listing
var fetchListingDetail = function (token, listingId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, makeRequest('GET', "listings/".concat(listingId), { token: token })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_1 = _a.sent();
                console.error('Error fetching listing detail:', error_1);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var fetchBookings = function (token, listingId) { return __awaiter(void 0, void 0, void 0, function () {
    var response, bookings, filteredBookings, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, makeRequest('GET', 'bookings', {
                        token: token,
                    })];
            case 1:
                response = _a.sent();
                bookings = response.data.bookings;
                filteredBookings = bookings.filter(function (booking) { return booking.listingId === listingId.toString(); });
                return [2 /*return*/, filteredBookings];
            case 2:
                error_2 = _a.sent();
                console.error('Error fetching bookings:', error_2);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
function formatDate(dateString) {
    var options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    var formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
}
export default function ViewBookings() {
    var _this = this;
    var _a = useState(null), myListing = _a[0], setMyListing = _a[1];
    var _b = useState(''), uptime = _b[0], setUptime = _b[1];
    var _c = useState(false), runEffect = _c[0], setRunEffect = _c[1];
    var _d = useState([]), myBookings = _d[0], setMyBookings = _d[1];
    var listingId = useParams().listingId;
    var numericListingId = Number(listingId);
    var acceptBooking = function (bookingId) { return __awaiter(_this, void 0, void 0, function () {
        var token, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    token = getToken();
                    if (!token) return [3 /*break*/, 2];
                    return [4 /*yield*/, makeRequest('PUT', "bookings/accept/".concat(bookingId), { token: token })];
                case 1:
                    _a.sent();
                    setRunEffect(true);
                    console.log('Booking Accepted');
                    return [3 /*break*/, 3];
                case 2:
                    console.error('Error accepting booking: no token');
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error accepting booking:', error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var declineBooking = function (bookingId) { return __awaiter(_this, void 0, void 0, function () {
        var token, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    token = getToken();
                    if (!token) return [3 /*break*/, 2];
                    return [4 /*yield*/, makeRequest('PUT', "bookings/decline/".concat(bookingId), { token: token })];
                case 1:
                    _a.sent();
                    setRunEffect(true);
                    console.log('Booking declined');
                    return [3 /*break*/, 3];
                case 2:
                    console.error('Error declining booking: no token');
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error('Error declining booking:', error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var totalProfit = function () {
        var total = 0;
        myBookings.forEach(function (booking) {
            if (booking.status === 'accepted') {
                total += booking.totalPrice;
            }
        });
        return total;
    };
    var totalDaysBooked = function () {
        var total = 0;
        myBookings.forEach(function (booking) {
            if (booking.status === 'accepted') {
                var from = new Date(booking.dateRange.from);
                var to = new Date(booking.dateRange.to);
                var diff = to.getTime() - from.getTime();
                var days = Math.floor(diff / (1000 * 60 * 60 * 24));
                total += days;
            }
        });
        return total;
    };
    useEffect(function () {
        setRunEffect(false);
        var token = getToken();
        if (token) {
            fetchListingDetail(token, numericListingId).then(function (data) {
                if (data) {
                    setMyListing(data.listing);
                    var now = new Date();
                    var created = new Date(data.listing.postedOn);
                    var diff = now.getTime() - created.getTime();
                    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    var hours = Math.floor(diff / (1000 * 60 * 60));
                    var minutes = Math.floor(diff / (1000 * 60));
                    var seconds = Math.floor(diff / 1000);
                    if (days > 0) {
                        setUptime("".concat(days, " days"));
                    }
                    else if (hours > 0) {
                        setUptime("".concat(hours, " hours"));
                    }
                    else if (minutes > 0) {
                        setUptime("".concat(minutes, " minutes"));
                    }
                    else {
                        setUptime("".concat(seconds, " seconds"));
                    }
                    fetchBookings(token, numericListingId)
                        .then(function (data) {
                        if (data) {
                            setMyBookings(data);
                        }
                    })
                        .catch(function (error) {
                        console.error('Error fetching bookings:', error);
                    });
                }
            });
        }
    }, [runEffect]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8' },
            React.createElement(ViewBookingBreadcrumb, null),
            React.createElement("div", { className: 'flex flex-col gap-2' },
                React.createElement("h2", { className: 'text-2xl font-bold tracking-tight text-gray-900' },
                    "View Bookings for ", myListing === null || myListing === void 0 ? void 0 :
                    myListing.title),
                React.createElement("h5", { className: 'text-gray-400 text-sm' },
                    "Booking has been up for",
                    ' ',
                    React.createElement("span", { className: 'font-bold text-gray-800' }, uptime)),
                React.createElement("h5", { className: 'text-gray-400 text-sm' },
                    "Total days booked this year:",
                    ' ',
                    React.createElement("span", { className: 'font-bold text-gray-800' }, totalDaysBooked())),
                React.createElement("h5", { className: 'text-gray-400 text-sm' },
                    "Total Profits this year:",
                    ' ',
                    React.createElement("span", { className: 'font-bold text-gray-800' },
                        "$",
                        totalProfit()))),
            React.createElement("div", { className: 'my-3' },
                React.createElement("hr", null),
                myBookings.length === 0
                    ? (React.createElement("div", { className: 'flex flex-col mt-20 items-center justify-center h-100' },
                        React.createElement(FaceFrownIcon, { className: 'h-10 w-10 text-gray-400' }),
                        React.createElement("p", { className: 'font-bold' }, "No Bookings For Now, Come back later")))
                    : (React.createElement("ul", { role: 'list', className: 'divide-y my-3 divide-gray-100' }, myBookings.map(function (booking) { return (React.createElement("li", { key: booking.id, className: 'flex flex-col rounded-xl my-3 p-3 gap-3 justify-between gap-x-6 py-5 sm:flex-row' },
                        React.createElement("div", { className: 'flex flex-col' },
                            React.createElement("span", null,
                                "Booking by:",
                                ' ',
                                React.createElement("span", { className: 'font-bold' }, booking.owner)),
                            React.createElement("span", null,
                                "Status:",
                                ' ',
                                React.createElement("span", { className: "".concat(booking.status === 'pending'
                                        ? 'text-yellow-500' // or any other yellow color class
                                        : booking.status === 'declined'
                                            ? 'text-red-500' // or any other red color class
                                            : booking.status === 'accepted'
                                                ? 'text-green-500' // or any other green color class
                                                : '' // default or other status
                                    , " font-bold") }, booking.status.charAt(0).toUpperCase() +
                                    booking.status.slice(1).toLowerCase())),
                            React.createElement("span", { className: 'text-sm font-bold text-gray-400' },
                                "From: ",
                                formatDate(booking.dateRange.from)),
                            React.createElement("span", { className: 'text-sm font-bold text-gray-400' },
                                "To: ",
                                formatDate(booking.dateRange.to))),
                        React.createElement("span", null,
                            "Total Price:",
                            ' ',
                            React.createElement("span", { className: 'font-bold' },
                                "$",
                                booking.totalPrice)),
                        booking.status === 'pending' && (React.createElement("div", { className: 'flex flex-col gap-2' },
                            React.createElement("button", { type: 'button', name: 'accept-booking', onClick: function () { return acceptBooking(booking.id); }, className: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' }, "Accept"),
                            React.createElement("button", { type: 'button', name: 'decline-booking', onClick: function () { return declineBooking(booking.id); }, className: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500' }, "Decline"))))); })))))));
}
//# sourceMappingURL=ViewBookings.js.map
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
import { Popover, Tab, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useState } from 'react';
import SearchForm from './SearchComponents/SearchBar';
import MinMaxCounter from './SearchComponents/MinMaxCounter';
import { differenceInCalendarDays, startOfToday } from 'date-fns';
import CheckInOut from './SearchComponents/CheckInOut';
import NumberForm from './Forms/NumberForm';
import { makeRequest } from '../utils/axiosHelper';
export default function Dropdown(_a) {
    var products = _a.products, setProducts = _a.setProducts, setIsFiltered = _a.setIsFiltered;
    function classNames() {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        return classes.filter(Boolean).join(' ');
    }
    var _b = useState(0), min = _b[0], setMin = _b[1];
    var _c = useState(0), max = _c[0], setMax = _c[1];
    var _d = useState(0), minPrice = _d[0], setMinPrice = _d[1];
    var _e = useState(0), maxPrice = _e[0], setMaxPrice = _e[1];
    var today = startOfToday();
    var _f = useState(today), checkIn = _f[0], setCheckIn = _f[1];
    var _g = useState(today), checkOut = _g[0], setCheckOut = _g[1];
    var _h = useState([]), detailedListings = _h[0], setDetailedListings = _h[1];
    useEffect(function () {
        getDetailedListings();
    }, []);
    // Get all listings and with details
    function getDetailedListings() {
        return __awaiter(this, void 0, void 0, function () {
            var res, listings, detailedListings;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest('GET', 'listings')];
                    case 1:
                        res = _a.sent();
                        listings = res.data.listings;
                        detailedListings = [];
                        listings.forEach(function (listing) { return __awaiter(_this, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, makeRequest('GET', "listings/".concat(listing.id))];
                                    case 1:
                                        res = _a.sent();
                                        detailedListings.push(res.data.listing);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        setDetailedListings(detailedListings);
                        return [2 /*return*/];
                }
            });
        });
    }
    // Function for filtering products based on the price range
    function filterPriceRange() {
        var filteredProducts = products.filter(function (product) { return product.price >= minPrice && product.price <= maxPrice; });
        setProducts(filteredProducts);
    }
    // Function for filtering products based on the number of bedrooms (Get number of bedrooms from the single listing)
    function filterBedrooms() {
        getDetailedListings();
        var filteredProducts = detailedListings.filter(function (product) {
            return product.metadata.numBedrooms >= min &&
                product.metadata.numBedrooms <= max;
        });
        setProducts(filteredProducts);
    }
    /**
     * The difference in calendar days between checkOut and checkIn dates.
     */
    var difference = differenceInCalendarDays(checkOut, checkIn);
    var categories = {
        'Title / City': 'Title / City',
        Bedrooms: 'Bedrooms',
        'Check In / Check Out': 'Check In / Check Out',
        Price: 'Price',
    };
    return (React.createElement("div", null,
        React.createElement(Popover, { className: 'relative' }, function (_a) {
            var open = _a.open;
            return (React.createElement(React.Fragment, null,
                React.createElement(Popover.Button, { className: 'border-1 w-full ring-1 ring-gray-500 md:w-auto py-2 rounded-full shadow-md hover:shadow-lg transition cursor-pointer' },
                    React.createElement("div", { className: 'flex flex-row item-center justify-between' },
                        React.createElement("div", { className: 'text-gray-900 flex flex-row gap-3 items-center text-xs md:text-base px-4' },
                            React.createElement(MagnifyingGlassIcon, { className: 'h-4 w-4 md:h-5 md:w-5 inline-block' }),
                            ' ',
                            "Search by category"),
                        React.createElement(Transition, { as: Fragment, enter: 'transition ease-out duration-200', enterFrom: 'opacity-0 translate-y-1', enterTo: 'opacity-100 translate-y-0', leave: 'transition ease-in duration-150', leaveFrom: 'opacity-100 translate-y-0', leaveTo: 'opacity-0 translate-y-1' }, open
                            ? (React.createElement("div", { className: 'fixed z-40 inset-0 bg-gray-500 bg-opacity-50 transition-opacity' }))
                            : (React.createElement("div", null))))),
                React.createElement(Transition, { as: Fragment, enter: 'transition ease-out duration-200', enterFrom: 'opacity-0 translate-y-1', enterTo: 'opacity-100 translate-y-0', leave: 'transition ease-in duration-150', leaveFrom: 'opacity-100 translate-y-0', leaveTo: 'opacity-0 translate-y-1' },
                    React.createElement(Popover.Panel, { className: 'absolute left-1/2 z-50 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl' },
                        React.createElement(Tab.Group, null,
                            React.createElement(Tab.List, { className: 'flex space-x-1 rounded-xl bg-gray-500/90 p-1' }, Object.keys(categories).map(function (category) { return (React.createElement(Tab, { key: category, className: function (_a) {
                                    var selected = _a.selected;
                                    return classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5', 'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2', selected
                                        ? 'bg-white shadow text-blue-700'
                                        : 'text-gray-200 hover:bg-white/[0.12] hover:text-white');
                                } }, category)); })),
                            React.createElement(Tab.Panels, { className: 'mt-2' },
                                React.createElement(Tab.Panel, { key: 'titleCity', className: classNames('rounded-xl bg-white p-5', 'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2') },
                                    React.createElement(SearchForm, { detailedListings: detailedListings, setProducts: setProducts, setIsFiltered: setIsFiltered })),
                                React.createElement(Tab.Panel, { key: 'bedrooms', className: classNames('rounded-xl bg-white p-3', 'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2') },
                                    React.createElement(MinMaxCounter, { min: min, setMin: setMin, max: max, setMax: setMax, detailedListings: detailedListings, setProducts: setProducts, setIsFiltered: setIsFiltered })),
                                React.createElement(Tab.Panel, { key: 'checkInOut', className: classNames('rounded-xl bg-white p-3', 'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2') },
                                    React.createElement(CheckInOut, { checkIn: checkIn, setCheckIn: setCheckIn, checkOut: checkOut, setCheckOut: setCheckOut, difference: difference, detailedListings: detailedListings, setProducts: setProducts, setIsFiltered: setIsFiltered })),
                                React.createElement(Tab.Panel, { key: 'price', className: classNames('rounded-xl bg-white p-3', 'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2') },
                                    React.createElement("div", { className: 'flex flex-col gap-5' },
                                        React.createElement("div", { className: 'flex flex-row items-center justify-between' },
                                            "Minimum Price",
                                            React.createElement("div", { className: 'flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:w-64' },
                                                React.createElement("span", { className: 'flex select-none items-center pl-3 text-gray-500 sm:text-sm' }, "$"),
                                                React.createElement(NumberForm, { name: 'minPrice', id: 'minPrice', min: 0, onChange: function (event) {
                                                        setMinPrice(parseInt(event.target.value));
                                                    }, className: 'block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' }))),
                                        React.createElement("div", { className: 'flex flex-row items-center justify-between' },
                                            "Maximum Price",
                                            React.createElement("div", { className: 'flex rounded-md mt-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:w-64' },
                                                React.createElement("span", { className: 'flex select-none items-center pl-3 text-gray-500 sm:text-sm' }, "$"),
                                                React.createElement(NumberForm, { name: 'maxPrice', id: 'maxPrice', min: minPrice, onChange: function (event) {
                                                        setMaxPrice(parseInt(event.target.value));
                                                    }, className: 'block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' })))),
                                    React.createElement("hr", { className: 'my-5 border-gray-200' }),
                                    React.createElement("button", { className: 'w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md' }, "Search"))))))));
        })));
}
//# sourceMappingURL=Dropdown.js.map
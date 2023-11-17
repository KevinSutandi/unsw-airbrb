import React, { useContext } from 'react';
import DateForm from './DateForm';
import DateContext from './DateContext';
import { calculateDifferenceInDays } from '../../screens/ViewListing';
import { getEmail, getToken } from '../../utils/auth';
import { NavLink } from 'react-router-dom';
import { areDatesValid } from '../../utils/helpers';
export default function BookingModal(_a) {
    var price = _a.price, handleBook = _a.handleBook, owner = _a.owner, listingId = _a.listingId;
    var dateContextValue = useContext(DateContext);
    if (!dateContextValue) {
        throw new Error('Date Context Error');
    }
    var checkinDate = dateContextValue.checkinDate, checkoutDate = dateContextValue.checkoutDate;
    return (React.createElement("div", { className: "hidden xl:block" },
        React.createElement("div", { className: "lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 box-border" },
            React.createElement("div", { className: "rounded-2xl bg-gray-50 py-5 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center shadow-xl px-10" },
                React.createElement("div", { className: "mx-auto" },
                    React.createElement("div", { className: "flex items-baseline gap-2" },
                        React.createElement("h3", { className: "font-bold text-left text-2xl mb-5" },
                            "$",
                            price,
                            " AUD"),
                        React.createElement("p", null, "Per Night")),
                    React.createElement(DateForm, null),
                    owner === getEmail()
                        ? (React.createElement(NavLink, { to: "/listings/edit/".concat(listingId), className: "mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" }, "Edit Listing"))
                        : (React.createElement("button", { onClick: handleBook, name: 'bookNow', disabled: !getToken() || !areDatesValid(checkinDate, checkoutDate), className: "mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-40 disabled:hover:bg-blue-600" }, getToken() ? 'Book Now' : 'Log in to book')),
                    areDatesValid(checkinDate, checkoutDate) && (React.createElement("div", { className: "mt-5 text-lg" },
                        React.createElement("div", { className: "flex justify-between border-black border-b pb-5" },
                            React.createElement("div", { className: "underline" }, "$".concat(price, " X ").concat(calculateDifferenceInDays(checkinDate, checkoutDate), " nights")),
                            React.createElement("div", null, "$".concat(price * calculateDifferenceInDays(checkinDate, checkoutDate), " AUD"))),
                        React.createElement("div", { className: "flex justify-between font-bold text-xl mt-5" },
                            React.createElement("div", null, "Total"),
                            React.createElement("div", { "data-cy": "total-price" }, "$".concat(price * calculateDifferenceInDays(checkinDate, checkoutDate), " AUD"))))))))));
}
//# sourceMappingURL=BookingModal.js.map
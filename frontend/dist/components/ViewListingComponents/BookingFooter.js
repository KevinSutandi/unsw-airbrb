import React, { useContext } from 'react';
import DateContext from './DateContext';
import { getEmail, getToken } from '../../utils/auth';
import { NavLink } from 'react-router-dom';
import { calculateDifferenceInDays } from '../../screens/ViewListing';
import { areDatesValid } from '../../utils/helpers';
export default function BookingFooter(_a) {
    var price = _a.price, openDateModal = _a.openDateModal, handleBook = _a.handleBook, owner = _a.owner, listingId = _a.listingId;
    var contextValue = useContext(DateContext);
    if (!contextValue) {
        throw new Error('DateContext is undefined');
    }
    var checkinDate = contextValue.checkinDate, checkoutDate = contextValue.checkoutDate;
    var formatDate = function (dateString) {
        if (!dateString) {
            return;
        }
        var formattedDate = dateString.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
        return formattedDate;
    };
    return (React.createElement("footer", { className: 'w-full border-t border-black xl:hidden flex justify-between p-5 items-center sticky bottom-0 bg-white left-0' },
        React.createElement("div", null,
            React.createElement("div", { className: 'flex items-baseline gap-2' },
                React.createElement("div", { className: 'font-bold text-2xl' },
                    "$",
                    price,
                    " AUD"),
                React.createElement("p", null, "Per Night")),
            React.createElement("button", { className: 'underline text-lg font-semibold', onClick: openDateModal }, checkinDate === null || checkoutDate === null
                ? 'Select Dates'
                : "".concat(formatDate(checkinDate), " - ").concat(formatDate(checkoutDate))),
            areDatesValid(checkinDate, checkoutDate)
                ? (React.createElement("div", { className: 'flex gap-2 font-bold items-baseline text-xl' },
                    React.createElement("div", null, "Total"),
                    React.createElement("div", null, "$".concat(price * calculateDifferenceInDays(checkinDate, checkoutDate), " AUD")),
                    React.createElement("div", { className: 'text-sm font-light' }, "($".concat(price, " X ").concat(calculateDifferenceInDays(checkinDate, checkoutDate), " nights)"))))
                : checkinDate !== null || checkoutDate !== null
                    ? (React.createElement("p", { className: 'text-red-500' }, "Checkout date cannot be earlier than check-in date"))
                    : null),
        owner === getEmail()
            ? (React.createElement(NavLink, { to: "/listings/edit/".concat(listingId), className: 'inline-block rounded-md bg-blue-600 px-8 py-4 text-center text-2xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' }, "Edit Listing"))
            : (React.createElement("button", { onClick: handleBook, disabled: !areDatesValid(checkinDate, checkoutDate) || !getToken(), className: 'inline-block rounded-md disabled:opacity-40 disabled:bg-blue-600 bg-blue-600 px-8 py-4 text-center text-2xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' }, getToken() ? 'Book Now' : 'Log in to book'))));
}
//# sourceMappingURL=BookingFooter.js.map
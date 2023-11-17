import React, { useContext } from 'react';
import Calendar from './Calendar';
import { isAfter, isBefore, add } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../GlobalContext';
export default function CheckInOut(_a) {
    var checkIn = _a.checkIn, setCheckIn = _a.setCheckIn, checkOut = _a.checkOut, setCheckOut = _a.setCheckOut, difference = _a.difference, detailedListings = _a.detailedListings, setProducts = _a.setProducts, setIsFiltered = _a.setIsFiltered;
    var navigate = useNavigate();
    function searchByCheckInOut(event) {
        event.preventDefault();
        var filteredProducts = detailedListings.filter(function (listing) {
            var availability = listing.availability;
            // Use Array.some to check if there is any date range that overlaps with the checkIn and checkOut
            return availability.some(function (date) {
                var dateFrom = new Date(date.from);
                var dateTo = new Date(date.to);
                var checkInDate = new Date(checkIn);
                var checkOutDate = new Date(checkOut);
                console.log(listing.title);
                console.log(isAfter(checkInDate, add(dateFrom, { days: -1 })));
                console.log(isBefore(checkOutDate, dateTo));
                return isAfter(checkInDate, add(dateFrom, { days: -1 })) && isBefore(checkOutDate, dateTo);
            });
        });
        navigate('/');
        setProducts(filteredProducts);
        setIsFiltered(true);
    }
    var globalContextValue = useContext(GlobalContext);
    if (!globalContextValue) {
        throw new Error('Global context value not provided');
    }
    var setFilteredCheckin = globalContextValue.setFilteredCheckin, setFilteredCheckout = globalContextValue.setFilteredCheckout;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'flex flex-col p-5 gap-3 justify-center lg:flex-row' },
            React.createElement("div", { className: 'flex flex-col gap-3 justify-center items-center' },
                React.createElement("h1", { className: 'font-bold text-gray-800' }, "Check in"),
                React.createElement(Calendar, { selectedDay: checkIn, setSelectedDay: setCheckIn, setFiltered: setFilteredCheckin })),
            React.createElement("hr", { className: 'border-gray-200 lg:hidden' }),
            React.createElement("div", { className: 'flex flex-col gap-3 justify-center items-center' },
                React.createElement("h1", { className: 'font-bold text-gray-800' }, "Check out"),
                React.createElement(Calendar, { selectedDay: checkOut, setSelectedDay: setCheckOut, checkIn: checkIn, setFiltered: setFilteredCheckout }))),
        React.createElement("div", { className: 'mt-2 text-center' },
            "Searching dates from ",
            checkIn.toLocaleDateString(),
            " to",
            ' ',
            checkOut.toLocaleDateString(),
            " (",
            difference,
            " nights)"),
        React.createElement("hr", { className: 'border-gray-200 my-5' }),
        React.createElement("button", { onClick: searchByCheckInOut, className: 'w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md' }, "Search")));
}
//# sourceMappingURL=CheckInOut.js.map
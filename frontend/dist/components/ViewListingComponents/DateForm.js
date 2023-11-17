import React, { useContext } from 'react';
import DateContext from './DateContext';
import { Calendar } from 'primereact/calendar';
import { areDatesValid } from '../../utils/helpers';
export default function DateForm() {
    var dateContextValue = useContext(DateContext);
    if (!dateContextValue) {
        throw new Error('DateContext is undefined');
    }
    var checkinDate = dateContextValue.checkinDate, checkoutDate = dateContextValue.checkoutDate, setCheckinDate = dateContextValue.setCheckinDate, setCheckoutDate = dateContextValue.setCheckoutDate, availability = dateContextValue.availability;
    var generateDateRange = function (startDate, endDate) {
        var dates = [];
        var currentDate = new Date(startDate);
        var end = new Date(endDate);
        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }
        return dates;
    };
    var availableDates = availability.flatMap(function (elem) {
        return generateDateRange(new Date(elem.from), new Date(elem.to));
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "bg-gray-50 border border-gray-300 text-gray-900 xl:text-sm rounded-lg w-full flex box-border gap-1 text-left justify-between cursor-pointer text-lg" },
            React.createElement("div", { className: "py-2.5 px-2.5" },
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "checkin", className: "cursor-pointer font-medium" }, "CHECK-IN"),
                    React.createElement(Calendar, { value: checkinDate, name: 'checkin', onChange: function (e) { return setCheckinDate(e.value); }, enabledDates: availableDates, minDate: new Date() }))),
            React.createElement("div", null,
                React.createElement("div", { className: "py-2.5 px-2.5" },
                    React.createElement("label", { htmlFor: "checkout", className: "cursor-pointer font-medium" }, "CHECKOUT"),
                    React.createElement(Calendar, { value: checkoutDate, onChange: function (e) { return setCheckoutDate(e.value); }, enabledDates: availableDates, minDate: new Date(), name: 'checkout' })))),
        React.createElement("p", { className: "text-red-500 text-left" }, checkinDate && checkoutDate
            ? areDatesValid(checkinDate, checkoutDate)
                ? ''
                : 'Checkout date cannot be earlier than check-in date'
            : '')));
}
//# sourceMappingURL=DateForm.js.map
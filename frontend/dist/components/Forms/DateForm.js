import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
export default function DateForm(_a) {
    var fromValue = _a.fromValue, toValue = _a.toValue, idx = _a.idx, removeAvailability = _a.removeAvailability, handleDateChange = _a.handleDateChange, errorMessage = _a.errorMessage;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "mt-2 flex justify-between w-full items-center" },
            React.createElement("div", null,
                React.createElement("input", { type: "date", value: fromValue, className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ", placeholder: "Select date", onChange: function (e) { return handleDateChange(idx, 'from', e.target.value); } })),
            React.createElement("div", null, "To"),
            React.createElement("div", null,
                React.createElement("input", { type: "date", value: toValue, className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ", placeholder: "Select date", onChange: function (e) { return handleDateChange(idx, 'to', e.target.value); } })),
            React.createElement("button", { className: "mx-auto flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10", onClick: function () { return removeAvailability(idx); } },
                React.createElement(TrashIcon, { className: "h-6 w-6 text-red-600 hover:opacity-50", "aria-hidden": "true" }))),
        errorMessage && React.createElement("div", { className: "text-red-500 text-sm mt-1" }, errorMessage)));
}
//# sourceMappingURL=DateForm.js.map
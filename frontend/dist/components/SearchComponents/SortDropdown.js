var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
export default function SortDropdown(_a) {
    var products = _a.products, setProducts = _a.setProducts, selected = _a.selected, setSelected = _a.setSelected, sortingOptions = _a.sortingOptions;
    // function to sort products by rating
    var sortProducts = function (value) {
        var sortedProducts = __spreadArray([], products, true);
        if (value.value === 'none') {
            sortedProducts.sort(function (a, b) { return a.title.localeCompare(b.title); });
        }
        if (value.value === 'ratingLowToHigh') {
            sortedProducts.sort(function (a, b) { return a.averageStars - b.averageStars; });
        }
        else if (value.value === 'ratingHighToLow') {
            sortedProducts.sort(function (a, b) { return b.averageStars - a.averageStars; });
        }
        setProducts(sortedProducts);
    };
    var handleChange = function (value) {
        setSelected(value);
        sortProducts(value);
    };
    return (React.createElement(Listbox, { value: selected, onChange: handleChange },
        React.createElement("div", { className: 'relative mt-1 w-48 z-10' },
            React.createElement(Listbox.Button, { className: 'relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm' },
                React.createElement("span", { className: 'block truncate text-xs lg:text-sm' }, selected === null || selected === void 0 ? void 0 : selected.name),
                React.createElement("span", { className: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2' },
                    React.createElement(ChevronUpDownIcon, { className: 'h-5 w-5 text-gray-400', "aria-hidden": 'true' }))),
            React.createElement(Transition, { as: Fragment, leave: 'transition ease-in duration-100', leaveFrom: 'opacity-100', leaveTo: 'opacity-0' },
                React.createElement(Listbox.Options, { className: 'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm' }, sortingOptions.map(function (sortOption) { return (React.createElement(Listbox.Option, { key: sortOption.value, className: function (_a) {
                        var active = _a.active;
                        return "relative cursor-default select-none py-2 pl-10 pr-4 ".concat(active ? 'bg-blue-100 text-blue-900' : 'text-gray-900');
                    }, value: sortOption }, function (_a) {
                    var selected = _a.selected;
                    return (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "block truncate text-sm ".concat(selected ? 'font-medium' : 'font-normal') }, sortOption.name),
                        selected
                            ? (React.createElement("span", { className: 'absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600' },
                                React.createElement(CheckIcon, { className: 'h-5 w-5', "aria-hidden": 'true' })))
                            : null));
                })); }))))));
}
//# sourceMappingURL=SortDropdown.js.map
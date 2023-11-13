import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid';
export var CountryList = function (_a) {
    var selectedCountry = _a.selectedCountry, setSelectedCountry = _a.setSelectedCountry;
    var _b = useState([]), countries = _b[0], setCountries = _b[1];
    var _c = useState(''), query = _c[0], setQuery = _c[1];
    var filteredCountries = query
        ? countries.filter(function (country) {
            return country.name.toLowerCase().includes(query.toLowerCase());
        })
        : countries;
    useEffect(function () {
        // Fetch the list of countries from the REST Countries API
        axios.get('https://restcountries.com/v3.1/all').then(function (response) {
            var countryData = response.data;
            var countryList = countryData.map(function (country) { return ({
                name: country.name.common,
                id: country.name.common,
            }); });
            // Sort the list alphabetically by country name
            var sortedCountries = countryList.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            setCountries(sortedCountries);
        });
    }, []);
    return (React.createElement(Combobox, { value: selectedCountry, onChange: setSelectedCountry },
        React.createElement("div", { className: "relative mt-1 z-10" },
            React.createElement("div", { className: "relative w-full cursor-default overflow-hidden shadow-sm rounded-lg ring-1 ring-gray-300 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 sm:text-sm" },
                React.createElement(Combobox.Input, { className: "w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0", displayValue: function (country) {
                        return country ? country.name : '';
                    }, onChange: function (event) { return setQuery(event.target.value); } }),
                React.createElement(Combobox.Button, { className: "absolute inset-y-0 right-0 flex items-center pr-2" },
                    React.createElement(ChevronUpDownIcon, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" }))),
            React.createElement(Transition, { as: Fragment, leave: "transition ease-in duration-100", leaveFrom: "opacity-100", leaveTo: "opacity-0", afterLeave: function () { return setQuery(''); } },
                React.createElement(Combobox.Options, { className: "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" }, filteredCountries.length === 0 && query !== ''
                    ? (React.createElement("div", { className: "relative cursor-default select-none py-2 px-4 text-gray-700" }, "Nothing found."))
                    : (filteredCountries.map(function (country) { return (React.createElement(Combobox.Option, { key: country.name, className: function (_a) {
                            var active = _a.active;
                            return "relative cursor-default select-none py-2 pl-10 pr-4 ".concat(active ? 'bg-blue-100 text-blue-900' : 'text-gray-900');
                        }, value: country }, function (_a) {
                        var selected = _a.selected, active = _a.active;
                        return (React.createElement(React.Fragment, null,
                            React.createElement("span", { className: "block truncate ".concat(selected ? 'font-medium' : 'font-normal') }, country.name),
                            selected
                                ? (React.createElement("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 ".concat(active ? 'text-white' : 'text-blue-900') },
                                    React.createElement(CheckIcon, { className: "h-5 w-5 text-blue-900", "aria-hidden": "true" })))
                                : null));
                    })); })))))));
};
export default CountryList;
//# sourceMappingURL=TypeCountry.js.map
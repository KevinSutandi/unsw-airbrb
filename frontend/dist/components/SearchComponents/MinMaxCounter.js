import React from 'react';
import Counter from './Counter';
import { useNavigate } from 'react-router-dom';
export default function MinMaxCounter(_a) {
    var min = _a.min, setMin = _a.setMin, max = _a.max, setMax = _a.setMax, detailedListings = _a.detailedListings, setProducts = _a.setProducts, setIsFiltered = _a.setIsFiltered;
    var navigate = useNavigate();
    // Search by minimum and maximum number of beds
    function handleSearchByMinMax(event) {
        event.preventDefault();
        var filteredProducts = detailedListings.filter(function (product) {
            var numBedrooms = product.metadata.numBedrooms;
            return numBedrooms >= min && numBedrooms <= max;
        });
        setProducts(filteredProducts);
        navigate('/');
        setIsFiltered(true);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'flex items-center justify-between' },
            React.createElement("label", { htmlFor: 'min', className: 'text-sm font-medium text-gray-700 mr-3 lg:hidden' }, "Minimum"),
            React.createElement("label", { htmlFor: 'min', className: 'hidden text-md font-medium text-gray-700 mr-3 lg:block' }, "Minimum number of beds"),
            React.createElement(Counter, { count: min, setCount: setMin })),
        React.createElement("div", { className: 'flex items-center mt-10 justify-between' },
            React.createElement("label", { htmlFor: 'max', className: 'text-sm font-medium text-gray-700 mr-3 lg:hidden' }, "Maximum"),
            React.createElement("label", { htmlFor: 'max', className: 'hidden text-md font-medium text-gray-700 mr-3 lg:block' }, "Maximum number of beds"),
            React.createElement(Counter, { count: max, setCount: setMax, min: min })),
        React.createElement("hr", { className: 'my-5 border-gray-200' }),
        React.createElement("button", { onClick: handleSearchByMinMax, className: 'w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md' }, "Search")));
}
//# sourceMappingURL=MinMaxCounter.js.map
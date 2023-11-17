import React from 'react';
import NumberForm from '../Forms/NumberForm';
import { useNavigate } from 'react-router-dom';
export default function PriceFilter(_a) {
    var minPrice = _a.minPrice, setMinPrice = _a.setMinPrice, maxPrice = _a.maxPrice, setMaxPrice = _a.setMaxPrice, detailedListings = _a.detailedListings, setProducts = _a.setProducts, setIsFiltered = _a.setIsFiltered;
    var navigate = useNavigate();
    function handleSearchByMinMax(event) {
        event.preventDefault();
        var filteredProducts = detailedListings.filter(function (product) {
            var price = product.price;
            return price >= minPrice && price <= maxPrice;
        });
        setProducts(filteredProducts);
        navigate('/');
        setIsFiltered(true);
    }
    return (React.createElement(React.Fragment, null,
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
        React.createElement("button", { onClick: handleSearchByMinMax, className: 'w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md' }, "Search")));
}
//# sourceMappingURL=PriceFilter.js.map
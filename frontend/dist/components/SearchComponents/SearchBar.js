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
import React from 'react';
import { useNavigate } from 'react-router-dom';
function SearchForm(_a) {
    var detailedListings = _a.detailedListings, setProducts = _a.setProducts, setIsFiltered = _a.setIsFiltered;
    var navigate = useNavigate();
    console.log(detailedListings);
    var _b = React.useState(false), showError = _b[0], setShowError = _b[1];
    function filterTitleCity(event) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var searchTerm, searchTermsArray, filteredProducts;
            return __generator(this, function (_b) {
                event.preventDefault();
                searchTerm = (_a = document.getElementById('default-search')) === null || _a === void 0 ? void 0 : _a.value.trim();
                if (!searchTerm) {
                    setShowError(true);
                    return [2 /*return*/];
                }
                searchTermsArray = searchTerm.split(' ');
                filteredProducts = detailedListings.filter(function (product) {
                    var title = product.title.toLowerCase();
                    var city = product.address.city.toLowerCase();
                    // Check if all search terms are included in the title or city
                    return searchTermsArray.every(function (term) {
                        return title.includes(term.toLowerCase()) || city.includes(term.toLowerCase());
                    });
                });
                setProducts(filteredProducts);
                setShowError(false);
                navigate('/');
                setIsFiltered(true);
                return [2 /*return*/];
            });
        });
    }
    return (React.createElement("form", null,
        React.createElement("label", { htmlFor: "default-search", className: "mb-2 text-sm font-medium text-gray-900 sr-only" }, "Search"),
        React.createElement("div", { className: "relative" },
            React.createElement("div", { className: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" },
                React.createElement("svg", { className: "w-4 h-4 text-gray-500", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 20" },
                    React.createElement("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" }))),
            React.createElement("input", { type: "search", id: "default-search", className: "block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ", placeholder: "Search by Title or City", required: true }),
            React.createElement("button", { type: "submit", name: 'search', onClick: function (e) { filterTitleCity(e); }, className: "text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" }, "Search")),
        showError && (React.createElement("div", { className: "text-red-500 text-sm mt-2" }, "Please enter a search term"))));
}
export default SearchForm;
//# sourceMappingURL=SearchBar.js.map
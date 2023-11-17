var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/24/outline';
import { getToken } from '../../utils/auth';
import { makeRequest } from '../../utils/axiosHelper';
export default function ReviewModal(_a) {
    var _this = this;
    var open = _a.open, onClose = _a.onClose, listingId = _a.listingId, bookingId = _a.bookingId;
    var cancelButtonRef = useRef(null);
    var _b = useState({
        rating: 1,
        textValue: '',
    }), reviewForm = _b[0], setReviewForm = _b[1];
    var handleSubmitReview = function () { return __awaiter(_this, void 0, void 0, function () {
        var token, body, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getToken();
                    if (!(token && listingId)) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    body = { review: reviewForm };
                    return [4 /*yield*/, makeRequest('PUT', "listings/".concat(listingId, "/review/").concat(bookingId), __assign({ token: token }, body))];
                case 2:
                    _a.sent();
                    onClose(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(Transition.Root, { show: open, as: Fragment },
        React.createElement(Dialog, { as: "div", className: "relative z-10", initialFocus: cancelButtonRef, onClose: onClose },
            React.createElement(Transition.Child, { as: Fragment, enter: "ease-out duration-200", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-300", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                React.createElement("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })),
            React.createElement("div", { className: "fixed inset-0 z-10 flex items-center justify-center" },
                React.createElement(Transition.Child, { as: Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95" },
                    React.createElement(Dialog.Panel, { className: "relative w-full max-w-sm p-6 bg-white rounded-lg shadow-xl" },
                        React.createElement("div", { className: "text-center flex flex-col" },
                            React.createElement(Dialog.Title, { as: "h3", className: "text-2xl font-semibold leading-6 text-gray-900 text-left mb-5" }, "How was your experience?"),
                            React.createElement("div", { className: "flex" }, Array.from({ length: 5 }, function (_, index) { return (React.createElement(StarIcon, { key: index, "data-testid": "star-".concat(index + 1), onClick: function () {
                                    return setReviewForm(function (prev) { return (__assign(__assign({}, prev), { rating: index + 1 })); });
                                }, className: "".concat(index < reviewForm.rating
                                    ? 'fill-yellow-500'
                                    : 'fill-white', " cursor-pointer") })); })),
                            React.createElement("textarea", { className: "w-full h-32 mt-5", placeholder: "Leave a review", value: reviewForm.textValue, onChange: function (e) {
                                    return setReviewForm(function (prev) { return (__assign(__assign({}, prev), { textValue: e.target.value })); });
                                } }),
                            React.createElement("button", { onClick: handleSubmitReview, className: "ml-auto mt-5 inline-block rounded-md disabled:opacity-40 disabled:bg-blue-600 bg-blue-600 px-5 py-3 text-center text-xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" }, "Submit"))))))));
}
//# sourceMappingURL=ReviewModal.js.map
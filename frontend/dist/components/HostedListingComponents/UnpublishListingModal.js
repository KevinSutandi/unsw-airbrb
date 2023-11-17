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
import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { makeRequest } from '../../utils/axiosHelper';
import axios from 'axios';
import { getToken } from '../../utils/auth';
export default function UnpublishListingModal(_a) {
    var _this = this;
    var open = _a.open, setOpen = _a.setOpen, listingId = _a.listingId, setErrorModalOpen = _a.setErrorModalOpen, setErrorMessage = _a.setErrorMessage, setRunEffect = _a.setRunEffect;
    var cancelButtonRef = useRef(null);
    var handleUnpublish = function () { return __awaiter(_this, void 0, void 0, function () {
        var token, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!listingId) return [3 /*break*/, 4];
                    token = getToken();
                    if (!token) return [3 /*break*/, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    // Make a DELETE request to delete the listing
                    return [4 /*yield*/, makeRequest('PUT', "listings/unpublish/".concat(listingId), { token: token })];
                case 2:
                    // Make a DELETE request to delete the listing
                    _b.sent();
                    // Close the unpublish confirmation modal
                    setOpen(false);
                    setRunEffect(true);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    setErrorModalOpen(true);
                    if (axios.isAxiosError(err_1)) {
                        if ((_a = err_1.response) === null || _a === void 0 ? void 0 : _a.data) {
                            setErrorMessage(err_1.response.data.error);
                            console.error('Unpublish listing failed:', err_1.response.data.error);
                        }
                    }
                    else {
                        setErrorMessage('An unexpected error occurred.');
                        console.error('Unpublish listing failed:', err_1);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(Transition.Root, { show: open, as: Fragment },
        React.createElement(Dialog, { as: 'div', className: 'relative z-10', initialFocus: cancelButtonRef, onClose: setOpen },
            React.createElement(Transition.Child, { as: Fragment, enter: 'ease-out duration-300', enterFrom: 'opacity-0', enterTo: 'opacity-100', leave: 'ease-in duration-200', leaveFrom: 'opacity-100', leaveTo: 'opacity-0' },
                React.createElement("div", { className: 'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' })),
            React.createElement("div", { className: 'fixed inset-0 z-10 w-screen overflow-y-auto' },
                React.createElement("div", { className: 'flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0' },
                    React.createElement(Transition.Child, { as: Fragment, enter: 'ease-out duration-300', enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95', enterTo: 'opacity-100 translate-y-0 sm:scale-100', leave: 'ease-in duration-200', leaveFrom: 'opacity-100 translate-y-0 sm:scale-100', leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' },
                        React.createElement(Dialog.Panel, { className: 'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg' },
                            React.createElement("div", { className: 'bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4' },
                                React.createElement("div", { className: 'sm:flex sm:items-start' },
                                    React.createElement("div", { className: 'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10' },
                                        React.createElement(FaceFrownIcon, { className: 'h-6 w-6 text-red-600', "aria-hidden": 'true' })),
                                    React.createElement("div", { className: 'mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left' },
                                        React.createElement(Dialog.Title, { as: 'h3', className: 'text-base font-semibold leading-6 text-gray-900' }, "Unpublish Listing"),
                                        React.createElement("div", { className: 'mt-2' },
                                            React.createElement("p", { className: 'text-sm text-gray-500' }, "Are you sure you want to unpublish this listing?"))))),
                            React.createElement("div", { className: 'bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6' },
                                React.createElement("button", { type: 'button', name: 'unpublish', className: 'unpublish-btn inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto', onClick: function () { return handleUnpublish(); } }, "Unpublish"),
                                React.createElement("button", { type: 'button', className: 'mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto', onClick: function () { return setOpen(false); }, ref: cancelButtonRef }, "Cancel")))))))));
}
//# sourceMappingURL=UnpublishListingModal.js.map
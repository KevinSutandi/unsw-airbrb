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
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { setEmail, setToken } from '../../utils/auth';
import { makeRequest } from '../../utils/axiosHelper';
import axios from 'axios';
export default function LoginModal(_a) {
    var _this = this;
    var open = _a.open, setIsLoggedIn = _a.setIsLoggedIn, onClose = _a.onClose, openRegisterModal = _a.openRegisterModal, setLoginModalOpen = _a.setLoginModalOpen, setErrorMessage = _a.setErrorMessage, setErrorModalOpen = _a.setErrorModalOpen, setNewToken = _a.setNewToken;
    var cancelButtonRef = useRef(null);
    var initialForm = {
        email: '',
        password: '',
    };
    var _b = useState(initialForm), formData = _b[0], setFormData = _b[1];
    useEffect(function () {
        setFormData(initialForm);
    }, [open]);
    var handleLogin = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, makeRequest('POST', 'user/auth/login', formData)];
                case 2:
                    res = _b.sent();
                    setToken(res.data.token);
                    setEmail(formData.email);
                    setIsLoggedIn(true);
                    setNewToken(res.data.token);
                    setLoginModalOpen(false);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    setErrorModalOpen(true);
                    if (axios.isAxiosError(err_1)) {
                        if ((_a = err_1.response) === null || _a === void 0 ? void 0 : _a.data) {
                            setErrorMessage(err_1.response.data.error);
                            console.error('Login failed:', err_1.response.data.error);
                        }
                    }
                    else {
                        setErrorMessage('An unexpected error occurred.');
                        console.error('Login failed:', err_1);
                    }
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
                        React.createElement("div", { className: "text-center" },
                            React.createElement(UserIcon, { className: "h-12 w-12 mx-auto text-blue-400", "aria-hidden": "true" }),
                            React.createElement(Dialog.Title, { as: "h3", className: "text-lg font-semibold leading-6 text-gray-900 mt-4" }, "Login")),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("form", { className: "space-y-4", onSubmit: handleLogin },
                                React.createElement("div", null,
                                    React.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700" }, "Email"),
                                    React.createElement("input", { type: "email", id: "email", name: "email", className: "mt-1 p-2 block w-full rounded-md border border-gray-300", placeholder: "youremail@example.com", onChange: function (e) {
                                            return setFormData(function (prev) { return (__assign(__assign({}, prev), { email: e.target.value })); });
                                        }, value: formData.email })),
                                React.createElement("div", null,
                                    React.createElement("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700" }, "Password"),
                                    React.createElement("input", { type: "password", id: "password", name: "password", className: "mt-1 p-2 block w-full rounded-md border border-gray-300", placeholder: "********", onChange: function (e) {
                                            return setFormData(function (prev) { return (__assign(__assign({}, prev), { password: e.target.value })); });
                                        }, value: formData.password })),
                                React.createElement("div", null,
                                    React.createElement("button", { name: 'submit-login', type: "submit", className: "w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400" }, "Login")))),
                        React.createElement("div", { className: "mt-6" },
                            React.createElement("p", { className: "text-sm text-gray-500" },
                                "Don't have an account?\u00A0",
                                React.createElement("button", { onClick: openRegisterModal, className: "text-sm text-blue-500 hover:text-blue-700 hover:underline" }, "Register")))))))));
}
//# sourceMappingURL=LoginModal.js.map
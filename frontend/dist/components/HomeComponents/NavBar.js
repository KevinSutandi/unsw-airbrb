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
import React, { useState, useEffect } from 'react';
import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline';
import { getToken, setEmail, setToken } from '../../utils/auth';
import logo from '../../assets/logo.jpeg';
import LoginModal from '../AuthModals/LoginModal';
import RegisterModal from '../AuthModals/RegisterModal';
import { useNavigate } from 'react-router-dom';
import HomeProfileMenu from './HomeProfileMenu';
import { makeRequest } from '../../utils/axiosHelper';
import axios from 'axios';
import Dropdown from '../Dropdown';
export default function NavBar(_a) {
    var _this = this;
    var isLoggedIn = _a.isLoggedIn, setIsLoggedIn = _a.setIsLoggedIn, setErrorModalOpen = _a.setErrorModalOpen, setErrorMessage = _a.setErrorMessage, product = _a.product, setProduct = _a.setProduct, setIsFiltered = _a.setIsFiltered;
    var _b = useState(false), mobileMenuOpen = _b[0], setMobileMenuOpen = _b[1];
    var _c = useState(false), loginModalOpen = _c[0], setLoginModalOpen = _c[1];
    var _d = useState(false), registerModalOpen = _d[0], setRegisterModalOpen = _d[1];
    var _e = useState(''), token = _e[0], setNewToken = _e[1];
    useEffect(function () {
        var userToken = getToken();
        if (userToken) {
            setNewToken(userToken);
            setIsLoggedIn(userToken !== 'null');
        }
        else {
            console.log('Cannot get Token');
        }
    }, []);
    var navigate = useNavigate();
    var openLoginModal = function () {
        setRegisterModalOpen(false);
        setLoginModalOpen(true);
    };
    var openRegisterModal = function () {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
    };
    var handleLogout = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    if (!token) return [3 /*break*/, 3];
                    return [4 /*yield*/, makeRequest('POST', 'user/auth/logout', { token: token })];
                case 2:
                    _b.sent();
                    setIsLoggedIn(false);
                    setToken('');
                    setEmail('');
                    navigate('/');
                    _b.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_1 = _b.sent();
                    if (axios.isAxiosError(err_1)) {
                        if ((_a = err_1.response) === null || _a === void 0 ? void 0 : _a.data) {
                            setErrorMessage(err_1.response.data.error);
                            setErrorModalOpen(true);
                            console.error('Login failed:', err_1.response.data.error);
                        }
                    }
                    else {
                        setErrorMessage('An unexpected error occurred.');
                        setErrorModalOpen(true);
                        console.error('Login failed:', err_1);
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var navigateHome = function () {
        navigate('/');
    };
    var navigateHostedListings = function () {
        setMobileMenuOpen(false);
        navigate('/listings');
    };
    return (React.createElement("header", { className: "bg-white" },
        React.createElement("nav", { className: "mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8", "aria-label": "Global" },
            React.createElement("div", { className: "flex lg:flex-1" },
                React.createElement("a", { className: "-m-1.5 p-1.5 flex hover:scale-105 ease-in duration-200 cursor-pointer", onClick: navigateHome },
                    React.createElement("span", { className: "sr-only" }, "AirBRB"),
                    React.createElement("img", { className: "h-10 w-auto", src: logo, alt: "" }),
                    React.createElement("span", { className: "hidden mx-3 my-auto text-2xl underline underline-offset-3 lg:block" }, "AirBRB"))),
            React.createElement(Popover.Group, { className: "lg:flex lg:gap-x-12" },
                React.createElement(Dropdown, { products: product, setProducts: setProduct, setIsFiltered: setIsFiltered })),
            React.createElement("div", { className: "flex lg:hidden" },
                React.createElement("button", { type: "button", className: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700", onClick: function () { return setMobileMenuOpen(true); } },
                    React.createElement("span", { className: "sr-only" }, "Open main menu"),
                    React.createElement(Bars3Icon, { className: "h-6 w-6", "aria-hidden": "true" }))),
            React.createElement("div", { className: "hidden lg:flex lg:flex-1 lg:justify-end items-center" },
                React.createElement(HomeProfileMenu, { openLoginModal: openLoginModal, openRegisterModal: openRegisterModal, isLoggedIn: isLoggedIn, handleLogout: handleLogout, navigateHostedListings: navigateHostedListings }))),
        React.createElement(Dialog, { as: "div", className: "lg:hidden", open: mobileMenuOpen, onClose: setMobileMenuOpen },
            React.createElement("div", { className: "fixed inset-0 z-10" }),
            React.createElement(Dialog.Panel, { className: "fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10" },
                React.createElement("div", { className: "flex items-center justify-between" },
                    React.createElement("a", { href: "#", className: "-m-1.5 p-1.5 flex" },
                        React.createElement("span", { className: "sr-only" }, "AirBRB"),
                        React.createElement("img", { className: "h-8 w-auto", src: logo, alt: "" }),
                        React.createElement("span", { className: "mx-3 my-auto text-2xl underline underline-offset-3" }, "AirBRB")),
                    React.createElement("button", { type: "button", className: "-m-2.5 rounded-md p-2.5 text-gray-700", onClick: function () { return setMobileMenuOpen(false); } },
                        React.createElement("span", { className: "sr-only" }, "Close menu"),
                        React.createElement(XMarkIcon, { className: "h-6 w-6 hover:bg-gray-50", "aria-hidden": "true" }))),
                React.createElement("div", { className: "mt-6 flow-root" },
                    React.createElement("div", { className: "-my-6 divide-y divide-gray-500/10" }, isLoggedIn
                        ? (React.createElement("div", { className: "py-6" },
                            React.createElement("button", { className: "-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-gray-900 hover:bg-gray-50", onClick: navigateHostedListings }, "View Listings"),
                            React.createElement("button", { onClick: handleLogout, className: "-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-500 hover:bg-gray-50" }, "Log out")))
                        : (React.createElement("div", { className: "py-6" },
                            React.createElement("button", { onClick: openRegisterModal, className: "-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-gray-900 hover:bg-gray-50" }, "Sign up"),
                            React.createElement("button", { onClick: openLoginModal, className: "-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" }, "Log in"))))))),
        React.createElement(LoginModal, { open: loginModalOpen, setIsLoggedIn: setIsLoggedIn, onClose: function () { return setLoginModalOpen(false); }, openRegisterModal: openRegisterModal, setLoginModalOpen: setLoginModalOpen, setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen, setNewToken: setNewToken }),
        React.createElement(RegisterModal, { open: registerModalOpen, setIsLoggedIn: setIsLoggedIn, onClose: function () { return setRegisterModalOpen(false); }, openLoginModal: openLoginModal, setRegisterModalOpen: setRegisterModalOpen, setErrorMessage: setErrorMessage, setErrorModalOpen: setErrorModalOpen, setNewToken: setNewToken })));
}
//# sourceMappingURL=NavBar.js.map
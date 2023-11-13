import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import ProfileIcon from '../../assets/profileIcon.svg';
export default function HomeProfileMenu(_a) {
    var openLoginModal = _a.openLoginModal, openRegisterModal = _a.openRegisterModal, isLoggedIn = _a.isLoggedIn, handleLogout = _a.handleLogout, navigateHostedListings = _a.navigateHostedListings;
    return (React.createElement("div", null,
        React.createElement(Menu, { as: "div", className: "relative inline-block text-left" },
            React.createElement("div", null,
                React.createElement(Menu.Button, { className: "w-10 justify-center rounded-full h-10 px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ".concat(isLoggedIn
                        ? 'bg-blue-500 hover:bg-black'
                        : 'bg-black hover:bg-blue-500') },
                    React.createElement("img", { src: ProfileIcon, alt: "Profile Icon", className: "w-6 h-6" }))),
            React.createElement(Transition, { as: Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                React.createElement(Menu.Items, { className: "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" },
                    React.createElement("div", { className: "px-1 py-1 " }, isLoggedIn
                        ? (React.createElement(React.Fragment, null,
                            React.createElement(Menu.Item, null, function (_a) {
                                var active = _a.active;
                                return (React.createElement("button", { className: "".concat(active ? 'bg-blue-500 text-white' : 'text-gray-900', " group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold"), onClick: navigateHostedListings }, "View Listings"));
                            }),
                            React.createElement("hr", null),
                            React.createElement(Menu.Item, null, function (_a) {
                                var active = _a.active;
                                return (React.createElement("button", { onClick: handleLogout, className: "".concat(active ? 'bg-blue-500 text-white' : 'text-red-500', " group flex w-full items-center rounded-md px-2 py-2 text-sm") }, "Log out"));
                            })))
                        : (React.createElement(React.Fragment, null,
                            React.createElement(Menu.Item, null, function (_a) {
                                var active = _a.active;
                                return (React.createElement("button", { className: "".concat(active ? 'bg-blue-500 text-white' : 'text-gray-900', " group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold"), onClick: openRegisterModal }, "Sign up"));
                            }),
                            React.createElement(Menu.Item, null, function (_a) {
                                var active = _a.active;
                                return (React.createElement("button", { onClick: openLoginModal, className: "".concat(active ? 'bg-blue-500 text-white' : 'text-gray-900', " group flex w-full items-center rounded-md px-2 py-2 text-sm") }, "Login"));
                            })))))))));
}
//# sourceMappingURL=HomeProfileMenu.js.map
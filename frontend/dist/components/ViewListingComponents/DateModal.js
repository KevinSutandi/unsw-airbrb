import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import DateForm from './DateForm';
export default function DateModal(_a) {
    var open = _a.open, onClose = _a.onClose;
    var cancelButtonRef = useRef(null);
    return (React.createElement(Transition.Root, { show: open, as: Fragment },
        React.createElement(Dialog, { as: "div", className: "relative z-10", initialFocus: cancelButtonRef, onClose: onClose },
            React.createElement(Transition.Child, { as: Fragment, enter: "ease-out duration-200", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-300", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                React.createElement("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })),
            React.createElement("div", { className: "fixed inset-0 z-10 flex items-center justify-center" },
                React.createElement(Transition.Child, { as: Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95" },
                    React.createElement(Dialog.Panel, { className: "relative w-full max-w-sm p-6 bg-white rounded-lg shadow-xl" },
                        React.createElement("div", { className: "text-center" },
                            React.createElement(Dialog.Title, { as: "h3", className: "text-2xl font-semibold leading-6 text-gray-900 text-left mb-5" }, "Set dates"),
                            React.createElement(DateForm, null))))))));
}
//# sourceMappingURL=DateModal.js.map
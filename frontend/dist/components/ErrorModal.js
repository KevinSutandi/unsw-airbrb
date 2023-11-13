import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
export default function ErrorModals(_a) {
    var open = _a.open, onClose = _a.onClose, errorMessage = _a.errorMessage;
    useEffect(function () {
        if (open) {
            // Automatically close the modal after 3 seconds
            var timer_1 = setTimeout(function () {
                onClose();
            }, 3000);
            // Clear the timer if the modal is manually closed before the timer expires
            return function () { return clearTimeout(timer_1); };
        }
        return undefined;
    }, [open, onClose]);
    return (React.createElement(Transition.Root, { show: open, as: Fragment },
        React.createElement(Dialog, { as: 'div', className: 'relative z-30', onClose: onClose },
            React.createElement(Transition.Child, { as: Fragment, enter: 'ease-out duration-200', enterFrom: 'opacity-0', enterTo: 'opacity-100', leave: 'ease-in duration-300', leaveFrom: 'opacity-100', leaveTo: 'opacity-0' },
                React.createElement("div", { className: 'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' })),
            React.createElement("div", { className: 'fixed inset-0 z-10 flex items-center justify-center' },
                React.createElement(Transition.Child, { as: Fragment, enter: 'ease-out duration-300', enterFrom: 'opacity-0 scale-95', enterTo: 'opacity-100 scale-100', leave: 'ease-in duration-200', leaveFrom: 'opacity-100 scale-100', leaveTo: 'opacity-0 scale-95' },
                    React.createElement(Dialog.Panel, { className: 'relative w-full max-w-sm p-6 bg-white rounded-lg shadow-xl' },
                        React.createElement("div", { className: 'group absolute top-1 right-1 z-12 p-2 cursor-pointer rounded-lg hover:bg-gray-300' },
                            React.createElement(XMarkIcon, { className: 'w-5 h-5 text-gray-500 group-hover:text-gray-800', onClick: onClose })),
                        React.createElement("div", null,
                            React.createElement(Dialog.Title, { as: 'h3', className: 'text-lg font-semibold leading-6 text-gray-900 mt-4' }, "Error Occured")),
                        React.createElement("div", { className: 'mt-3' },
                            React.createElement("p", { className: 'text-sm text-gray-500' }, errorMessage)),
                        React.createElement("div", { className: 'mt-6' },
                            React.createElement("div", { className: 'progress-bar' },
                                React.createElement("div", { className: 'progress' })))))))));
}
//# sourceMappingURL=ErrorModal.js.map